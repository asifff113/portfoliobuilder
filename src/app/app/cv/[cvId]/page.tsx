import { notFound } from "next/navigation";
import { getUser, createClient } from "@/lib/supabase/server";
import { CVBuilderWrapper } from "@/features/cv/components/cv-builder-wrapper";

interface CVPageProps {
  params: Promise<{ cvId: string }>;
}

interface CVRow {
  id: string;
  title: string;
  slug: string;
  language: string;
  template_id: string | null;
  theme_id: string | null;
  is_public: boolean;
  last_edited_at: string;
  created_at: string;
}

interface SectionRow {
  id: string;
  cv_id: string;
  type: string;
  title: string;
  order: number;
  is_visible: boolean;
}

interface ItemRow {
  id: string;
  section_id: string;
  order: number;
  data: Record<string, unknown>;
}

interface ProfileRow {
  full_name: string | null;
  headline: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  website: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  bio: string | null;
  avatar_url: string | null;
}

async function getCV(cvId: string, userId: string) {
  const supabase = await createClient();

  // Get CV
  const { data: cv } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", cvId)
    .eq("user_id", userId)
    .single();

  if (!cv) return null;

  // Get sections
  const { data: sections } = await supabase
    .from("cv_sections")
    .select("*")
    .eq("cv_id", cvId)
    .order("order", { ascending: true });

  // Get items for each section
  const typedSections = (sections || []) as SectionRow[];
  const sectionsWithItems = await Promise.all(
    typedSections.map(async (section) => {
      const { data: items } = await supabase
        .from("cv_items")
        .select("*")
        .eq("section_id", section.id)
        .order("order", { ascending: true });

      const typedItems = (items || []) as ItemRow[];
      return {
        ...section,
        items: typedItems.map((item) => ({
          id: item.id,
          ...item.data,
        })),
      };
    })
  );

  // Get profile for personal info
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return {
    cv: cv as CVRow,
    sections: sectionsWithItems,
    profile: profile as ProfileRow | null,
  };
}

export default async function CVPage({ params }: CVPageProps) {
  const { cvId } = await params;
  const user = await getUser();

  if (!user) {
    notFound();
  }

  const data = await getCV(cvId, user.id);

  if (!data) {
    notFound();
  }

  // Transform data for the store
  const cvData = {
    meta: {
      id: data.cv.id,
      title: data.cv.title,
      slug: data.cv.slug,
      language: data.cv.language,
      templateId: data.cv.template_id || "neon-minimal",
      themeId: data.cv.theme_id,
      isPublic: data.cv.is_public,
      lastEditedAt: data.cv.last_edited_at,
      createdAt: data.cv.created_at,
    },
    personalInfo: {
      fullName: data.profile?.full_name || "",
      headline: data.profile?.headline || "",
      email: data.profile?.email || "",
      phone: data.profile?.phone || "",
      location: data.profile?.location || "",
      website: data.profile?.website || "",
      linkedinUrl: data.profile?.linkedin_url || "",
      githubUrl: data.profile?.github_url || "",
      summary: data.profile?.bio || "",
      avatarUrl: data.profile?.avatar_url || null,
    },
    sections: data.sections.map((section) => ({
      id: section.id,
      type: section.type as "experience" | "education" | "skills" | "projects" | "certifications" | "languages" | "awards" | "custom" | "about",
      title: section.title,
      order: section.order,
      isVisible: section.is_visible,
      items: section.items as unknown[],
    })),
  };

  return <CVBuilderWrapper cvId={cvId} initialData={cvData as never} />;
}
