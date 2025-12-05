"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Star,
  Eye,
  MoreHorizontal,
  Briefcase,
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
import type { PortfolioTemplate, PortfolioLayoutType } from "@/types/db";

interface PortfolioTemplatesManagerProps {
  templates: PortfolioTemplate[];
}

export function PortfolioTemplatesManager({ templates }: PortfolioTemplatesManagerProps) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PortfolioTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    layout_type: "hero_timeline" as PortfolioLayoutType,
    is_premium: false,
  });

  const handleOpenCreate = () => {
    setEditingTemplate(null);
    setFormData({
      name: "",
      description: "",
      layout_type: "hero_timeline",
      is_premium: false,
    });
    setDialogOpen(true);
  };

  const handleOpenEdit = (template: PortfolioTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || "",
      layout_type: template.layout_type,
      is_premium: template.is_premium,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Template name is required");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = editingTemplate
        ? "/api/admin/templates/portfolio/update"
        : "/api/admin/templates/portfolio/create";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingTemplate?.id,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to save template");

      toast.success(editingTemplate ? "Template updated" : "Template created");
      setDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save template");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (template: PortfolioTemplate) => {
    if (!confirm(`Are you sure you want to delete "${template.name}"?`)) return;

    try {
      const response = await fetch("/api/admin/templates/portfolio/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: template.id }),
      });

      if (!response.ok) throw new Error("Failed to delete template");

      toast.success("Template deleted");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete template");
    }
  };

  const handleTogglePremium = async (template: PortfolioTemplate) => {
    try {
      const response = await fetch("/api/admin/templates/portfolio/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: template.id,
          is_premium: !template.is_premium,
        }),
      });

      if (!response.ok) throw new Error("Failed to update template");

      toast.success(template.is_premium ? "Template marked as free" : "Template marked as premium");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update template");
    }
  };

  const layoutColors: Record<PortfolioLayoutType, string> = {
    hero_timeline: "from-purple-500 to-violet-500",
    project_grid: "from-blue-500 to-cyan-500",
    minimal: "from-gray-500 to-gray-600",
    creative: "from-pink-500 to-rose-500",
    developer: "from-green-500 to-emerald-500",
  };

  const layoutLabels: Record<PortfolioLayoutType, string> = {
    hero_timeline: "Hero Timeline",
    project_grid: "Project Grid",
    minimal: "Minimal",
    creative: "Creative",
    developer: "Developer",
  };

  return (
    <>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{templates.length} templates</p>
        <Button
          onClick={handleOpenCreate}
          className="bg-linear-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="group relative overflow-hidden border-white/5 bg-white/2 transition-all hover:border-white/10 hover:bg-white/4"
          >
            {/* Preview Area */}
            <div className={`relative h-40 bg-linear-to-br ${layoutColors[template.layout_type]} p-4`}>
              <div className="flex h-full items-center justify-center">
                <Briefcase className="h-16 w-16 text-white/30" />
              </div>
              
              {/* Premium Badge */}
              {template.is_premium && (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-yellow-500/90 px-2 py-0.5 text-xs font-medium text-black">
                  <Star className="h-3 w-3" />
                  Premium
                </div>
              )}

              {/* Actions Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleOpenEdit(template)}
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  Preview
                </Button>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  <p className="mt-1 text-sm text-white/50 line-clamp-2">
                    {template.description || "No description"}
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
                      onClick={() => handleOpenEdit(template)}
                      className="text-white/70 focus:bg-white/5 focus:text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleTogglePremium(template)}
                      className="text-white/70 focus:bg-white/5 focus:text-white"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      {template.is_premium ? "Mark as Free" : "Mark as Premium"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={() => handleDelete(template)}
                      className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Layout Badge */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`rounded-full bg-linear-to-r ${layoutColors[template.layout_type]} px-2 py-0.5 text-xs font-medium text-white`}>
                  {layoutLabels[template.layout_type]}
                </span>
                <span className="text-xs text-white/30">
                  {new Date(template.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        ))}

        {templates.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 py-12">
            <Briefcase className="h-12 w-12 text-white/20" />
            <p className="mt-4 text-white/50">No templates yet</p>
            <Button
              onClick={handleOpenCreate}
              variant="outline"
              className="mt-4 border-white/10 text-white hover:bg-white/5"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create First Template
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-white/10 bg-[#0a0a12]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingTemplate ? "Edit Template" : "Create Template"}
            </DialogTitle>
            <DialogDescription className="text-white/50">
              {editingTemplate
                ? "Update the template details below"
                : "Fill in the details to create a new portfolio template"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/70">Name</Label>
              <Input
                placeholder="Template name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">Description</Label>
              <Input
                placeholder="Brief description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/70">Layout Type</Label>
              <Select
                value={formData.layout_type}
                onValueChange={(value: PortfolioLayoutType) => setFormData({ ...formData, layout_type: value })}
              >
                <SelectTrigger className="border-white/10 bg-white/5 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#0a0a12]">
                  <SelectItem value="hero_timeline" className="text-white/70 focus:bg-white/5 focus:text-white">Hero Timeline</SelectItem>
                  <SelectItem value="project_grid" className="text-white/70 focus:bg-white/5 focus:text-white">Project Grid</SelectItem>
                  <SelectItem value="minimal" className="text-white/70 focus:bg-white/5 focus:text-white">Minimal</SelectItem>
                  <SelectItem value="creative" className="text-white/70 focus:bg-white/5 focus:text-white">Creative</SelectItem>
                  <SelectItem value="developer" className="text-white/70 focus:bg-white/5 focus:text-white">Developer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_premium_portfolio"
                checked={formData.is_premium}
                onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
                className="h-4 w-4 rounded border-white/10 bg-white/5"
              />
              <Label htmlFor="is_premium_portfolio" className="text-white/70">
                Premium template
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
              className="bg-linear-to-r from-orange-600 to-yellow-600 text-white hover:from-orange-700 hover:to-yellow-700"
            >
              {isLoading ? "Saving..." : editingTemplate ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

