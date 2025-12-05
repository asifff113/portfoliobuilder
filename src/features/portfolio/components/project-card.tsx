"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  ChevronDown,
  ChevronUp,
  Trash2,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePortfolioStore } from "../store";
import type { FeaturedProject } from "@/types/portfolio";

interface ProjectCardProps {
  project: FeaturedProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [techInput, setTechInput] = useState("");

  const updateProject = usePortfolioStore((s) => s.updateProject);
  const deleteProject = usePortfolioStore((s) => s.deleteProject);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      const newTech = [...project.techStack, techInput.trim()];
      updateProject(project.id, { techStack: newTech });
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    const newTech = project.techStack.filter((_, i) => i !== index);
    updateProject(project.id, { techStack: newTech });
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="border-white/10 bg-white/5 transition-all hover:border-cyan-400/30"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 p-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab text-white/30 hover:text-white/60 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className="flex-1">
          <input
            type="text"
            value={project.title}
            onChange={(e) => updateProject(project.id, { title: e.target.value })}
            placeholder="Project Title"
            className="w-full bg-transparent text-lg font-semibold text-white placeholder:text-white/30 focus:outline-none"
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white/50 hover:text-white"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteProject(project.id)}
          className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="space-y-4 p-4">
          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                updateProject(project.id, { description: e.target.value })
              }
              placeholder="Describe what this project does..."
              rows={3}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                <ExternalLink className="h-4 w-4" />
                Live URL
              </label>
              <input
                type="url"
                value={project.liveUrl}
                onChange={(e) =>
                  updateProject(project.id, { liveUrl: e.target.value })
                }
                placeholder="https://myproject.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70">
                <Github className="h-4 w-4" />
                GitHub URL
              </label>
              <input
                type="url"
                value={project.githubUrl}
                onChange={(e) =>
                  updateProject(project.id, { githubUrl: e.target.value })
                }
                placeholder="https://github.com/you/project"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Project Image URL
            </label>
            <input
              type="url"
              value={project.imageUrl || ""}
              onChange={(e) =>
                updateProject(project.id, { imageUrl: e.target.value || null })
              }
              placeholder="https://example.com/screenshot.png"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">
              Tech Stack
            </label>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-linear-to-r from-cyan-500/20 to-purple-500/20 px-3 py-1 text-sm text-white/80"
                >
                  {tech}
                  <button
                    onClick={() => handleRemoveTech(index)}
                    className="ml-1 text-white/50 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleAddTech}
                placeholder="Add tech (Enter)"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                style={{ minWidth: "120px" }}
              />
            </div>
          </div>

          {/* Featured toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={project.isFeatured}
                onChange={(e) =>
                  updateProject(project.id, { isFeatured: e.target.checked })
                }
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-white/10 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white/50 after:transition-all after:content-[''] peer-checked:bg-linear-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500 peer-checked:after:translate-x-full peer-checked:after:bg-white peer-focus:outline-none"></div>
            </label>
            <span className="text-sm text-white/70">Featured Project</span>
          </div>
        </div>
      )}
    </Card>
  );
}

