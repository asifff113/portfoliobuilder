"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
  Loader2,
  Wand2,
  TrendingUp,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { isAIReady, improveBulletPoint, makeProfessional, makeConcise } from "@/lib/ai";

interface BulletEditorProps {
  bullets: string[];
  onChange: (bullets: string[]) => void;
  placeholder?: string;
  maxBullets?: number;
}

export function BulletEditor({
  bullets,
  onChange,
  placeholder = "Add a bullet point...",
  maxBullets = 10,
}: BulletEditorProps) {
  const [newBullet, setNewBullet] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isEnhancing, setIsEnhancing] = useState<number | null>(null);
  const aiReady = isAIReady();

  const addBullet = () => {
    if (!newBullet.trim()) return;
    if (bullets.length >= maxBullets) {
      toast.error(`Maximum ${maxBullets} bullets allowed`);
      return;
    }
    onChange([...bullets, newBullet.trim()]);
    setNewBullet("");
  };

  const updateBullet = (index: number, value: string) => {
    const updated = [...bullets];
    updated[index] = value;
    onChange(updated);
  };

  const deleteBullet = (index: number) => {
    onChange(bullets.filter((_, i) => i !== index));
  };

  const moveBullet = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= bullets.length) return;
    const updated = [...bullets];
    const [removed] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, removed);
    onChange(updated);
  };

  const enhanceBullet = async (index: number, type: "improve" | "professional" | "concise") => {
    if (!aiReady) {
      toast.error("Please enable AI first");
      return;
    }

    setIsEnhancing(index);
    try {
      let enhanced: string;
      switch (type) {
        case "improve":
          enhanced = await improveBulletPoint(bullets[index]);
          break;
        case "professional":
          enhanced = await makeProfessional(bullets[index]);
          break;
        case "concise":
          enhanced = await makeConcise(bullets[index]);
          break;
      }
      
      if (enhanced) {
        updateBullet(index, enhanced.trim());
        toast.success("Bullet enhanced!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to enhance bullet");
    } finally {
      setIsEnhancing(null);
    }
  };

  // Detect metrics in bullet (numbers, percentages, etc.)
  const hasMetrics = (text: string): boolean => {
    return /\d+%|\$[\d,]+|\d+[x×]|\d+\+/.test(text);
  };

  // Detect action verbs
  const actionVerbs = [
    "achieved", "built", "created", "delivered", "developed", "drove",
    "enhanced", "established", "executed", "generated", "implemented",
    "improved", "increased", "launched", "led", "managed", "optimized",
    "reduced", "streamlined", "transformed", "spearheaded"
  ];

  const startsWithActionVerb = (text: string): boolean => {
    const firstWord = text.toLowerCase().split(" ")[0];
    return actionVerbs.some(verb => firstWord.startsWith(verb));
  };

  return (
    <div className="space-y-2">
      {/* Existing bullets */}
      {bullets.map((bullet, index) => (
        <div
          key={index}
          className={cn(
            "group flex items-start gap-2 rounded-lg border p-2 transition-all",
            editingIndex === index
              ? "border-neon-purple/50 bg-neon-purple/5"
              : "border-white/5 bg-white/2 hover:border-white/10"
          )}
        >
          {/* Drag handle */}
          <div className="flex flex-col gap-0.5 pt-1">
            <button
              onClick={() => moveBullet(index, index - 1)}
              className="text-white/30 hover:text-white/60"
              disabled={index === 0}
            >
              <GripVertical className="h-4 w-4" />
            </button>
          </div>

          {/* Bullet content */}
          <div className="flex-1">
            {editingIndex === index ? (
              <textarea
                value={bullet}
                onChange={(e) => updateBullet(index, e.target.value)}
                onBlur={() => setEditingIndex(null)}
                autoFocus
                rows={2}
                className="w-full resize-none rounded border-none bg-transparent p-0 text-sm text-white outline-none"
              />
            ) : (
              <p
                onClick={() => setEditingIndex(index)}
                className="cursor-text text-sm text-white/80"
              >
                {bullet}
              </p>
            )}

            {/* Indicators */}
            <div className="mt-1 flex items-center gap-2">
              {hasMetrics(bullet) && (
                <span className="flex items-center gap-1 text-xs text-neon-green">
                  <TrendingUp className="h-3 w-3" />
                  Has metrics
                </span>
              )}
              {startsWithActionVerb(bullet) && (
                <span className="flex items-center gap-1 text-xs text-neon-cyan">
                  <Hash className="h-3 w-3" />
                  Action verb
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {aiReady && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    disabled={isEnhancing === index}
                  >
                    {isEnhancing === index ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-neon-purple" />
                    ) : (
                      <Sparkles className="h-3.5 w-3.5 text-neon-purple" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-white/10 bg-gray-900">
                  <DropdownMenuItem
                    onClick={() => enhanceBullet(index, "improve")}
                    className="text-white/80 hover:bg-white/10"
                  >
                    <Wand2 className="mr-2 h-4 w-4 text-neon-purple" />
                    Make Impactful
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => enhanceBullet(index, "professional")}
                    className="text-white/80 hover:bg-white/10"
                  >
                    <TrendingUp className="mr-2 h-4 w-4 text-neon-cyan" />
                    More Professional
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => enhanceBullet(index, "concise")}
                    className="text-white/80 hover:bg-white/10"
                  >
                    <Hash className="mr-2 h-4 w-4 text-neon-orange" />
                    Make Concise
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-400 hover:text-red-300"
              onClick={() => deleteBullet(index)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ))}

      {/* Add new bullet */}
      {bullets.length < maxBullets && (
        <div className="flex items-center gap-2">
          <Input
            value={newBullet}
            onChange={(e) => setNewBullet(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addBullet()}
            placeholder={placeholder}
            className="flex-1 border-dashed border-white/10 bg-transparent text-sm"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={addBullet}
            disabled={!newBullet.trim()}
            className="h-9 w-9"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Tips */}
      {bullets.length > 0 && (
        <p className="text-xs text-white/40">
          💡 Tip: Use action verbs and include metrics (e.g., &ldquo;Increased sales by 25%&rdquo;)
        </p>
      )}
    </div>
  );
}

