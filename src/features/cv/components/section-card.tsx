"use client";

import { useState, useEffect } from "react";
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
import type { 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  CertificationItem,
  LanguageItem,
  AwardItem,
  VolunteerItem,
  ReferenceItem,
  PublicationItem,
  InterestItem,
  AboutItem,
  CustomItem,
  PatentItem,
  SpeakingItem,
  TeachingItem,
  CourseItem,
  OpenSourceItem,
  MembershipItem,
} from "@/types/cv";
import { cn } from "@/lib/utils";
import { BulletEditor } from "./bullet-editor";
import { AIBulletGenerator, AIQuickButton, AIInlineHelper } from "./ai-inline-helper";

interface SectionCardProps {
  section: CVSection;
  isExpanded: boolean;
  onToggle: () => void;
}

const sectionIcons: Record<string, string> = {
  about: "👤",
  experience: "💼",
  education: "🎓",
  skills: "⚡",
  projects: "🚀",
  certifications: "📜",
  courses: "📖",
  memberships: "🏛️",
  speaking: "🎤",
  patents: "⚖️",
  publications: "📚",
  teaching: "👨‍🏫",
  opensource: "💻",
  languages: "🌍",
  awards: "🏆",
  volunteer: "🤝",
  references: "📋",
  interests: "🎯",
  custom: "✨",
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
      {sectionType === "certifications" && (
        <CertificationItemForm item={item as unknown as CertificationItem} onUpdate={onUpdate} />
      )}
      {sectionType === "languages" && (
        <LanguageItemForm item={item as unknown as LanguageItem} onUpdate={onUpdate} />
      )}
      {sectionType === "awards" && (
        <AwardItemForm item={item as unknown as AwardItem} onUpdate={onUpdate} />
      )}
      {sectionType === "volunteer" && (
        <VolunteerItemForm item={item as unknown as VolunteerItem} onUpdate={onUpdate} />
      )}
      {sectionType === "references" && (
        <ReferenceItemForm item={item as unknown as ReferenceItem} onUpdate={onUpdate} />
      )}
      {sectionType === "publications" && (
        <PublicationItemForm item={item as unknown as PublicationItem} onUpdate={onUpdate} />
      )}
      {sectionType === "interests" && (
        <InterestItemForm item={item as unknown as InterestItem} onUpdate={onUpdate} />
      )}
      {sectionType === "about" && (
        <AboutItemForm item={item as unknown as AboutItem} onUpdate={onUpdate} />
      )}
      {sectionType === "custom" && (
        <CustomItemForm item={item as unknown as CustomItem} onUpdate={onUpdate} />
      )}
      {sectionType === "patents" && (
        <PatentItemForm item={item as unknown as PatentItem} onUpdate={onUpdate} />
      )}
      {sectionType === "speaking" && (
        <SpeakingItemForm item={item as unknown as SpeakingItem} onUpdate={onUpdate} />
      )}
      {sectionType === "teaching" && (
        <TeachingItemForm item={item as unknown as TeachingItem} onUpdate={onUpdate} />
      )}
      {sectionType === "courses" && (
        <CourseItemForm item={item as unknown as CourseItem} onUpdate={onUpdate} />
      )}
      {sectionType === "opensource" && (
        <OpenSourceItemForm item={item as unknown as OpenSourceItem} onUpdate={onUpdate} />
      )}
      {sectionType === "memberships" && (
        <MembershipItemForm item={item as unknown as MembershipItem} onUpdate={onUpdate} />
      )}
    </div>
  );
}

function CommaSeparatedInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState(value.join(", "));

  useEffect(() => {
    setInputValue(value.join(", "));
  }, [value]);

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => {
        const newValue = inputValue.split(",").map(s => s.trim()).filter(Boolean);
        onChange(newValue);
        setInputValue(newValue.join(", "));
      }}
      placeholder={placeholder}
    />
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
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`current-${item.id}`}
          checked={item.isCurrent}
          onChange={(e) => onUpdate({ isCurrent: e.target.checked, endDate: e.target.checked ? null : item.endDate })}
          className="h-4 w-4 rounded border-white/20"
        />
        <Label htmlFor={`current-${item.id}`} className="text-xs">I currently work here</Label>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Key Achievements & Responsibilities</Label>
          {item.role && item.company && (
            <AIBulletGenerator
              role={item.role}
              company={item.company}
              existingBullets={item.bullets}
              onAddBullets={(bullets) => onUpdate({ bullets: [...(item.bullets || []), ...bullets] })}
            />
          )}
        </div>
        <BulletEditor
          bullets={item.bullets || []}
          onChange={(bullets) => onUpdate({ bullets })}
          placeholder="Add an achievement or responsibility..."
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Tech Stack (comma-separated)</Label>
        <CommaSeparatedInput
          value={item.techStack || []}
          onChange={(techStack) => onUpdate({ techStack })}
          placeholder="React, TypeScript, Node.js"
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
          <div className="flex items-center justify-between">
            <Label className="text-xs">Skill Name</Label>
            <AIInlineHelper
              type="skill"
              context={{ role: item.category || "professional" }}
              onAccept={(skill) => onUpdate({ name: skill })}
              size="icon"
            />
          </div>
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
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          <div className="flex items-center gap-1">
            {item.description && (
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            )}
            {item.title && (
              <AIInlineHelper
                type="description"
                context={{ projectName: item.title }}
                onAccept={(desc) => onUpdate({ description: desc })}
                size="icon"
              />
            )}
          </div>
        </div>
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

// Certification Item Form
function CertificationItemForm({
  item,
  onUpdate,
}: {
  item: CertificationItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Certification Name</Label>
            <AIInlineHelper
              type="text"
              context={{ role: "certification" }}
              onAccept={(name) => onUpdate({ name })}
              size="icon"
            />
          </div>
          <Input
            value={item.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="AWS Solutions Architect"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Issuing Organization</Label>
          <Input
            value={item.issuer || ""}
            onChange={(e) => onUpdate({ issuer: e.target.value })}
            placeholder="Amazon Web Services"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Issue Date</Label>
          <Input
            value={item.issueDate || ""}
            onChange={(e) => onUpdate({ issueDate: e.target.value })}
            placeholder="Jan 2023"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Expiry Date (optional)</Label>
          <Input
            value={item.expiryDate || ""}
            onChange={(e) => onUpdate({ expiryDate: e.target.value })}
            placeholder="Jan 2026"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Credential ID</Label>
          <Input
            value={item.credentialId || ""}
            onChange={(e) => onUpdate({ credentialId: e.target.value })}
            placeholder="ABC123XYZ"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Credential URL</Label>
          <Input
            value={item.credentialUrl || ""}
            onChange={(e) => onUpdate({ credentialUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

// Language Item Form
function LanguageItemForm({
  item,
  onUpdate,
}: {
  item: LanguageItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  const proficiencyLevels = [
    { value: "native", label: "Native" },
    { value: "fluent", label: "Fluent" },
    { value: "advanced", label: "Advanced" },
    { value: "intermediate", label: "Intermediate" },
    { value: "beginner", label: "Beginner" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Language</Label>
          <Input
            value={item.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="English, Spanish, etc."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Proficiency</Label>
          <div className="flex flex-wrap gap-2">
            {proficiencyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => onUpdate({ proficiency: level.value })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs transition-all",
                  item.proficiency === level.value
                    ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                    : "border-white/10 hover:border-white/30"
                )}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Award Item Form
function AwardItemForm({
  item,
  onUpdate,
}: {
  item: AwardItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Award Title</Label>
          <Input
            value={item.title || ""}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Employee of the Year"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Issuing Organization</Label>
          <Input
            value={item.issuer || ""}
            onChange={(e) => onUpdate({ issuer: e.target.value })}
            placeholder="Company Name"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Date</Label>
        <Input
          value={item.date || ""}
          onChange={(e) => onUpdate({ date: e.target.value })}
          placeholder="Dec 2023"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          {item.description && (
            <AIQuickButton
              type="professional"
              currentValue={item.description}
              onUpdate={(desc) => onUpdate({ description: desc })}
            />
          )}
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the award..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Volunteer Item Form
function VolunteerItemForm({
  item,
  onUpdate,
}: {
  item: VolunteerItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Organization</Label>
          <Input
            value={item.organization || ""}
            onChange={(e) => onUpdate({ organization: e.target.value })}
            placeholder="Red Cross"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Role</Label>
          <Input
            value={item.role || ""}
            onChange={(e) => onUpdate({ role: e.target.value })}
            placeholder="Volunteer Coordinator"
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
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          <div className="flex items-center gap-1">
            {item.description && (
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            )}
            {item.role && item.organization && (
              <AIInlineHelper
                type="description"
                context={{ role: item.role, company: item.organization }}
                onAccept={(desc) => onUpdate({ description: desc })}
                size="icon"
              />
            )}
          </div>
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your volunteer work..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Reference Item Form
function ReferenceItemForm({
  item,
  onUpdate,
}: {
  item: ReferenceItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Name</Label>
          <Input
            value={item.name || ""}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="John Smith"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Title</Label>
          <Input
            value={item.title || ""}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Senior Manager"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Company</Label>
          <Input
            value={item.company || ""}
            onChange={(e) => onUpdate({ company: e.target.value })}
            placeholder="Company Name"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Relationship</Label>
          <Input
            value={item.relationship || ""}
            onChange={(e) => onUpdate({ relationship: e.target.value })}
            placeholder="Former Manager"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Email</Label>
          <Input
            value={item.email || ""}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Phone</Label>
          <Input
            value={item.phone || ""}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="+1 234 567 8900"
          />
        </div>
      </div>
    </div>
  );
}

// Publication Item Form
function PublicationItemForm({
  item,
  onUpdate,
}: {
  item: PublicationItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Publication Title</Label>
        <Input
          value={item.title || ""}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Research Paper Title"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Publisher / Journal</Label>
          <Input
            value={item.publisher || ""}
            onChange={(e) => onUpdate({ publisher: e.target.value })}
            placeholder="IEEE, Nature, etc."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Publication Date</Label>
          <Input
            value={item.date || ""}
            onChange={(e) => onUpdate({ date: e.target.value })}
            placeholder="Mar 2023"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">URL</Label>
        <Input
          value={item.url || ""}
          onChange={(e) => onUpdate({ url: e.target.value })}
          placeholder="https://doi.org/..."
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          <div className="flex items-center gap-1">
            {item.description && (
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            )}
            {item.title && (
              <AIInlineHelper
                type="description"
                context={{ projectName: item.title }}
                onAccept={(desc) => onUpdate({ description: desc })}
                size="icon"
              />
            )}
          </div>
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the publication..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Interest Item Form
function InterestItemForm({
  item,
  onUpdate,
}: {
  item: InterestItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Interest / Hobby</Label>
        <Input
          value={item.name || ""}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="Photography, Chess, etc."
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Description (optional)</Label>
        <Input
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description..."
        />
      </div>
    </div>
  );
}

// About Item Form
function AboutItemForm({
  item,
  onUpdate,
}: {
  item: AboutItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">About Me</Label>
          <div className="flex items-center gap-1">
            {item.content && (
              <>
                <AIQuickButton
                  type="professional"
                  currentValue={item.content}
                  onUpdate={(content) => onUpdate({ content })}
                />
                <AIQuickButton
                  type="concise"
                  currentValue={item.content}
                  onUpdate={(content) => onUpdate({ content })}
                />
              </>
            )}
          </div>
        </div>
        <textarea
          rows={4}
          value={item.content || ""}
          onChange={(e) => onUpdate({ content: e.target.value })}
          placeholder="Write a brief introduction about yourself..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Custom Item Form
function CustomItemForm({
  item,
  onUpdate,
}: {
  item: CustomItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Title</Label>
          <Input
            value={item.title || ""}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="Item title"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Subtitle</Label>
          <Input
            value={item.subtitle || ""}
            onChange={(e) => onUpdate({ subtitle: e.target.value })}
            placeholder="Subtitle or organization"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Date (optional)</Label>
        <Input
          value={item.date || ""}
          onChange={(e) => onUpdate({ date: e.target.value })}
          placeholder="Date or date range"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          {item.description && (
            <div className="flex items-center gap-1">
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
              <AIQuickButton
                type="concise"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            </div>
          )}
        </div>
        <textarea
          rows={3}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Description..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// ============================================
// NEW SECTION FORMS
// ============================================

// Patent Item Form
function PatentItemForm({
  item,
  onUpdate,
}: {
  item: PatentItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "issued", label: "Issued" },
    { value: "granted", label: "Granted" },
    { value: "expired", label: "Expired" },
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Patent Title</Label>
        <Input
          value={item.title || ""}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Image Enhancement Method and Apparatus"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Patent Number</Label>
          <Input
            value={item.patentNumber || ""}
            onChange={(e) => onUpdate({ patentNumber: e.target.value })}
            placeholder="US 11,568,519"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Patent Office</Label>
          <Input
            value={item.patentOffice || ""}
            onChange={(e) => onUpdate({ patentOffice: e.target.value })}
            placeholder="USPTO, EPO, WIPO"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Filing Date</Label>
          <Input
            value={item.filingDate || ""}
            onChange={(e) => onUpdate({ filingDate: e.target.value })}
            placeholder="Jan 2022"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Issue Date</Label>
          <Input
            value={item.issueDate || ""}
            onChange={(e) => onUpdate({ issueDate: e.target.value })}
            placeholder="Dec 2023"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Status</Label>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => onUpdate({ status: status.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition-all",
                item.status === status.value
                  ? "border-neon-purple bg-neon-purple/20 text-neon-purple"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Inventors (comma-separated)</Label>
        <Input
          value={(item.inventors || []).join(", ")}
          onChange={(e) => onUpdate({ inventors: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
          placeholder="John Doe, Jane Smith"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Patent URL</Label>
        <Input
          value={item.url || ""}
          onChange={(e) => onUpdate({ url: e.target.value })}
          placeholder="https://patents.google.com/..."
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          {item.description && (
            <AIQuickButton
              type="professional"
              currentValue={item.description}
              onUpdate={(desc) => onUpdate({ description: desc })}
            />
          )}
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the patent..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Speaking Item Form
function SpeakingItemForm({
  item,
  onUpdate,
}: {
  item: SpeakingItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  const typeOptions = [
    { value: "keynote", label: "Keynote" },
    { value: "workshop", label: "Workshop" },
    { value: "panel", label: "Panel" },
    { value: "poster", label: "Poster" },
    { value: "talk", label: "Talk" },
    { value: "webinar", label: "Webinar" },
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Presentation Title</Label>
        <Input
          value={item.title || ""}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Building Scalable AI Systems"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Event Name</Label>
          <Input
            value={item.eventName || ""}
            onChange={(e) => onUpdate({ eventName: e.target.value })}
            placeholder="WACV 2025, TechCrunch Disrupt"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Location</Label>
          <Input
            value={item.location || ""}
            onChange={(e) => onUpdate({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Date</Label>
          <Input
            value={item.date || ""}
            onChange={(e) => onUpdate({ date: e.target.value })}
            placeholder="Mar 2024"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Audience Size</Label>
          <Input
            value={item.audienceSize || ""}
            onChange={(e) => onUpdate({ audienceSize: e.target.value })}
            placeholder="500+ attendees"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Type</Label>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((type) => (
            <button
              key={type.value}
              onClick={() => onUpdate({ type: type.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition-all",
                item.type === type.value
                  ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Slides URL</Label>
          <Input
            value={item.slidesUrl || ""}
            onChange={(e) => onUpdate({ slidesUrl: e.target.value })}
            placeholder="https://speakerdeck.com/..."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Video URL</Label>
          <Input
            value={item.videoUrl || ""}
            onChange={(e) => onUpdate({ videoUrl: e.target.value })}
            placeholder="https://youtube.com/..."
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          <div className="flex items-center gap-1">
            {item.description && (
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            )}
            {item.title && (
              <AIInlineHelper
                type="description"
                context={{ projectName: item.title }}
                onAccept={(desc) => onUpdate({ description: desc })}
                size="icon"
              />
            )}
          </div>
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the presentation..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Teaching Item Form
function TeachingItemForm({
  item,
  onUpdate,
}: {
  item: TeachingItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  const roleOptions = [
    { value: "professor", label: "Professor" },
    { value: "adjunct", label: "Adjunct" },
    { value: "instructor", label: "Instructor" },
    { value: "ta", label: "Teaching Assistant" },
    { value: "guest_lecturer", label: "Guest Lecturer" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Course Name</Label>
          <Input
            value={item.courseName || ""}
            onChange={(e) => onUpdate({ courseName: e.target.value })}
            placeholder="Advanced Computer Vision"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Course Number</Label>
          <Input
            value={item.courseNumber || ""}
            onChange={(e) => onUpdate({ courseNumber: e.target.value })}
            placeholder="CS 231N"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Institution</Label>
        <Input
          value={item.institution || ""}
          onChange={(e) => onUpdate({ institution: e.target.value })}
          placeholder="Stanford University"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Role</Label>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((role) => (
            <button
              key={role.value}
              onClick={() => onUpdate({ role: role.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition-all",
                item.role === role.value
                  ? "border-neon-green bg-neon-green/20 text-neon-green"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs">Semester</Label>
          <Input
            value={item.semester || ""}
            onChange={(e) => onUpdate({ semester: e.target.value })}
            placeholder="Fall, Spring"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Year</Label>
          <Input
            value={item.year || ""}
            onChange={(e) => onUpdate({ year: e.target.value })}
            placeholder="2023"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Student Count</Label>
          <Input
            value={item.studentCount || ""}
            onChange={(e) => onUpdate({ studentCount: e.target.value })}
            placeholder="150 students"
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          <div className="flex items-center gap-1">
            {item.description && (
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            )}
            {item.courseName && (
              <AIInlineHelper
                type="description"
                context={{ projectName: item.courseName }}
                onAccept={(desc) => onUpdate({ description: desc })}
                size="icon"
              />
            )}
          </div>
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe the course and your responsibilities..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Course Item Form
function CourseItemForm({
  item,
  onUpdate,
}: {
  item: CourseItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Course Name</Label>
        <Input
          value={item.courseName || ""}
          onChange={(e) => onUpdate({ courseName: e.target.value })}
          placeholder="Machine Learning Specialization"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Provider</Label>
          <Input
            value={item.provider || ""}
            onChange={(e) => onUpdate({ provider: e.target.value })}
            placeholder="Coursera, Udemy, LinkedIn Learning"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Completion Date</Label>
          <Input
            value={item.completionDate || ""}
            onChange={(e) => onUpdate({ completionDate: e.target.value })}
            placeholder="Jan 2024"
          />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Duration</Label>
          <Input
            value={item.duration || ""}
            onChange={(e) => onUpdate({ duration: e.target.value })}
            placeholder="40 hours"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Credential ID</Label>
          <Input
            value={item.credentialId || ""}
            onChange={(e) => onUpdate({ credentialId: e.target.value })}
            placeholder="ABC123XYZ"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Certificate URL</Label>
        <Input
          value={item.certificateUrl || ""}
          onChange={(e) => onUpdate({ certificateUrl: e.target.value })}
          placeholder="https://coursera.org/verify/..."
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Skills Learned (comma-separated)</Label>
        <Input
          value={(item.skills || []).join(", ")}
          onChange={(e) => onUpdate({ skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
          placeholder="Python, TensorFlow, Deep Learning"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          {item.description && (
            <AIQuickButton
              type="professional"
              currentValue={item.description}
              onUpdate={(desc) => onUpdate({ description: desc })}
            />
          )}
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the course..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Open Source Item Form
function OpenSourceItemForm({
  item,
  onUpdate,
}: {
  item: OpenSourceItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  const roleOptions = [
    { value: "creator", label: "Creator" },
    { value: "maintainer", label: "Maintainer" },
    { value: "core_team", label: "Core Team" },
    { value: "contributor", label: "Contributor" },
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Project Name</Label>
        <Input
          value={item.projectName || ""}
          onChange={(e) => onUpdate({ projectName: e.target.value })}
          placeholder="React, TensorFlow, etc."
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Repository URL</Label>
          <Input
            value={item.repositoryUrl || ""}
            onChange={(e) => onUpdate({ repositoryUrl: e.target.value })}
            placeholder="https://github.com/..."
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Stars (optional)</Label>
          <Input
            value={item.stars || ""}
            onChange={(e) => onUpdate({ stars: e.target.value })}
            placeholder="10k+ stars"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Role</Label>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map((role) => (
            <button
              key={role.value}
              onClick={() => onUpdate({ role: role.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition-all",
                item.role === role.value
                  ? "border-neon-orange bg-neon-orange/20 text-neon-orange"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Technologies (comma-separated)</Label>
        <Input
          value={(item.technologies || []).join(", ")}
          onChange={(e) => onUpdate({ technologies: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
          placeholder="TypeScript, React, Node.js"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Key Contributions</Label>
          {item.contributions && (
            <AIQuickButton
              type="professional"
              currentValue={item.contributions}
              onUpdate={(contrib) => onUpdate({ contributions: contrib })}
            />
          )}
        </div>
        <textarea
          rows={2}
          value={item.contributions || ""}
          onChange={(e) => onUpdate({ contributions: e.target.value })}
          placeholder="Added feature X, fixed bug Y, improved performance by Z%..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          <div className="flex items-center gap-1">
            {item.description && (
              <AIQuickButton
                type="professional"
                currentValue={item.description}
                onUpdate={(desc) => onUpdate({ description: desc })}
              />
            )}
            {item.projectName && (
              <AIInlineHelper
                type="description"
                context={{ projectName: item.projectName }}
                onAccept={(desc) => onUpdate({ description: desc })}
                size="icon"
              />
            )}
          </div>
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Brief description of the project..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

// Membership Item Form
function MembershipItemForm({
  item,
  onUpdate,
}: {
  item: MembershipItem;
  onUpdate: (updates: Record<string, unknown>) => void;
}) {
  const typeOptions = [
    { value: "member", label: "Member" },
    { value: "senior_member", label: "Senior Member" },
    { value: "fellow", label: "Fellow" },
    { value: "board_member", label: "Board Member" },
    { value: "chair", label: "Chair" },
  ];

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Organization Name</Label>
        <Input
          value={item.organization || ""}
          onChange={(e) => onUpdate({ organization: e.target.value })}
          placeholder="IEEE, ACM, AAAI"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Membership Type</Label>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map((type) => (
            <button
              key={type.value}
              onClick={() => onUpdate({ membershipType: type.value })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs transition-all",
                item.membershipType === type.value
                  ? "border-neon-pink bg-neon-pink/20 text-neon-pink"
                  : "border-white/10 hover:border-white/30"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
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
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`current-member-${item.id}`}
          checked={item.isCurrent}
          onChange={(e) => onUpdate({ isCurrent: e.target.checked, endDate: e.target.checked ? null : item.endDate })}
          className="h-4 w-4 rounded border-white/20"
        />
        <Label htmlFor={`current-member-${item.id}`} className="text-xs">Current member</Label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Member ID (optional)</Label>
          <Input
            value={item.memberId || ""}
            onChange={(e) => onUpdate({ memberId: e.target.value })}
            placeholder="123456789"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Website</Label>
          <Input
            value={item.website || ""}
            onChange={(e) => onUpdate({ website: e.target.value })}
            placeholder="https://ieee.org"
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Description</Label>
          {item.description && (
            <AIQuickButton
              type="professional"
              currentValue={item.description}
              onUpdate={(desc) => onUpdate({ description: desc })}
            />
          )}
        </div>
        <textarea
          rows={2}
          value={item.description || ""}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe your involvement..."
          className="flex w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    </div>
  );
}

