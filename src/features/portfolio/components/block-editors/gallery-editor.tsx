"use client";

import { useState } from "react";
import { Plus, Trash2, ImagePlus, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { GalleryItem } from "@/types/portfolio";

interface GalleryEditorProps {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}

export function GalleryEditor({ items, onChange }: GalleryEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addItem = (type: "image" | "video") => {
    const newItem: GalleryItem = {
      id: crypto.randomUUID(),
      type,
      url: "",
      caption: "",
      alt: "",
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<GalleryItem>) => {
    onChange(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Gallery</h3>
        <div className="flex gap-2">
          <Button onClick={() => addItem("image")} size="sm" variant="outline" className="border-white/20">
            <ImagePlus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <Button onClick={() => addItem("video")} size="sm" variant="outline" className="border-white/20">
            <Video className="mr-2 h-4 w-4" />
            Add Video
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <ImagePlus className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No gallery items yet. Add images or videos to showcase your work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="border-white/10 bg-white/5 overflow-hidden cursor-pointer hover:bg-white/10 transition-colors group"
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <div className="aspect-video relative bg-white/5">
                {item.url ? (
                  item.type === "image" ? (
                    <img src={item.url} alt={item.alt || ""} className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.url} className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    {item.type === "image" ? (
                      <ImagePlus className="h-8 w-8 text-white/20" />
                    ) : (
                      <Video className="h-8 w-8 text-white/20" />
                    )}
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              
              {expandedId === item.id && (
                <div className="p-3 space-y-3 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">URL</label>
                    <input
                      type="text"
                      value={item.url}
                      onChange={(e) => updateItem(item.id, { url: e.target.value })}
                      placeholder={item.type === "image" ? "https://example.com/image.jpg" : "https://youtube.com/..."}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/70 mb-1">Caption</label>
                    <input
                      type="text"
                      value={item.caption}
                      onChange={(e) => updateItem(item.id, { caption: e.target.value })}
                      placeholder="Project screenshot"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
