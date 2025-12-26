-- ============================================
-- Public Profile Access for Portfolios
-- ============================================

-- Allow public to view profiles for published portfolios
-- This is needed because the public portfolio page joins with profiles
CREATE POLICY "Public can view profiles for published portfolios"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM portfolios 
      WHERE portfolios.user_id = profiles.user_id 
      AND portfolios.is_published = TRUE
    )
  );
