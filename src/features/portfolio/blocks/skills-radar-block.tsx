"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  value: number;
}

interface SkillsRadarBlockProps {
  skills: Skill[];
  accentColor?: string;
}

export function SkillsRadarBlock({ skills, accentColor = "#06b6d4" }: SkillsRadarBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  if (!skills || skills.length < 3) return null;

  const size = 300;
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = radius + 25;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, isVisible ? skill.value : 0);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  const gridLevels = [25, 50, 75, 100];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Skills</h2>
          <p className="text-white/50">Technical proficiency overview</p>
        </motion.div>

        <div className="flex justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* Background grid */}
            {gridLevels.map((level) => (
              <polygon
                key={level}
                points={skills
                  .map((_, i) => {
                    const point = getPoint(i, level);
                    return `${point.x},${point.y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            {skills.map((skill, i) => {
              const point = getPoint(i, 100);
              const labelPoint = getLabelPoint(i);
              return (
                <g key={i}>
                  <line
                    x1={center}
                    y1={center}
                    x2={point.x}
                    y2={point.y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="12"
                    fontWeight="500"
                  >
                    {skill.name}
                  </text>
                </g>
              );
            })}

            {/* Data polygon */}
            <motion.polygon
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              points={polygonPoints}
              fill={accentColor + "30"}
              stroke={accentColor}
              strokeWidth="2"
            />

            {/* Data points */}
            {skills.map((skill, i) => {
              const point = getPoint(i, isVisible ? skill.value : 0);
              return (
                <motion.g key={i}>
                  <motion.circle
                    initial={{ scale: 0 }}
                    animate={{ scale: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    cx={point.x}
                    cy={point.y}
                    r="6"
                    fill={accentColor}
                  />
                  <motion.text
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    x={point.x}
                    y={point.y - 15}
                    textAnchor="middle"
                    fill="white"
                    fontSize="11"
                    fontWeight="600"
                  >
                    {skill.value}%
                  </motion.text>
                </motion.g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
              transition={{ delay: 0.8 + i * 0.05 }}
              className="flex items-center gap-2"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-white/70 text-sm">{skill.name}</span>
              <span className="text-white/40 text-sm">({skill.value}%)</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
