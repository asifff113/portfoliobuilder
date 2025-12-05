/**
 * CV Types
 *
 * Type definitions for CV data structures.
 * Compatible with Supabase schema.
 */

// ============================================
// SECTION TYPES
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
  | "volunteer"
  | "references"
  | "publications"
  | "interests"
  | "patents"
  | "speaking"
  | "teaching"
  | "courses"
  | "opensource"
  | "memberships"
  | "custom";

// ============================================
// CV META
// ============================================

export interface CVMeta {
  id: string;
  title: string;
  slug: string;
  language: string;
  templateId: string;
  themeId: string | null;
  isPublic: boolean;
  lastEditedAt: string;
  createdAt: string;
}

// ============================================
// PERSONAL INFO
// ============================================

export interface CustomLink {
  id: string;
  label: string;
  url: string;
}

export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  // Popular social links
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  githubLabel: string;
  twitterUrl: string;
  twitterLabel: string;
  facebookUrl: string;
  facebookLabel: string;
  instagramUrl: string;
  instagramLabel: string;
  // Custom links (unlimited)
  customLinks: CustomLink[];
  // Summary and avatar
  summary: string;
  avatarUrl: string | null;
}

// ============================================
// SECTION ITEMS
// ============================================

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  bullets: string[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  gpa: string;
  description: string;
  achievements: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string | null;
  highlights: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 1-5
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialId: string;
  credentialUrl: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: "native" | "fluent" | "advanced" | "intermediate" | "beginner";
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface VolunteerItem {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  highlights: string[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface PublicationItem {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url: string;
  description: string;
  authors: string[];
}

export interface InterestItem {
  id: string;
  name: string;
  description: string;
}

export interface AboutItem {
  id: string;
  content: string;
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string | null;
  description: string;
  bullets: string[];
}

// ============================================
// NEW SECTION ITEMS
// ============================================

export interface PatentItem {
  id: string;
  title: string;
  patentNumber: string;
  inventors: string[];
  filingDate: string;
  issueDate: string | null;
  status: "pending" | "issued" | "granted" | "expired";
  patentOffice: string; // USPTO, EPO, WIPO, etc.
  description: string;
  url: string;
}

export interface SpeakingItem {
  id: string;
  title: string;
  eventName: string;
  location: string;
  date: string;
  type: "keynote" | "workshop" | "panel" | "poster" | "talk" | "webinar";
  audienceSize: string;
  description: string;
  slidesUrl: string;
  videoUrl: string;
}

export interface TeachingItem {
  id: string;
  institution: string;
  courseName: string;
  courseNumber: string;
  role: "instructor" | "ta" | "guest_lecturer" | "adjunct" | "professor";
  semester: string;
  year: string;
  studentCount: string;
  description: string;
  highlights: string[];
}

export interface CourseItem {
  id: string;
  courseName: string;
  provider: string; // Coursera, Udemy, LinkedIn Learning, etc.
  completionDate: string;
  duration: string;
  certificateUrl: string;
  credentialId: string;
  skills: string[];
  description: string;
}

export interface OpenSourceItem {
  id: string;
  projectName: string;
  repositoryUrl: string;
  role: "maintainer" | "contributor" | "creator" | "core_team";
  technologies: string[];
  contributions: string;
  stars: string;
  description: string;
  highlights: string[];
}

export interface MembershipItem {
  id: string;
  organization: string;
  membershipType: "member" | "fellow" | "senior_member" | "board_member" | "chair";
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  memberId: string;
  description: string;
  website: string;
}

// Union type for all items
export type SectionItem =
  | ExperienceItem
  | EducationItem
  | ProjectItem
  | SkillItem
  | CertificationItem
  | LanguageItem
  | AwardItem
  | VolunteerItem
  | ReferenceItem
  | PublicationItem
  | InterestItem
  | AboutItem
  | CustomItem
  | PatentItem
  | SpeakingItem
  | TeachingItem
  | CourseItem
  | OpenSourceItem
  | MembershipItem;

// ============================================
// SECTIONS
// ============================================

export interface CVSection {
  id: string;
  type: CVSectionType;
  title: string;
  order: number;
  isVisible: boolean;
  items: SectionItem[];
}


// ============================================
// FULL CV
// ============================================

export interface CVData {
  meta: CVMeta;
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

// ============================================
// DEFAULT VALUES
// ============================================

export const defaultPersonalInfo: PersonalInfo = {
  fullName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedinUrl: "",
  linkedinLabel: "LinkedIn",
  githubUrl: "",
  githubLabel: "GitHub",
  twitterUrl: "",
  twitterLabel: "Twitter",
  facebookUrl: "",
  facebookLabel: "Facebook",
  instagramUrl: "",
  instagramLabel: "Instagram",
  customLinks: [],
  summary: "",
  avatarUrl: null,
};

export const defaultCVMeta: Omit<CVMeta, "id" | "createdAt" | "lastEditedAt"> = {
  title: "Untitled CV",
  slug: "",
  language: "en",
  templateId: "neon-minimal",
  themeId: null,
  isPublic: false,
};

export function createDefaultSection(type: CVSectionType, order: number): CVSection {
  const sectionTitles: Record<CVSectionType, string> = {
    about: "About Me",
    experience: "Work Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    certifications: "Certifications",
    languages: "Languages",
    awards: "Awards & Achievements",
    volunteer: "Volunteer Experience",
    references: "References",
    publications: "Publications",
    interests: "Interests & Hobbies",
    patents: "Patents",
    speaking: "Speaking & Presentations",
    teaching: "Teaching Experience",
    courses: "Courses & Training",
    opensource: "Open Source Contributions",
    memberships: "Professional Memberships",
    custom: "Custom Section",
  };

  return {
    id: crypto.randomUUID(),
    type,
    title: sectionTitles[type],
    order,
    isVisible: true,
    items: [],
  };
}

export function createDefaultExperienceItem(): ExperienceItem {
  return {
    id: crypto.randomUUID(),
    company: "",
    role: "",
    location: "",
    startDate: "",
    endDate: null,
    isCurrent: false,
    description: "",
    bullets: [],
    techStack: [],
  };
}

export function createDefaultEducationItem(): EducationItem {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    fieldOfStudy: "",
    location: "",
    startDate: "",
    endDate: null,
    isCurrent: false,
    gpa: "",
    description: "",
    achievements: [],
  };
}

export function createDefaultProjectItem(): ProjectItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    role: "",
    startDate: null,
    endDate: null,
    techStack: [],
    liveUrl: "",
    githubUrl: "",
    imageUrl: null,
    highlights: [],
  };
}

export function createDefaultSkillItem(): SkillItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    category: "Technical",
    proficiency: 3,
  };
}

export function createDefaultCertificationItem(): CertificationItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: null,
    credentialId: "",
    credentialUrl: "",
  };
}

export function createDefaultLanguageItem(): LanguageItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    proficiency: "intermediate",
  };
}

export function createDefaultAwardItem(): AwardItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    issuer: "",
    date: "",
    description: "",
  };
}

export function createDefaultVolunteerItem(): VolunteerItem {
  return {
    id: crypto.randomUUID(),
    organization: "",
    role: "",
    location: "",
    startDate: "",
    endDate: null,
    isCurrent: false,
    description: "",
    highlights: [],
  };
}

export function createDefaultReferenceItem(): ReferenceItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    relationship: "",
  };
}

export function createDefaultPublicationItem(): PublicationItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    publisher: "",
    date: "",
    url: "",
    description: "",
    authors: [],
  };
}

export function createDefaultInterestItem(): InterestItem {
  return {
    id: crypto.randomUUID(),
    name: "",
    description: "",
  };
}

export function createDefaultAboutItem(): AboutItem {
  return {
    id: crypto.randomUUID(),
    content: "",
  };
}

export function createDefaultCustomItem(): CustomItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    subtitle: "",
    date: null,
    description: "",
    bullets: [],
  };
}

// ============================================
// NEW SECTION ITEM CREATORS
// ============================================

export function createDefaultPatentItem(): PatentItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    patentNumber: "",
    inventors: [],
    filingDate: "",
    issueDate: null,
    status: "pending",
    patentOffice: "",
    description: "",
    url: "",
  };
}

export function createDefaultSpeakingItem(): SpeakingItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    eventName: "",
    location: "",
    date: "",
    type: "talk",
    audienceSize: "",
    description: "",
    slidesUrl: "",
    videoUrl: "",
  };
}

export function createDefaultTeachingItem(): TeachingItem {
  return {
    id: crypto.randomUUID(),
    institution: "",
    courseName: "",
    courseNumber: "",
    role: "instructor",
    semester: "",
    year: "",
    studentCount: "",
    description: "",
    highlights: [],
  };
}

export function createDefaultCourseItem(): CourseItem {
  return {
    id: crypto.randomUUID(),
    courseName: "",
    provider: "",
    completionDate: "",
    duration: "",
    certificateUrl: "",
    credentialId: "",
    skills: [],
    description: "",
  };
}

export function createDefaultOpenSourceItem(): OpenSourceItem {
  return {
    id: crypto.randomUUID(),
    projectName: "",
    repositoryUrl: "",
    role: "contributor",
    technologies: [],
    contributions: "",
    stars: "",
    description: "",
    highlights: [],
  };
}

export function createDefaultMembershipItem(): MembershipItem {
  return {
    id: crypto.randomUUID(),
    organization: "",
    membershipType: "member",
    startDate: "",
    endDate: null,
    isCurrent: true,
    memberId: "",
    description: "",
    website: "",
  };
}

// ============================================
// TEMPLATE CONFIG
// ============================================

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  previewImageUrl: string | null;
  category: "minimal" | "creative" | "professional" | "modern" | "classic";
}

export const cvTemplates: CVTemplate[] = [
  // Professional Templates
  {
    id: "titanium-elite",
    name: "Titanium Elite",
    description: "Premium metallic design with sharp angles and business-card header",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "nebula-drift",
    name: "Nebula Drift",
    description: "Futuristic dark mode with glowing accents and space themes",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "vogue-starlight",
    name: "Vogue Starlight",
    description: "High-fashion editorial style with elegant typography",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "sidebar-professional",
    name: "Sidebar Professional",
    description: "Blue sidebar with progress bars, timeline dates, and professional layout",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "modern-gray-sidebar",
    name: "Modern Gray Sidebar",
    description: "Dark gray sidebar with angled headers, serif name, clean professional style",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "pastel-elegant",
    name: "Pastel Elegant",
    description: "Soft pastel blue sidebar, circular photo, prominent About Me section",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "bold-executive",
    name: "Bold Executive",
    description: "Single column with strong header, accent lines, grid skills layout",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "executive-professional",
    name: "Executive Professional",
    description: "Sophisticated design for senior professionals with elegant typography",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean grid-based layout with subtle accents and professional structure",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "two-column",
    name: "Two Column Pro",
    description: "Professional two-column layout with sidebar for skills",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "ats-safe",
    name: "ATS Optimized",
    description: "Clean, ATS-friendly format for maximum compatibility",
    previewImageUrl: null,
    category: "professional",
  },
  // Modern Templates
  {
    id: "neon-minimal",
    name: "Neon Minimal",
    description: "Clean, vertical layout with colorful neon accents",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Code-themed template perfect for software engineers",
    previewImageUrl: null,
    category: "creative",
  },
  // Creative Templates
  {
    id: "card-grid",
    name: "Card Grid",
    description: "Sections rendered in stylish glassmorphism cards",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Elegant timeline-based layout for career progression",
    previewImageUrl: null,
    category: "creative",
  },
  // Minimal Templates
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean, typography-focused design with serif fonts",
    previewImageUrl: null,
    category: "minimal",
  },
  // Academic Templates
  {
    id: "academic-research",
    name: "Academic Research",
    description: "Dense, professional layout for academia with citation formatting",
    previewImageUrl: null,
    category: "professional",
  },
  // Futuristic Templates
  {
    id: "cyberpunk-futuristic",
    name: "Cyberpunk Futuristic",
    description: "High-tech, neon-infused design with hexagonal shapes and holographic effects",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "swiss-minimalist",
    name: "Swiss Minimalist",
    description: "Clean, grid-based layout inspired by Swiss International Typographic Style",
    previewImageUrl: null,
    category: "minimal",
  },
  {
    id: "neo-brutalist",
    name: "Neo-Brutalist",
    description: "Trendy, high-contrast design with thick borders and hard shadows",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    description: "Modern, premium design with frosted glass effects and soft gradients",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Sophisticated, high-fashion magazine layout with elegant typography",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "terminal",
    name: "Terminal / CLI",
    description: "Retro-futuristic command line interface for developers and hackers",
    previewImageUrl: null,
    category: "creative",
  },
  // New unique templates
  {
    id: "infographic",
    name: "Infographic",
    description: "Visual data-driven layout with circular progress rings and timeline bars",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    description: "Asymmetric layout with bold gradients and tag clouds for creative roles",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "tech-gradient",
    name: "Tech Gradient",
    description: "Modern gradient accents with clean layout for tech professionals",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "blueprint-tech",
    name: "Blueprint Tech",
    description: "Blueprint grid aesthetic with numbered badges and tech-forward accents",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "compact-professional",
    name: "Compact Professional",
    description: "Space-efficient dense layout optimized for single-page printing",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "dark-mode-pro",
    name: "Dark Mode Pro",
    description: "Dark theme with neon glow effects for futuristic tech CVs",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "metro-cards",
    name: "Metro Cards",
    description: "Tile-based grid layout with colored section cards",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "quantum-grid",
    name: "Quantum Grid",
    description: "Futuristic grid layout with luminous dividers and data badges",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "lumen-glass",
    name: "Lumen Glass",
    description: "Glassmorphic split layout with soft bloom and premium typography",
    previewImageUrl: null,
    category: "professional",
  },
  // Advanced Futuristic Templates
  {
    id: "holographic-matrix",
    name: "Holographic Matrix",
    description: "Cutting-edge futuristic design with iridescent gradients and matrix grid effects",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    description: "Stunning northern lights theme with flowing organic gradients and frosted glass",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "carbon-fiber",
    name: "Carbon Fiber",
    description: "Premium dark theme with carbon texture patterns and metallic gold accents",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "prismatic-crystal",
    name: "Prismatic Crystal",
    description: "Elegant crystalline design with rainbow light refraction and gemstone aesthetics",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "midnight-cosmos",
    name: "Midnight Cosmos",
    description: "Space-themed design with starfield background and cosmic nebula effects",
    previewImageUrl: null,
    category: "creative",
  },
  // Batch 2 Templates
  {
    id: "crimson-nexus",
    name: "Crimson Nexus",
    description: "Bold professional design with dark theme and strong red accents",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "holo-flow",
    name: "Holo Flow",
    description: "Fluid, holographic design with glassmorphism and soft gradients",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "noir-elegance",
    name: "Noir Elegance",
    description: "Ultra-minimalist, high-contrast monochrome design",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "zen-garden",
    name: "Zen Garden",
    description: "Japanese minimalist aesthetic with serene colors and elegant spacing",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "electric-pulse",
    name: "Electric Pulse",
    description: "High-energy design with vibrant electric blue and neon accents",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "art-deco-luxe",
    name: "Art Deco Luxe",
    description: "1920s glamour with gold geometric patterns and vintage typography",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "cyber-grid",
    name: "Cyber Grid",
    description: "Digital wireframe aesthetic with neon highlights and circuit patterns",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    description: "Elegant dark theme with rose gold accents and luxury feel",
    previewImageUrl: null,
    category: "creative",
  },
  // New Advanced Templates
  {
    id: "obsidian-edge",
    name: "Obsidian Edge",
    description: "Sleek dark obsidian design with sharp geometric edges and gold accents",
    previewImageUrl: null,
    category: "professional",
  },
  {
    id: "neural-network",
    name: "Neural Network",
    description: "Futuristic AI-themed design with node connections and glowing tech aesthetics",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "liquid-mercury",
    name: "Liquid Mercury",
    description: "Fluid metallic chrome design with reflective effects and premium feel",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "neon-horizon",
    name: "Neon Horizon",
    description: "Synthwave retrowave aesthetic with sunset gradients and perspective grid",
    previewImageUrl: null,
    category: "creative",
  },
  {
    id: "frost-minimal",
    name: "Frost Minimal",
    description: "Ultra-clean frosted glass design with icy blue tones and elegant simplicity",
    previewImageUrl: null,
    category: "minimal",
  },
];

