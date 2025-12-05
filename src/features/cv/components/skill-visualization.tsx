"use client";

/**
 * Skill Visualization Component
 * 
 * Renders skills with visual proficiency indicators:
 * - Progress bars
 * - Radar charts
 * - Grouped by category with color coding
 */

import { useMemo, useState } from "react";
import { BarChart3, PieChart, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SkillItem } from "@/types/cv";
import { cn } from "@/lib/utils";

interface SkillVisualizationProps {
  skills: SkillItem[];
  variant?: "bars" | "radar" | "chips";
  showProficiency?: boolean;
  maxSkillsPerCategory?: number;
}

const proficiencyLabels: Record<number, string> = {
  1: "Beginner",
  2: "Elementary",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Technical: { bg: "bg-cyan-500/20", border: "border-cyan-500/50", text: "text-cyan-400" },
  "Soft Skills": { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-400" },
  Languages: { bg: "bg-green-500/20", border: "border-green-500/50", text: "text-green-400" },
  Tools: { bg: "bg-orange-500/20", border: "border-orange-500/50", text: "text-orange-400" },
  Frameworks: { bg: "bg-pink-500/20", border: "border-pink-500/50", text: "text-pink-400" },
  Design: { bg: "bg-indigo-500/20", border: "border-indigo-500/50", text: "text-indigo-400" },
  Other: { bg: "bg-gray-500/20", border: "border-gray-500/50", text: "text-gray-400" },
};

function getColorForCategory(category: string) {
  return categoryColors[category] || categoryColors.Other;
}

export function SkillVisualization({ 
  skills, 
  variant = "bars",
  showProficiency = true,
  maxSkillsPerCategory = 10,
}: SkillVisualizationProps) {
  const [viewMode, setViewMode] = useState<"bars" | "radar" | "chips">(variant);

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const groups: Record<string, SkillItem[]> = {};
    
    skills.forEach((skill) => {
      const category = skill.category || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(skill);
    });

    // Sort skills within each category by proficiency (descending)
    Object.keys(groups).forEach((category) => {
      groups[category].sort((a, b) => b.proficiency - a.proficiency);
      // Limit skills per category
      groups[category] = groups[category].slice(0, maxSkillsPerCategory);
    });

    return groups;
  }, [skills, maxSkillsPerCategory]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = skills.length;
    const avgProficiency = skills.reduce((sum, s) => sum + s.proficiency, 0) / total || 0;
    const expertCount = skills.filter(s => s.proficiency >= 4).length;
    
    return { total, avgProficiency, expertCount };
  }, [skills]);

  if (skills.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-white/10 p-6 text-center">
        <p className="text-muted-foreground">No skills added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{stats.total} skills</span>
          <span>•</span>
          <span>{stats.expertCount} expert level</span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-7 px-2", viewMode === "bars" && "bg-white/10")}
            onClick={() => setViewMode("bars")}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-7 px-2", viewMode === "radar" && "bg-white/10")}
            onClick={() => setViewMode("radar")}
          >
            <PieChart className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-7 px-2", viewMode === "chips" && "bg-white/10")}
            onClick={() => setViewMode("chips")}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bar View */}
      {viewMode === "bars" && (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const colors = getColorForCategory(category);
            return (
              <div key={category}>
                <h4 className={cn("mb-3 text-sm font-medium", colors.text)}>
                  {category}
                </h4>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground">{skill.name}</span>
                        {showProficiency && (
                          <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                            {proficiencyLabels[skill.proficiency]}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-white/10">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            skill.proficiency === 5 && "bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400",
                            skill.proficiency === 4 && "bg-linear-to-r from-green-400 to-emerald-400",
                            skill.proficiency === 3 && "bg-linear-to-r from-yellow-400 to-orange-400",
                            skill.proficiency === 2 && "bg-linear-to-r from-orange-400 to-red-400",
                            skill.proficiency === 1 && "bg-red-400/50"
                          )}
                          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Radar View - Simplified as a circular representation */}
      {viewMode === "radar" && (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const colors = getColorForCategory(category);
            const avgProficiency = categorySkills.reduce((sum, s) => sum + s.proficiency, 0) / categorySkills.length;
            
            return (
              <div 
                key={category} 
                className={cn(
                  "rounded-xl border p-4",
                  colors.bg,
                  colors.border
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={cn("font-medium", colors.text)}>{category}</h4>
                    <p className="text-xs text-muted-foreground">
                      {categorySkills.length} skills • Avg: {avgProficiency.toFixed(1)}/5
                    </p>
                  </div>
                  <div className="relative h-16 w-16">
                    <svg className="h-16 w-16 -rotate-90 transform">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-white/10"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(avgProficiency / 5) * 176} 176`}
                        className={colors.text}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={cn("text-lg font-bold", colors.text)}>
                        {avgProficiency.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs",
                        colors.bg,
                        colors.text
                      )}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chips View */}
      {viewMode === "chips" && (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const colors = getColorForCategory(category);
            return (
              <div key={category}>
                <h4 className={cn("mb-2 text-sm font-medium", colors.text)}>
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.id}
                      className={cn(
                        "group relative flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all hover:scale-105",
                        colors.bg,
                        colors.border
                      )}
                    >
                      <span className="text-sm text-foreground">{skill.name}</span>
                      {showProficiency && (
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1.5 w-1.5 rounded-full transition-colors",
                                level <= skill.proficiency 
                                  ? colors.text.replace("text-", "bg-")
                                  : "bg-white/20"
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Compact skill display for CV templates
 */
export function SkillChips({ 
  skills, 
  maxDisplay = 20,
  colorful = true,
}: { 
  skills: SkillItem[]; 
  maxDisplay?: number;
  colorful?: boolean;
}) {
  const displaySkills = skills.slice(0, maxDisplay);
  const remaining = skills.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-2">
      {displaySkills.map((skill) => {
        const colors = colorful ? getColorForCategory(skill.category || "Other") : null;
        return (
          <span
            key={skill.id}
            className={cn(
              "rounded-full px-3 py-1 text-sm",
              colorful && colors
                ? cn(colors.bg, colors.text)
                : "bg-white/10 text-white/80"
            )}
          >
            {skill.name}
          </span>
        );
      })}
      {remaining > 0 && (
        <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-muted-foreground">
          +{remaining} more
        </span>
      )}
    </div>
  );
}

/**
 * Skill matrix for detailed display
 */
export function SkillMatrix({ skills }: { skills: SkillItem[] }) {
  const groupedSkills = useMemo(() => {
    const groups: Record<string, SkillItem[]> = {};
    skills.forEach((skill) => {
      const category = skill.category || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(skill);
    });
    return groups;
  }, [skills]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => {
        const colors = getColorForCategory(category);
        return (
          <div 
            key={category}
            className={cn(
              "rounded-lg border p-4",
              colors.bg,
              colors.border
            )}
          >
            <h4 className={cn("mb-3 font-semibold", colors.text)}>{category}</h4>
            <div className="space-y-2">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="text-sm">{skill.name}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          "h-2 w-4 rounded-sm",
                          level <= skill.proficiency
                            ? colors.text.replace("text-", "bg-")
                            : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

