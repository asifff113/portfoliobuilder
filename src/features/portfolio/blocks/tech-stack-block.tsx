"use client";

import { motion } from "framer-motion";
import type { TechStackItem } from "@/types/portfolio";

interface TechStackBlockProps {
  items: TechStackItem[];
  accentColor?: string;
}

const categoryColors: Record<string, string> = {
  Frontend: "#3b82f6",
  Backend: "#10b981",
  DevOps: "#f59e0b",
  Database: "#8b5cf6",
  Mobile: "#ec4899",
  Tools: "#14b8a6",
  Other: "#6b7280",
};

export function TechStackBlock({ items, accentColor = "#06b6d4" }: TechStackBlockProps) {
  if (!items || items.length === 0) return null;

  // Group by category
  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, TechStackItem[]>);

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          Tech Stack
        </motion.h2>

        <div className="space-y-10">
          {Object.entries(grouped).map(([category, categoryItems], catIndex) => {
            const catColor = categoryColors[category] || accentColor;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: catColor }}
                  />
                  <h3 className="text-lg font-semibold text-white/80">{category}</h3>
                </div>

                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-white">{item.name}</span>
                        <span className="text-sm text-white/40">{item.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="h-full rounded-full"
                          style={{ 
                            background: `linear-gradient(90deg, ${catColor}, ${catColor}80)` 
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
