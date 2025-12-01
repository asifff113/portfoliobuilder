-- ============================================
-- NeonCV Database Schema
-- Initial Migration
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE cv_section_type AS ENUM (
  'about',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'languages',
  'awards',
  'publications',
  'volunteer',
  'references',
  'custom'
);

CREATE TYPE portfolio_layout_type AS ENUM (
  'hero_timeline',
  'project_grid',
  'minimal',
  'creative',
  'developer'
);

CREATE TYPE background_style AS ENUM (
  'solid',
  'gradient',
  'pattern',
  'mesh'
);

CREATE TYPE border_radius_type AS ENUM (
  'none',
  'sm',
  'md',
  'lg',
  'xl',
  'full'
);

CREATE TYPE shadow_intensity_type AS ENUM (
  'none',
  'sm',
  'md',
  'lg'
);

CREATE TYPE language_proficiency AS ENUM (
  'native',
  'fluent',
  'advanced',
  'intermediate',
  'beginner'
);

-- ============================================
-- PROFILES TABLE
-- Linked to Supabase auth.users
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  headline TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast user lookups
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- ============================================
-- THEMES TABLE
-- User-customizable themes
-- ============================================

CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  is_system BOOLEAN DEFAULT FALSE,
  primary_color TEXT NOT NULL DEFAULT '#8B5CF6',
  secondary_color TEXT NOT NULL DEFAULT '#06B6D4',
  accent_color TEXT NOT NULL DEFAULT '#EC4899',
  background_style background_style DEFAULT 'solid',
  background_color TEXT NOT NULL DEFAULT '#0f0d15',
  background_gradient TEXT,
  heading_font TEXT NOT NULL DEFAULT 'Space Grotesk',
  body_font TEXT NOT NULL DEFAULT 'Inter',
  border_radius border_radius_type DEFAULT 'lg',
  shadow_intensity shadow_intensity_type DEFAULT 'md',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user themes
CREATE INDEX idx_themes_user_id ON themes(user_id);

-- ============================================
-- CV TEMPLATES TABLE
-- Pre-designed CV templates
-- ============================================

CREATE TABLE cv_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  category TEXT NOT NULL DEFAULT 'modern',
  is_premium BOOLEAN DEFAULT FALSE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CVS TABLE
-- Main CV records
-- ============================================

CREATE TABLE cvs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled CV',
  slug TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  template_id UUID REFERENCES cv_templates(id) ON DELETE SET NULL,
  theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT FALSE,
  last_edited_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

-- Indexes for CVs
CREATE INDEX idx_cvs_user_id ON cvs(user_id);
CREATE INDEX idx_cvs_slug ON cvs(slug);
CREATE INDEX idx_cvs_public ON cvs(is_public) WHERE is_public = TRUE;

-- ============================================
-- CV SECTIONS TABLE
-- Sections within a CV
-- ============================================

CREATE TABLE cv_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cv_id UUID NOT NULL REFERENCES cvs(id) ON DELETE CASCADE,
  type cv_section_type NOT NULL,
  title TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for section lookups
CREATE INDEX idx_cv_sections_cv_id ON cv_sections(cv_id);

-- ============================================
-- CV ITEMS TABLE
-- Items within sections (experiences, education, etc.)
-- Uses JSONB for flexible item data
-- ============================================

CREATE TABLE cv_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES cv_sections(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL DEFAULT 0,
  -- Common fields
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for item lookups
CREATE INDEX idx_cv_items_section_id ON cv_items(section_id);

-- ============================================
-- PORTFOLIO TEMPLATES TABLE
-- Pre-designed portfolio templates
-- ============================================

CREATE TABLE portfolio_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  layout_type portfolio_layout_type NOT NULL DEFAULT 'hero_timeline',
  is_premium BOOLEAN DEFAULT FALSE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PORTFOLIOS TABLE
-- Main portfolio records
-- ============================================

CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cv_id UUID REFERENCES cvs(id) ON DELETE SET NULL,
  title TEXT NOT NULL DEFAULT 'My Portfolio',
  slug TEXT NOT NULL,
  layout_type portfolio_layout_type DEFAULT 'hero_timeline',
  is_published BOOLEAN DEFAULT FALSE,
  hero_headline TEXT,
  hero_summary TEXT,
  hero_image_url TEXT,
  theme_id UUID REFERENCES themes(id) ON DELETE SET NULL,
  custom_domain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, slug)
);

-- Indexes for portfolios
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolios_slug ON portfolios(slug);
CREATE INDEX idx_portfolios_published ON portfolios(is_published) WHERE is_published = TRUE;

-- ============================================
-- PORTFOLIO BLOCKS TABLE
-- Customizable sections in a portfolio
-- ============================================

CREATE TABLE portfolio_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  content JSONB DEFAULT '{}',
  "order" INTEGER NOT NULL DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for block lookups
CREATE INDEX idx_portfolio_blocks_portfolio_id ON portfolio_blocks(portfolio_id);

-- ============================================
-- FEATURED PROJECTS TABLE
-- Projects showcased in portfolios
-- ============================================

CREATE TABLE featured_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT TRUE,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for project lookups
CREATE INDEX idx_featured_projects_portfolio_id ON featured_projects(portfolio_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_templates ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can only access their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id);

-- THEMES: Users can access their own themes + system themes
CREATE POLICY "Users can view own themes and system themes"
  ON themes FOR SELECT
  USING (auth.uid() = user_id OR is_system = TRUE);

CREATE POLICY "Users can insert own themes"
  ON themes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own themes"
  ON themes FOR UPDATE
  USING (auth.uid() = user_id AND is_system = FALSE);

CREATE POLICY "Users can delete own themes"
  ON themes FOR DELETE
  USING (auth.uid() = user_id AND is_system = FALSE);

-- CVS: Users can only access their own CVs
CREATE POLICY "Users can view own CVs"
  ON cvs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view public CVs"
  ON cvs FOR SELECT
  USING (is_public = TRUE);

CREATE POLICY "Users can insert own CVs"
  ON cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
  ON cvs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
  ON cvs FOR DELETE
  USING (auth.uid() = user_id);

-- CV_SECTIONS: Access through CV ownership
CREATE POLICY "Users can view own CV sections"
  ON cv_sections FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_sections.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Public can view public CV sections"
  ON cv_sections FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_sections.cv_id AND cvs.is_public = TRUE
  ));

CREATE POLICY "Users can insert own CV sections"
  ON cv_sections FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_sections.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own CV sections"
  ON cv_sections FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_sections.cv_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own CV sections"
  ON cv_sections FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM cvs WHERE cvs.id = cv_sections.cv_id AND cvs.user_id = auth.uid()
  ));

-- CV_ITEMS: Access through section -> CV ownership
CREATE POLICY "Users can view own CV items"
  ON cv_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM cv_sections
    JOIN cvs ON cvs.id = cv_sections.cv_id
    WHERE cv_sections.id = cv_items.section_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Public can view public CV items"
  ON cv_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM cv_sections
    JOIN cvs ON cvs.id = cv_sections.cv_id
    WHERE cv_sections.id = cv_items.section_id AND cvs.is_public = TRUE
  ));

CREATE POLICY "Users can insert own CV items"
  ON cv_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM cv_sections
    JOIN cvs ON cvs.id = cv_sections.cv_id
    WHERE cv_sections.id = cv_items.section_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own CV items"
  ON cv_items FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM cv_sections
    JOIN cvs ON cvs.id = cv_sections.cv_id
    WHERE cv_sections.id = cv_items.section_id AND cvs.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own CV items"
  ON cv_items FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM cv_sections
    JOIN cvs ON cvs.id = cv_sections.cv_id
    WHERE cv_sections.id = cv_items.section_id AND cvs.user_id = auth.uid()
  ));

-- PORTFOLIOS: Users can only access their own portfolios
CREATE POLICY "Users can view own portfolios"
  ON portfolios FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view published portfolios"
  ON portfolios FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Users can insert own portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios"
  ON portfolios FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios"
  ON portfolios FOR DELETE
  USING (auth.uid() = user_id);

-- PORTFOLIO_BLOCKS: Access through portfolio ownership
CREATE POLICY "Users can view own portfolio blocks"
  ON portfolio_blocks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = portfolio_blocks.portfolio_id AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Public can view published portfolio blocks"
  ON portfolio_blocks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = portfolio_blocks.portfolio_id AND portfolios.is_published = TRUE
  ));

CREATE POLICY "Users can insert own portfolio blocks"
  ON portfolio_blocks FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = portfolio_blocks.portfolio_id AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own portfolio blocks"
  ON portfolio_blocks FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = portfolio_blocks.portfolio_id AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own portfolio blocks"
  ON portfolio_blocks FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = portfolio_blocks.portfolio_id AND portfolios.user_id = auth.uid()
  ));

-- FEATURED_PROJECTS: Access through portfolio ownership
CREATE POLICY "Users can view own featured projects"
  ON featured_projects FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = featured_projects.portfolio_id AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Public can view published featured projects"
  ON featured_projects FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = featured_projects.portfolio_id AND portfolios.is_published = TRUE
  ));

CREATE POLICY "Users can insert own featured projects"
  ON featured_projects FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = featured_projects.portfolio_id AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own featured projects"
  ON featured_projects FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = featured_projects.portfolio_id AND portfolios.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own featured projects"
  ON featured_projects FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM portfolios WHERE portfolios.id = featured_projects.portfolio_id AND portfolios.user_id = auth.uid()
  ));

-- TEMPLATES: Everyone can view templates
CREATE POLICY "Anyone can view CV templates"
  ON cv_templates FOR SELECT
  TO PUBLIC
  USING (TRUE);

CREATE POLICY "Anyone can view portfolio templates"
  ON portfolio_templates FOR SELECT
  TO PUBLIC
  USING (TRUE);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_themes_updated_at
  BEFORE UPDATE ON themes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cvs_updated_at
  BEFORE UPDATE ON cvs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cv_sections_updated_at
  BEFORE UPDATE ON cv_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cv_items_updated_at
  BEFORE UPDATE ON cv_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON portfolios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_blocks_updated_at
  BEFORE UPDATE ON portfolio_blocks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_featured_projects_updated_at
  BEFORE UPDATE ON featured_projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update CV's last_edited_at when sections or items change
CREATE OR REPLACE FUNCTION update_cv_last_edited()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_TABLE_NAME = 'cv_sections' THEN
    UPDATE cvs SET last_edited_at = NOW() WHERE id = COALESCE(NEW.cv_id, OLD.cv_id);
  ELSIF TG_TABLE_NAME = 'cv_items' THEN
    UPDATE cvs SET last_edited_at = NOW()
    WHERE id = (
      SELECT cv_id FROM cv_sections WHERE id = COALESCE(NEW.section_id, OLD.section_id)
    );
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cv_last_edited_on_section
  AFTER INSERT OR UPDATE OR DELETE ON cv_sections
  FOR EACH ROW EXECUTE FUNCTION update_cv_last_edited();

CREATE TRIGGER update_cv_last_edited_on_item
  AFTER INSERT OR UPDATE OR DELETE ON cv_items
  FOR EACH ROW EXECUTE FUNCTION update_cv_last_edited();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA: Default System Themes
-- ============================================

INSERT INTO themes (id, name, is_system, primary_color, secondary_color, accent_color, background_style, background_color, heading_font, body_font, border_radius, shadow_intensity)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Neon Purple', TRUE, '#8B5CF6', '#06B6D4', '#EC4899', 'mesh', '#0f0d15', 'Space Grotesk', 'Inter', 'lg', 'md'),
  ('00000000-0000-0000-0000-000000000002', 'Ocean Blue', TRUE, '#3B82F6', '#14B8A6', '#8B5CF6', 'gradient', '#0c1929', 'Outfit', 'Inter', 'md', 'sm'),
  ('00000000-0000-0000-0000-000000000003', 'Sunset', TRUE, '#F97316', '#EC4899', '#EAB308', 'solid', '#1a1512', 'Sora', 'DM Sans', 'xl', 'lg'),
  ('00000000-0000-0000-0000-000000000004', 'Minimal Light', TRUE, '#18181B', '#52525B', '#3B82F6', 'solid', '#FAFAFA', 'Plus Jakarta Sans', 'Inter', 'sm', 'sm'),
  ('00000000-0000-0000-0000-000000000005', 'Forest', TRUE, '#22C55E', '#14B8A6', '#84CC16', 'gradient', '#0a1410', 'Manrope', 'Inter', 'lg', 'md');

-- ============================================
-- SEED DATA: Default CV Templates
-- ============================================

INSERT INTO cv_templates (id, name, description, category, is_premium, config)
VALUES
  ('00000000-0000-0000-0001-000000000001', 'Neon Minimal', 'Clean vertical layout with colorful accents', 'modern', FALSE, '{"layout": "single-column", "showPhoto": true}'),
  ('00000000-0000-0000-0001-000000000002', 'Card Grid', 'Sections rendered in stylish cards', 'creative', FALSE, '{"layout": "grid", "showPhoto": true}'),
  ('00000000-0000-0000-0001-000000000003', 'Classic Professional', 'Traditional two-column layout', 'professional', FALSE, '{"layout": "two-column", "showPhoto": false}'),
  ('00000000-0000-0000-0001-000000000004', 'Creative Bold', 'Stand-out design with bold typography', 'creative', TRUE, '{"layout": "asymmetric", "showPhoto": true}'),
  ('00000000-0000-0000-0001-000000000005', 'Tech Minimalist', 'Perfect for developers and engineers', 'minimal', FALSE, '{"layout": "single-column", "showPhoto": false}');

-- ============================================
-- SEED DATA: Default Portfolio Templates
-- ============================================

INSERT INTO portfolio_templates (id, name, description, layout_type, is_premium, config)
VALUES
  ('00000000-0000-0000-0002-000000000001', 'Hero Timeline', 'Large hero with experience timeline', 'hero_timeline', FALSE, '{}'),
  ('00000000-0000-0000-0002-000000000002', 'Project Grid', 'Card-based project showcase with sidebar', 'project_grid', FALSE, '{}'),
  ('00000000-0000-0000-0002-000000000003', 'Developer Focus', 'GitHub stats and code-focused layout', 'developer', FALSE, '{}'),
  ('00000000-0000-0000-0002-000000000004', 'Creative Gallery', 'Full-width images and animations', 'creative', TRUE, '{}'),
  ('00000000-0000-0000-0002-000000000005', 'Minimal White', 'Ultra-clean with focus on content', 'minimal', FALSE, '{}');

