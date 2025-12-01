export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  card: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  isDark: boolean;
  colors: ThemeColors;
  isSystem?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const defaultDarkTheme: ThemeConfig = {
  id: "neon-dark",
  name: "Neon Dark",
  isDark: true,
  isSystem: true,
  colors: {
    primary: "#a855f7",
    secondary: "#06b6d4",
    accent: "#ec4899",
    background: "#0a0a0f",
    foreground: "#ffffff",
    muted: "#27272a",
    card: "#18181b",
  },
};

export const defaultLightTheme: ThemeConfig = {
  id: "neon-light",
  name: "Neon Light",
  isDark: false,
  isSystem: true,
  colors: {
    primary: "#9333ea",
    secondary: "#0891b2",
    accent: "#db2777",
    background: "#fafafa",
    foreground: "#0a0a0f",
    muted: "#f4f4f5",
    card: "#ffffff",
  },
};

export const presetThemes: ThemeConfig[] = [
  defaultDarkTheme,
  defaultLightTheme,
  {
    id: "cyber-punk",
    name: "Cyber Punk",
    isDark: true,
    isSystem: true,
    colors: {
      primary: "#f0e130",
      secondary: "#00ff9f",
      accent: "#ff00ff",
      background: "#0d0d0d",
      foreground: "#ffffff",
      muted: "#1a1a2e",
      card: "#16213e",
    },
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    isDark: true,
    isSystem: true,
    colors: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      accent: "#22d3ee",
      background: "#0c1222",
      foreground: "#f0f9ff",
      muted: "#164e63",
      card: "#0e1a2b",
    },
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    isDark: true,
    isSystem: true,
    colors: {
      primary: "#f97316",
      secondary: "#fb923c",
      accent: "#fbbf24",
      background: "#1c1410",
      foreground: "#fff7ed",
      muted: "#431407",
      card: "#292118",
    },
  },
  {
    id: "forest-night",
    name: "Forest Night",
    isDark: true,
    isSystem: true,
    colors: {
      primary: "#22c55e",
      secondary: "#16a34a",
      accent: "#4ade80",
      background: "#0a120a",
      foreground: "#f0fdf4",
      muted: "#14532d",
      card: "#111c12",
    },
  },
];

