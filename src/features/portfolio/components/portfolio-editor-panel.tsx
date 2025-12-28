"use client";

import { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Plus,
  Layout,
  FileText,
  Briefcase,
  Code2,
  MessageSquare,
  Layers,
  ChevronDown,
  ChevronUp,
  Trophy,
  Clock,
  Zap,
  Star,
  Palette,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePortfolioStore } from "../store";
import { HeroForm } from "./hero-form";
import { ProjectCard } from "./project-card";
import { BlockCard } from "./block-card";
import { PortfolioTemplateSelector } from "./portfolio-template-selector";
import { portfolioTemplates, type PortfolioProfile } from "@/types/portfolio";
import { getSupabaseBrowserClient } from "@/lib/supabase";

interface PortfolioEditorPanelProps {
  profile?: PortfolioProfile | null;
}

const blockTypes = [
  { type: "testimonials", label: "Testimonials", icon: Star, category: "content" },
  { type: "achievements", label: "Achievements", icon: Trophy, category: "content" },
  { type: "timeline", label: "Timeline", icon: Clock, category: "content" },
  { type: "tech_stack", label: "Tech Stack", icon: Zap, category: "content" },
  { type: "gallery", label: "Gallery", icon: Layers, category: "content" },
  { type: "services", label: "Services", icon: Briefcase, category: "content" },
  { type: "contact_form", label: "Contact Form", icon: MessageSquare, category: "content" },
  { type: "social_proof", label: "Social Proof", icon: Star, category: "content" },
  { type: "newsletter", label: "Newsletter", icon: MessageSquare, category: "content" },
  { type: "blog", label: "Blog / Notes", icon: FileText, category: "content" },
  { type: "cv_section", label: "CV Download", icon: FileText, category: "content" },
  { type: "skills_radar", label: "Skills Radar", icon: Zap, category: "content" },
  { type: "about", label: "About", icon: FileText, category: "basic" },
  { type: "experience", label: "Experience", icon: Briefcase, category: "basic" },
  { type: "skills", label: "Skills", icon: Code2, category: "basic" },
  { type: "contact", label: "Contact", icon: MessageSquare, category: "basic" },
  { type: "custom", label: "Custom", icon: Layers, category: "basic" },
] as const;

export function PortfolioEditorPanel({ profile }: PortfolioEditorPanelProps) {
  const [activeTab, setActiveTab] = useState("hero");
  const [isThemesOpen, setIsThemesOpen] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const supabase = getSupabaseBrowserClient();

  const meta = usePortfolioStore((s) => s.meta);
  const portfolioId = usePortfolioStore((s) => s.portfolioId);
  const projects = usePortfolioStore((s) => s.projects);
  const blocks = usePortfolioStore((s) => s.blocks);
  const addProject = usePortfolioStore((s) => s.addProject);
  const reorderProjects = usePortfolioStore((s) => s.reorderProjects);
  const addBlock = usePortfolioStore((s) => s.addBlock);
  const setLayout = usePortfolioStore((s) => s.setLayout);
  const updateMeta = usePortfolioStore((s) => s.updateMeta);

  // Check if slug is available
  const checkSlugAvailability = useCallback(async (slug: string) => {
    if (!slug || slug.length < 3) {
      setSlugStatus("idle");
      return;
    }

    setSlugStatus("checking");
    
    try {
      const { data } = await supabase
        .from("portfolios")
        .select("id")
        .eq("slug", slug)
        .neq("id", portfolioId || "")
        .single();

      setSlugStatus(data ? "taken" : "available");
    } catch {
      // No matching record means slug is available
      setSlugStatus("available");
    }
  }, [supabase, portfolioId]);

  // Debounced slug change handler
  const handleSlugChange = useCallback((value: string) => {
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
    updateMeta({ slug: sanitized });
    
    // Check availability after a delay
    const timeout = setTimeout(() => {
      checkSlugAvailability(sanitized);
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [updateMeta, checkSlugAvailability]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleProjectDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);
      reorderProjects(oldIndex, newIndex);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = portfolioTemplates.find((t) => t.id === templateId);
    console.log("[Template Select] Selected template:", templateId, "->", template?.layoutType);
    if (template) {
      setLayout(template.layoutType);
      console.log("[Template Select] Called setLayout with:", template.layoutType);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-white/5 p-4">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-white/70">
              Portfolio Title
            </label>
            <input
              type="text"
              value={meta.title}
              onChange={(e) => updateMeta({ title: e.target.value })}
              placeholder="My Portfolio"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-white/70">
              URL Slug
            </label>
            <div className="flex items-center gap-2">
              <span className="text-white/40">/p/</span>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={meta.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="my-portfolio"
                  className={`w-full rounded-lg border bg-white/5 px-4 py-2 pr-10 text-white placeholder:text-white/30 focus:outline-none ${
                    slugStatus === "taken" 
                      ? "border-red-500 focus:border-red-500" 
                      : slugStatus === "available" 
                      ? "border-green-500 focus:border-green-500"
                      : "border-white/10 focus:border-cyan-400"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {slugStatus === "checking" && (
                    <Loader2 className="h-4 w-4 animate-spin text-white/50" />
                  )}
                  {slugStatus === "available" && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                  {slugStatus === "taken" && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>
            {slugStatus === "taken" && (
              <p className="mt-1 text-xs text-red-400">This URL is already taken</p>
            )}
          </div>
        </div>

        {/* Collapsible Theme Selector */}
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={() => setIsThemesOpen(!isThemesOpen)}
            className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:border-cyan-400/50 hover:bg-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-linear-to-br from-cyan-500/20 to-purple-500/20 p-2">
                <Palette className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <span className="font-medium text-white">Template Style</span>
                <p className="text-xs text-white/50">
                  {portfolioTemplates.find(t => t.layoutType === meta.layoutType)?.name || "Select a template"}
                </p>
              </div>
            </div>
            {isThemesOpen ? (
              <ChevronUp className="h-5 w-5 text-white/50" />
            ) : (
              <ChevronDown className="h-5 w-5 text-white/50" />
            )}
          </button>
          
          {isThemesOpen && (
            <div className="mt-4 animate-in slide-in-from-top-2 duration-200">
              <PortfolioTemplateSelector
                selected={meta.layoutType}
                onSelect={handleTemplateSelect}
              />
            </div>
          )}
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-white/5">
          <TabsTrigger
            value="hero"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Layout className="mr-2 h-4 w-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Layers className="mr-2 h-4 w-4" />
            Projects ({projects.length})
          </TabsTrigger>
          <TabsTrigger
            value="blocks"
            className="data-[state=active]:bg-linear-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            Blocks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-4">
          <HeroForm profile={profile} />
        </TabsContent>

        <TabsContent value="projects" className="mt-4 space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleProjectDragEnd}
          >
            <SortableContext
              items={projects.map((p) => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </SortableContext>
          </DndContext>

          {projects.length === 0 && (
            <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
              <Layers className="mx-auto mb-4 h-12 w-12 text-white/30" />
              <p className="mb-4 text-white/50">No projects yet</p>
              <Button onClick={addProject} className="neon-gradient">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </div>
          )}

          {projects.length > 0 && (
            <Button
              onClick={addProject}
              variant="outline"
              className="w-full border-dashed border-white/20 hover:border-cyan-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          )}
        </TabsContent>

        <TabsContent value="blocks" className="mt-4 space-y-4">
          {/* Added blocks list */}
          {blocks.length > 0 && (
            <div className="space-y-3">
              {blocks.map((block) => (
                <BlockCard key={block.id} block={block} />
              ))}
            </div>
          )}

          {/* Add block button with categorized dropdown */}
          <div className={`rounded-lg border border-dashed border-white/20 p-6 text-center ${blocks.length > 0 ? "mt-4" : ""}`}>
            {blocks.length === 0 && (
              <p className="mb-4 text-white/50">
                Add content blocks to customize your portfolio
              </p>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="neon-gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Block
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-white/10 bg-gray-900 w-48">
                <div className="px-2 py-1.5 text-xs font-medium text-cyan-400">Advanced Blocks</div>
                {blockTypes.filter(b => b.category === "content").map(({ type, label, icon: Icon }) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => addBlock(type)}
                    className="text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="px-2 py-1.5 text-xs font-medium text-white/50">Basic Blocks</div>
                {blockTypes.filter(b => b.category === "basic").map(({ type, label, icon: Icon }) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => addBlock(type)}
                    className="text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {blocks.length === 0 && (
            <p className="text-center text-sm text-white/40">
              Content blocks let you add Testimonials, Achievements, Timeline, and more.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

