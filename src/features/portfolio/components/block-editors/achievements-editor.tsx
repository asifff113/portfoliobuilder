"use client";

import { useState } from "react";
import { Plus, Trash2, Trophy, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AchievementItem } from "@/types/portfolio";

interface AchievementsEditorProps {
  achievements: AchievementItem[];
  onChange: (achievements: AchievementItem[]) => void;
}

const iconOptions = [
  { id: "trophy", Icon: Trophy, label: "Trophy" },
  { id: "trending", Icon: TrendingUp, label: "Growth" },
  { id: "users", Icon: Users, label: "Users" },
  { id: "zap", Icon: Zap, label: "Power" },
];

export function AchievementsEditor({ achievements, onChange }: AchievementsEditorProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addAchievement = () => {
    const newAchievement: AchievementItem = {
      id: crypto.randomUUID(),
      label: "",
      value: 0,
      suffix: "+",
      icon: "trophy",
    };
    onChange([...achievements, newAchievement]);
    setExpandedId(newAchievement.id);
  };

  const updateAchievement = (id: string, updates: Partial<AchievementItem>) => {
    onChange(achievements.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAchievement = (id: string) => {
    onChange(achievements.filter(a => a.id !== id));
  };

  const getIcon = (iconId: string) => {
    const found = iconOptions.find(o => o.id === iconId);
    return found ? found.Icon : Trophy;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Achievements & Metrics</h3>
        <Button onClick={addAchievement} size="sm" className="neon-gradient">
          <Plus className="mr-2 h-4 w-4" />
          Add Metric
        </Button>
      </div>

      {achievements.length === 0 ? (
        <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
          <Trophy className="mx-auto mb-4 h-12 w-12 text-white/30" />
          <p className="text-white/50">No achievements yet. Add impressive metrics to showcase your impact.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const IconComponent = getIcon(achievement.icon || "trophy");
            return (
              <Card
                key={achievement.id}
                className="border-white/10 bg-white/5 p-4 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setExpandedId(expandedId === achievement.id ? null : achievement.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-cyan-400" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); deleteAchievement(achievement.id); }}
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-2xl font-bold text-white">
                  {achievement.value.toLocaleString()}{achievement.suffix}
                </div>
                <div className="text-sm text-white/50">{achievement.label || "Untitled"}</div>

                {expandedId === achievement.id && (
                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4" onClick={(e) => e.stopPropagation()}>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Label</label>
                      <input
                        type="text"
                        value={achievement.label}
                        onChange={(e) => updateAchievement(achievement.id, { label: e.target.value })}
                        placeholder="Projects Completed"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-white/70 mb-1">Value</label>
                        <input
                          type="number"
                          value={achievement.value}
                          onChange={(e) => updateAchievement(achievement.id, { value: parseInt(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-white/70 mb-1">Suffix</label>
                        <input
                          type="text"
                          value={achievement.suffix || ""}
                          onChange={(e) => updateAchievement(achievement.id, { suffix: e.target.value })}
                          placeholder="+ or %"
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-white/70 mb-1">Icon</label>
                      <div className="flex gap-2">
                        {iconOptions.map(({ id, Icon, label }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => updateAchievement(achievement.id, { icon: id })}
                            className={`p-2 rounded-lg border transition-colors ${
                              achievement.icon === id
                                ? "border-cyan-400 bg-cyan-500/20"
                                : "border-white/10 hover:border-white/30"
                            }`}
                            title={label}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </button>
                        ))}
                      </div>
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
