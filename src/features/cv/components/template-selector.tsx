"use client";

import { Palette, Check } from "lucide-react";
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

export function TemplateSelector() {
  const { selectedTemplateId, setTemplate } = useCVStore();
  const currentTemplate = cvTemplates.find((t) => t.id === selectedTemplateId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Palette className="mr-2 h-4 w-4" />
          {currentTemplate?.name || "Select Template"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>CV Templates</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {cvTemplates.map((template) => (
          <DropdownMenuItem
            key={template.id}
            onClick={() => setTemplate(template.id)}
            className={cn(
              "flex items-start gap-3 p-3",
              selectedTemplateId === template.id && "bg-muted"
            )}
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                template.category === "modern" && "bg-neon-purple/20",
                template.category === "creative" && "bg-neon-cyan/20",
                template.category === "professional" && "bg-neon-blue/20"
              )}
            >
              <Palette
                className={cn(
                  "h-5 w-5",
                  template.category === "modern" && "text-neon-purple",
                  template.category === "creative" && "text-neon-cyan",
                  template.category === "professional" && "text-neon-blue"
                )}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{template.name}</span>
                {selectedTemplateId === template.id && (
                  <Check className="h-4 w-4 text-neon-green" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

