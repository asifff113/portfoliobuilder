"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  value: number; // 0-100
}

interface SkillsRadarEditorProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsRadarEditor({ skills, onChange }: SkillsRadarEditorProps) {
  const addSkill = () => {
    if (skills.length < 8) {
      onChange([...skills, { name: "", value: 50 }]);
    }
  };

  const updateSkill = (index: number, updates: Partial<Skill>) => {
    onChange(skills.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  };

  const removeSkill = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Skills Radar Chart</h3>
        {skills.length < 8 && (
          <button
            onClick={addSkill}
            className="px-3 py-1.5 rounded-lg text-sm bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            + Add Skill
          </button>
        )}
      </div>

      <p className="text-sm text-white/50">Add 3-8 skills to display in the radar chart</p>

      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateSkill(index, { name: e.target.value })}
              placeholder="Skill name"
              className="w-32 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={skill.value}
              onChange={(e) => updateSkill(index, { value: parseInt(e.target.value) })}
              className="flex-1 accent-cyan-500"
            />
            <span className="w-10 text-right text-white/70 text-sm">{skill.value}%</span>
            <button
              onClick={() => removeSkill(index)}
              className="p-1 text-red-400 hover:text-red-300"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Mini Preview */}
      {skills.length >= 3 && (
        <div className="mt-6 p-4 rounded-lg border border-white/10 bg-white/5">
          <p className="text-xs text-white/40 mb-3">Preview</p>
          <RadarChartPreview skills={skills} />
        </div>
      )}
    </div>
  );
}

// Mini radar chart preview component
function RadarChartPreview({ skills }: { skills: Skill[] }) {
  const size = 150;
  const center = size / 2;
  const radius = size / 2 - 20;
  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, skill.value);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  const gridLevels = [25, 50, 75, 100];

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid */}
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
              x={getPoint(i, 120).x}
              y={getPoint(i, 120).y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="8"
            >
              {skill.name.slice(0, 8)}
            </text>
          </g>
        );
      })}

      {/* Data polygon */}
      <motion.polygon
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        points={polygonPoints}
        fill="rgba(6, 182, 212, 0.2)"
        stroke="#06b6d4"
        strokeWidth="2"
      />

      {/* Data points */}
      {skills.map((skill, i) => {
        const point = getPoint(i, skill.value);
        return (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#06b6d4"
          />
        );
      })}
    </svg>
  );
}
