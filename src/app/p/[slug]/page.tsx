import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { HeroTimelineTemplate } from "@/features/portfolio/templates/hero-timeline";
import { ProjectGridTemplate } from "@/features/portfolio/templates/project-grid";
import type {
  PortfolioHero,
  FeaturedProject,
  PortfolioProfile,
  PortfolioLayoutType,
} from "@/types/portfolio";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PublicPortfolioPageProps {
  params: Promise<{ slug: string }>;
}

// Create a public client for reading published portfolios
function getPublicSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are not set");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function generateMetadata({
  params,
}: PublicPortfolioPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getPublicSupabase();

  const { data: portfolio } = await supabase
    .from("portfolios")
    .select("title, hero_data")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    };
  }

  const heroData = (portfolio.hero_data || {}) as Record<string, unknown>;

  return {
    title: portfolio.title,
    description: (heroData.summary as string) || `${portfolio.title} - Portfolio`,
    openGraph: {
      title: portfolio.title,
      description: (heroData.summary as string) || `${portfolio.title} - Portfolio`,
      type: "website",
    },
  };
}

export default async function PublicPortfolioPage({
  params,
}: PublicPortfolioPageProps) {
  const { slug } = await params;
  const supabase = getPublicSupabase();

  // Fetch published portfolio by slug
  const { data: portfolioData, error: portfolioError } = await supabase
    .from("portfolios")
    .select(`
      *,
      profiles!portfolios_user_id_fkey (
        full_name,
        headline,
        bio,
        phone,
        location,
        website_url,
        linkedin_url,
        github_url,
        avatar_url
      )
    `)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (portfolioError || !portfolioData) {
    notFound();
  }

  // Fetch projects
  const { data: projectsData } = await supabase
    .from("featured_projects")
    .select("*")
    .eq("portfolio_id", portfolioData.id)
    .order("order_index", { ascending: true });

  // Build the data
  const heroData = (portfolioData.hero_data || {}) as Record<string, unknown>;
  const profileRow = portfolioData.profiles as Record<string, unknown> | null;

  const hero: PortfolioHero = {
    headline: (heroData.headline as string) || "",
    summary: (heroData.summary as string) || "",
    imageUrl: (heroData.imageUrl as string) || null,
    ctaText: (heroData.ctaText as string) || "Get in Touch",
    ctaUrl: (heroData.ctaUrl as string) || "",
  };

  const profile: PortfolioProfile = {
    fullName: (profileRow?.full_name as string) || "Anonymous",
    headline: (profileRow?.headline as string) || "",
    email: "", // Don't expose email publicly
    phone: (profileRow?.phone as string) || "",
    location: (profileRow?.location as string) || "",
    website: (profileRow?.website_url as string) || "",
    linkedinUrl: (profileRow?.linkedin_url as string) || "",
    githubUrl: (profileRow?.github_url as string) || "",
    bio: (profileRow?.bio as string) || "",
    avatarUrl: (profileRow?.avatar_url as string) || null,
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

  const layoutType = (portfolioData.layout_type || "hero_timeline") as PortfolioLayoutType;

  const templateProps = {
    hero: {
      headline: hero.headline || profile.headline,
      summary: hero.summary || profile.bio,
      imageUrl: hero.imageUrl || profile.avatarUrl,
      ctaText: hero.ctaText,
      ctaUrl: hero.ctaUrl,
    },
    profile,
    projects,
  };

  return (
    <>
      {layoutType === "hero_timeline" && <HeroTimelineTemplate {...templateProps} />}
      {layoutType === "project_grid" && <ProjectGridTemplate {...templateProps} />}
      {!["hero_timeline", "project_grid"].includes(layoutType) && (
        <HeroTimelineTemplate {...templateProps} />
      )}
    </>
  );
}

