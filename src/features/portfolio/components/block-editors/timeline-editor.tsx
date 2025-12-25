"use client";

import { useState } from "react";
import { Plus, Trash2, Clock, Briefcase, GraduationCap, Award, Milestone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TimelineItem } from "@/types/portfolio";

interface TimelineEditorProps {
  items: TimelineItem[];
  onChange: (items: TimelineItem[]) => void;
}

const typeOptions = [
  { id: "work", Icon: Briefcase, label: "Work", color: "text-blue-400" },
  { id: "education", Icon: GraduationCap, label: "Education", color: "text-green-400" },
  { id: "project", Icon: Award, label: "Project", color: "text-purple-400" },
  { id: "milestone", Icon: Milestone, label: "Milestone", color: "text-yellow-400" },
] as const;

export function TimelineEditor({ items, onChange }: TimelineEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addItem = () => {
    const newItem: TimelineItem = {
      id: crypto.randomUUID(),
      date: new Date().getFullYear().toString(),
      title: "",
      subtitle: "",
      description: "",
      type: "work",
    };
    onChange([...items, newItem]);
    setExpandedId(newItem.id);
  };

  const updateItem = (id: string, updates: Partial<TimelineItem>) => {
    onChange(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const deleteItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const getTypeConfig = (type: string) => {
    return typeOptions.find(t => t.id === type) || typeOptions[0];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Timeline</h3>
        <Button onClick={addItem} size="sm" className="neon-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <Clock className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No timeline events yet. Add your career milestones.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const config = getTypeConfig(item.type);
            const IconComponent = config.Icon;
            return (
              <Card
                key={item.id}
                className="border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0`}>
                    <IconComponent className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">{item.title || "Untitled"}</p>
                        <p className="text-sm text-white/50">{item.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-cyan-400">{item.date}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedId === item.id && (
                  <div className="mt-4 space-y-4 border-t border-white/10 pt-4" onClick={(e) => e.stopPropagation()}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/70 mb-1">Date</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => updateItem(item.id, { date: e.target.value })}
                          placeholder="2024 or Jan 2024"
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/70 mb-1">Type</label>
                        <div className="flex gap-2">
                          {typeOptions.map(({ id, Icon, label, color }) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => updateItem(item.id, { type: id })}
                              className={`p-2 rounded-lg border transition-colors ${
                                item.type === id
                                  ? "border-cyan-400 bg-cyan-500/20"
                                  : "border-white/10 hover:border-white/30"
                              }`}
                              title={label}
                            >
                              <Icon className={`h-4 w-4 ${color}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Title</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateItem(item.id, { title: e.target.value })}
                        placeholder="Senior Developer"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={item.subtitle}
                        onChange={(e) => updateItem(item.id, { subtitle: e.target.value })}
                        placeholder="Company Name"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => updateItem(item.id, { description: e.target.value })}
                        placeholder="Brief description of your role or achievement..."
                        rows={3}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
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
