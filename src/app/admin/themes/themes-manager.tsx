"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  MoreHorizontal,
  Palette,
  Globe,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Theme, BackgroundStyle } from "@/types/db";

interface ThemesManagerProps {
  themes: Theme[];
}

type BorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
type ShadowIntensity = "none" | "sm" | "md" | "lg";

export function ThemesManager({ themes }: ThemesManagerProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    primary_color: "#8B5CF6",
    secondary_color: "#06B6D4",
    accent_color: "#EC4899",
    background_style: "solid" as BackgroundStyle,
    background_color: "#0f0d15",
    background_gradient: "",
    heading_font: "Space Grotesk",
    body_font: "Inter",
    border_radius: "lg" as BorderRadius,
    shadow_intensity: "md" as ShadowIntensity,
    is_system: true,
  });

  const systemThemes = themes.filter((t) => t.is_system);
  const userThemes = themes.filter((t) => !t.is_system);

  const handleOpenCreate = () => {
    setEditingTheme(null);
    setFormData({
      name: "",
      primary_color: "#8B5CF6",
      secondary_color: "#06B6D4",
      accent_color: "#EC4899",
      background_style: "solid",
      background_color: "#0f0d15",
      background_gradient: "",
      heading_font: "Space Grotesk",
      body_font: "Inter",
      border_radius: "lg",
      shadow_intensity: "md",
      is_system: true,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (theme: Theme) => {
    setEditingTheme(theme);
    setFormData({
      name: theme.name,
      primary_color: theme.primary_color,
      secondary_color: theme.secondary_color,
      accent_color: theme.accent_color,
      background_style: theme.background_style,
      background_color: theme.background_color,
      background_gradient: theme.background_gradient || "",
      heading_font: theme.heading_font,
      body_font: theme.body_font,
      border_radius: theme.border_radius,
      shadow_intensity: theme.shadow_intensity,
      is_system: theme.is_system,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Theme name is required");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = editingTheme
        ? "/api/admin/themes/update"
        : "/api/admin/themes/create";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingTheme?.id,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to save theme");

      toast.success(editingTheme ? "Theme updated" : "Theme created");
      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      toast.error("Failed to save theme");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (theme: Theme) => {
    if (!confirm(`Are you sure you want to delete "${theme.name}"?`)) return;

    try {
      const response = await fetch("/api/admin/themes/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: theme.id }),
      });

      if (!response.ok) throw new Error("Failed to delete theme");

      toast.success("Theme deleted");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete theme");
    }
  };

  const ThemeCard = ({ theme }: { theme: Theme }) => (
    <Card className="group relative overflow-hidden border-white/5 bg-white/[0.02] transition-all hover:border-white/10 hover:bg-white/[0.04]">
      {/* Color Preview */}
      <div
        className="relative h-32 p-4"
        style={{ backgroundColor: theme.background_color }}
      >
        {/* Color Dots */}
        <div className="flex gap-2">
          <div
            className="h-8 w-8 rounded-full shadow-lg"
            style={{ backgroundColor: theme.primary_color }}
            title="Primary"
          />
          <div
            className="h-8 w-8 rounded-full shadow-lg"
            style={{ backgroundColor: theme.secondary_color }}
            title="Secondary"
          />
          <div
            className="h-8 w-8 rounded-full shadow-lg"
            style={{ backgroundColor: theme.accent_color }}
            title="Accent"
          />
        </div>

        {/* System Badge */}
        {theme.is_system && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-blue-500/90 px-2 py-0.5 text-xs font-medium text-white">
            <Globe className="h-3 w-3" />
            System
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white">{theme.name}</h3>
            <p className="mt-1 text-sm text-white/50">
              {theme.heading_font} / {theme.body_font}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white/50 hover:bg-white/5 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-white/10 bg-[#0a0a12]">
              <DropdownMenuItem
                onClick={() => handleOpenEdit(theme)}
                className="text-white/70 focus:bg-white/5 focus:text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={() => handleDelete(theme)}
                className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Style Info */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
            {theme.background_style}
          </span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
            radius: {theme.border_radius}
          </span>
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/50">
            shadow: {theme.shadow_intensity}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{themes.length} themes total</p>
        <Button
          onClick={handleOpenCreate}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add System Theme
        </Button>
      </div>

      {/* System Themes */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">System Themes</h2>
          <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
            {systemThemes.length}
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {systemThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
          {systemThemes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-12">
              <Palette className="h-12 w-12 text-white/20" />
              <p className="mt-4 text-white/50">No system themes</p>
            </div>
          )}
        </div>
      </div>

      {/* User Themes */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-white">User Themes</h2>
          <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
            {userThemes.length}
          </span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {userThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
          {userThemes.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-8">
              <p className="text-white/40">No user-created themes yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-[#0a0a12]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingTheme ? "Edit Theme" : "Create System Theme"}
            </DialogTitle>
            <DialogDescription className="text-white/50">
              {editingTheme
                ? "Update the theme settings below"
                : "Configure a new system theme for all users"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label className="text-white/70">Name</Label>
              <Input
                placeholder="Theme name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            {/* Colors */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-white/70">Primary Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.primary_color}
                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <Input
                    value={formData.primary_color}
                    onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                    className="flex-1 border-white/10 bg-white/5 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Secondary Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.secondary_color}
                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <Input
                    value={formData.secondary_color}
                    onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                    className="flex-1 border-white/10 bg-white/5 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Accent Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.accent_color}
                    onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <Input
                    value={formData.accent_color}
                    onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                    className="flex-1 border-white/10 bg-white/5 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Background */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-white/70">Background Style</Label>
                <Select
                  value={formData.background_style}
                  onValueChange={(value: BackgroundStyle) => setFormData({ ...formData, background_style: value })}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0a0a12]">
                    <SelectItem value="solid" className="text-white/70 focus:bg-white/5 focus:text-white">Solid</SelectItem>
                    <SelectItem value="gradient" className="text-white/70 focus:bg-white/5 focus:text-white">Gradient</SelectItem>
                    <SelectItem value="pattern" className="text-white/70 focus:bg-white/5 focus:text-white">Pattern</SelectItem>
                    <SelectItem value="mesh" className="text-white/70 focus:bg-white/5 focus:text-white">Mesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Background Color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.background_color}
                    onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <Input
                    value={formData.background_color}
                    onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                    className="flex-1 border-white/10 bg-white/5 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Fonts */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-white/70">Heading Font</Label>
                <Input
                  placeholder="e.g., Space Grotesk"
                  value={formData.heading_font}
                  onChange={(e) => setFormData({ ...formData, heading_font: e.target.value })}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Body Font</Label>
                <Input
                  placeholder="e.g., Inter"
                  value={formData.body_font}
                  onChange={(e) => setFormData({ ...formData, body_font: e.target.value })}
                  className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
                />
              </div>
            </div>

            {/* Border Radius & Shadow */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-white/70">Border Radius</Label>
                <Select
                  value={formData.border_radius}
                  onValueChange={(value: BorderRadius) => setFormData({ ...formData, border_radius: value })}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0a0a12]">
                    <SelectItem value="none" className="text-white/70 focus:bg-white/5 focus:text-white">None</SelectItem>
                    <SelectItem value="sm" className="text-white/70 focus:bg-white/5 focus:text-white">Small</SelectItem>
                    <SelectItem value="md" className="text-white/70 focus:bg-white/5 focus:text-white">Medium</SelectItem>
                    <SelectItem value="lg" className="text-white/70 focus:bg-white/5 focus:text-white">Large</SelectItem>
                    <SelectItem value="xl" className="text-white/70 focus:bg-white/5 focus:text-white">Extra Large</SelectItem>
                    <SelectItem value="full" className="text-white/70 focus:bg-white/5 focus:text-white">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70">Shadow Intensity</Label>
                <Select
                  value={formData.shadow_intensity}
                  onValueChange={(value: ShadowIntensity) => setFormData({ ...formData, shadow_intensity: value })}
                >
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#0a0a12]">
                    <SelectItem value="none" className="text-white/70 focus:bg-white/5 focus:text-white">None</SelectItem>
                    <SelectItem value="sm" className="text-white/70 focus:bg-white/5 focus:text-white">Small</SelectItem>
                    <SelectItem value="md" className="text-white/70 focus:bg-white/5 focus:text-white">Medium</SelectItem>
                    <SelectItem value="lg" className="text-white/70 focus:bg-white/5 focus:text-white">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* System Theme Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_system"
                checked={formData.is_system}
                onChange={(e) => setFormData({ ...formData, is_system: e.target.checked })}
                className="h-4 w-4 rounded border-white/10 bg-white/5"
              />
              <Label htmlFor="is_system" className="text-white/70">
                System theme (available to all users)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
            >
              {isLoading ? "Saving..." : editingTheme ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

