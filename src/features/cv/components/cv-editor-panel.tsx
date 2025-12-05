"use client";

import { useId, useState } from "react";
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
import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCVStore } from "../store";
import { PersonalInfoForm } from "./personal-info-form";
import { SectionCard } from "./section-card";
import { CVScoreMeter } from "./cv-score-meter";
import type { CVSectionType } from "@/types/cv";

const sectionTypes: { type: CVSectionType; label: string; icon: string }[] = [
  // Core Sections
  { type: "about", label: "About Me", icon: "👤" },
  { type: "experience", label: "Work Experience", icon: "💼" },
  { type: "education", label: "Education", icon: "🎓" },
  { type: "skills", label: "Skills", icon: "⚡" },
  { type: "projects", label: "Projects", icon: "🚀" },
  // Professional Sections
  { type: "certifications", label: "Certifications", icon: "📜" },
  { type: "courses", label: "Courses & Training", icon: "📖" },
  { type: "memberships", label: "Professional Memberships", icon: "🏛️" },
  { type: "speaking", label: "Speaking & Presentations", icon: "🎤" },
  // Academic Sections
  { type: "patents", label: "Patents", icon: "⚖️" },
  { type: "publications", label: "Publications", icon: "📚" },
  { type: "teaching", label: "Teaching Experience", icon: "👨‍🏫" },
  // Technical Sections
  { type: "opensource", label: "Open Source", icon: "💻" },
  // Other Sections
  { type: "languages", label: "Languages", icon: "🌍" },
  { type: "awards", label: "Awards & Honors", icon: "🏆" },
  { type: "volunteer", label: "Volunteer Experience", icon: "🤝" },
  { type: "references", label: "References", icon: "📋" },
  { type: "interests", label: "Interests & Hobbies", icon: "🎯" },
  { type: "custom", label: "Custom Section", icon: "✨" },
];

export function CVEditorPanel() {
  const { sections, addSection, reorderSections } = useCVStore();
  const [activeSection, setActiveSection] = useState<string | null>("personal");
  const dndContextId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  }

  return (
    <div className="p-6">
      {/* Personal Info Section */}
      <div className="mb-6">
        <button
          onClick={() => setActiveSection(activeSection === "personal" ? null : "personal")}
          className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${
            activeSection === "personal"
              ? "bg-linear-to-r from-neon-purple/20 via-neon-pink/15 to-neon-cyan/10"
              : "bg-muted/50 hover:bg-muted"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-purple/20">
            <User className="h-5 w-5 text-neon-purple" />
          </div>
          <div>
            <h3 className="font-semibold">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Your contact details and summary</p>
          </div>
        </button>

        {activeSection === "personal" && (
          <div className="mt-4 rounded-xl border border-white/5 bg-card/50 p-4">
            <PersonalInfoForm />
          </div>
        )}
      </div>

      {/* Sections */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Sections</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {sectionTypes.map((section) => (
              <DropdownMenuItem
                key={section.type}
                onClick={() => addSection(section.type)}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                isExpanded={activeSection === section.id}
                onToggle={() =>
                  setActiveSection(activeSection === section.id ? null : section.id)
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {sections.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-muted-foreground">
            No sections yet. Add a section to get started.
          </p>
        </div>
      )}

      {/* CV Score Meter */}
      <div className="mt-6">
        <CVScoreMeter />
      </div>
    </div>
  );
}

