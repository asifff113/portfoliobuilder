"use client";

import { useState } from "react";
import { Plus, Trash2, Code2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TechStackItem } from "@/types/portfolio";

interface TechStackEditorProps {
  items: TechStackItem[];
  onChange: (items: TechStackItem[]) => void;
}

const categoryOptions = [
  "Frontend",
  "Backend",
  "DevOps",
  "Database",
  "Mobile",
  "Tools",
  "Other",
];

export function TechStackEditor({ items, onChange }: TechStackEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addItem = () => {
    const newItem: TechStackItem = {
      id: crypto.randomUUID(),
      name: "",
      category: "Frontend",
      proficiency: 80,
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<TechStackItem>) => {
    onChange(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, TechStackItem[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Tech Stack</h3>
        <Button onClick={addItem} size="sm" className="neon-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <Layers className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No skills yet. Add your technical expertise.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              <h4 className="text-sm font-medium text-white/50 mb-2 flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {categoryItems.map((item) => (
                  <Card
                    key={item.id}
                    className="border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10 transition-colors"
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{item.name || "Unnamed"}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                        className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                    <div className="text-xs text-white/40 mt-1">{item.proficiency}%</div>

                    {expandedId === item.id && (
                      <div className="mt-3 space-y-3 border-t border-white/10 pt-3" onClick={(e) => e.stopPropagation()}>
                        <div>
                          <label className="block text-xs text-white/70 mb-1">Name</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, { name: e.target.value })}
                            placeholder="React.js"
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-white/70 mb-1">Category</label>
                          <select
                            value={item.category}
                            onChange={(e) => updateItem(item.id, { category: e.target.value })}
                            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                          >
                            {categoryOptions.map((cat) => (
                              <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-white/70 mb-1">Proficiency: {item.proficiency}%</label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={item.proficiency}
                            onChange={(e) => updateItem(item.id, { proficiency: parseInt(e.target.value) })}
                            className="w-full accent-cyan-500"
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
