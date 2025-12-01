"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeConfig } from "./types";
import { defaultDarkTheme, presetThemes } from "./types";

interface ThemeStore {
  currentTheme: ThemeConfig;
  customThemes: ThemeConfig[];
  
  // Actions
  setTheme: (theme: ThemeConfig) => void;
  setThemeById: (themeId: string) => void;
  addCustomTheme: (theme: ThemeConfig) => void;
  updateCustomTheme: (themeId: string, updates: Partial<ThemeConfig>) => void;
  deleteCustomTheme: (themeId: string) => void;
  applyThemeToDOM: (theme: ThemeConfig) => void;
  getAllThemes: () => ThemeConfig[];
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      currentTheme: defaultDarkTheme,
      customThemes: [],

      setTheme: (theme) => {
        set({ currentTheme: theme });
        get().applyThemeToDOM(theme);
      },

      setThemeById: (themeId) => {
        const allThemes = get().getAllThemes();
        const theme = allThemes.find((t) => t.id === themeId);
        if (theme) {
          get().setTheme(theme);
        }
      },

      addCustomTheme: (theme) => {
        set((state) => ({
          customThemes: [...state.customThemes, theme],
        }));
      },

      updateCustomTheme: (themeId, updates) => {
        set((state) => ({
          customThemes: state.customThemes.map((t) =>
            t.id === themeId ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteCustomTheme: (themeId) => {
        const { currentTheme, customThemes } = get();
        
        // If deleting the current theme, switch to default
        if (currentTheme.id === themeId) {
          get().setTheme(defaultDarkTheme);
        }
        
        set({
          customThemes: customThemes.filter((t) => t.id !== themeId),
        });
      },

      applyThemeToDOM: (theme) => {
        if (typeof document === "undefined") return;

        const root = document.documentElement;
        const { colors } = theme;

        // Apply CSS custom properties
        root.style.setProperty("--theme-primary", colors.primary);
        root.style.setProperty("--theme-secondary", colors.secondary);
        root.style.setProperty("--theme-accent", colors.accent);
        root.style.setProperty("--theme-background", colors.background);
        root.style.setProperty("--theme-foreground", colors.foreground);
        root.style.setProperty("--theme-muted", colors.muted);
        root.style.setProperty("--theme-card", colors.card);

        // Apply dark/light mode
        if (theme.isDark) {
          root.classList.add("dark");
          root.classList.remove("light");
        } else {
          root.classList.add("light");
          root.classList.remove("dark");
        }
      },

      getAllThemes: () => {
        const { customThemes } = get();
        return [...presetThemes, ...customThemes];
      },
    }),
    {
      name: "neoncv-theme",
      partialize: (state) => ({
        currentTheme: state.currentTheme,
        customThemes: state.customThemes,
      }),
      // Don't apply theme on rehydration - let ThemeProvider handle it after mount
      // to avoid hydration mismatch
    }
  )
);

