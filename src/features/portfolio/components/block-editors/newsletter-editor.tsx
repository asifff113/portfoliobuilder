"use client";

import { useState } from "react";
import { Plus, Trash2, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface NewsletterEditorProps {
  config: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    successMessage?: string;
    backgroundColor?: string;
    style?: "minimal" | "card" | "fullwidth";
  };
  onChange: (config: NewsletterEditorProps["config"]) => void;
}

const styleOptions = [
  { value: "minimal", label: "Minimal", icon: "━" },
  { value: "card", label: "Card", icon: "▢" },
  { value: "fullwidth", label: "Full Width", icon: "▭" },
] as const;

export function NewsletterEditor({ config, onChange }: NewsletterEditorProps) {
  const updateConfig = <K extends keyof NewsletterEditorProps["config"]>(
    key: K,
    value: NewsletterEditorProps["config"][K]
  ) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white flex items-center gap-2">
        <Mail className="h-5 w-5 text-cyan-400" />
        Newsletter Block
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/70 mb-1">Title</label>
          <input
            type="text"
            value={config.title || ""}
            onChange={(e) => updateConfig("title", e.target.value)}
            placeholder="Stay Updated"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Subtitle</label>
          <input
            type="text"
            value={config.subtitle || ""}
            onChange={(e) => updateConfig("subtitle", e.target.value)}
            placeholder="Get the latest updates delivered to your inbox"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Button Text</label>
            <input
              type="text"
              value={config.buttonText || ""}
              onChange={(e) => updateConfig("buttonText", e.target.value)}
              placeholder="Subscribe"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Success Message</label>
            <input
              type="text"
              value={config.successMessage || ""}
              onChange={(e) => updateConfig("successMessage", e.target.value)}
              placeholder="Thanks for subscribing!"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-2">Style</label>
          <div className="flex gap-2">
            {styleOptions.map((style) => (
              <button
                key={style.value}
                onClick={() => updateConfig("style", style.value)}
                className={`flex-1 px-4 py-3 rounded-lg border text-center transition-colors ${
                  config.style === style.value
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                    : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                }`}
              >
                <div className="text-lg mb-1">{style.icon}</div>
                <div className="text-xs">{style.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
        <p className="text-xs text-white/40 mb-3">Preview</p>
        <div className="text-center py-4">
          <Sparkles className="h-8 w-8 mx-auto mb-3 text-cyan-400" />
          <p className="text-lg font-semibold text-white mb-1">{config.title || "Stay Updated"}</p>
          <p className="text-sm text-white/50 mb-4">{config.subtitle || "Get the latest updates"}</p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <div className="flex-1 h-10 rounded-lg border border-white/10 bg-white/5" />
            <Button className="neon-gradient" disabled>
              {config.buttonText || "Subscribe"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
