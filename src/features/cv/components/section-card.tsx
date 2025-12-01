"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVStore } from "../store";
import type { CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/types/cv";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  section: CVSection;
  isExpanded: boolean;
  onToggle: () => void;
}

const sectionIcons: Record<string, string> = {
  experience: "💼",
  education: "🎓",
  skills: "⚡",
  projects: "🚀",
  certifications: "📜",
  languages: "🌍",
  awards: "🏆",
  custom: "✨",
  about: "👤",
};

export function SectionCard({ section, isExpanded, onToggle }: SectionCardProps) {
  const { updateSection, deleteSection, toggleSectionVisibility, addItem, updateItem, deleteItem } =
    useCVStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-xl border border-white/5 bg-card/50 transition-all",
        isDragging && "z-50 shadow-xl"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <button
          onClick={onToggle}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <span className="text-xl">{sectionIcons[section.type]}</span>
          <div className="flex-1">
            <h4 className="font-medium">{section.title}</h4>
            <p className="text-xs text-muted-foreground">
              {section.items.length} item{section.items.length !== 1 ? "s" : ""}
            </p>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => toggleSectionVisibility(section.id)}
        >
          {section.isVisible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => deleteSection(section.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-white/5 p-4">
          {/* Section Title Edit */}
          <div className="mb-4 space-y-2">
            <Label>Section Title</Label>
            <Input
              value={section.title}
              onChange={(e) => updateSection(section.id, { title: e.target.value })}
              placeholder="Section title"
            />
          </div>

          {/* Items */}
          <div className="space-y-4">
            {section.items.map((item, index) => (
              <ItemForm
                key={item.id}
                sectionType={section.type}
                item={item as unknown as Record<string, unknown>}
                index={index}
                onUpdate={(updates) => updateItem(section.id, item.id, updates)}
                onDelete={() => deleteItem(section.id, item.id)}
              />
            ))}
          </div>

          {/* Add Item Button */}
          <Button
            variant="outline"
            className="mt-4 w-full border-dashed"
            onClick={() => addItem(section.id)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>
      )}
    </div>
  );
}

// Item Form Component
interface ItemFormProps {
  sectionType: string;
  item: Record<string, unknown>;
  index: number;
  onUpdate: (updates: Record<string, unknown>) => void;
  onDelete: () => void;
}

function ItemForm({ sectionType, item, index, onUpdate, onDelete }: ItemFormProps) {
  return (
    <div className="rounded-lg border border-white/5 bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">Item {index + 1}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {sectionType === "experience" && (
        <ExperienceItemForm item={item as unknown as ExperienceItem} onUpdate={onUpdate} />
      )}
      {sectionType === "education" && (
        <EducationItemForm item={item as unknown as EducationItem} onUpdate={onUpdate} />
      )}
      {sectionType === "skills" && (
        <SkillItemForm item={item as unknown as SkillItem} onUpdate={onUpdate} />
      )}
      {sectionType === "projects" && (
        <ProjectItemForm item={item as unknown as ProjectItem} onUpdate={onUpdate} />
      )}
    </div>
  );
}

// Experience Item Form
function ExperienceItemForm({
  item,
  onUpdate,
}: {
  item: ExperienceItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Company</Label>
          <Input
            value={item.company || ""}
            onChange={(e) => onUpdate({ company: e.target.value })}
            placeholder="Company name"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Role / Title</Label>
          <Input
            value={item.role || ""}
            onChange={(e) => onUpdate({ role: e.target.value })}
            placeholder="Job title"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs">Start Date</Label>
          <Input
            value={item.startDate || ""}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
            placeholder="Jan 2020"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">End Date</Label>
          <Input
            value={item.endDate || ""}
            onChange={(e) => onUpdate({ endDate: e.target.value })}
            placeholder="Present"
            disabled={item.isCurrent}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Location</Label>
          <Input
            value={item.location || ""}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="City, Country"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Description</Label>
        <textarea
          rows={3}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your responsibilities and achievements..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Education Item Form
function EducationItemForm({
  item,
  onUpdate,
}: {
  item: EducationItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Institution</Label>
          <Input
            value={item.institution || ""}
            onChange={(e) => onUpdate({ institution: e.target.value })}
            placeholder="University name"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Degree</Label>
          <Input
            value={item.degree || ""}
            onChange={(e) => onUpdate({ degree: e.target.value })}
            placeholder="Bachelor's, Master's, etc."
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Field of Study</Label>
          <Input
            value={item.fieldOfStudy || ""}
            onChange={(e) => onUpdate({ fieldOfStudy: e.target.value })}
            placeholder="Computer Science"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">GPA (optional)</Label>
          <Input
            value={item.gpa || ""}
            onChange={(e) => onUpdate({ gpa: e.target.value })}
            placeholder="3.8 / 4.0"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Start Date</Label>
          <Input
            value={item.startDate || ""}
            onChange={(e) => onUpdate({ startDate: e.target.value })}
            placeholder="Sep 2016"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">End Date</Label>
          <Input
            value={item.endDate || ""}
            onChange={(e) => onUpdate({ endDate: e.target.value })}
            placeholder="May 2020"
          />
        </div>
      </div>
    </div>
  );
}

// Skill Item Form
function SkillItemForm({
  item,
  onUpdate,
}: {
  item: SkillItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Skill Name</Label>
          <Input
            value={item.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="React, Python, etc."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Category</Label>
          <Input
            value={item.category || ""}
            onChange={(e) => onUpdate({ category: e.target.value })}
            placeholder="Frontend, Backend, etc."
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Proficiency (1-5)</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => onUpdate({ proficiency: level })}
              className={cn(
                "h-8 w-8 rounded-lg border transition-all",
                item.proficiency >= level
                  ? "border-neon-purple bg-neon-purple/20 text-neon-purple"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Project Item Form
function ProjectItemForm({
  item,
  onUpdate,
}: {
  item: ProjectItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Project Title</Label>
        <Input
          value={item.title || ""}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Project name"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Description</Label>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the project..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Live URL</Label>
          <Input
            value={item.liveUrl || ""}
            onChange={(e) => onUpdate({ liveUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">GitHub URL</Label>
          <Input
            value={item.githubUrl || ""}
            onChange={(e) => onUpdate({ githubUrl: e.target.value })}
            placeholder="https://github.com/..."
          />
        </div>
      </div>
    </div>
  );
}

