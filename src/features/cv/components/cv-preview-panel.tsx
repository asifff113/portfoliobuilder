"use client";

import { forwardRef, useState, useEffect } from "react";
import { useCVStore } from "../store";
import { useTemplateSettings, type TemplateSettings, colorSchemes, fontFamilies } from "../stores/template-settings";
import { NeonMinimalTemplate } from "../templates/neon-minimal";
import { CardGridTemplate } from "../templates/card-grid";
import { TwoColumnTemplate } from "../templates/two-column";
import { TimelineTemplate } from "../templates/timeline";
import { MinimalLightTemplate } from "../templates/minimal-light";
import { DeveloperTemplate } from "../templates/developer";
import { ATSSafeTemplate } from "../templates/ats-safe";
import { ExecutiveProfessionalTemplate } from "../templates/executive-professional";
import { ModernProfessionalTemplate } from "../templates/modern-professional";
import { AcademicResearchTemplate } from "../templates/academic-research";
import { SidebarProfessionalTemplate } from "../templates/sidebar-professional";
import { ModernGraySidebarTemplate } from "../templates/modern-gray-sidebar";
import { PastelElegantTemplate } from "../templates/pastel-elegant";
import { BoldExecutiveTemplate } from "../templates/bold-executive";
import { CyberpunkFuturisticTemplate } from "../templates/cyberpunk-futuristic";
import { SwissMinimalistTemplate } from "../templates/swiss-minimalist";
import { NeoBrutalistTemplate } from "../templates/neo-brutalist";
import { GlassmorphismTemplate } from "../templates/glassmorphism";
import { EditorialTemplate } from "../templates/editorial";
import { TerminalTemplate } from "../templates/terminal";
import { InfographicTemplate } from "../templates/infographic";
import { CreativePortfolioTemplate } from "../templates/creative-portfolio";
import { TechGradientTemplate } from "../templates/tech-gradient";
import { CompactProfessionalTemplate } from "../templates/compact-professional";
import { DarkModeProTemplate } from "../templates/dark-mode-pro";
import { MetroCardsTemplate } from "../templates/metro-cards";
// Removed AuroraHaloTemplate and ExecutiveLuxeTemplate imports
import { BlueprintTechTemplate } from "../templates/blueprint-tech";
import { QuantumGridTemplate } from "../templates/quantum-grid";
import { LumenGlassTemplate } from "../templates/lumen-glass";
import { HolographicMatrixTemplate } from "../templates/holographic-matrix";
import { AuroraBorealisTemplate } from "../templates/aurora-borealis";
import { CarbonFiberTemplate } from "../templates/carbon-fiber";
import { PrismaticCrystalTemplate } from "../templates/prismatic-crystal";
import { MidnightCosmosTemplate } from "../templates/midnight-cosmos";
import { TitaniumEliteTemplate } from "../templates/titanium-elite";
import { NebulaDriftTemplate } from "../templates/nebula-drift";
import { VogueStarlightTemplate } from "../templates/vogue-starlight";
import { CrimsonNexusTemplate } from "../templates/crimson-nexus";
import { HoloFlowTemplate } from "../templates/holo-flow";
import { NoirEleganceTemplate } from "../templates/noir-elegance";
import { ZenGardenTemplate } from "../templates/zen-garden";
import { ElectricPulseTemplate } from "../templates/electric-pulse";
import { ArtDecoLuxeTemplate } from "../templates/art-deco-luxe";
import { CyberGridTemplate } from "../templates/cyber-grid";
import { VelvetRoseTemplate } from "../templates/velvet-rose";
import { ObsidianEdgeTemplate } from "../templates/obsidian-edge";
import { NeuralNetworkTemplate } from "../templates/neural-network";
import { LiquidMercuryTemplate } from "../templates/liquid-mercury";
import { NeonHorizonTemplate } from "../templates/neon-horizon";
import { FrostMinimalTemplate } from "../templates/frost-minimal";
import { GlitchCyberTemplate } from "../templates/glitch-cyber";
import { MinimalistLuxeTemplate } from "../templates/minimalist-luxe";
import { DataStreamTemplate } from "../templates/data-stream";
import { TokyoNightCVTemplate } from "../templates/tokyo-night";
import { GradientWaveCVTemplate } from "../templates/gradient-wave";
import { NewspaperCVTemplate } from "../templates/newspaper";
import { OrigamiCVTemplate } from "../templates/origami";
import { IsometricCVTemplate } from "../templates/isometric";
import { PersonalBioTemplate } from "../templates/personal-bio";
import { CreativeRedTemplate } from "../templates/creative-red";
import type { PersonalInfo, CVSection } from "@/types/cv";

// Template props interface that all templates should implement
export interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

interface CVPreviewPanelProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  isFullPreview?: boolean;
}

const templateComponents: Record<string, React.ComponentType<TemplateProps>> = {
  "sidebar-professional": SidebarProfessionalTemplate,
  "modern-gray-sidebar": ModernGraySidebarTemplate,
  "pastel-elegant": PastelElegantTemplate,
  "bold-executive": BoldExecutiveTemplate,
  "neon-minimal": NeonMinimalTemplate,
  "card-grid": CardGridTemplate,
  "two-column": TwoColumnTemplate,
  "timeline": TimelineTemplate,
  "minimal-light": MinimalLightTemplate,
  "developer": DeveloperTemplate,
  "ats-safe": ATSSafeTemplate,
  "executive-professional": ExecutiveProfessionalTemplate,
  "modern-professional": ModernProfessionalTemplate,
  "academic-research": AcademicResearchTemplate,
  "cyberpunk-futuristic": CyberpunkFuturisticTemplate,
  "swiss-minimalist": SwissMinimalistTemplate,
  "neo-brutalist": NeoBrutalistTemplate,
  "glassmorphism": GlassmorphismTemplate,
  "editorial": EditorialTemplate,
  "terminal": TerminalTemplate,
  "infographic": InfographicTemplate,
  "creative-portfolio": CreativePortfolioTemplate,
  "tech-gradient": TechGradientTemplate,
  "compact-professional": CompactProfessionalTemplate,
  "dark-mode-pro": DarkModeProTemplate,
  "metro-cards": MetroCardsTemplate,
  // "aurora-halo": AuroraHaloTemplate, // Removed
  // "executive-luxe": ExecutiveLuxeTemplate, // Removed
  "blueprint-tech": BlueprintTechTemplate,
  "quantum-grid": QuantumGridTemplate,
  "lumen-glass": LumenGlassTemplate,
  "holographic-matrix": HolographicMatrixTemplate,
  "aurora-borealis": AuroraBorealisTemplate,
  "carbon-fiber": CarbonFiberTemplate,
  "prismatic-crystal": PrismaticCrystalTemplate,
  "midnight-cosmos": MidnightCosmosTemplate,
  "titanium-elite": TitaniumEliteTemplate,
  "nebula-drift": NebulaDriftTemplate,
  "vogue-starlight": VogueStarlightTemplate,
  "crimson-nexus": CrimsonNexusTemplate,
  "holo-flow": HoloFlowTemplate,
  "noir-elegance": NoirEleganceTemplate,
  "zen-garden": ZenGardenTemplate,
  "electric-pulse": ElectricPulseTemplate,
  "art-deco-luxe": ArtDecoLuxeTemplate,
  "cyber-grid": CyberGridTemplate,
  "velvet-rose": VelvetRoseTemplate,
  "obsidian-edge": ObsidianEdgeTemplate,
  "neural-network": NeuralNetworkTemplate,
  "liquid-mercury": LiquidMercuryTemplate,
  "neon-horizon": NeonHorizonTemplate,
  "frost-minimal": FrostMinimalTemplate,
  "glitch-cyber": GlitchCyberTemplate,
  "minimalist-luxe": MinimalistLuxeTemplate,
  "data-stream": DataStreamTemplate,
  "tokyo-night": TokyoNightCVTemplate,
  "gradient-wave": GradientWaveCVTemplate,
  "newspaper": NewspaperCVTemplate,
  "origami": OrigamiCVTemplate,
  "isometric": IsometricCVTemplate,
  "personal-bio": PersonalBioTemplate,
  "creative-red": CreativeRedTemplate,
};

export const CVPreviewPanel = forwardRef<HTMLDivElement, CVPreviewPanelProps>(
  function CVPreviewPanel({ personalInfo, sections, isFullPreview = false }, ref) {
    const selectedTemplateId = useCVStore((state) => state.selectedTemplateId);
    const { settings } = useTemplateSettings();
    
    // Track if component has mounted (client-side)
    const [hasMounted, setHasMounted] = useState(false);
    
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasMounted(true);
    }, []);

    // Filter only visible sections and sort by order
    const visibleSections = sections
      .filter((s) => s.isVisible)
      .sort((a, b) => a.order - b.order);

    const TemplateComponent = templateComponents[selectedTemplateId] || NeonMinimalTemplate;
    
    // Compute values locally to ensure reactivity
    const activeScheme = colorSchemes.find((s) => s.id === settings.colorSchemeId) || colorSchemes[0];
    const computedColorScheme = {
      ...activeScheme,
      ...(settings.customPrimaryColor && { primary: settings.customPrimaryColor }),
      ...(settings.customAccentColor && { accent: settings.customAccentColor }),
    };

    const activeFont = fontFamilies.find((f) => f.id === settings.fontFamilyId);
    const computedFontFamily = activeFont?.value || fontFamilies[0].value;

    const marginPresets = {
      compact: { top: 10, right: 12, bottom: 10, left: 12 },
      normal: { top: 15, right: 18, bottom: 15, left: 18 },
      spacious: { top: 20, right: 25, bottom: 20, left: 25 },
    };
    const computedMargins = marginPresets[settings.marginPreset];

    const fontSizeMultipliers = {
      small: 0.9,
      medium: 1.0,
      large: 1.1,
    };
    const computedFontSizeMultiplier = fontSizeMultipliers[settings.fontSize];

    // Only use dynamic settings after mount to avoid hydration mismatch
    const colorScheme = hasMounted ? computedColorScheme : {
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#a855f7",
      text: "#1e1b4b",
      textMuted: "#6b7280",
      background: "#ffffff",
    };
    const fontFamily = hasMounted ? computedFontFamily : '"Inter", system-ui, sans-serif';
    const margins = hasMounted ? computedMargins : { top: 15, right: 18, bottom: 15, left: 18 };
    const fontSizeMultiplier = hasMounted ? computedFontSizeMultiplier : 1;
    const activeSettings = hasMounted ? settings : undefined;

    // Build CSS custom properties from settings
    const customStyles: React.CSSProperties = {
      "--cv-primary": colorScheme.primary,
      "--cv-secondary": colorScheme.secondary,
      "--cv-accent": colorScheme.accent,
      "--cv-text": colorScheme.text,
      "--cv-text-muted": colorScheme.textMuted,
      "--cv-background": colorScheme.background,
      "--cv-font-family": fontFamily,
      "--cv-line-height": hasMounted ? settings.lineHeight : 1.5,
      "--cv-letter-spacing": `${hasMounted ? settings.letterSpacing : 0}em`,
      "--cv-margin-top": `${margins.top}mm`,
      "--cv-margin-right": `${margins.right}mm`,
      "--cv-margin-bottom": `${margins.bottom}mm`,
      "--cv-margin-left": `${margins.left}mm`,
      "--cv-font-size-multiplier": fontSizeMultiplier,
      "--cv-photo-size": `${hasMounted ? settings.photoSize : 96}px`,
    } as React.CSSProperties;

    return (
      <div className={`p-4 ${isFullPreview ? 'flex items-start justify-center min-h-full bg-muted/50' : ''}`}>
        <div
          ref={ref}
          className={`rounded-xl bg-white shadow-2xl overflow-hidden ${
            isFullPreview 
              ? 'w-full max-w-4xl' // Responsive full width with max constraint
              : 'mx-auto max-w-3xl'
          }`}
          style={customStyles}
        >
          <TemplateComponent
            personalInfo={personalInfo}
            sections={visibleSections}
            settings={activeSettings}
          />
        </div>
      </div>
    );
  }
);
