"use client";

import { Palette, Check, Sparkles, Briefcase, Layout, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCVStore } from "../store";
import { cvTemplates } from "@/types/cv";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, React.ReactNode> = {
  modern: <Sparkles className="h-5 w-5" />,
  creative: <Palette className="h-5 w-5" />,
  professional: <Briefcase className="h-5 w-5" />,
  minimal: <FileText className="h-5 w-5" />,
  classic: <Layout className="h-5 w-5" />,
};

const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
  modern: { bg: "bg-neon-purple/20", text: "text-neon-purple", badge: "bg-neon-purple/10 text-neon-purple" },
  creative: { bg: "bg-neon-cyan/20", text: "text-neon-cyan", badge: "bg-neon-cyan/10 text-neon-cyan" },
  professional: { bg: "bg-blue-500/20", text: "text-blue-400", badge: "bg-blue-500/10 text-blue-400" },
  minimal: { bg: "bg-gray-500/20", text: "text-gray-400", badge: "bg-gray-500/10 text-gray-400" },
  classic: { bg: "bg-amber-500/20", text: "text-amber-400", badge: "bg-amber-500/10 text-amber-400" },
};

export function TemplateSelector() {
  const { selectedTemplateId, setTemplate } = useCVStore();
  const currentTemplate = cvTemplates.find((t) => t.id === selectedTemplateId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 max-w-36 px-2">
          <Palette className="h-4 w-4 shrink-0" />
          <span className="ml-1 truncate hidden sm:inline">{currentTemplate?.name || "Template"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 border-white/10 bg-gray-900">
        <DropdownMenuLabel className="text-white/70">CV Templates ({cvTemplates.length})</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        {cvTemplates.map((template) => {
          const colors = categoryColors[template.category] || categoryColors.modern;
          const icon = categoryIcons[template.category] || <Palette className="h-5 w-5" />;
          
          return (
            <DropdownMenuItem
              key={template.id}
              onClick={() => setTemplate(template.id)}
              className={cn(
                "flex items-start gap-3 p-3 text-white/80 hover:bg-white/10 hover:text-white",
                selectedTemplateId === template.id && "bg-white/5"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  colors.bg
                )}
              >
                <span className={colors.text}>{icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium truncate">{template.name}</span>
                  {selectedTemplateId === template.id && (
                    <Check className="h-4 w-4 shrink-0 text-neon-green" />
                  )}
                </div>
                <p className="text-xs text-white/50 line-clamp-1">{template.description}</p>
                <span className={cn("mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider", colors.badge)}>
                  {template.category}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

