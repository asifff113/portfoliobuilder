"use client";

import { useState } from "react";
import { Search, Globe, Eye, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SeoControlsProps {
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
  };
  onChange: (seo: SeoControlsProps["seo"]) => void;
  portfolioUrl?: string;
}

export function SeoControls({ seo, onChange, portfolioUrl }: SeoControlsProps) {
  const [copied, setCopied] = useState(false);

  const updateSeo = <K extends keyof SeoControlsProps["seo"]>(
    key: K,
    value: SeoControlsProps["seo"][K]
  ) => {
    onChange({ ...seo, [key]: value });
  };

  const copyUrl = () => {
    if (portfolioUrl) {
      navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const titleLength = (seo.title || "").length;
  const descLength = (seo.description || "").length;

  return (
    <Card className="border-white/10 bg-white/5 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <Search className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">SEO Settings</h3>
          <p className="text-sm text-white/50">Optimize for search engines</p>
        </div>
      </div>

      {/* Portfolio URL */}
      {portfolioUrl && (
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">Your Portfolio URL</label>
          <div className="flex gap-2">
            <div className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm truncate">
              {portfolioUrl}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyUrl}
              className="border-white/20 shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Page Title */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">
          Page Title
          <span className={`ml-2 text-xs ${titleLength > 60 ? "text-red-400" : "text-white/40"}`}>
            {titleLength}/60
          </span>
        </label>
        <input
          type="text"
          value={seo.title || ""}
          onChange={(e) => updateSeo("title", e.target.value)}
          placeholder="John Doe - Full Stack Developer"
          maxLength={70}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
        />
      </div>

      {/* Meta Description */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">
          Meta Description
          <span className={`ml-2 text-xs ${descLength > 160 ? "text-red-400" : "text-white/40"}`}>
            {descLength}/160
          </span>
        </label>
        <textarea
          value={seo.description || ""}
          onChange={(e) => updateSeo("description", e.target.value)}
          placeholder="I'm a full stack developer specializing in React, Node.js, and modern web technologies..."
          maxLength={200}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
        />
      </div>

      {/* OG Image */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-1">Social Share Image</label>
        <input
          type="text"
          value={seo.ogImage || ""}
          onChange={(e) => updateSeo("ogImage", e.target.value)}
          placeholder="https://example.com/og-image.jpg"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
        />
        <p className="text-xs text-white/40 mt-1">Recommended: 1200x630 pixels</p>
      </div>

      {/* Search Engine Preview */}
      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <p className="text-xs text-white/40 mb-3">Search Engine Preview</p>
        <div className="space-y-1">
          <p className="text-blue-400 text-lg truncate">
            {seo.title || "Your Portfolio Title"}
          </p>
          <p className="text-green-500 text-sm truncate">
            {portfolioUrl || "yourportfolio.com/username"}
          </p>
          <p className="text-white/50 text-sm line-clamp-2">
            {seo.description || "Add a compelling description to attract visitors from search engines..."}
          </p>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-3 pt-3 border-t border-white/10">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={seo.noIndex || false}
            onChange={(e) => updateSeo("noIndex", e.target.checked)}
            className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-sm text-white/70">Hide from search engines (noindex)</span>
        </label>
      </div>
    </Card>
  );
}
