"use client";

import { useState } from "react";
import { 
  Settings, 
  Palette, 
  Type, 
  Layout, 
  Image as ImageIcon, 
  Printer,
  RotateCcw,
  Check,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  useTemplateSettings,
  colorSchemes,
  fontFamilies,
  type PhotoShape,
  type MarginPreset,
  type FontSizePreset,
} from "../stores/template-settings";
import { cn } from "@/lib/utils";

export function TemplateSettingsPanel() {
  const {
    settings,
    updateSettings,
    setColorScheme,
    setCustomColors,
    setPhotoSettings,
    setTypography,
    setMargins,
    togglePrintSafeMode,
    toggleAtsMode,
    resetToDefaults,
    getActiveColorScheme,
  } = useTemplateSettings();

  const [isOpen, setIsOpen] = useState(false);
  const activeScheme = getActiveColorScheme();

  // Helper to ensure valid hex for color input
  const ensureHex = (color: string | null | undefined, fallback: string) => {
    if (!color) return fallback;
    // Handle 3-digit hex
    if (/^#[0-9A-Fa-f]{3}$/.test(color)) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) return color;
    return fallback;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8" title="Customize Template">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto border-white/10 bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-neon-purple" />
              Template Settings
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Customize your CV appearance with professional styling options
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="colors" className="mt-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/5">
              <TabsTrigger value="colors" className="flex items-center gap-1.5 text-xs">
                <Palette className="h-3.5 w-3.5" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-1.5 text-xs">
                <Type className="h-3.5 w-3.5" />
                Typography
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-1.5 text-xs">
                <Layout className="h-3.5 w-3.5" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="photo" className="flex items-center gap-1.5 text-xs">
                <ImageIcon className="h-3.5 w-3.5" />
                Photo
              </TabsTrigger>
            </TabsList>

              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-6 mt-6">
              {/* Color Schemes */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Color Scheme</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      onClick={() => setColorScheme(scheme.id)}
                      className={cn(
                        "relative p-3 rounded-lg border transition-all text-left",
                        settings.colorSchemeId === scheme.id
                          ? "border-neon-purple bg-neon-purple/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      {settings.colorSchemeId === scheme.id && (
                        <Check className="absolute top-1 right-1 h-3 w-3 text-neon-purple" />
                      )}
                      <div className="flex gap-1 mb-2">
                        <div 
                          className="h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: scheme.primary }}
                        />
                        <div 
                          className="h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: scheme.accent }}
                        />
                      </div>
                      <p className="text-xs text-white/80 font-medium truncate">
                        {scheme.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Custom Colors</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-white/60">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={ensureHex(settings.customPrimaryColor || activeScheme.primary, activeScheme.primary)}
                        onChange={(e) => setCustomColors(e.target.value, settings.customAccentColor)}
                        className="h-8 w-12 rounded border border-white/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.customPrimaryColor ?? activeScheme.primary}
                        onChange={(e) => setCustomColors(e.target.value, settings.customAccentColor)}
                        className="flex-1 h-8 px-2 text-xs bg-white/5 border border-white/10 rounded text-white"
                        placeholder="#1e3a5f"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-white/60">Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={ensureHex(settings.customAccentColor || activeScheme.accent, activeScheme.accent)}
                        onChange={(e) => setCustomColors(settings.customPrimaryColor, e.target.value)}
                        className="h-8 w-12 rounded border border-white/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.customAccentColor ?? activeScheme.accent}
                        onChange={(e) => setCustomColors(settings.customPrimaryColor, e.target.value)}
                        className="flex-1 h-8 px-2 text-xs bg-white/5 border border-white/10 rounded text-white"
                        placeholder="#3182ce"
                      />
                    </div>
                  </div>
                </div>
                {(settings.customPrimaryColor || settings.customAccentColor) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCustomColors(null, null)}
                    className="mt-2 h-6 px-2 text-xs text-white/40 hover:text-white"
                  >
                    <RotateCcw className="mr-1.5 h-3 w-3" />
                    Reset Custom Colors
                  </Button>
                )}
              </div>

              {/* Preview */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Preview</h3>
                <div className="p-4 rounded-lg bg-white">
                  <div 
                    className="text-lg font-bold mb-1"
                    style={{ color: settings.customPrimaryColor || activeScheme.primary }}
                  >
                    Your Name
                  </div>
                  <div 
                    className="text-sm mb-2"
                    style={{ color: settings.customAccentColor || activeScheme.accent }}
                  >
                    Professional Title
                  </div>
                  <div className="text-xs text-gray-600">
                    This is how your CV text will appear with the selected colors.
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-6 mt-6">
              {/* Font Family */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Font Family</h3>
                <div className="grid grid-cols-2 gap-2">
                  {fontFamilies.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setTypography(font.id)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        settings.fontFamilyId === font.id
                          ? "border-neon-purple bg-neon-purple/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <p 
                        className="text-sm text-white mb-1"
                        style={{ fontFamily: font.value }}
                      >
                        {font.name}
                      </p>
                      <p 
                        className="text-xs text-white/50"
                        style={{ fontFamily: font.value }}
                      >
                        The quick brown fox jumps
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Font Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(["small", "medium", "large"] as FontSizePreset[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setTypography(undefined, size)}
                      className={cn(
                        "p-3 rounded-lg border text-center transition-all capitalize",
                        settings.fontSize === size
                          ? "border-neon-purple bg-neon-purple/10 text-white"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white/70"
                      )}
                    >
                      <span className={cn(
                        size === "small" && "text-xs",
                        size === "medium" && "text-sm",
                        size === "large" && "text-base",
                      )}>
                        {size}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">Line Height</h3>
                  <span className="text-xs text-white/50">{settings.lineHeight.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => setTypography(undefined, undefined, parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-purple"
                />
                <div className="flex justify-between text-xs text-white/40 mt-1">
                  <span>Compact</span>
                  <span>Spacious</span>
                </div>
              </div>
            </TabsContent>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6 mt-6">
              {/* Margin Presets */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Page Margins</h3>
                <div className="grid grid-cols-3 gap-2">
                  {(["compact", "normal", "spacious"] as MarginPreset[]).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setMargins(preset)}
                      className={cn(
                        "p-4 rounded-lg border text-center transition-all",
                        settings.marginPreset === preset
                          ? "border-neon-purple bg-neon-purple/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "mx-auto mb-2 bg-white/20 rounded",
                        preset === "compact" && "w-10 h-12 p-0.5",
                        preset === "normal" && "w-10 h-12 p-1",
                        preset === "spacious" && "w-10 h-12 p-2",
                      )}>
                        <div className="w-full h-full bg-white/40 rounded-sm" />
                      </div>
                      <p className="text-xs text-white/70 capitalize">{preset}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Format */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Page Format</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateSettings({ pageFormat: "a4" })}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all",
                      settings.pageFormat === "a4"
                        ? "border-neon-purple bg-neon-purple/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <p className="text-sm text-white font-medium">A4</p>
                    <p className="text-xs text-white/50">210 × 297 mm</p>
                  </button>
                  <button
                    onClick={() => updateSettings({ pageFormat: "letter" })}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-all",
                      settings.pageFormat === "letter"
                        ? "border-neon-purple bg-neon-purple/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <p className="text-sm text-white font-medium">Letter</p>
                    <p className="text-xs text-white/50">8.5 × 11 in</p>
                  </button>
                </div>
              </div>

              {/* Mode Toggles */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white">Export Modes</h3>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Printer className="h-5 w-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white font-medium">Print-Safe Mode</p>
                      <p className="text-xs text-white/50">Optimize colors for printing</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.printSafeMode}
                    onCheckedChange={togglePrintSafeMode}
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-white/60" />
                    <div>
                      <p className="text-sm text-white font-medium">ATS Mode</p>
                      <p className="text-xs text-white/50">Simple formatting for ATS systems</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.atsMode}
                    onCheckedChange={toggleAtsMode}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Photo Tab */}
            <TabsContent value="photo" className="space-y-6 mt-6">
              {/* Show Photo Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-white/60" />
                  <div>
                    <p className="text-sm text-white font-medium">Show Profile Photo</p>
                    <p className="text-xs text-white/50">Display your photo on the CV</p>
                  </div>
                </div>
                <Switch
                  checked={settings.showPhoto}
                  onCheckedChange={(checked) => setPhotoSettings(checked)}
                />
              </div>

              {/* Photo Shape */}
              {settings.showPhoto && (
                <>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Photo Shape</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { shape: "circle" as PhotoShape, label: "Circle" },
                        { shape: "rounded" as PhotoShape, label: "Rounded" },
                        { shape: "square" as PhotoShape, label: "Square" },
                      ]).map(({ shape, label }) => (
                        <button
                          key={shape}
                          onClick={() => setPhotoSettings(true, shape)}
                          className={cn(
                            "p-4 rounded-lg border text-center transition-all",
                            settings.photoShape === shape
                              ? "border-neon-purple bg-neon-purple/10"
                              : "border-white/10 bg-white/5 hover:bg-white/10"
                          )}
                        >
                          <div 
                            className={cn(
                              "w-10 h-10 mx-auto mb-2 bg-linear-to-br from-neon-purple to-neon-pink",
                              shape === "circle" && "rounded-full",
                              shape === "rounded" && "rounded-xl",
                              shape === "square" && "rounded-none",
                            )}
                          />
                          <p className="text-xs text-white/70">{label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Size */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">Photo Size</h3>
                      <span className="text-xs text-white/50">{settings.photoSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="64"
                      max="128"
                      step="8"
                      value={settings.photoSize}
                      onChange={(e) => setPhotoSettings(true, undefined, parseInt(e.target.value))}
                      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-neon-purple"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>Small (64px)</span>
                      <span>Large (128px)</span>
                    </div>
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetToDefaults}
            className="text-white/60 hover:text-white"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
          <Button
            size="sm"
            onClick={() => setIsOpen(false)}
            className="bg-neon-purple hover:bg-neon-purple/80"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

