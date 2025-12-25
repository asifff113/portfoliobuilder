"use client";

import { useState } from "react";
import { Plus, Trash2, Award, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SocialProofItem } from "@/types/portfolio";

interface SocialProofEditorProps {
  items: SocialProofItem[];
  onChange: (items: SocialProofItem[]) => void;
}

export function SocialProofEditor({ items, onChange }: SocialProofEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addItem = (type: "logo" | "certification" | "award") => {
    const newItem: SocialProofItem = {
      id: crypto.randomUUID(),
      type,
      name: "",
      imageUrl: "",
      url: "",
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<SocialProofItem>) => {
    onChange(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const typeLabels: Record<string, string> = { logo: "Client Logo", certification: "Certification", award: "Award" };
  const typeIcons: Record<string, typeof Building2> = { logo: Building2, certification: Award, award: Award };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Social Proof</h3>
        <div className="flex gap-2">
          <Button onClick={() => addItem("logo")} size="sm" variant="outline" className="border-white/20">
            <Building2 className="mr-2 h-4 w-4" />
            Add Logo
          </Button>
          <Button onClick={() => addItem("certification")} size="sm" variant="outline" className="border-white/20">
            <Award className="mr-2 h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <Building2 className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No social proof yet. Add client logos, awards, or certifications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {items.map((item) => {
            const IconComponent = typeIcons[item.type] || Building2;
            return (
              <Card
                key={item.id}
                className="border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-cyan-400 uppercase">{typeLabels[item.type] || item.type}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                    className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-12 object-contain opacity-70" />
                ) : (
                  <div className="w-full h-12 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-white/20" />
                  </div>
                )}
                
                <p className="text-sm text-white/70 mt-2 truncate">{item.name || "Untitled"}</p>

                {expandedId === item.id && (
                  <div className="mt-3 space-y-3 border-t border-white/10 pt-3" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Name</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, { name: e.target.value })}
                        placeholder="Client Name or Award"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={item.imageUrl || ""}
                        onChange={(e) => updateItem(item.id, { imageUrl: e.target.value })}
                        placeholder="https://example.com/logo.png"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/70 mb-1">Link (optional)</label>
                      <input
                        type="text"
                        value={item.url || ""}
                        onChange={(e) => updateItem(item.id, { url: e.target.value })}
                        placeholder="https://..."
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
