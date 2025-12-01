"use client";

import { usePortfolioStore } from "../store";
import { HeroTimelineTemplate } from "../templates/hero-timeline";
import { ProjectGridTemplate } from "../templates/project-grid";
import type { PortfolioProfile } from "@/types/portfolio";

interface PortfolioPreviewPanelProps {
  profile?: PortfolioProfile | null;
}

export function PortfolioPreviewPanel({ profile }: PortfolioPreviewPanelProps) {
  const meta = usePortfolioStore((s) => s.meta);
  const hero = usePortfolioStore((s) => s.hero);
  const projects = usePortfolioStore((s) => s.projects);

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
  };

  return (
    <div className="min-h-full">
      {/* Preview header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/40 px-4 py-2 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/70">Live Preview</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/50">
              {meta.layoutType.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Template preview */}
      <div className="p-4">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-950 shadow-2xl">
          {meta.layoutType === "hero_timeline" && (
            <HeroTimelineTemplate {...templateProps} isPreview />
          )}
          {meta.layoutType === "project_grid" && (
            <ProjectGridTemplate {...templateProps} isPreview />
          )}
          {!["hero_timeline", "project_grid"].includes(meta.layoutType) && (
            <HeroTimelineTemplate {...templateProps} isPreview />
          )}
        </div>
      </div>
    </div>
  );
}

