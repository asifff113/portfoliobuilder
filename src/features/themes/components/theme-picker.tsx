"use client";

import { useState } from "react";
import { Check, Plus, Trash2, Palette, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useThemeStore } from "../store";
import { presetThemes, type ThemeConfig, type ThemeColors } from "../types";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="h-8 w-8 rounded-lg border border-white/20 shadow-inner"
          style={{ backgroundColor: value }}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white/80">{label}</p>
        <p className="text-xs text-white/40">{value}</p>
      </div>
    </div>
  );
}

export function ThemePicker() {
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const customThemes = useThemeStore((s) => s.customThemes);
  const setTheme = useThemeStore((s) => s.setTheme);
  const addCustomTheme = useThemeStore((s) => s.addCustomTheme);
  const deleteCustomTheme = useThemeStore((s) => s.deleteCustomTheme);
  const applyThemeToDOM = useThemeStore((s) => s.applyThemeToDOM);

  const [isCreating, setIsCreating] = useState(false);
  const [newTheme, setNewTheme] = useState<{
    name: string;
    isDark: boolean;
    colors: ThemeColors;
  }>({
    name: "My Custom Theme",
    isDark: true,
    colors: {
      primary: "#a855f7",
      secondary: "#06b6d4",
      accent: "#ec4899",
      background: "#0a0a0f",
      foreground: "#ffffff",
      muted: "#27272a",
      card: "#18181b",
    },
  });

  const handleCreateTheme = () => {
    const theme: ThemeConfig = {
      id: `custom-${Date.now()}`,
      name: newTheme.name,
      isDark: newTheme.isDark,
      colors: newTheme.colors,
      createdAt: new Date().toISOString(),
    };

    addCustomTheme(theme);
    setTheme(theme);
    setIsCreating(false);
  };

  const updateNewThemeColor = (key: keyof ThemeColors, value: string) => {
    const updatedColors = { ...newTheme.colors, [key]: value };
    setNewTheme((prev) => ({
      ...prev,
      colors: updatedColors,
    }));

    // Live preview
    applyThemeToDOM({
      id: "preview",
      name: newTheme.name,
      isDark: newTheme.isDark,
      colors: updatedColors,
      createdAt: new Date().toISOString(),
    });
  };

  const toggleNewThemeMode = () => {
    const newIsDark = !newTheme.isDark;
    setNewTheme((prev) => ({ ...prev, isDark: newIsDark }));

    // Live preview
    applyThemeToDOM({
      id: "preview",
      name: newTheme.name,
      isDark: newIsDark,
      colors: newTheme.colors,
      createdAt: new Date().toISOString(),
    });
  };

  const handleCancelCreation = () => {
    setIsCreating(false);
    applyThemeToDOM(currentTheme); // Revert to current theme
  };

  return (
    <div className="space-y-6">
      {/* Preset Themes */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Preset Themes</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {presetThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setTheme(theme)}
              className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
                currentTheme.id === theme.id
                  ? "border-cyan-400 ring-2 ring-cyan-400/20"
                  : "border-white/10 hover:border-white/20"
              }`}
              style={{ backgroundColor: theme.colors.card }}
            >
              {/* Color preview */}
              <div className="mb-3 flex gap-1">
                {[theme.colors.primary, theme.colors.secondary, theme.colors.accent].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="h-4 flex-1 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>

              {/* Theme name */}
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-medium"
                  style={{ color: theme.colors.foreground }}
                >
                  {theme.name}
                </span>
                {theme.isDark ? (
                  <Moon className="h-4 w-4 text-white/50" />
                ) : (
                  <Sun className="h-4 w-4 text-black/50" />
                )}
              </div>

              {/* Selected indicator */}
              {currentTheme.id === theme.id && (
                <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400">
                  <Check className="h-3 w-3 text-black" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Themes */}
      {customThemes.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Your Themes</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {customThemes.map((theme) => (
              <div
                key={theme.id}
                className={`group relative overflow-hidden rounded-xl border p-4 transition-all ${
                  currentTheme.id === theme.id
                    ? "border-cyan-400 ring-2 ring-cyan-400/20"
                    : "border-white/10 hover:border-white/20"
                }`}
                style={{ backgroundColor: theme.colors.card }}
              >
                <button
                  onClick={() => setTheme(theme)}
                  className="w-full text-left"
                >
                  {/* Color preview */}
                  <div className="mb-3 flex gap-1">
                    {[
                      theme.colors.primary,
                      theme.colors.secondary,
                      theme.colors.accent,
                    ].map((color, i) => (
                      <div
                        key={i}
                        className="h-4 flex-1 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Theme name */}
                  <span
                    className="text-sm font-medium"
                    style={{ color: theme.colors.foreground }}
                  >
                    {theme.name}
                  </span>
                </button>

                {/* Delete button */}
                <button
                  onClick={() => deleteCustomTheme(theme.id)}
                  className="absolute right-2 top-2 rounded-full bg-red-500/20 p-1.5 text-red-400 opacity-0 transition-opacity hover:bg-red-500/30 group-hover:opacity-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>

                {/* Selected indicator */}
                {currentTheme.id === theme.id && (
                  <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400">
                    <Check className="h-3 w-3 text-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Custom Theme */}
      {!isCreating ? (
        <Button
          onClick={() => setIsCreating(true)}
          variant="outline"
          className="w-full border-dashed border-white/20 hover:border-cyan-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Custom Theme
        </Button>
      ) : (
        <Card className="border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Palette className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">New Custom Theme</h3>
          </div>

          <div className="space-y-4">
            {/* Theme Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">
                Theme Name
              </label>
              <input
                type="text"
                value={newTheme.name}
                onChange={(e) =>
                  setNewTheme((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            {/* Dark/Light Toggle */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-white/70">Mode</label>
              <button
                onClick={toggleNewThemeMode}
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                  newTheme.isDark ? "bg-gray-700" : "bg-yellow-400"
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform ${
                    newTheme.isDark ? "translate-x-1" : "translate-x-9"
                  }`}
                >
                  {newTheme.isDark ? (
                    <Moon className="h-4 w-4 text-gray-700" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </span>
              </button>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <ColorInput
                label="Primary"
                value={newTheme.colors.primary}
                onChange={(v) => updateNewThemeColor("primary", v)}
              />
              <ColorInput
                label="Secondary"
                value={newTheme.colors.secondary}
                onChange={(v) => updateNewThemeColor("secondary", v)}
              />
              <ColorInput
                label="Accent"
                value={newTheme.colors.accent}
                onChange={(v) => updateNewThemeColor("accent", v)}
              />
              <ColorInput
                label="Background"
                value={newTheme.colors.background}
                onChange={(v) => updateNewThemeColor("background", v)}
              />
              <ColorInput
                label="Foreground"
                value={newTheme.colors.foreground}
                onChange={(v) => updateNewThemeColor("foreground", v)}
              />
              <ColorInput
                label="Card"
                value={newTheme.colors.card}
                onChange={(v) => updateNewThemeColor("card", v)}
              />
            </div>

            {/* Preview */}
            <div
              className="rounded-xl border border-white/10 p-4"
              style={{ backgroundColor: newTheme.colors.background }}
            >
              <p
                className="mb-2 text-sm font-medium"
                style={{ color: newTheme.colors.foreground }}
              >
                Preview
              </p>
              <div className="flex gap-2">
                <div
                  className="rounded-lg px-3 py-1 text-sm text-white"
                  style={{ backgroundColor: newTheme.colors.primary }}
                >
                  Primary
                </div>
                <div
                  className="rounded-lg px-3 py-1 text-sm text-white"
                  style={{ backgroundColor: newTheme.colors.secondary }}
                >
                  Secondary
                </div>
                <div
                  className="rounded-lg px-3 py-1 text-sm text-white"
                  style={{ backgroundColor: newTheme.colors.accent }}
                >
                  Accent
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleCreateTheme}
                className="flex-1 bg-linear-to-r from-cyan-500 to-purple-500"
              >
                Create Theme
              </Button>
              <Button
                onClick={handleCancelCreation}
                variant="outline"
                className="border-white/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

