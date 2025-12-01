-- ============================================
-- Admin Features Migration
-- Adds admin and ban functionality
-- ============================================

-- Add admin and ban columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS banned_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ban_reason TEXT;

-- Index for quick admin lookups
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = TRUE;
CREATE INDEX IF NOT EXISTS idx_profiles_is_banned ON profiles(is_banned) WHERE is_banned = TRUE;

-- ============================================
-- ADMIN RLS POLICIES
-- Admins can access all data
-- ============================================

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PROFILES: Admin access
-- ============================================

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

-- Admins can update all profiles (for banning, etc.)
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (is_admin());

-- ============================================
-- CVS: Admin access
-- ============================================

-- Admins can view all CVs
CREATE POLICY "Admins can view all CVs"
  ON cvs FOR SELECT
  USING (is_admin());

-- Admins can update all CVs
CREATE POLICY "Admins can update all CVs"
  ON cvs FOR UPDATE
  USING (is_admin());

-- Admins can delete all CVs
CREATE POLICY "Admins can delete all CVs"
  ON cvs FOR DELETE
  USING (is_admin());

-- ============================================
-- CV_SECTIONS: Admin access
-- ============================================

CREATE POLICY "Admins can view all CV sections"
  ON cv_sections FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all CV sections"
  ON cv_sections FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete all CV sections"
  ON cv_sections FOR DELETE
  USING (is_admin());

-- ============================================
-- CV_ITEMS: Admin access
-- ============================================

CREATE POLICY "Admins can view all CV items"
  ON cv_items FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all CV items"
  ON cv_items FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete all CV items"
  ON cv_items FOR DELETE
  USING (is_admin());

-- ============================================
-- PORTFOLIOS: Admin access
-- ============================================

CREATE POLICY "Admins can view all portfolios"
  ON portfolios FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all portfolios"
  ON portfolios FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete all portfolios"
  ON portfolios FOR DELETE
  USING (is_admin());

-- ============================================
-- PORTFOLIO_BLOCKS: Admin access
-- ============================================

CREATE POLICY "Admins can view all portfolio blocks"
  ON portfolio_blocks FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all portfolio blocks"
  ON portfolio_blocks FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete all portfolio blocks"
  ON portfolio_blocks FOR DELETE
  USING (is_admin());

-- ============================================
-- FEATURED_PROJECTS: Admin access
-- ============================================

CREATE POLICY "Admins can view all featured projects"
  ON featured_projects FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can update all featured projects"
  ON featured_projects FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete all featured projects"
  ON featured_projects FOR DELETE
  USING (is_admin());

-- ============================================
-- THEMES: Admin access
-- ============================================

-- Admins can manage all themes including system themes
CREATE POLICY "Admins can view all themes"
  ON themes FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can insert themes"
  ON themes FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update all themes"
  ON themes FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete all themes"
  ON themes FOR DELETE
  USING (is_admin());

-- ============================================
-- CV_TEMPLATES: Admin management
-- ============================================

CREATE POLICY "Admins can insert CV templates"
  ON cv_templates FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update CV templates"
  ON cv_templates FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete CV templates"
  ON cv_templates FOR DELETE
  USING (is_admin());

-- ============================================
-- PORTFOLIO_TEMPLATES: Admin management
-- ============================================

CREATE POLICY "Admins can insert portfolio templates"
  ON portfolio_templates FOR INSERT
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update portfolio templates"
  ON portfolio_templates FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete portfolio templates"
  ON portfolio_templates FOR DELETE
  USING (is_admin());

-- ============================================
-- BANNED USER RESTRICTIONS
-- Banned users cannot create new content
-- ============================================

-- Function to check if user is banned
CREATE OR REPLACE FUNCTION is_banned()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_banned = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing insert policies to check for ban status
-- CVs: Banned users cannot create
DROP POLICY IF EXISTS "Users can insert own CVs" ON cvs;
CREATE POLICY "Users can insert own CVs"
  ON cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id AND NOT is_banned());

-- Portfolios: Banned users cannot create
DROP POLICY IF EXISTS "Users can insert own portfolios" ON portfolios;
CREATE POLICY "Users can insert own portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (auth.uid() = user_id AND NOT is_banned());

-- Themes: Banned users cannot create
DROP POLICY IF EXISTS "Users can insert own themes" ON themes;
CREATE POLICY "Users can insert own themes"
  ON themes FOR INSERT
  WITH CHECK (auth.uid() = user_id AND NOT is_banned());

