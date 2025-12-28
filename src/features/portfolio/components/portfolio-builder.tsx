"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  EyeOff,
  Save,
  ExternalLink,
  Loader2,
  CheckCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioStore } from "../store";
import { PortfolioEditorPanel } from "./portfolio-editor-panel";
import { PortfolioPreviewPanel } from "./portfolio-preview-panel";
import { ShareDialog } from "./share-dialog";
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
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Generate a unique slug with collision check
  const generateUniqueSlug = useCallback(async (title: string): Promise<string> => {
    const base = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "portfolio";
    let slug = `${base}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Check if slug already exists
    const { data: existing } = await supabase
      .from("portfolios")
      .select("id")
      .eq("slug", slug)
      .single();
    
    // If exists, add timestamp to make it unique
    if (existing) {
      slug = `${base}-${Date.now().toString(36)}`;
    }
    
    return slug;
  }, [supabase]);

  // Save portfolio
  const savePortfolio = useCallback(async () => {
    if (!isDirty && portfolioId) return;

    setIsSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (!portfolioId) {
        // Create new portfolio
        const slug = meta.slug || await generateUniqueSlug(meta.title || "portfolio");
        // Supported layout types in the database - all templates
        const dbSupportedLayouts = [
          "hero_timeline", "project_grid", "minimal", "creative", "developer",
          "neon_cyber", "minimal_luxe", "interactive_grid", "glassmorphism", "magazine_editorial",
          "terminal_dev", "particle_network", "3d_cards", "brutalist", "retro_vaporwave",
          "aurora", "holographic", "tokyo_night", "gradient_wave", "isometric",
          "noir_film", "cosmic_space", "newspaper", "origami", "liquid_metal"
        ];
        const layoutType = dbSupportedLayouts.includes(meta.layoutType) ? meta.layoutType : "hero_timeline";
        
        const { data: newPortfolio, error: createError } = await supabase
          .from("portfolios")
          .insert({
            user_id: user.id,
            title: meta.title || "Untitled Portfolio",
            slug,
            layout_type: layoutType,
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
        // Supported layout types in the database - all templates
        const dbSupportedLayouts2 = [
          "hero_timeline", "project_grid", "minimal", "creative", "developer",
          "neon_cyber", "minimal_luxe", "interactive_grid", "glassmorphism", "magazine_editorial",
          "terminal_dev", "particle_network", "3d_cards", "brutalist", "retro_vaporwave",
          "aurora", "holographic", "tokyo_night", "gradient_wave", "isometric",
          "noir_film", "cosmic_space", "newspaper", "origami", "liquid_metal"
        ];
        const layoutType2 = dbSupportedLayouts2.includes(meta.layoutType) ? meta.layoutType : "hero_timeline";
        
        const { error: updateError } = await supabase
          .from("portfolios")
          .update({
            title: meta.title,
            slug: meta.slug,
            layout_type: layoutType2,
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
      console.error("Failed to save portfolio:", error instanceof Error ? error.message : JSON.stringify(error));
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
    generateUniqueSlug,
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

  // Publish toggle handler - saves directly to database
  const handlePublishToggle = async () => {
    if (!portfolioId) {
      // If no portfolio exists yet, toggle and save normally
      togglePublish();
      setTimeout(savePortfolio, 100);
      return;
    }

    // Directly update the database for immediate effect
    const newPublishState = !meta.isPublished;
    
    try {
      const { error } = await supabase
        .from("portfolios")
        .update({ 
          is_published: newPublishState,
          updated_at: new Date().toISOString(),
        } as never)
        .eq("id", portfolioId);

      if (error) {
        console.error("Failed to update publish status:", error);
        return;
      }

      // Update the local state after successful save
      togglePublish();
    } catch (error) {
      console.error("Failed to toggle publish:", error);
    }
  };

  // View live portfolio
  const viewLive = () => {
    if (meta.slug) {
      window.open(`/p/${meta.slug}`, "_blank");
    }
  };

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-950' : 'h-full'}`}>
      {/* Toolbar */}
      <div className={`border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md ${isFullscreen ? 'absolute top-0 left-0 right-0 z-10' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Toggle Editor Panel Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
              className="h-9 w-9"
              title={isEditorCollapsed ? "Show Editor" : "Hide Editor"}
            >
              {isEditorCollapsed ? (
                <PanelLeftOpen className="h-5 w-5" />
              ) : (
                <PanelLeftClose className="h-5 w-5" />
              )}
            </Button>

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

            {/* Share button */}
            <ShareDialog
              slug={meta.slug || ""}
              title={meta.title || "My Portfolio"}
              isPublished={meta.isPublished}
            />

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

            {/* Fullscreen Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="h-9 w-9"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Split view */}
      <div className={`flex flex-1 overflow-hidden ${isFullscreen ? 'pt-16' : ''}`}>
        {/* Editor panel (Collapsible) */}
        <div className={`overflow-y-auto border-r border-white/10 bg-black/20 p-6 transition-all duration-300 ease-in-out ${
          isEditorCollapsed ? 'w-0 opacity-0 overflow-hidden p-0' : 'w-1/2'
        }`}>
          <PortfolioEditorPanel profile={profile} />
        </div>

        {/* Preview panel (Full width when editor collapsed) */}
        <div className={`overflow-y-auto bg-linear-to-br from-gray-900 via-purple-900/20 to-gray-900 transition-all duration-300 ease-in-out ${
          isEditorCollapsed ? 'w-full' : 'w-1/2'
        }`}>
          <PortfolioPreviewPanel profile={profile} isFullPreview={isEditorCollapsed} />
        </div>
      </div>

    </div>
  );
}

