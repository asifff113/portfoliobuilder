"use client";

import { useState } from "react";
import { Sparkles, Loader2, Wand2, RefreshCw, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface AIInlineHelperProps {
  /** Type of content being edited */
  type: "headline" | "summary" | "bullet" | "description" | "skill" | "text";
  /** Current value of the field */
  currentValue?: string;
  /** Context for better AI suggestions */
  context?: {
    role?: string;
    company?: string;
    industry?: string;
    skills?: string[];
    projectName?: string;
    techStack?: string[];
  };
  /** Callback when user accepts a suggestion */
  onAccept: (value: string) => void;
  /** Optional: generate multiple suggestions */
  multipleResults?: boolean;
  /** Button size */
  size?: "sm" | "default" | "icon";
  /** Custom label */
  label?: string;
}

export function AIInlineHelper({
  type,
  currentValue,
  context,
  onAccept,
  multipleResults = false,
  size = "icon",
  label,
}: AIInlineHelperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      // Dynamic import to avoid SSR issues
      const gemini = await import("@/lib/ai/gemini");

      let results: string[] = [];

      switch (type) {
        case "headline":
          if (context?.role) {
            const headline = await gemini.generateHeadline(
              context.role,
              context.industry
            );
            results = [headline];
          } else {
            throw new Error("Role is required for headline generation");
          }
          break;

        case "summary":
          if (context?.role) {
            const summary = await gemini.generateSummary(
              context.role,
              3, // default years
              context.skills || [],
              currentValue
            );
            results = [summary];
          } else {
            throw new Error("Role is required for summary generation");
          }
          break;

        case "bullet":
          if (context?.role && context?.company) {
            const bullets = await gemini.generateExperienceBullets(
              context.role,
              context.company,
              context.industry,
              currentValue ? [currentValue] : undefined
            );
            results = bullets;
          } else if (currentValue) {
            const improved = await gemini.improveBullet(currentValue, context);
            results = [improved];
          } else {
            throw new Error("Role and company are required for bullet generation");
          }
          break;

        case "description":
          if (context?.projectName) {
            const desc = await gemini.generateProjectDescription(
              context.projectName,
              context.techStack,
              context.industry
            );
            results = [desc];
          } else if (currentValue) {
            const improved = await gemini.makeProfessional(currentValue);
            results = [improved];
          }
          break;

        case "skill":
          if (context?.role) {
            const skills = await gemini.suggestSkills(
              context.role,
              context.skills
            );
            results = skills;
          }
          break;

        case "text":
        default:
          if (currentValue) {
            const improved = await gemini.improveWriting(currentValue);
            results = [improved];
          }
          break;
      }

      if (results.length === 0) {
        throw new Error("No suggestions generated. Please provide more context.");
      }

      setSuggestions(multipleResults ? results : results.slice(0, 1));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate suggestions";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = (suggestion: string) => {
    onAccept(suggestion);
    setIsOpen(false);
    setSuggestions([]);
    toast.success("Applied AI suggestion!");
  };

  const handleRegenerate = () => {
    generateSuggestions();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={size}
          className="text-purple-500 hover:text-purple-600 hover:bg-purple-50"
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
              generateSuggestions();
            }
          }}
        >
          <Sparkles className="h-4 w-4" />
          {label && <span className="ml-1">{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b bg-linear-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-purple-500" />
            <span className="font-medium text-sm">AI Suggestions</span>
          </div>
        </div>

        <div className="p-3 max-h-[300px] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
              <span className="ml-2 text-sm text-muted-foreground">
                Generating...
              </span>
            </div>
          )}

          {error && !isLoading && (
            <div className="text-center py-4">
              <p className="text-sm text-red-500 mb-2">{error}</p>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRegenerate}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && suggestions.length > 0 && (
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group p-2 rounded-lg border bg-white hover:border-purple-300 hover:bg-purple-50/50 transition-colors"
                >
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                    {suggestion}
                  </p>
                  <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleAccept(suggestion)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t flex items-center justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={handleRegenerate}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Regenerate
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs text-muted-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-3 w-3 mr-1" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * AI button that generates and applies suggestions directly to a field
 */
interface AIQuickButtonProps {
  type: "improve" | "professional" | "concise";
  currentValue: string;
  onUpdate: (value: string) => void;
  disabled?: boolean;
}

export function AIQuickButton({
  type,
  currentValue,
  onUpdate,
  disabled,
}: AIQuickButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const labels = {
    improve: "Improve",
    professional: "Make Professional",
    concise: "Make Concise",
  };

  const handleClick = async () => {
    if (!currentValue.trim()) {
      toast.error("Please enter some text first");
      return;
    }

    setIsLoading(true);
    try {
      const gemini = await import("@/lib/ai/gemini");
      let result: string;

      switch (type) {
        case "professional":
          result = await gemini.makeProfessional(currentValue);
          break;
        case "concise":
          result = await gemini.makeConcise(currentValue);
          break;
        case "improve":
        default:
          result = await gemini.improveWriting(currentValue);
          break;
      }

      onUpdate(result);
      toast.success("Text improved!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to improve text");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="text-purple-500 hover:text-purple-600 hover:bg-purple-50 h-7 px-2 text-xs"
      onClick={handleClick}
      disabled={disabled || isLoading || !currentValue.trim()}
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin mr-1" />
      ) : (
        <Sparkles className="h-3 w-3 mr-1" />
      )}
      {labels[type]}
    </Button>
  );
}

/**
 * Skills AI Suggester - suggests multiple skills at once
 */
interface AISkillsSuggesterProps {
  role: string;
  existingSkills: string[];
  onAddSkills: (skills: string[]) => void;
}

export function AISkillsSuggester({
  role,
  existingSkills,
  onAddSkills,
}: AISkillsSuggesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const generateSkills = async () => {
    if (!role.trim()) {
      toast.error("Please enter a job title first");
      return;
    }

    setIsLoading(true);
    try {
      const gemini = await import("@/lib/ai/gemini");
      const skills = await gemini.suggestSkills(role, existingSkills);
      setSuggestions(skills.filter(s => !existingSkills.includes(s)));
      setSelected(new Set());
    } catch {
      toast.error("Failed to suggest skills");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSkill = (skill: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(skill)) {
      newSelected.delete(skill);
    } else {
      newSelected.add(skill);
    }
    setSelected(newSelected);
  };

  const handleAddSelected = () => {
    if (selected.size > 0) {
      onAddSkills(Array.from(selected));
      setIsOpen(false);
      setSuggestions([]);
      setSelected(new Set());
      toast.success(`Added ${selected.size} skills!`);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-purple-500 border-purple-200 hover:bg-purple-50"
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
              generateSkills();
            }
          }}
        >
          <Sparkles className="h-4 w-4 mr-1" />
          AI Suggest Skills
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-3 border-b bg-linear-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-purple-500" />
            <span className="font-medium text-sm">Suggested Skills</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on: {role || "your role"}
          </p>
        </div>

        <div className="p-3 max-h-[250px] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
              <span className="ml-2 text-sm text-muted-foreground">
                Finding skills...
              </span>
            </div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <div className="space-y-1">
              {suggestions.map((skill, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selected.has(skill)
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "hover:bg-gray-100 border border-transparent"
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  <div className="flex items-center justify-between">
                    <span>{skill}</span>
                    {selected.has(skill) && (
                      <Check className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {!isLoading && suggestions.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-4">
              No new skills to suggest
            </p>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs"
              onClick={generateSkills}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
            <Button
              size="sm"
              disabled={selected.size === 0}
              onClick={handleAddSelected}
            >
              Add {selected.size > 0 ? `(${selected.size})` : "Selected"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

/**
 * AI Bullet Generator - generates multiple bullets for experience/projects
 */
interface AIBulletGeneratorProps {
  role: string;
  company: string;
  industry?: string;
  existingBullets?: string[];
  onAddBullets: (bullets: string[]) => void;
}

export function AIBulletGenerator({
  role,
  company,
  industry,
  existingBullets = [],
  onAddBullets,
}: AIBulletGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const generateBullets = async () => {
    if (!role.trim() || !company.trim()) {
      toast.error("Please enter role and company first");
      return;
    }

    setIsLoading(true);
    try {
      const gemini = await import("@/lib/ai/gemini");
      const bullets = await gemini.generateExperienceBullets(
        role,
        company,
        industry,
        existingBullets
      );
      setSuggestions(bullets);
      setSelected(new Set());
    } catch {
      toast.error("Failed to generate bullets");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBullet = (index: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelected(newSelected);
  };

  const handleAddSelected = () => {
    if (selected.size > 0) {
      const bulletsToAdd = Array.from(selected).map(i => suggestions[i]);
      onAddBullets(bulletsToAdd);
      setIsOpen(false);
      setSuggestions([]);
      setSelected(new Set());
      toast.success(`Added ${selected.size} bullet points!`);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-purple-500 border-purple-200 hover:bg-purple-50"
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
              generateBullets();
            }
          }}
        >
          <Sparkles className="h-4 w-4 mr-1" />
          AI Generate Bullets
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <div className="p-3 border-b bg-linear-to-r from-purple-50 to-indigo-50">
          <div className="flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-purple-500" />
            <span className="font-medium text-sm">Generated Bullet Points</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            For: {role} at {company}
          </p>
        </div>

        <div className="p-3 max-h-[300px] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
              <span className="ml-2 text-sm text-muted-foreground">
                Generating bullets...
              </span>
            </div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <div className="space-y-2">
              {suggestions.map((bullet, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                    selected.has(index)
                      ? "bg-purple-100 text-purple-700 border border-purple-300"
                      : "hover:bg-gray-100 border border-gray-200"
                  }`}
                  onClick={() => toggleBullet(index)}
                >
                  <div className="flex items-start gap-2">
                    <span className="flex-1 leading-relaxed">{bullet}</span>
                    {selected.has(index) && (
                      <Check className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <div className="p-3 border-t bg-gray-50 flex items-center justify-between">
            <Button
              size="sm"
              variant="ghost"
              className="text-xs"
              onClick={generateBullets}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Regenerate
            </Button>
            <Button
              size="sm"
              disabled={selected.size === 0}
              onClick={handleAddSelected}
            >
              Add {selected.size > 0 ? `(${selected.size})` : "Selected"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

