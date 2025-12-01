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

export interface PersonalInfo {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedinUrl: string;
  githubUrl: string;
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

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string | null;
  description: string;
  bullets: string[];
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
  | CustomItem;

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
  githubUrl: "",
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
  {
    id: "neon-minimal",
    name: "Neon Minimal",
    description: "Clean, vertical layout with colorful neon accents",
    previewImageUrl: null,
    category: "modern",
  },
  {
    id: "card-grid",
    name: "Card Grid",
    description: "Sections rendered in stylish glassmorphism cards",
    previewImageUrl: null,
    category: "creative",
  },
];

