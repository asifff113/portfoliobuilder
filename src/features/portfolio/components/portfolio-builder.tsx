"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  EyeOff,
  Save,
  ExternalLink,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "../store";
import { PortfolioEditorPanel } from "./portfolio-editor-panel";
import { PortfolioPreviewPanel } from "./portfolio-preview-panel";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import type { PortfolioProfile } from "@/types/portfolio";

interface PortfolioBuilderProps {
  profile?: PortfolioProfile | null;
}

export function PortfolioBuilder({ profile }: PortfolioBuilderProps) {
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  const portfolioId = usePortfolioStore((s) => s.portfolioId);
  const meta = usePortfolioStore((s) => s.meta);
  const hero = usePortfolioStore((s) => s.hero);
  const projects = usePortfolioStore((s) => s.projects);
  const blocks = usePortfolioStore((s) => s.blocks);
  const isDirty = usePortfolioStore((s) => s.isDirty);
  const isSaving = usePortfolioStore((s) => s.isSaving);
  const lastSavedAt = usePortfolioStore((s) => s.lastSavedAt);
  const markAsSaved = usePortfolioStore((s) => s.markAsSaved);
  const setIsSaving = usePortfolioStore((s) => s.setIsSaving);
  const togglePublish = usePortfolioStore((s) => s.togglePublish);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate a unique slug
  const generateSlug = useCallback((title: string) => {
    const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return `${base}-${Date.now().toString(36)}`;
  }, []);

  // Save portfolio
  const savePortfolio = useCallback(async () => {
    if (!isDirty && portfolioId) return;

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (!portfolioId) {
        // Create new portfolio
        const slug = meta.slug || generateSlug(meta.title || "portfolio");
        const { data: newPortfolio, error: createError } = await supabase
          .from("portfolios")
          .insert({
            user_id: user.id,
            title: meta.title || "Untitled Portfolio",
            slug,
            layout_type: meta.layoutType,
            is_published: false,
            hero_headline: hero.headline || null,
            hero_summary: hero.summary || null,
            hero_image_url: hero.imageUrl || null,
            theme_id: meta.themeId,
            custom_domain: meta.customDomain,
          } as never)
          .select()
          .single();

        if (createError) throw createError;

        const newPortfolioData = newPortfolio as { id: string };

        // Save projects
        if (projects.length > 0) {
          const projectsToInsert = projects.map((p) => ({
            portfolio_id: newPortfolioData.id,
            title: p.title,
            description: p.description,
            image_url: p.imageUrl,
            live_url: p.liveUrl,
            github_url: p.githubUrl,
            tech_stack: p.techStack,
            is_featured: p.isFeatured,
            order: p.order,
          }));

          await supabase.from("featured_projects").insert(projectsToInsert as never);
        }

        // Save blocks
        if (blocks.length > 0) {
          const blocksToInsert = blocks.map((b) => ({
            portfolio_id: newPortfolioData.id,
            type: b.type,
            title: b.title,
            content: b.content,
            order: b.order,
            is_visible: b.isVisible,
          }));

          await supabase.from("portfolio_blocks").insert(blocksToInsert as never);
        }

        markAsSaved();
        router.replace(`/app/portfolio/${newPortfolioData.id}`);
      } else {
        // Update existing portfolio
        const { error: updateError } = await supabase
          .from("portfolios")
          .update({
            title: meta.title,
            slug: meta.slug,
            layout_type: meta.layoutType,
            is_published: meta.isPublished,
            hero_headline: hero.headline || null,
            hero_summary: hero.summary || null,
            hero_image_url: hero.imageUrl || null,
            theme_id: meta.themeId,
            custom_domain: meta.customDomain,
            updated_at: new Date().toISOString(),
          } as never)
          .eq("id", portfolioId);

        if (updateError) throw updateError;

        // Delete and re-insert projects
        await supabase.from("featured_projects").delete().eq("portfolio_id", portfolioId);
        if (projects.length > 0) {
          const projectsToInsert = projects.map((p) => ({
            portfolio_id: portfolioId,
            title: p.title,
            description: p.description,
            image_url: p.imageUrl,
            live_url: p.liveUrl,
            github_url: p.githubUrl,
            tech_stack: p.techStack,
            is_featured: p.isFeatured,
            order: p.order,
          }));

          await supabase.from("featured_projects").insert(projectsToInsert as never);
        }

        // Delete and re-insert blocks
        await supabase.from("portfolio_blocks").delete().eq("portfolio_id", portfolioId);
        if (blocks.length > 0) {
          const blocksToInsert = blocks.map((b) => ({
            portfolio_id: portfolioId,
            type: b.type,
            title: b.title,
            content: b.content,
            order: b.order,
            is_visible: b.isVisible,
          }));

          await supabase.from("portfolio_blocks").insert(blocksToInsert as never);
        }

        markAsSaved();
      }
    } catch (error) {
      console.error("Failed to save portfolio:", error);
      setIsSaving(false);
    }
  }, [
    isDirty,
    portfolioId,
    meta,
    hero,
    projects,
    blocks,
    supabase,
    markAsSaved,
    setIsSaving,
    generateSlug,
    router,
  ]);

  // Auto-save with debounce
  useEffect(() => {
    if (!isDirty) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      savePortfolio();
    }, 3000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [isDirty, savePortfolio]);

  // Keyboard shortcut: Ctrl/Cmd + S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        savePortfolio();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [savePortfolio]);

  // Publish toggle handler
  const handlePublishToggle = async () => {
    togglePublish();
    // Save immediately after toggle
    setTimeout(savePortfolio, 100);
  };

  // View live portfolio
  const viewLive = () => {
    if (meta.slug) {
      window.open(`/p/${meta.slug}`, "_blank");
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
              Portfolio Builder
            </h1>

            {/* Save status */}
            <div className="flex items-center gap-2 text-sm text-white/50">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : lastSavedAt ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Saved</span>
                </>
              ) : isDirty ? (
                <span className="text-yellow-400">Unsaved changes</span>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Publish toggle */}
            <Button
              variant={meta.isPublished ? "default" : "outline"}
              size="sm"
              onClick={handlePublishToggle}
              className={
                meta.isPublished
                  ? "bg-green-600 hover:bg-green-700"
                  : "border-white/20 hover:border-cyan-400"
              }
            >
              {meta.isPublished ? (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Published
                </>
              ) : (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Publish
                </>
              )}
            </Button>

            {/* View live */}
            {meta.isPublished && meta.slug && (
              <Button
                variant="outline"
                size="sm"
                onClick={viewLive}
                className="border-white/20 hover:border-cyan-400"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Button>
            )}

            {/* Manual save */}
            <Button
              variant="outline"
              size="sm"
              onClick={savePortfolio}
              disabled={isSaving || !isDirty}
              className="border-white/20 hover:border-cyan-400"
            >
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Split view */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor panel */}
        <div className="w-1/2 overflow-y-auto border-r border-white/10 bg-black/20 p-6">
          <PortfolioEditorPanel profile={profile} />
        </div>

        {/* Preview panel */}
        <div className="w-1/2 overflow-y-auto bg-linear-to-br from-gray-900 via-purple-900/20 to-gray-900">
          <PortfolioPreviewPanel profile={profile} />
        </div>
      </div>
    </div>
  );
}

