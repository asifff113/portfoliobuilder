"use client";

import { forwardRef } from "react";
import { useCVStore } from "../store";
import { NeonMinimalTemplate } from "../templates/neon-minimal";
import { CardGridTemplate } from "../templates/card-grid";
import type { PersonalInfo, CVSection } from "@/types/cv";

interface CVPreviewPanelProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

export const CVPreviewPanel = forwardRef<HTMLDivElement, CVPreviewPanelProps>(
  function CVPreviewPanel({ personalInfo, sections }, ref) {
    const selectedTemplateId = useCVStore((state) => state.selectedTemplateId);

    // Filter only visible sections and sort by order
    const visibleSections = sections
      .filter((s) => s.isVisible)
      .sort((a, b) => a.order - b.order);

    return (
      <div className="p-6">
        <div
          ref={ref}
          className="mx-auto max-w-[800px] rounded-xl bg-white shadow-2xl"
        >
          {selectedTemplateId === "neon-minimal" ? (
            <NeonMinimalTemplate
              personalInfo={personalInfo}
              sections={visibleSections}
            />
          ) : selectedTemplateId === "card-grid" ? (
            <CardGridTemplate
              personalInfo={personalInfo}
              sections={visibleSections}
            />
          ) : (
            <NeonMinimalTemplate
              personalInfo={personalInfo}
              sections={visibleSections}
            />
          )}
        </div>
      </div>
    );
  }
);
