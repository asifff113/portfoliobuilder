"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Download, Eye, Settings, Loader2, Check, FileImage, FileText, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCVStore } from "../store";
import { CVEditorPanel } from "./cv-editor-panel";
import { CVPreviewPanel } from "./cv-preview-panel";
import { TemplateSelector } from "./template-selector";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";
import { downloadPDF, exportToPNG } from "@/lib/export";

interface CVBuilderProps {
  isNew?: boolean;
}

export function CVBuilder({ isNew = false }: CVBuilderProps) {
  const router = useRouter();
  const {
    cvId,
    meta,
    personalInfo,
    sections,
    isDirty,
    isSaving,
    lastSavedAt,
    setIsSaving,
    markAsSaved,
    updateMeta,
  } = useCVStore();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Export handlers
  const handleExportPDF = async () => {
    if (!previewRef.current) {
      toast.error("Preview not available");
      return;
    }

    setIsExporting(true);
    try {
      await downloadPDF(previewRef.current, {
        filename: meta.title || "cv",
        format: "a4",
      });
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPNG = async () => {
    if (!previewRef.current) {
      toast.error("Preview not available");
      return;
    }

    setIsExporting(true);
    try {
      await exportToPNG(previewRef.current, {
        filename: meta.title || "cv",
        scale: 2,
      });
      toast.success("PNG exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export PNG");
    } finally {
      setIsExporting(false);
    }
  };

  // Auto-save function
  const saveCV = useCallback(async () => {
    if (!isDirty) return;

    setIsSaving(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Please sign in to save");
        return;
      }

      if (isNew && !cvId) {
        // Create new CV
        const slug = meta.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        // Template ID is stored as a client-side string (e.g., "neon-minimal")
        // The database expects a UUID or null, so we don't send it
        const { data: newCV, error: cvError } = await supabase
          .from("cvs")
          .insert({
            user_id: user.id,
            title: meta.title || "Untitled CV",
            slug: slug || `cv-${Date.now()}`,
            language: meta.language,
            template_id: null, // Client-side templates are stored in local state
            theme_id: meta.themeId || null,
            is_public: meta.isPublic,
          } as never)
          .select()
          .single();

        if (cvError) {
          console.error("Error creating CV:", cvError.message, cvError.details, cvError.hint);
          toast.error(`Failed to create CV: ${cvError.message}`);
          return;
        }

        const typedNewCV = newCV as { id: string };

        // Create sections
        for (const section of sections) {
          const { data: newSection, error: sectionError } = await supabase
            .from("cv_sections")
            .insert({
              cv_id: typedNewCV.id,
              type: section.type,
              title: section.title,
              order: section.order,
              is_visible: section.isVisible,
            } as never)
            .select()
            .single();

          if (sectionError) {
            console.error("Error creating section:", sectionError);
            continue;
          }

          const typedNewSection = newSection as { id: string };

          // Create items for each section
          for (const item of section.items) {
            const { id: _itemId, ...itemData } = item;
            await supabase.from("cv_items").insert({
              section_id: typedNewSection.id,
              order: section.items.indexOf(item),
              data: itemData,
            } as never);
          }
        }

        updateMeta({ id: typedNewCV.id });
        markAsSaved();
        toast.success("CV created successfully!");
        router.replace(`/app/cv/${typedNewCV.id}`);
      } else if (cvId) {
        // Update existing CV
        await supabase
          .from("cvs")
          .update({
            title: meta.title,
            language: meta.language,
            // template_id is stored client-side, not in DB
            theme_id: meta.themeId || null,
            is_public: meta.isPublic,
            last_edited_at: new Date().toISOString(),
          } as never)
          .eq("id", cvId);

        markAsSaved();
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save CV");
    } finally {
      setIsSaving(false);
    }
  }, [
    isDirty,
    isNew,
    cvId,
    meta,
    sections,
    setIsSaving,
    markAsSaved,
    updateMeta,
    router,
  ]);

  // Debounced auto-save
  useEffect(() => {
    if (!isDirty) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      saveCV();
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [isDirty, saveCV]);

  // Keyboard shortcut for save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        saveCV();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [saveCV]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-background/80 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={meta.title}
            onChange={(e) => updateMeta({ title: e.target.value })}
            placeholder="Untitled CV"
            className="border-none bg-transparent text-xl font-semibold outline-none placeholder:text-muted-foreground focus:ring-0"
          />
          {/* Save Status */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isDirty ? (
              <span className="text-neon-orange">Unsaved changes</span>
            ) : lastSavedAt ? (
              <>
                <Check className="h-4 w-4 text-neon-green" />
                <span>Saved</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TemplateSelector />

          <Button variant="outline" size="sm" onClick={saveCV} disabled={isSaving || !isDirty}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-white/10 bg-gray-900">
              <DropdownMenuItem
                onClick={handleExportPDF}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportPNG}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FileImage className="mr-2 h-4 w-4" />
                Export as PNG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Editor */}
        <div className="w-1/2 overflow-y-auto border-r border-white/5 bg-background">
          <CVEditorPanel />
        </div>

        {/* Right Panel - Preview */}
        <div className="w-1/2 overflow-y-auto bg-muted/30">
          <CVPreviewPanel ref={previewRef} personalInfo={personalInfo} sections={sections} />
        </div>
      </div>
    </div>
  );
}

