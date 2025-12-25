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
  email?: string;
  avatarUrl?: string | null;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
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
  tags?: string[];
  category?: string;
}

export type PortfolioBlockType =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "custom"
  | "testimonials"
  | "achievements"
  | "timeline"
  | "tech_stack"
  | "services"
  | "social_proof"
  | "gallery"
  | "contact_form"
  | "newsletter"
  | "blog"
  | "cv_section"
  | "skills_radar"
  | "video_hero"
  | "case_study"
  | "press_talks"
  | "playground";

export type BlockBackgroundStyle = "solid" | "gradient" | "transparent" | "mesh";
export type BlockAnimationStyle = "none" | "fade" | "slide" | "scale" | "blur";
export type BlockDensity = "compact" | "normal" | "spacious";

export interface BlockSettings {
  backgroundStyle: BlockBackgroundStyle;
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  animationStyle: BlockAnimationStyle;
  density: BlockDensity;
  accentColor?: string;
}

export const defaultBlockSettings: BlockSettings = {
  backgroundStyle: "transparent",
  animationStyle: "fade",
  density: "normal",
};

export interface PortfolioBlock {
  id: string;
  type: PortfolioBlockType;
  title: string | null;
  content: Record<string, unknown>;
  order: number;
  isVisible: boolean;
  settings?: BlockSettings;
}

// New content types for blocks
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string | null;
  rating?: number;
}

export interface AchievementItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon?: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: "work" | "education" | "project" | "milestone";
}

export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  iconUrl?: string;
  proficiency: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  features: string[];
  ctaText?: string;
  ctaUrl?: string;
  isPopular?: boolean;
}

export interface SocialProofItem {
  id: string;
  type: "logo" | "certification" | "award";
  name: string;
  imageUrl?: string;
  url?: string;
  description?: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  alt?: string;
  projectId?: string;
}

export interface ContactFormSubmission {
  id: string;
  portfolioId: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
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
  {
    id: "neon-cyber",
    name: "Neon Cyber",
    description: "Futuristic dark mode with glitch effects and neon accents",
    layoutType: "neon_cyber",
    previewImageUrl: null,
  },
  {
    id: "minimalist-luxe",
    name: "Minimalist Luxe",
    description: "High-end editorial aesthetic with elegant typography",
    layoutType: "minimal_luxe",
    previewImageUrl: null,
  },
  {
    id: "interactive-grid",
    name: "Interactive Grid",
    description: "Modern bento-box style layout with rich interactivity",
    layoutType: "interactive_grid",
    previewImageUrl: null,
  },
  // New Advanced Templates
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Modern frosted glass aesthetic with blur effects and soft gradients",
    layoutType: "glassmorphism",
    previewImageUrl: null,
  },
  {
    id: "magazine-editorial",
    name: "Magazine Editorial",
    description: "Sophisticated publication style with multi-column layouts and elegant typography",
    layoutType: "magazine_editorial",
    previewImageUrl: null,
  },
  {
    id: "terminal-dev",
    name: "Terminal / Developer",
    description: "CLI aesthetic with typing animations and monospace fonts for developers",
    layoutType: "terminal_dev",
    previewImageUrl: null,
  },
  {
    id: "particle-network",
    name: "Particle Network",
    description: "Interactive particle background with constellation effects",
    layoutType: "particle_network",
    previewImageUrl: null,
  },
  {
    id: "3d-cards",
    name: "3D Cards",
    description: "Parallax scrolling with depth layers and 3D card flip animations",
    layoutType: "3d_cards",
    previewImageUrl: null,
  },
  {
    id: "brutalist",
    name: "Brutalist",
    description: "Bold typography with stark black and white design",
    layoutType: "brutalist",
    previewImageUrl: null,
  },
  {
    id: "retro-vaporwave",
    name: "Retro Vaporwave",
    description: "80s synthwave aesthetics with neon colors and palm trees",
    layoutType: "retro_vaporwave",
    previewImageUrl: null,
  },
  {
    id: "aurora",
    name: "Aurora",
    description: "Animated northern lights background with ethereal vibes",
    layoutType: "aurora",
    previewImageUrl: null,
  },
  {
    id: "holographic",
    name: "Holographic",
    description: "Sci-fi hologram effects with scan lines and glowing cards",
    layoutType: "holographic",
    previewImageUrl: null,
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Code-inspired Japanese aesthetics with syntax highlighting",
    layoutType: "tokyo_night",
    previewImageUrl: null,
  },
  {
    id: "gradient-wave",
    name: "Gradient Wave",
    description: "Animated flowing color waves with vibrant gradients",
    layoutType: "gradient_wave",
    previewImageUrl: null,
  },
  {
    id: "isometric",
    name: "Isometric",
    description: "3D geometric blocks with purple/pink gradient aesthetic",
    layoutType: "isometric",
    previewImageUrl: null,
  },
  {
    id: "noir-film",
    name: "Noir Film",
    description: "Vintage cinema aesthetic with film grain and vignette",
    layoutType: "noir_film",
    previewImageUrl: null,
  },
  {
    id: "cosmic-space",
    name: "Cosmic Space",
    description: "Animated starfield with nebula colors and floating elements",
    layoutType: "cosmic_space",
    previewImageUrl: null,
  },
  {
    id: "newspaper",
    name: "Newspaper",
    description: "Classic newspaper print layout with columns and headlines",
    layoutType: "newspaper",
    previewImageUrl: null,
  },
  {
    id: "origami",
    name: "Origami",
    description: "Japanese paper-folding aesthetic with delicate patterns",
    layoutType: "origami",
    previewImageUrl: null,
  },
  {
    id: "liquid-metal",
    name: "Liquid Metal",
    description: "Chrome mercury effect with reactive metallic surfaces",
    layoutType: "liquid_metal",
    previewImageUrl: null,
  },
];

// Theme presets
export interface ThemePreset {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export const themePresets: ThemePreset[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    primaryColor: "#00f5ff",
    secondaryColor: "#bf00ff",
    accentColor: "#ff00aa",
    backgroundColor: "#0a0a0f",
    textColor: "#ffffff",
  },
  {
    id: "nature",
    name: "Nature",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    accentColor: "#34d399",
    backgroundColor: "#f0fdf4",
    textColor: "#064e3b",
  },
  {
    id: "corporate",
    name: "Corporate",
    primaryColor: "#3b82f6",
    secondaryColor: "#1d4ed8",
    accentColor: "#60a5fa",
    backgroundColor: "#ffffff",
    textColor: "#1e3a5f",
  },
  {
    id: "pastel",
    name: "Pastel Tech",
    primaryColor: "#a78bfa",
    secondaryColor: "#f472b6",
    accentColor: "#67e8f9",
    backgroundColor: "#faf5ff",
    textColor: "#4c1d95",
  },
  {
    id: "midnight",
    name: "Midnight",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#a855f7",
    backgroundColor: "#0f172a",
    textColor: "#e2e8f0",
  },
  {
    id: "sunset",
    name: "Sunset",
    primaryColor: "#f97316",
    secondaryColor: "#ef4444",
    accentColor: "#fbbf24",
    backgroundColor: "#1c1917",
    textColor: "#fef3c7",
  },
];

