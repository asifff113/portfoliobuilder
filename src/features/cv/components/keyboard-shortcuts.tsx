"use client";

import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const shortcuts: Shortcut[] = [
  // General
  { keys: ["Ctrl", "S"], description: "Save CV", category: "General" },
  { keys: ["Ctrl", "Z"], description: "Undo", category: "General" },
  { keys: ["Ctrl", "Shift", "Z"], description: "Redo", category: "General" },
  { keys: ["?"], description: "Show keyboard shortcuts", category: "General" },
  
  // Navigation
  { keys: ["Tab"], description: "Move to next field", category: "Navigation" },
  { keys: ["Shift", "Tab"], description: "Move to previous field", category: "Navigation" },
  { keys: ["Esc"], description: "Close modal / Cancel", category: "Navigation" },
  
  // Editing
  { keys: ["Ctrl", "B"], description: "Bold text (in rich editor)", category: "Editing" },
  { keys: ["Ctrl", "I"], description: "Italic text (in rich editor)", category: "Editing" },
  { keys: ["Enter"], description: "Add bullet point", category: "Editing" },
  { keys: ["Backspace"], description: "Delete empty bullet", category: "Editing" },
  
  // Export
  { keys: ["Ctrl", "P"], description: "Export as PDF", category: "Export" },
  { keys: ["Ctrl", "Shift", "E"], description: "Open export menu", category: "Export" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  // Listen for ? key to open shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        // Don't trigger if typing in an input
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA"
        ) {
          return;
        }
        e.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] max-w-lg flex-col gap-4 border-white/10 bg-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Keyboard className="h-5 w-5 text-neon-cyan" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription className="text-white/50">
            Use these shortcuts to work faster
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2 space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-medium text-white/70">{category}</h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                  >
                    <span className="text-sm text-white/80">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="rounded bg-white/10 px-2 py-1 text-xs font-medium text-white">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-white/30">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-neon-cyan/10 p-3 text-center text-sm text-neon-cyan">
          Press <kbd className="mx-1 rounded bg-neon-cyan/20 px-2 py-0.5 font-medium">?</kbd> anytime to show this dialog
        </div>
      </DialogContent>
    </Dialog>
  );
}

