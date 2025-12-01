"use client";

import { Layout, LayoutGrid } from "lucide-react";
import { portfolioTemplates, type PortfolioLayoutType } from "@/types/portfolio";

interface PortfolioTemplateSelectorProps {
  selected: PortfolioLayoutType;
  onSelect: (templateId: string) => void;
}

const templateIcons: Record<PortfolioLayoutType, React.ReactNode> = {
  hero_timeline: <Layout className="h-6 w-6" />,
  project_grid: <LayoutGrid className="h-6 w-6" />,
  minimal: <Layout className="h-6 w-6" />,
  creative: <Layout className="h-6 w-6" />,
  developer: <Layout className="h-6 w-6" />,
};

export function PortfolioTemplateSelector({
  selected,
  onSelect,
}: PortfolioTemplateSelectorProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-white/70">
        Template Style
      </label>
      <div className="grid grid-cols-2 gap-3">
        {portfolioTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`group relative rounded-xl border p-4 text-left transition-all ${
              selected === template.layoutType
                ? "border-cyan-400 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            {/* Icon */}
            <div
              className={`mb-2 inline-flex rounded-lg p-2 ${
                selected === template.layoutType
                  ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400"
                  : "bg-white/5 text-white/50 group-hover:text-white/70"
              }`}
            >
              {templateIcons[template.layoutType]}
            </div>

            {/* Info */}
            <h4
              className={`font-medium ${
                selected === template.layoutType ? "text-white" : "text-white/80"
              }`}
            >
              {template.name}
            </h4>
            <p className="mt-1 text-xs text-white/50">{template.description}</p>

            {/* Selected indicator */}
            {selected === template.layoutType && (
              <div className="absolute right-3 top-3">
                <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

