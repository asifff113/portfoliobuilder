"use client";

import { useState } from "react";
import { Palette, Sparkles, Zap, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { themePresets, type ThemePreset } from "@/types/portfolio";

interface ThemeControlsProps {
  accentColor?: string;
  themePreset?: string;
  motionIntensity?: "none" | "subtle" | "full";
  onChange: (updates: {
    accentColor?: string;
    themePreset?: string;
    motionIntensity?: "none" | "subtle" | "full";
  }) => void;
}

const colorOptions = [
  { color: "#06b6d4", label: "Cyan" },
  { color: "#8b5cf6", label: "Purple" },
  { color: "#f43f5e", label: "Rose" },
  { color: "#10b981", label: "Emerald" },
  { color: "#f59e0b", label: "Amber" },
  { color: "#3b82f6", label: "Blue" },
  { color: "#ec4899", label: "Pink" },
  { color: "#14b8a6", label: "Teal" },
];

const motionOptions = [
  { value: "none" as const, label: "None", icon: Moon, desc: "No animations" },
  { value: "subtle" as const, label: "Subtle", icon: Sun, desc: "Minimal effects" },
  { value: "full" as const, label: "Full", icon: Sparkles, desc: "All animations" },
];

export function ThemeControls({ accentColor = "#06b6d4", themePreset, motionIntensity = "full", onChange }: ThemeControlsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const currentPreset = themePresets.find(p => p.id === themePreset);

  return (
    <Card className="border-white/10 bg-white/5 overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: accentColor + "30" }}
          >
            <Palette className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          <div>
            <p className="font-medium text-white">Theme Controls</p>
            <p className="text-sm text-white/50">
              {currentPreset?.name || "Custom"} • {motionIntensity} motion
            </p>
          </div>
        </div>
        <div 
          className="w-6 h-6 rounded-full border-2 border-white/20"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 p-4 space-y-6">
          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">Accent Color</label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map(({ color, label }) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onChange({ accentColor: color })}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    accentColor === color 
                      ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110" 
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  title={label}
                />
              ))}
              <label className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => onChange({ accentColor: e.target.value })}
                  className="sr-only"
                />
                <span className="text-white/50 text-lg">+</span>
              </label>
            </div>
          </div>

          {/* Theme Presets */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">Theme Presets</label>
            <div className="grid grid-cols-3 gap-2">
              {themePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChange({ 
                    themePreset: preset.id,
                    accentColor: preset.accentColor 
                  })}
                  className={`p-3 rounded-lg border transition-all ${
                    themePreset === preset.id
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div 
                    className="w-full h-8 rounded-md mb-2"
                    style={{ 
                      background: `linear-gradient(135deg, ${preset.primaryColor}, ${preset.accentColor})` 
                    }}
                  />
                  <p className="text-xs font-medium text-white">{preset.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Motion Intensity */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-3">Motion Intensity</label>
            <div className="flex gap-2">
              {motionOptions.map(({ value, label, icon: Icon, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onChange({ motionIntensity: value })}
                  className={`flex-1 p-3 rounded-lg border transition-all ${
                    motionIntensity === value
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <Icon className={`h-5 w-5 mx-auto mb-1 ${motionIntensity === value ? "text-cyan-400" : "text-white/50"}`} />
                  <p className="text-xs font-medium text-white">{label}</p>
                  <p className="text-xs text-white/40">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
