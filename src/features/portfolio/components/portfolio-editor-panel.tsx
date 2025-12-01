"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePortfolioStore } from "../store";
import { HeroForm } from "./hero-form";
import { ProjectCard } from "./project-card";
import { PortfolioTemplateSelector } from "./portfolio-template-selector";
import { portfolioTemplates, type PortfolioProfile } from "@/types/portfolio";

interface PortfolioEditorPanelProps {
  profile?: PortfolioProfile | null;
}

const blockTypes = [
  { type: "about", label: "About", icon: FileText },
  { type: "experience", label: "Experience", icon: Briefcase },
  { type: "skills", label: "Skills", icon: Code2 },
  { type: "contact", label: "Contact", icon: MessageSquare },
  { type: "custom", label: "Custom", icon: Layers },
] as const;

export function PortfolioEditorPanel({ profile }: PortfolioEditorPanelProps) {
  const [activeTab, setActiveTab] = useState("hero");

  const meta = usePortfolioStore((s) => s.meta);
  const projects = usePortfolioStore((s) => s.projects);
  const addProject = usePortfolioStore((s) => s.addProject);
  const reorderProjects = usePortfolioStore((s) => s.reorderProjects);
  const addBlock = usePortfolioStore((s) => s.addBlock);
  const setLayout = usePortfolioStore((s) => s.setLayout);
  const updateMeta = usePortfolioStore((s) => s.updateMeta);

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
    if (template) {
      setLayout(template.layoutType);
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
              <input
                type="text"
                value={meta.slug}
                onChange={(e) =>
                  updateMeta({
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, "-"),
                  })
                }
                placeholder="my-portfolio"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <PortfolioTemplateSelector
          selected={meta.layoutType}
          onSelect={handleTemplateSelect}
        />
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-white/5">
          <TabsTrigger
            value="hero"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Layout className="mr-2 h-4 w-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
          >
            <Layers className="mr-2 h-4 w-4" />
            Projects ({projects.length})
          </TabsTrigger>
          <TabsTrigger
            value="blocks"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20"
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
          <div className="rounded-lg border border-dashed border-white/20 p-6 text-center">
            <p className="mb-4 text-white/50">
              Add content blocks to customize your portfolio
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="neon-gradient">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Block
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-white/10 bg-gray-900">
                {blockTypes.map(({ type, label, icon: Icon }) => (
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

          <p className="text-center text-sm text-white/40">
            Content blocks let you add additional sections like About, Experience, Skills, and more.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

