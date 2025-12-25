"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award, Milestone } from "lucide-react";
import type { TimelineItem } from "@/types/portfolio";

interface TimelineBlockProps {
  items: TimelineItem[];
  accentColor?: string;
}

const typeIcons: Record<string, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  project: Award,
  milestone: Milestone,
};

const typeColors: Record<string, string> = {
  work: "#3b82f6",
  education: "#10b981",
  project: "#8b5cf6",
  milestone: "#f59e0b",
};

export function TimelineBlock({ items, accentColor = "#06b6d4" }: TimelineBlockProps) {
  if (!items || items.length === 0) return null;

  // Sort by date (newest first)
  const sortedItems = [...items].sort((a, b) => {
    const yearA = parseInt(a.date.match(/\d{4}/)?.[0] || "0");
    const yearB = parseInt(b.date.match(/\d{4}/)?.[0] || "0");
    return yearB - yearA;
  });

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-12 text-center"
        >
          Journey
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}20)` }}
          />

          {sortedItems.map((item, index) => {
            const IconComponent = typeIcons[item.type] || Briefcase;
            const color = typeColors[item.type] || accentColor;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-start mb-8 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
                    style={{ backgroundColor: color + "20", color }}
                  >
                    {item.date}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                  {item.subtitle && (
                    <p className="text-white/60 mb-2">{item.subtitle}</p>
                  )}
                  {item.description && (
                    <p className="text-white/40 text-sm">{item.description}</p>
                  )}
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-10 h-10 rounded-full border-4 border-gray-900 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <IconComponent className="h-4 w-4 text-white" />
                  </motion.div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
