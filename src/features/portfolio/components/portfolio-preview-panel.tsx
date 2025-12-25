"use client";

import { usePortfolioStore } from "../store";
import { HeroTimelineTemplate } from "../templates/hero-timeline";
import { ProjectGridTemplate } from "../templates/project-grid";
import { NeonCyberTemplate } from "../templates/neon-cyber";
import { MinimalistLuxeTemplate } from "../templates/minimalist-luxe";
import { InteractiveGridTemplate } from "../templates/interactive-grid";
import { GlassmorphismTemplate } from "../templates/glassmorphism";
import { MagazineEditorialTemplate } from "../templates/magazine-editorial";
import { TerminalDevTemplate } from "../templates/terminal-dev";
import { ParticleNetworkTemplate } from "../templates/particle-network";
import { ThreeDCardsTemplate } from "../templates/3d-cards";
import { BrutalistTemplate } from "../templates/brutalist";
import { RetroVaporwaveTemplate } from "../templates/retro-vaporwave";
import { AuroraTemplate } from "../templates/aurora";
import { HolographicTemplate } from "../templates/holographic";
import { TokyoNightTemplate } from "../templates/tokyo-night";
import { GradientWaveTemplate } from "../templates/gradient-wave";
import { IsometricTemplate } from "../templates/isometric";
import { NoirFilmTemplate } from "../templates/noir-film";
import { CosmicSpaceTemplate } from "../templates/cosmic-space";
import { NewspaperTemplate } from "../templates/newspaper";
import { OrigamiTemplate } from "../templates/origami";
import { LiquidMetalTemplate } from "../templates/liquid-metal";
import { BlockRenderer } from "./block-renderer";
import type { PortfolioProfile } from "@/types/portfolio";

interface PortfolioPreviewPanelProps {
  profile?: PortfolioProfile | null;
  isFullPreview?: boolean;
}

export function PortfolioPreviewPanel({ profile, isFullPreview = false }: PortfolioPreviewPanelProps) {
  const meta = usePortfolioStore((s) => s.meta);
  const hero = usePortfolioStore((s) => s.hero);
  const projects = usePortfolioStore((s) => s.projects);
  const blocks = usePortfolioStore((s) => s.blocks);

  const heroData = {
    headline: hero.headline || profile?.headline || "Your Title",
    summary: hero.summary || profile?.bio || "",
    imageUrl: hero.imageUrl || profile?.avatarUrl || null,
    ctaText: hero.ctaText || "Get in Touch",
    ctaUrl: hero.ctaUrl || `mailto:${profile?.email || ""}`,
    email: profile?.email || "",
    avatarUrl: hero.imageUrl || profile?.avatarUrl || null,
    socialLinks: {
      github: profile?.githubUrl || "",
      linkedin: profile?.linkedinUrl || "",
    },
  };

  const templateProps = {
    hero: {
      headline: hero.headline || profile?.headline || "Welcome",
      summary: hero.summary || profile?.bio || "",
      imageUrl: hero.imageUrl || profile?.avatarUrl || null,
      ctaText: hero.ctaText || "Get in Touch",
      ctaUrl: hero.ctaUrl || `mailto:${profile?.email || ""}`,
    },
    profile: profile || {
      fullName: "Your Name",
      headline: "Your Title",
      email: "you@example.com",
      phone: "",
      location: "",
      website: "",
      linkedinUrl: "",
      githubUrl: "",
      bio: "",
      avatarUrl: null,
    },
    projects,
    blocks,
  };

  const renderTemplate = () => {
    switch (meta.layoutType) {
      case "hero_timeline":
        return <HeroTimelineTemplate {...templateProps} isPreview />;
      case "project_grid":
        return <ProjectGridTemplate {...templateProps} isPreview />;
      case "neon_cyber":
        return <NeonCyberTemplate {...templateProps} isPreview />;
      case "minimal_luxe":
        return <MinimalistLuxeTemplate {...templateProps} isPreview />;
      case "interactive_grid":
        return <InteractiveGridTemplate {...templateProps} isPreview />;
      case "glassmorphism":
        return <GlassmorphismTemplate {...templateProps} isPreview />;
      case "magazine_editorial":
        return <MagazineEditorialTemplate {...templateProps} isPreview />;
      case "terminal_dev":
        return <TerminalDevTemplate {...templateProps} isPreview />;
      case "particle_network":
        return <ParticleNetworkTemplate hero={heroData} projects={projects} isPreview />;
      case "3d_cards":
        return <ThreeDCardsTemplate hero={heroData} projects={projects} isPreview />;
      case "brutalist":
        return <BrutalistTemplate hero={heroData} projects={projects} isPreview />;
      case "retro_vaporwave":
        return <RetroVaporwaveTemplate hero={heroData} projects={projects} isPreview />;
      case "aurora":
        return <AuroraTemplate hero={heroData} projects={projects} isPreview />;
      case "holographic":
        return <HolographicTemplate hero={heroData} projects={projects} isPreview />;
      case "tokyo_night":
        return <TokyoNightTemplate hero={heroData} projects={projects} isPreview />;
      case "gradient_wave":
        return <GradientWaveTemplate hero={heroData} projects={projects} isPreview />;
      case "isometric":
        return <IsometricTemplate hero={heroData} projects={projects} isPreview />;
      case "noir_film":
        return <NoirFilmTemplate hero={heroData} projects={projects} isPreview />;
      case "cosmic_space":
        return <CosmicSpaceTemplate hero={heroData} projects={projects} isPreview />;
      case "newspaper":
        return <NewspaperTemplate hero={heroData} projects={projects} isPreview />;
      case "origami":
        return <OrigamiTemplate hero={heroData} projects={projects} isPreview />;
      case "liquid_metal":
        return <LiquidMetalTemplate hero={heroData} projects={projects} isPreview />;
      default:
        return <HeroTimelineTemplate {...templateProps} isPreview />;
    }
  };

  // Get visible blocks
  const visibleBlocks = blocks.filter((b) => b.isVisible);

  return (
    <div className="min-h-full">
      {/* Preview header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/70">Live Preview</span>
          <div className="flex items-center gap-2">
            {isFullPreview && (
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                Full Size
              </span>
            )}
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
              {meta.layoutType.replace(/_/g, " ")}
            </span>
            <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
              {visibleBlocks.length} blocks
            </span>
          </div>
        </div>
      </div>

      {/* Template preview */}
      <div className={`p-4 ${isFullPreview ? 'flex justify-center' : ''}`}>
        <div className={`overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-2xl ${
          isFullPreview ? 'w-full max-w-6xl' : ''
        }`}>
          {/* Isolate fixed positioning within this container */}
          <div className="relative overflow-hidden" style={{ contain: 'layout paint', isolation: 'isolate' }}>
            {renderTemplate()}
          </div>

          {/* Render blocks section */}
          {visibleBlocks.length > 0 && (
            <div className="border-t border-white/10 bg-gray-900/50">
              <div className="px-8 py-4 border-b border-white/10">
                <h3 className="text-sm font-medium text-white/50">Content Blocks</h3>
              </div>
              <div className="divide-y divide-white/10">
                {visibleBlocks.map((block) => (
                  <div key={block.id} className="py-6">
                    <BlockRenderer block={block} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
