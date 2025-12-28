import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { HeroTimelineTemplate } from "@/features/portfolio/templates/hero-timeline";
import { ProjectGridTemplate } from "@/features/portfolio/templates/project-grid";
import { NeonCyberTemplate } from "@/features/portfolio/templates/neon-cyber";
import { MinimalistLuxeTemplate } from "@/features/portfolio/templates/minimalist-luxe";
import { InteractiveGridTemplate } from "@/features/portfolio/templates/interactive-grid";
import { GlassmorphismTemplate } from "@/features/portfolio/templates/glassmorphism";
import { MagazineEditorialTemplate } from "@/features/portfolio/templates/magazine-editorial";
import { TerminalDevTemplate } from "@/features/portfolio/templates/terminal-dev";
import { ParticleNetworkTemplate } from "@/features/portfolio/templates/particle-network";
import { ThreeDCardsTemplate } from "@/features/portfolio/templates/3d-cards";
import { BrutalistTemplate } from "@/features/portfolio/templates/brutalist";
import { RetroVaporwaveTemplate } from "@/features/portfolio/templates/retro-vaporwave";
import { AuroraTemplate } from "@/features/portfolio/templates/aurora";
import { HolographicTemplate } from "@/features/portfolio/templates/holographic";
import { TokyoNightTemplate } from "@/features/portfolio/templates/tokyo-night";
import { GradientWaveTemplate } from "@/features/portfolio/templates/gradient-wave";
import { IsometricTemplate } from "@/features/portfolio/templates/isometric";
import { NoirFilmTemplate } from "@/features/portfolio/templates/noir-film";
import { CosmicSpaceTemplate } from "@/features/portfolio/templates/cosmic-space";
import { NewspaperTemplate } from "@/features/portfolio/templates/newspaper";
import { OrigamiTemplate } from "@/features/portfolio/templates/origami";
import { LiquidMetalTemplate } from "@/features/portfolio/templates/liquid-metal";
import { AnalyticsTracker } from "./analytics-tracker";
import type {
  PortfolioHero,
  FeaturedProject,
  PortfolioProfile,
  PortfolioLayoutType,
} from "@/types/portfolio";
import type { Metadata } from "next";

// Disable all caching - always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

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
    .select("title, hero_headline, hero_summary")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    };
  }

  return {
    title: portfolio.title,
    description: portfolio.hero_summary || `${portfolio.title} - Portfolio`,
    openGraph: {
      title: portfolio.title,
      description: portfolio.hero_summary || `${portfolio.title} - Portfolio`,
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
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (portfolioError || !portfolioData) {
    notFound();
  }

  // Fetch profile separately (no FK relationship between portfolios and profiles)
  const { data: profileData } = await supabase
    .from("profiles")
    .select(`
      full_name,
      headline,
      bio,
      phone,
      location,
      website_url,
      linkedin_url,
      github_url,
      avatar_url
    `)
    .eq("user_id", portfolioData.user_id)
    .single();

  // Fetch projects
  const { data: projectsData } = await supabase
    .from("featured_projects")
    .select("*")
    .eq("portfolio_id", portfolioData.id)
    .order("order_index", { ascending: true });

  // Build the data
  const profileRow = profileData as Record<string, unknown> | null;

  const hero: PortfolioHero = {
    headline: portfolioData.hero_headline || "",
    summary: portfolioData.hero_summary || "",
    imageUrl: portfolioData.hero_image_url || null,
    ctaText: "Get in Touch",
    ctaUrl: "",
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

  // Render the appropriate template based on layout type
  const renderTemplate = () => {
    switch (layoutType) {
      case "hero_timeline":
        return <HeroTimelineTemplate {...templateProps} />;
      case "project_grid":
        return <ProjectGridTemplate {...templateProps} />;
      case "neon_cyber":
        return <NeonCyberTemplate {...templateProps} />;
      case "minimal_luxe":
        return <MinimalistLuxeTemplate {...templateProps} />;
      case "interactive_grid":
        return <InteractiveGridTemplate {...templateProps} />;
      case "glassmorphism":
        return <GlassmorphismTemplate {...templateProps} />;
      case "magazine_editorial":
        return <MagazineEditorialTemplate {...templateProps} />;
      case "terminal_dev":
        return <TerminalDevTemplate {...templateProps} />;
      case "particle_network":
        return <ParticleNetworkTemplate {...templateProps} />;
      case "3d_cards":
        return <ThreeDCardsTemplate {...templateProps} />;
      case "brutalist":
        return <BrutalistTemplate {...templateProps} />;
      case "retro_vaporwave":
        return <RetroVaporwaveTemplate {...templateProps} />;
      case "aurora":
        return <AuroraTemplate {...templateProps} />;
      case "holographic":
        return <HolographicTemplate {...templateProps} />;
      case "tokyo_night":
        return <TokyoNightTemplate {...templateProps} />;
      case "gradient_wave":
        return <GradientWaveTemplate {...templateProps} />;
      case "isometric":
        return <IsometricTemplate {...templateProps} />;
      case "noir_film":
        return <NoirFilmTemplate {...templateProps} />;
      case "cosmic_space":
        return <CosmicSpaceTemplate {...templateProps} />;
      case "newspaper":
        return <NewspaperTemplate {...templateProps} />;
      case "origami":
        return <OrigamiTemplate {...templateProps} />;
      case "liquid_metal":
        return <LiquidMetalTemplate {...templateProps} />;
      default:
        return <HeroTimelineTemplate {...templateProps} />;
    }
  };

  return (
    <>
      <AnalyticsTracker portfolioId={portfolioData.id} />
      {renderTemplate()}
    </>
  );
}

