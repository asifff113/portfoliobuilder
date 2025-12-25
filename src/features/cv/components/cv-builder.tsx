"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Download, Loader2, Check, FileImage, FileText, ChevronDown, FileType, FileJson, Upload, PanelLeftClose, PanelLeftOpen, Maximize2, Minimize2 } from "lucide-react";
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
import { AIAssistant } from "./ai-assistant";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { ShareCVDialog } from "./share-cv-dialog";
import { ImportCVDialog } from "./import-cv-dialog";
import { TemplateSettingsPanel } from "./template-settings-panel";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { toast } from "sonner";
import { downloadPDF, exportToPNG, exportToDOCX, downloadCVAsJSON, readCVFromFile } from "@/lib/export";

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
    loadCV,
  } = useCVStore();

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Export handlers
  const handleExportPDF = async () => {
    if (!previewRef.current) {
      toast.error("Preview not available");
      return;
    }

    setIsExporting(true);
    try {
      toast.info("Select 'Save as PDF' in the print dialog", { duration: 5000 });
      await downloadPDF(previewRef.current, {
        filename: meta.title || "cv",
        format: "a4",
      });
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
      toast.error("PNG export failed. Try using PDF export instead.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    try {
      await exportToDOCX(personalInfo, sections, {
        filename: meta.title || "cv",
      });
      toast.success("DOCX exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export DOCX");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    try {
      downloadCVAsJSON(meta, personalInfo, sections, meta.title || "cv");
      toast.success("JSON exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export JSON");
    }
  };

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await readCVFromFile(file);
      if (result.success && result.data) {
        // Load the imported data into the store
        loadCV({
          meta: {
            ...meta,
            title: result.data.meta.title || meta.title,
            language: result.data.meta.language || meta.language,
            templateId: result.data.meta.templateId || meta.templateId,
          },
          personalInfo: result.data.personalInfo,
          sections: result.data.sections,
        });
        toast.success("CV imported successfully!");
      } else {
        toast.error(result.error || "Failed to import CV");
      }
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to import CV");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
        // Generate base slug from title
        const baseSlug = meta.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || `cv-${Date.now()}`;

        // Ensure slug is unique by checking existing CVs
        let slug = baseSlug;
        let counter = 1;
        let isUnique = false;
        const maxAttempts = 100; // Safety limit to prevent infinite loops

        while (!isUnique && counter <= maxAttempts) {
          // Check if a CV with this slug already exists for this user
          const { data: existingCV } = await supabase
            .from("cvs")
            .select("id")
            .eq("user_id", user.id)
            .eq("slug", slug)
            .single();

          if (!existingCV) {
            // Slug is unique, we can use it
            isUnique = true;
          } else {
            // Slug exists, append a number
            counter++;
            slug = `${baseSlug}-${counter}`;
          }
        }

        // Fallback to timestamp-based slug if we couldn't find a unique one
        if (!isUnique) {
          slug = `cv-${Date.now()}`;
        }

        // Template ID is stored as a client-side string (e.g., "neon-minimal")
        // The database expects a UUID or null, so we don't send it
        const { data: newCV, error: cvError } = await supabase
          .from("cvs")
          .insert({
            user_id: user.id,
            title: meta.title || "Untitled CV",
            slug: slug,
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
            const itemData = { ...item };
            delete (itemData as { id?: string }).id;
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
        // Update existing CV metadata
        const { error: cvUpdateError } = await supabase
          .from("cvs")
          .update({
            title: meta.title,
            language: meta.language,
            theme_id: meta.themeId || null,
            is_public: meta.isPublic,
            last_edited_at: new Date().toISOString(),
          } as never)
          .eq("id", cvId);

        if (cvUpdateError) {
          console.error("Error updating CV:", cvUpdateError);
          toast.error("Failed to update CV");
          return;
        }

        // Delete existing sections and items, then recreate them
        // This ensures we handle additions, deletions, and reordering correctly
        const { error: deleteError } = await supabase
          .from("cv_sections")
          .delete()
          .eq("cv_id", cvId);

        if (deleteError) {
          console.error("Error deleting sections:", deleteError);
        }

        // Recreate all sections and items
        for (const section of sections) {
          const { data: newSection, error: sectionError } = await supabase
            .from("cv_sections")
            .insert({
              cv_id: cvId,
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
          for (let i = 0; i < section.items.length; i++) {
            const item = section.items[i];
            const itemData = { ...item } as { id?: string };
            delete itemData.id;
            await supabase.from("cv_items").insert({
              section_id: typedNewSection.id,
              order: i,
              data: itemData,
            } as never);
          }
        }

        markAsSaved();
        toast.success("CV saved successfully!");
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
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'h-[calc(100vh-4rem)]'}`}>
      {/* Top Toolbar */}
      <div className={`flex items-center justify-between border-b border-white/5 bg-background/80 px-2 py-2 backdrop-blur-xl ${isFullscreen ? 'absolute top-0 left-0 right-0 z-10' : ''}`}>
        <div className="flex items-center gap-2">
          {/* Toggle Editor Panel Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
            className="h-8 w-8 shrink-0"
            title={isEditorCollapsed ? "Show Editor" : "Hide Editor"}
          >
            {isEditorCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>

          <input
            type="text"
            value={meta.title}
            onChange={(e) => updateMeta({ title: e.target.value })}
            placeholder="Untitled CV"
            className="w-24 min-w-0 border-none bg-transparent text-base font-semibold outline-none placeholder:text-muted-foreground focus:ring-0 sm:w-auto"
          />
          {/* Save Status */}
          <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isDirty ? (
              <span className="text-neon-orange">Unsaved</span>
            ) : lastSavedAt ? (
              <>
                <Check className="h-3 w-3 text-neon-green" />
                <span>Saved</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <AIAssistant />
          
          <ImportCVDialog />
          
          <TemplateSelector />

          <ShareCVDialog cvId={cvId} />

          <Button variant="outline" size="icon" onClick={saveCV} disabled={isSaving || !isDirty} className="h-8 w-8" title="Save">
            <Save className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" disabled={isExporting} className="h-8 px-2">
                {isExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="ml-1 hidden sm:inline">Export</span>
                <ChevronDown className="ml-1 h-3 w-3" />
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
                onClick={handleExportDOCX}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FileType className="mr-2 h-4 w-4" />
                Export as DOCX
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportPNG}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FileImage className="mr-2 h-4 w-4" />
                Export as PNG
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleExportJSON}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FileJson className="mr-2 h-4 w-4" />
                Export as JSON (Backup)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => fileInputRef.current?.click()}
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Import from JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hidden file input for JSON import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />

          <KeyboardShortcuts />

          <TemplateSettingsPanel />

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className={`flex flex-1 overflow-hidden ${isFullscreen ? 'pt-12' : ''}`}>
        {/* Left Panel - Editor (Collapsible) */}
        <div 
          className={`overflow-y-auto border-r border-white/5 bg-background transition-all duration-300 ease-in-out ${
            isEditorCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-1/2'
          }`}
        >
          <CVEditorPanel />
        </div>

        {/* Right Panel - Preview (Full width when editor collapsed) */}
        <div className={`overflow-y-auto bg-muted/30 transition-all duration-300 ease-in-out ${
          isEditorCollapsed ? 'w-full' : 'w-1/2'
        }`}>
          <CVPreviewPanel 
            ref={previewRef} 
            personalInfo={personalInfo} 
            sections={sections}
            isFullPreview={isEditorCollapsed}
          />
        </div>
      </div>

    </div>
  );
}

