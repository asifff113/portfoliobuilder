"use client";

import { useState } from "react";
import { Plus, Trash2, Download, QrCode, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CvSectionEditorProps {
  config: {
    title?: string;
    subtitle?: string;
    cvUrl?: string;
    showQrCode?: boolean;
    showDownloadCount?: boolean;
    buttonText?: string;
    summary?: string;
    highlights?: string[];
  };
  onChange: (config: CvSectionEditorProps["config"]) => void;
}

export function CvSectionEditor({ config, onChange }: CvSectionEditorProps) {
  const updateConfig = <K extends keyof CvSectionEditorProps["config"]>(
    key: K,
    value: CvSectionEditorProps["config"][K]
  ) => {
    onChange({ ...config, [key]: value });
  };

  const addHighlight = () => {
    updateConfig("highlights", [...(config.highlights || []), ""]);
  };

  const updateHighlight = (index: number, value: string) => {
    const highlights = [...(config.highlights || [])];
    highlights[index] = value;
    updateConfig("highlights", highlights);
  };

  const removeHighlight = (index: number) => {
    updateConfig("highlights", (config.highlights || []).filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white flex items-center gap-2">
        <FileText className="h-5 w-5 text-cyan-400" />
        CV / Resume Section
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Title</label>
            <input
              type="text"
              value={config.title || ""}
              onChange={(e) => updateConfig("title", e.target.value)}
              placeholder="Download My CV"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Button Text</label>
            <input
              type="text"
              value={config.buttonText || ""}
              onChange={(e) => updateConfig("buttonText", e.target.value)}
              placeholder="Download PDF"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">CV File URL</label>
          <input
            type="url"
            value={config.cvUrl || ""}
            onChange={(e) => updateConfig("cvUrl", e.target.value)}
            placeholder="https://yoursite.com/cv.pdf"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-1">Summary</label>
          <textarea
            value={config.summary || ""}
            onChange={(e) => updateConfig("summary", e.target.value)}
            placeholder="Brief professional summary..."
            rows={3}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/70 mb-2">Key Highlights</label>
          <div className="space-y-2">
            {(config.highlights || []).map((highlight, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-cyan-400 mt-2">•</span>
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  placeholder="5+ years experience in..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeHighlight(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addHighlight}
              className="border-dashed border-white/20"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Highlight
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showQrCode || false}
              onChange={(e) => updateConfig("showQrCode", e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-white/70">Show QR Code</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={config.showDownloadCount || false}
              onChange={(e) => updateConfig("showDownloadCount", e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
            />
            <span className="text-sm text-white/70">Show Download Count</span>
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 rounded-lg border border-white/10 bg-white/5">
        <p className="text-xs text-white/40 mb-4">Preview</p>
        <div className="flex gap-6">
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-white mb-2">
              {config.title || "Download My CV"}
            </h4>
            <p className="text-white/50 text-sm mb-4">
              {config.summary || "Add a summary to give visitors a quick overview"}
            </p>
            <Button className="neon-gradient" disabled>
              <Download className="mr-2 h-4 w-4" />
              {config.buttonText || "Download PDF"}
            </Button>
          </div>
          {config.showQrCode && (
            <div className="w-24 h-24 rounded-lg bg-white/10 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-white/30" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
