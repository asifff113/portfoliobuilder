import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { PortfolioBuilderWrapper } from "@/features/portfolio";
import type {
  PortfolioData,
  PortfolioMeta,
  PortfolioHero,
  FeaturedProject,
  PortfolioBlock,
  PortfolioProfile,
  PortfolioLayoutType,
} from "@/types/portfolio";

export const dynamic = "force-dynamic";

interface EditPortfolioPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Fetch portfolio
  const { data: portfolioData, error: portfolioError } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (portfolioError || !portfolioData) {
    notFound();
  }

  // Fetch projects
  const { data: projectsData } = await supabase
    .from("featured_projects")
    .select("*")
    .eq("portfolio_id", id)
    .order("order_index", { ascending: true });

  // Fetch blocks
  const { data: blocksData } = await supabase
    .from("portfolio_blocks")
    .select("*")
    .eq("portfolio_id", id)
    .order("order_index", { ascending: true });

  // Get user profile
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Build portfolio data - cast to proper type
  const portfolio = portfolioData as {
    id: string;
    title: string;
    slug: string;
    layout_type: string;
    is_published: boolean;
    cv_id: string | null;
    theme_id: string | null;
    custom_domain: string | null;
    hero_headline: string | null;
    hero_summary: string | null;
    hero_image_url: string | null;
    created_at: string;
    updated_at: string;
  };

  const meta: PortfolioMeta = {
    id: portfolio.id,
    title: portfolio.title,
    slug: portfolio.slug,
    layoutType: (portfolio.layout_type || "hero_timeline") as PortfolioLayoutType,
    isPublished: portfolio.is_published,
    cvId: portfolio.cv_id,
    themeId: portfolio.theme_id,
    customDomain: portfolio.custom_domain,
    createdAt: portfolio.created_at,
    updatedAt: portfolio.updated_at,
  };

  const hero: PortfolioHero = {
    headline: portfolio.hero_headline || "",
    summary: portfolio.hero_summary || "",
    imageUrl: portfolio.hero_image_url || null,
    ctaText: "Get in Touch",
    ctaUrl: "",
  };

  const projectsList = (projectsData || []) as Array<{
    id: string;
    title: string;
    description: string | null;
    image_url: string | null;
    live_url: string | null;
    github_url: string | null;
    tech_stack: string[];
    is_featured: boolean;
    order: number;
  }>;

  const projects: FeaturedProject[] = projectsList.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description || "",
    imageUrl: p.image_url,
    liveUrl: p.live_url || "",
    githubUrl: p.github_url || "",
    techStack: p.tech_stack || [],
    isFeatured: p.is_featured,
    order: p.order,
  }));

  const blocksList = (blocksData || []) as Array<{
    id: string;
    type: string;
    title: string | null;
    content: Record<string, unknown>;
    order: number;
    is_visible: boolean;
  }>;

  const blocks: PortfolioBlock[] = blocksList.map((b) => ({
    id: b.id,
    type: b.type as PortfolioBlock["type"],
    title: b.title,
    content: b.content || {},
    order: b.order,
    isVisible: b.is_visible,
  }));

  const portfolioBuilderData: PortfolioData = {
    meta,
    hero,
    projects,
    blocks,
  };

  const profileRow = profileData as {
    full_name: string | null;
    headline: string | null;
    phone: string | null;
    location: string | null;
    website_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    bio: string | null;
    avatar_url: string | null;
  } | null;

  const profile: PortfolioProfile | null = profileRow
    ? {
        fullName: profileRow.full_name || "",
        headline: profileRow.headline || "",
        email: user.email || "",
        phone: profileRow.phone || "",
        location: profileRow.location || "",
        website: profileRow.website_url || "",
        linkedinUrl: profileRow.linkedin_url || "",
        githubUrl: profileRow.github_url || "",
        bio: profileRow.bio || "",
        avatarUrl: profileRow.avatar_url || null,
      }
    : null;

  return (
    <PortfolioBuilderWrapper
      portfolioId={id}
      initialData={portfolioBuilderData}
      profile={profile}
    />
  );
}

