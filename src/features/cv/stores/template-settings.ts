"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================
// TEMPLATE SETTINGS TYPES
// ============================================

export type PhotoShape = "circle" | "rounded" | "square" | "none";
export type MarginPreset = "compact" | "normal" | "spacious";
export type FontSizePreset = "small" | "medium" | "large";
export type LayoutMode = "single-column" | "two-column";

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  background: string;
}

// Predefined color schemes
export const colorSchemes: ColorScheme[] = [
  {
    id: "professional-blue",
    name: "Professional Blue",
    primary: "#1e3a5f",
    secondary: "#2c5282",
    accent: "#3182ce",
    text: "#1a202c",
    textMuted: "#4a5568",
    background: "#ffffff",
  },
  {
    id: "modern-teal",
    name: "Modern Teal",
    primary: "#0d9488",
    secondary: "#14b8a6",
    accent: "#2dd4bf",
    text: "#134e4a",
    textMuted: "#5eead4",
    background: "#ffffff",
  },
  {
    id: "elegant-purple",
    name: "Elegant Purple",
    primary: "#6b21a8",
    secondary: "#7c3aed",
    accent: "#a78bfa",
    text: "#1f2937",
    textMuted: "#6b7280",
    background: "#ffffff",
  },
  {
    id: "classic-gray",
    name: "Classic Gray",
    primary: "#1f2937",
    secondary: "#374151",
    accent: "#6b7280",
    text: "#111827",
    textMuted: "#9ca3af",
    background: "#ffffff",
  },
  {
    id: "bold-red",
    name: "Bold Red",
    primary: "#991b1b",
    secondary: "#dc2626",
    accent: "#ef4444",
    text: "#1f2937",
    textMuted: "#6b7280",
    background: "#ffffff",
  },
  {
    id: "forest-green",
    name: "Forest Green",
    primary: "#166534",
    secondary: "#16a34a",
    accent: "#22c55e",
    text: "#1f2937",
    textMuted: "#6b7280",
    background: "#ffffff",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    primary: "#0c4a6e",
    secondary: "#0284c7",
    accent: "#0ea5e9",
    text: "#0f172a",
    textMuted: "#64748b",
    background: "#ffffff",
  },
  {
    id: "academic-maroon",
    name: "Academic Maroon",
    primary: "#8B2500",
    secondary: "#6B1C00",
    accent: "#A52A2A",
    text: "#1a1a1a",
    textMuted: "#4a4a4a",
    background: "#ffffff",
  },
  {
    id: "warm-amber",
    name: "Warm Amber",
    primary: "#78350f",
    secondary: "#b45309",
    accent: "#f59e0b",
    text: "#1f2937",
    textMuted: "#6b7280",
    background: "#ffffff",
  },
];

// Font family options
export const fontFamilies = [
  { id: "inter", name: "Inter", value: '"Inter", system-ui, sans-serif' },
  { id: "roboto", name: "Roboto", value: '"Roboto", "Helvetica Neue", sans-serif' },
  { id: "open-sans", name: "Open Sans", value: '"Open Sans", sans-serif' },
  { id: "lato", name: "Lato", value: '"Lato", sans-serif' },
  { id: "georgia", name: "Georgia", value: 'Georgia, "Times New Roman", serif' },
  { id: "merriweather", name: "Merriweather", value: '"Merriweather", Georgia, serif' },
  { id: "source-sans", name: "Source Sans Pro", value: '"Source Sans Pro", sans-serif' },
  { id: "montserrat", name: "Montserrat", value: '"Montserrat", sans-serif' },
  { id: "times-new-roman", name: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { id: "arial", name: "Arial", value: 'Arial, Helvetica, sans-serif' },
];

// ============================================
// TEMPLATE SETTINGS INTERFACE
// ============================================

export interface TemplateSettings {
  // Photo settings
  showPhoto: boolean;
  photoShape: PhotoShape;
  photoSize: number; // in pixels
  
  // Colors
  colorSchemeId: string;
  customPrimaryColor: string | null;
  customAccentColor: string | null;
  
  // Typography
  fontFamilyId: string;
  fontSize: FontSizePreset;
  lineHeight: number; // 1.0 - 2.0
  letterSpacing: number; // -0.05 - 0.1
  
  // Layout
  marginPreset: MarginPreset;
  sectionSpacing: number; // in mm
  
  // Mode
  printSafeMode: boolean; // Disable gradients, heavy colors for printing
  atsMode: boolean; // ATS-friendly mode (no icons, simple formatting)
  
  // Page settings
  pageFormat: "a4" | "letter";
}

// Default settings
const defaultSettings: TemplateSettings = {
  showPhoto: true,
  photoShape: "circle",
  photoSize: 96,
  
  colorSchemeId: "professional-blue",
  customPrimaryColor: null,
  customAccentColor: null,
  
  fontFamilyId: "inter",
  fontSize: "medium",
  lineHeight: 1.5,
  letterSpacing: 0,
  
  marginPreset: "normal",
  sectionSpacing: 6,
  
  printSafeMode: false,
  atsMode: false,
  
  pageFormat: "a4",
};

// ============================================
// STORE INTERFACE
// ============================================

interface TemplateSettingsStore {
  settings: TemplateSettings;
  
  // Actions
  updateSettings: (updates: Partial<TemplateSettings>) => void;
  setColorScheme: (schemeId: string) => void;
  setCustomColors: (primary: string | null, accent: string | null) => void;
  setPhotoSettings: (show: boolean, shape?: PhotoShape, size?: number) => void;
  setTypography: (fontId?: string, fontSize?: FontSizePreset, lineHeight?: number) => void;
  setMargins: (preset: MarginPreset) => void;
  togglePrintSafeMode: () => void;
  toggleAtsMode: () => void;
  resetToDefaults: () => void;
  
  // Computed values
  getActiveColorScheme: () => ColorScheme;
  getActiveFontFamily: () => string;
  getMarginValues: () => { top: number; right: number; bottom: number; left: number };
  getFontSizeMultiplier: () => number;
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useTemplateSettings = create<TemplateSettingsStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,
      
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },
      
      setColorScheme: (schemeId) => {
        set((state) => ({
          settings: { 
            ...state.settings, 
            colorSchemeId: schemeId,
            customPrimaryColor: null,
            customAccentColor: null,
          },
        }));
      },
      
      setCustomColors: (primary, accent) => {
        set((state) => ({
          settings: {
            ...state.settings,
            customPrimaryColor: primary,
            customAccentColor: accent,
          },
        }));
      },
      
      setPhotoSettings: (show, shape, size) => {
        set((state) => ({
          settings: {
            ...state.settings,
            showPhoto: show,
            ...(shape && { photoShape: shape }),
            ...(size && { photoSize: size }),
          },
        }));
      },
      
      setTypography: (fontId, fontSize, lineHeight) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...(fontId && { fontFamilyId: fontId }),
            ...(fontSize && { fontSize }),
            ...(lineHeight && { lineHeight }),
          },
        }));
      },
      
      setMargins: (preset) => {
        set((state) => ({
          settings: { ...state.settings, marginPreset: preset },
        }));
      },
      
      togglePrintSafeMode: () => {
        set((state) => ({
          settings: { ...state.settings, printSafeMode: !state.settings.printSafeMode },
        }));
      },
      
      toggleAtsMode: () => {
        set((state) => ({
          settings: { ...state.settings, atsMode: !state.settings.atsMode },
        }));
      },
      
      resetToDefaults: () => {
        set({ settings: defaultSettings });
      },
      
      // Computed values
      getActiveColorScheme: () => {
        const { settings } = get();
        const scheme = colorSchemes.find((s) => s.id === settings.colorSchemeId) || colorSchemes[0];
        
        // Apply custom colors if set
        return {
          ...scheme,
          ...(settings.customPrimaryColor && { primary: settings.customPrimaryColor }),
          ...(settings.customAccentColor && { accent: settings.customAccentColor }),
        };
      },
      
      getActiveFontFamily: () => {
        const { settings } = get();
        const font = fontFamilies.find((f) => f.id === settings.fontFamilyId);
        return font?.value || fontFamilies[0].value;
      },
      
      getMarginValues: () => {
        const { settings } = get();
        const margins = {
          compact: { top: 10, right: 12, bottom: 10, left: 12 },
          normal: { top: 15, right: 18, bottom: 15, left: 18 },
          spacious: { top: 20, right: 25, bottom: 20, left: 25 },
        };
        return margins[settings.marginPreset];
      },
      
      getFontSizeMultiplier: () => {
        const { settings } = get();
        const multipliers = {
          small: 0.9,
          medium: 1.0,
          large: 1.1,
        };
        return multipliers[settings.fontSize];
      },
    }),
    {
      name: "cv-template-settings",
    }
  )
);

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getPhotoClasses(shape: PhotoShape): string {
  switch (shape) {
    case "circle":
      return "rounded-full";
    case "rounded":
      return "rounded-xl";
    case "square":
      return "rounded-none";
    case "none":
      return "hidden";
    default:
      return "rounded-full";
  }
}

export function getMarginStyle(preset: MarginPreset): string {
  const margins = {
    compact: "10mm 12mm",
    normal: "15mm 18mm",
    spacious: "20mm 25mm",
  };
  return margins[preset];
}

