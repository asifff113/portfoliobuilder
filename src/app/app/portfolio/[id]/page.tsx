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

  // Build portfolio data
  const heroData = (portfolioData.hero_data || {}) as Record<string, unknown>;

  const meta: PortfolioMeta = {
    id: portfolioData.id,
    title: portfolioData.title,
    slug: portfolioData.slug,
    layoutType: (portfolioData.layout_type || "hero_timeline") as PortfolioLayoutType,
    isPublished: portfolioData.is_published,
    cvId: portfolioData.cv_id,
    themeId: portfolioData.theme_id,
    customDomain: portfolioData.custom_domain,
    createdAt: portfolioData.created_at,
    updatedAt: portfolioData.updated_at,
  };

  const hero: PortfolioHero = {
    headline: (heroData.headline as string) || "",
    summary: (heroData.summary as string) || "",
    imageUrl: (heroData.imageUrl as string) || null,
    ctaText: (heroData.ctaText as string) || "Get in Touch",
    ctaUrl: (heroData.ctaUrl as string) || "",
  };

  const projects: FeaturedProject[] = (projectsData || []).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description || "",
    imageUrl: p.image_url,
    liveUrl: p.live_url || "",
    githubUrl: p.github_url || "",
    techStack: (p.tech_stack as string[]) || [],
    isFeatured: p.is_featured,
    order: p.order_index,
  }));

  const blocks: PortfolioBlock[] = (blocksData || []).map((b) => ({
    id: b.id,
    type: b.block_type as PortfolioBlock["type"],
    title: b.title,
    content: (b.content as Record<string, unknown>) || {},
    order: b.order_index,
    isVisible: b.is_visible,
  }));

  const portfolioBuilderData: PortfolioData = {
    meta,
    hero,
    projects,
    blocks,
  };

  const profile: PortfolioProfile | null = profileData
    ? {
        fullName: profileData.full_name || "",
        headline: profileData.headline || "",
        email: user.email || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        website: profileData.website_url || "",
        linkedinUrl: profileData.linkedin_url || "",
        githubUrl: profileData.github_url || "",
        bio: profileData.bio || "",
        avatarUrl: profileData.avatar_url || null,
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

