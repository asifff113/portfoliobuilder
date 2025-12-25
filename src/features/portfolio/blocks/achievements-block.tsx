"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, Zap } from "lucide-react";
import type { AchievementItem } from "@/types/portfolio";

interface AchievementsBlockProps {
  achievements: AchievementItem[];
  accentColor?: string;
}

const iconMap: Record<string, typeof Trophy> = {
  trophy: Trophy,
  trending: TrendingUp,
  users: Users,
  zap: Zap,
};

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function AchievementsBlock({ achievements, accentColor = "#06b6d4" }: AchievementsBlockProps) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section 
      className="py-20 px-6"
      style={{ background: `linear-gradient(135deg, ${accentColor}10, transparent)` }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-16 text-center"
        >
          Impact & Achievements
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon || "trophy"] || Trophy;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: accentColor + "20" }}
                >
                  <IconComponent 
                    className="h-8 w-8 transition-transform group-hover:scale-110"
                    style={{ color: accentColor }}
                  />
                </motion.div>
                <AnimatedCounter value={achievement.value} suffix={achievement.suffix} />
                <p className="text-white/50 mt-2">{achievement.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
