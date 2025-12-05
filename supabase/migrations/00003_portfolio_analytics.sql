-- ============================================
-- PORTFOLIO ANALYTICS MIGRATION
-- Tracks views and interactions on portfolios
-- ============================================

-- Portfolio Views Table
CREATE TABLE portfolio_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  viewer_ip TEXT, -- Hashed for privacy
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT, -- mobile, tablet, desktop
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient querying
CREATE INDEX idx_portfolio_views_portfolio_id ON portfolio_views(portfolio_id);
CREATE INDEX idx_portfolio_views_created_at ON portfolio_views(created_at);

-- Portfolio Click Events Table (for tracking CTA clicks)
CREATE TABLE portfolio_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'cta_click', 'project_click', 'social_click', 'download'
  event_data JSONB DEFAULT '{}', -- Additional event metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_portfolio_events_portfolio_id ON portfolio_events(portfolio_id);
CREATE INDEX idx_portfolio_events_type ON portfolio_events(event_type);

-- Aggregated stats (updated periodically for performance)
CREATE TABLE portfolio_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE UNIQUE,
  total_views INTEGER DEFAULT 0,
  unique_views INTEGER DEFAULT 0,
  views_today INTEGER DEFAULT 0,
  views_this_week INTEGER DEFAULT 0,
  views_this_month INTEGER DEFAULT 0,
  cta_clicks INTEGER DEFAULT 0,
  project_clicks INTEGER DEFAULT 0,
  avg_time_on_page INTEGER DEFAULT 0, -- in seconds
  top_referrers JSONB DEFAULT '[]',
  top_countries JSONB DEFAULT '[]',
  device_breakdown JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_portfolio_stats_portfolio_id ON portfolio_stats(portfolio_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can insert views (public portfolios)
CREATE POLICY "Anyone can insert portfolio views"
  ON portfolio_views FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM portfolios WHERE id = portfolio_id AND is_published = TRUE)
  );

-- Only portfolio owners can view their analytics
CREATE POLICY "Portfolio owners can view their analytics"
  ON portfolio_views FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM portfolios WHERE id = portfolio_id AND user_id = auth.uid())
  );

-- Anyone can insert events for published portfolios
CREATE POLICY "Anyone can insert portfolio events"
  ON portfolio_events FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM portfolios WHERE id = portfolio_id AND is_published = TRUE)
  );

-- Only portfolio owners can view their events
CREATE POLICY "Portfolio owners can view their events"
  ON portfolio_events FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM portfolios WHERE id = portfolio_id AND user_id = auth.uid())
  );

-- Stats are visible to portfolio owners
CREATE POLICY "Portfolio owners can view their stats"
  ON portfolio_stats FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM portfolios WHERE id = portfolio_id AND user_id = auth.uid())
  );

-- Admins can view all analytics
CREATE POLICY "Admins can view all portfolio views"
  ON portfolio_views FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can view all portfolio events"
  ON portfolio_events FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can view all portfolio stats"
  ON portfolio_stats FOR SELECT
  USING (is_admin());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to record a portfolio view
CREATE OR REPLACE FUNCTION record_portfolio_view(
  p_portfolio_id UUID,
  p_viewer_ip TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_country TEXT DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_device_type TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  view_id UUID;
BEGIN
  -- Insert the view
  INSERT INTO portfolio_views (
    portfolio_id, viewer_ip, user_agent, referrer, country, city, device_type
  ) VALUES (
    p_portfolio_id, p_viewer_ip, p_user_agent, p_referrer, p_country, p_city, p_device_type
  ) RETURNING id INTO view_id;
  
  -- Update or insert stats
  INSERT INTO portfolio_stats (portfolio_id, total_views, views_today, views_this_week, views_this_month)
  VALUES (p_portfolio_id, 1, 1, 1, 1)
  ON CONFLICT (portfolio_id) DO UPDATE SET
    total_views = portfolio_stats.total_views + 1,
    views_today = CASE 
      WHEN DATE(portfolio_stats.updated_at) = CURRENT_DATE THEN portfolio_stats.views_today + 1
      ELSE 1
    END,
    views_this_week = CASE 
      WHEN EXTRACT(WEEK FROM portfolio_stats.updated_at) = EXTRACT(WEEK FROM NOW()) 
        AND EXTRACT(YEAR FROM portfolio_stats.updated_at) = EXTRACT(YEAR FROM NOW())
      THEN portfolio_stats.views_this_week + 1
      ELSE 1
    END,
    views_this_month = CASE 
      WHEN EXTRACT(MONTH FROM portfolio_stats.updated_at) = EXTRACT(MONTH FROM NOW())
        AND EXTRACT(YEAR FROM portfolio_stats.updated_at) = EXTRACT(YEAR FROM NOW())
      THEN portfolio_stats.views_this_month + 1
      ELSE 1
    END,
    updated_at = NOW();
  
  RETURN view_id;
END;
$$;

-- Function to record a portfolio event
CREATE OR REPLACE FUNCTION record_portfolio_event(
  p_portfolio_id UUID,
  p_event_type TEXT,
  p_event_data JSONB DEFAULT '{}'
)
RETURNS UUID
LANGUAGE plpgsql SECURITY DEFINER
AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO portfolio_events (portfolio_id, event_type, event_data)
  VALUES (p_portfolio_id, p_event_type, p_event_data)
  RETURNING id INTO event_id;
  
  -- Update stats based on event type
  IF p_event_type = 'cta_click' THEN
    UPDATE portfolio_stats SET cta_clicks = cta_clicks + 1, updated_at = NOW()
    WHERE portfolio_id = p_portfolio_id;
  ELSIF p_event_type = 'project_click' THEN
    UPDATE portfolio_stats SET project_clicks = project_clicks + 1, updated_at = NOW()
    WHERE portfolio_id = p_portfolio_id;
  END IF;
  
  RETURN event_id;
END;
$$;

