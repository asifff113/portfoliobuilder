/**
 * NeonCV Database Types
 *
 * These types match the Supabase database schema exactly.
 * Generated based on the migration scripts.
 */

// ============================================
// ENUMS
// ============================================

export type CVSectionType =
  | "about"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "awards"
  | "publications"
  | "volunteer"
  | "references"
  | "custom";

export type PortfolioLayoutType =
  | "hero_timeline"
  | "project_grid"
  | "minimal"
  | "creative"
  | "developer"
  | "neon_cyber"
  | "minimal_luxe"
  | "interactive_grid"
  | "glassmorphism"
  | "magazine_editorial"
  | "terminal_dev"
  | "particle_network"
  | "3d_cards"
  | "brutalist"
  | "retro_vaporwave"
  | "aurora"
  | "holographic"
  | "tokyo_night"
  | "gradient_wave"
  | "isometric"
  | "noir_film"
  | "cosmic_space"
  | "newspaper"
  | "origami"
  | "liquid_metal";

export type BackgroundStyle = "solid" | "gradient" | "pattern" | "mesh";

// ============================================
// BASE TYPES
// ============================================

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  headline: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  twitter_url: string | null;
  is_admin: boolean;
  is_banned: boolean;
  banned_at: string | null;
  ban_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface CV {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  language: string;
  template_id: string | null;
  theme_id: string | null;
  is_public: boolean;
  last_edited_at: string;
  created_at: string;
  updated_at: string;
}

export interface CVSection {
  id: string;
  cv_id: string;
  type: CVSectionType;
  title: string;
  order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// CV ITEM TYPES (Per Section)
// ============================================

export interface CVItemBase {
  id: string;
  section_id: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ExperienceItem extends CVItemBase {
  company: string;
  role: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
  bullets: string[];
  tech_stack: string[];
}

export interface EducationItem extends CVItemBase {
  institution: string;
  degree: string;
  field_of_study: string | null;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  gpa: string | null;
  description: string | null;
  achievements: string[];
}

export interface ProjectItem extends CVItemBase {
  title: string;
  description: string | null;
  role: string | null;
  start_date: string | null;
  end_date: string | null;
  tech_stack: string[];
  live_url: string | null;
  github_url: string | null;
  image_url: string | null;
  highlights: string[];
}

export interface SkillItem extends CVItemBase {
  name: string;
  category: string | null;
  proficiency: number; // 1-5 or 1-100
  years_of_experience: number | null;
}

export interface CertificationItem extends CVItemBase {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

export interface LanguageItem extends CVItemBase {
  name: string;
  proficiency: "native" | "fluent" | "advanced" | "intermediate" | "beginner";
}

export interface AwardItem extends CVItemBase {
  title: string;
  issuer: string;
  date: string;
  description: string | null;
}

export interface PublicationItem extends CVItemBase {
  title: string;
  publisher: string;
  date: string;
  url: string | null;
  description: string | null;
}

export interface VolunteerItem extends CVItemBase {
  organization: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string | null;
}

export interface ReferenceItem extends CVItemBase {
  name: string;
  title: string;
  company: string;
  email: string | null;
  phone: string | null;
  relationship: string | null;
}

export interface CustomItem extends CVItemBase {
  title: string;
  subtitle: string | null;
  date: string | null;
  description: string | null;
  bullets: string[];
}

// Union type for all CV items
export type CVItem =
  | ExperienceItem
  | EducationItem
  | ProjectItem
  | SkillItem
  | CertificationItem
  | LanguageItem
  | AwardItem
  | PublicationItem
  | VolunteerItem
  | ReferenceItem
  | CustomItem;

// ============================================
// PORTFOLIO TYPES
// ============================================

export interface Portfolio {
  id: string;
  user_id: string;
  cv_id: string | null;
  title: string;
  slug: string;
  layout_type: PortfolioLayoutType;
  is_published: boolean;
  hero_headline: string | null;
  hero_summary: string | null;
  hero_image_url: string | null;
  theme_id: string | null;
  custom_domain: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioBlock {
  id: string;
  portfolio_id: string;
  type: "hero" | "about" | "projects" | "experience" | "skills" | "contact" | "custom";
  title: string | null;
  content: Record<string, unknown>;
  order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeaturedProject {
  id: string;
  portfolio_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  tech_stack: string[];
  is_featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// ============================================
// THEME TYPES
// ============================================

export interface Theme {
  id: string;
  user_id: string | null; // null for system themes
  name: string;
  is_system: boolean;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_style: BackgroundStyle;
  background_color: string;
  background_gradient: string | null;
  heading_font: string;
  body_font: string;
  border_radius: "none" | "sm" | "md" | "lg" | "xl" | "full";
  shadow_intensity: "none" | "sm" | "md" | "lg";
  created_at: string;
  updated_at: string;
}

// ============================================
// TEMPLATE TYPES
// ============================================

export interface CVTemplate {
  id: string;
  name: string;
  description: string | null;
  preview_image_url: string | null;
  category: "minimal" | "creative" | "professional" | "modern" | "classic";
  is_premium: boolean;
  config: Record<string, unknown>;
  created_at: string;
}

export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string | null;
  preview_image_url: string | null;
  layout_type: PortfolioLayoutType;
  is_premium: boolean;
  config: Record<string, unknown>;
  created_at: string;
}

// ============================================
// DATABASE SCHEMA TYPE (for Supabase client)
// ============================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "user_id" | "created_at">>;
      };
      cvs: {
        Row: CV;
        Insert: Omit<CV, "id" | "created_at" | "updated_at" | "last_edited_at">;
        Update: Partial<Omit<CV, "id" | "user_id" | "created_at">>;
      };
      cv_sections: {
        Row: CVSection;
        Insert: Omit<CVSection, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CVSection, "id" | "cv_id" | "created_at">>;
      };
      cv_items: {
        Row: CVItem;
        Insert: Omit<CVItem, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CVItem, "id" | "section_id" | "created_at">>;
      };
      portfolios: {
        Row: Portfolio;
        Insert: Omit<Portfolio, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Portfolio, "id" | "user_id" | "created_at">>;
      };
      portfolio_blocks: {
        Row: PortfolioBlock;
        Insert: Omit<PortfolioBlock, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<PortfolioBlock, "id" | "portfolio_id" | "created_at">>;
      };
      featured_projects: {
        Row: FeaturedProject;
        Insert: Omit<FeaturedProject, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<FeaturedProject, "id" | "portfolio_id" | "created_at">>;
      };
      themes: {
        Row: Theme;
        Insert: Omit<Theme, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Theme, "id" | "created_at">>;
      };
      cv_templates: {
        Row: CVTemplate;
        Insert: Omit<CVTemplate, "id" | "created_at">;
        Update: Partial<Omit<CVTemplate, "id" | "created_at">>;
      };
      portfolio_templates: {
        Row: PortfolioTemplate;
        Insert: Omit<PortfolioTemplate, "id" | "created_at">;
        Update: Partial<Omit<PortfolioTemplate, "id" | "created_at">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      cv_section_type: CVSectionType;
      portfolio_layout_type: PortfolioLayoutType;
      background_style: BackgroundStyle;
    };
  };
}

// ============================================
// HELPER TYPES
// ============================================

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

