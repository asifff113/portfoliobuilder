"use client";

import { useState } from "react";
import { Settings, ChevronDown, ChevronUp, Palette, Sparkles, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface BlockSettings {
  background: "solid" | "gradient" | "mesh" | "image";
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  backgroundImage?: string;
  accentColor?: string;
  animation: "none" | "fade" | "slide" | "scale";
  density: "compact" | "normal" | "spacious";
  isVisible: boolean;
}

interface BlockSettingsEditorProps {
  settings: BlockSettings;
  onChange: (settings: BlockSettings) => void;
}

const defaultSettings: BlockSettings = {
  background: "solid",
  backgroundColor: "transparent",
  animation: "fade",
  density: "normal",
  isVisible: true,
};

const colorPresets = [
  { color: "#06b6d4", label: "Cyan" },
  { color: "#8b5cf6", label: "Purple" },
  { color: "#f43f5e", label: "Rose" },
  { color: "#10b981", label: "Emerald" },
  { color: "#f59e0b", label: "Amber" },
  { color: "#3b82f6", label: "Blue" },
];

const gradientPresets = [
  { from: "#06b6d4", to: "#8b5cf6", label: "Cyan to Purple" },
  { from: "#f43f5e", to: "#f59e0b", label: "Rose to Amber" },
  { from: "#10b981", to: "#06b6d4", label: "Emerald to Cyan" },
  { from: "#8b5cf6", to: "#ec4899", label: "Purple to Pink" },
  { from: "#1a1a2e", to: "#16213e", label: "Dark Gradient" },
];

export function BlockSettingsEditor({ settings = defaultSettings, onChange }: BlockSettingsEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateSetting = <K extends keyof BlockSettings>(key: K, value: BlockSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Card className="border-white/10 bg-white/5 mt-4">
      <div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 text-white/70">
          <Settings className="h-4 w-4" />
          <span className="text-sm font-medium">Block Settings</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-white/50" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white/50" />
        )}
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 p-4 space-y-5">
          {/* Background Style */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <Palette className="h-4 w-4" />
              Background Style
            </label>
            <div className="flex gap-2">
              {(["solid", "gradient", "mesh", "image"] as const).map((bg) => (
                <button
                  key={bg}
                  onClick={() => updateSetting("background", bg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    settings.background === bg
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                      : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {bg.charAt(0).toUpperCase() + bg.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Presets */}
          {settings.background === "gradient" && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Gradient Preset</label>
              <div className="flex flex-wrap gap-2">
                {gradientPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      updateSetting("gradientFrom", preset.from);
                      updateSetting("gradientTo", preset.to);
                    }}
                    className={`w-12 h-8 rounded-lg transition-transform hover:scale-105 ${
                      settings.gradientFrom === preset.from && settings.gradientTo === preset.to
                        ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900"
                        : ""
                    }`}
                    style={{
                      background: `linear-gradient(135deg, ${preset.from}, ${preset.to})`,
                    }}
                    title={preset.label}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Accent Color</label>
            <div className="flex gap-2">
              {colorPresets.map(({ color, label }) => (
                <button
                  key={color}
                  onClick={() => updateSetting("accentColor", color)}
                  className={`w-8 h-8 rounded-lg transition-transform hover:scale-105 ${
                    settings.accentColor === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  title={label}
                />
              ))}
              <label className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20">
                <input
                  type="color"
                  value={settings.accentColor || "#06b6d4"}
                  onChange={(e) => updateSetting("accentColor", e.target.value)}
                  className="sr-only"
                />
                <span className="text-white/50 text-sm">+</span>
              </label>
            </div>
          </div>

          {/* Animation Style */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <Sparkles className="h-4 w-4" />
              Animation Style
            </label>
            <div className="flex gap-2">
              {(["none", "fade", "slide", "scale"] as const).map((anim) => (
                <button
                  key={anim}
                  onClick={() => updateSetting("animation", anim)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    settings.animation === anim
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {anim.charAt(0).toUpperCase() + anim.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Density */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-white/70 mb-2">
              <LayoutGrid className="h-4 w-4" />
              Density
            </label>
            <div className="flex gap-2">
              {(["compact", "normal", "spacious"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => updateSetting("density", d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    settings.density === d
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
                  }`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Background Image URL */}
          {settings.background === "image" && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Background Image URL</label>
              <input
                type="text"
                value={settings.backgroundImage || ""}
                onChange={(e) => updateSetting("backgroundImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
