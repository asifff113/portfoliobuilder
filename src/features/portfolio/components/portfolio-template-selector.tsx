"use client";

import { Layout, LayoutGrid, Sparkles, Zap, Terminal, Layers3, Box, Palette, Mountain, Globe, Code2, Waves, Triangle } from "lucide-react";
import { portfolioTemplates, type PortfolioLayoutType } from "@/types/portfolio";

interface PortfolioTemplateSelectorProps {
  selected: PortfolioLayoutType;
  onSelect: (templateId: string) => void;
}

const templateIcons: Record<PortfolioLayoutType, React.ReactNode> = {
  hero_timeline: <Layout className="h-6 w-6" />,
  project_grid: <LayoutGrid className="h-6 w-6" />,
  minimal: <Layout className="h-6 w-6" />,
  creative: <Sparkles className="h-6 w-6" />,
  developer: <Terminal className="h-6 w-6" />,
  neon_cyber: <Zap className="h-6 w-6" />,
  minimal_luxe: <Palette className="h-6 w-6" />,
  interactive_grid: <LayoutGrid className="h-6 w-6" />,
  glassmorphism: <Layers3 className="h-6 w-6" />,
  magazine_editorial: <Layout className="h-6 w-6" />,
  terminal_dev: <Terminal className="h-6 w-6" />,
  particle_network: <Sparkles className="h-6 w-6" />,
  "3d_cards": <Box className="h-6 w-6" />,
  brutalist: <Layout className="h-6 w-6" />,
  retro_vaporwave: <Mountain className="h-6 w-6" />,
  aurora: <Globe className="h-6 w-6" />,
  holographic: <Sparkles className="h-6 w-6" />,
  tokyo_night: <Code2 className="h-6 w-6" />,
  gradient_wave: <Waves className="h-6 w-6" />,
  isometric: <Triangle className="h-6 w-6" />,
  noir_film: <Layout className="h-6 w-6" />,
  cosmic_space: <Sparkles className="h-6 w-6" />,
  newspaper: <Layout className="h-6 w-6" />,
  origami: <Box className="h-6 w-6" />,
  liquid_metal: <Layers3 className="h-6 w-6" />,
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
                ? "border-cyan-400 bg-linear-to-br from-cyan-500/10 to-purple-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            {/* Icon */}
            <div
              className={`mb-2 inline-flex rounded-lg p-2 ${
                selected === template.layoutType
                  ? "bg-linear-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400"
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

