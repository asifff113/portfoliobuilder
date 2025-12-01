/**
 * Portfolio Types
 *
 * Type definitions for portfolio data structures.
 */

export type PortfolioLayoutType =
  | "hero_timeline"
  | "project_grid"
  | "minimal"
  | "creative"
  | "developer";

export interface PortfolioMeta {
  id: string;
  title: string;
  slug: string;
  layoutType: PortfolioLayoutType;
  isPublished: boolean;
  cvId: string | null;
  themeId: string | null;
  customDomain: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioHero {
  headline: string;
  summary: string;
  imageUrl: string | null;
  ctaText: string;
  ctaUrl: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  isFeatured: boolean;
  order: number;
}

export interface PortfolioBlock {
  id: string;
  type: "hero" | "about" | "projects" | "experience" | "skills" | "contact" | "custom";
  title: string | null;
  content: Record<string, unknown>;
  order: number;
  isVisible: boolean;
}

export interface PortfolioData {
  meta: PortfolioMeta;
  hero: PortfolioHero;
  projects: FeaturedProject[];
  blocks: PortfolioBlock[];
}

// Personal info from profile for display
export interface PortfolioProfile {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedinUrl: string;
  githubUrl: string;
  bio: string;
  avatarUrl: string | null;
}

// Full portfolio for public display
export interface PublicPortfolio {
  meta: PortfolioMeta;
  hero: PortfolioHero;
  profile: PortfolioProfile;
  projects: FeaturedProject[];
  blocks: PortfolioBlock[];
}

// Default values
export const defaultPortfolioHero: PortfolioHero = {
  headline: "",
  summary: "",
  imageUrl: null,
  ctaText: "Get in Touch",
  ctaUrl: "",
};

export const defaultPortfolioMeta: Omit<PortfolioMeta, "id" | "createdAt" | "updatedAt"> = {
  title: "My Portfolio",
  slug: "",
  layoutType: "hero_timeline",
  isPublished: false,
  cvId: null,
  themeId: null,
  customDomain: null,
};

export function createDefaultProject(): FeaturedProject {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    imageUrl: null,
    liveUrl: "",
    githubUrl: "",
    techStack: [],
    isFeatured: true,
    order: 0,
  };
}

// Template definitions
export interface PortfolioTemplate {
  id: string;
  name: string;
  description: string;
  layoutType: PortfolioLayoutType;
  previewImageUrl: string | null;
}

export const portfolioTemplates: PortfolioTemplate[] = [
  {
    id: "hero-timeline",
    name: "Hero Timeline",
    description: "Large hero with animated background and experience timeline",
    layoutType: "hero_timeline",
    previewImageUrl: null,
  },
  {
    id: "project-grid",
    name: "Project Grid",
    description: "Card-based project showcase with profile sidebar",
    layoutType: "project_grid",
    previewImageUrl: null,
  },
];

