"use client";

/**
 * Neural Network Template
 *
 * A futuristic AI/neural network themed template:
 * - Animated node connection patterns
 * - Deep blue/purple tech aesthetic
 * - Data visualization elements
 * - Circuit-like decorations
 * - Glowing pulse effects
 * - Modern tech typography
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Brain,
  Network,
  Cpu,
  ChevronRight,
  Zap,
  Activity,
} from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
  AwardItem,
  InterestItem,
  CustomItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

const deepBlue = "#0a0e27";
const neuralPurple = "#8b5cf6";
const neuralCyan = "#22d3ee";
const neuralPink = "#ec4899";
const textLight = "#e2e8f0";
const textMuted = "#94a3b8";

export function NeuralNetworkTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 90;
  const photoShape = settings?.photoShape ?? "circle";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-lg",
    none: "hidden",
  }[photoShape];

  const formatDateRange = (start?: string, end?: string | null, isCurrent?: boolean) => {
    if (!start) return "";
    return `${start} → ${isCurrent ? "Present" : end || ""}`;
  };

  // Generate random node positions for background
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: textLight,
        padding: "0",
        background: deepBlue,
      }}
    >
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(${neuralPurple}20 1px, transparent 1px),
              linear-gradient(90deg, ${neuralPurple}20 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {nodes.slice(0, 10).map((node, i) => {
            const nextNode = nodes[(i + 1) % nodes.length];
            return (
              <line
                key={`line-${i}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${nextNode.x}%`}
                y2={`${nextNode.y}%`}
                stroke={neuralCyan}
                strokeWidth="0.5"
                opacity="0.3"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute rounded-full"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
              background: node.id % 3 === 0 ? neuralPurple : node.id % 3 === 1 ? neuralCyan : neuralPink,
              boxShadow: `0 0 ${node.size * 2}px ${node.id % 3 === 0 ? neuralPurple : node.id % 3 === 1 ? neuralCyan : neuralPink}`,
              opacity: 0.6,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${neuralPurple}15, transparent 50%),
                         radial-gradient(ellipse at 70% 80%, ${neuralCyan}10, transparent 50%)`,
          }}
        />
      </div>

      {/* Header Section */}
      <header className="relative z-10 p-8">
        <div className="relative rounded-2xl p-6 backdrop-blur-xl" style={{ background: `${deepBlue}90`, border: `1px solid ${neuralPurple}30` }}>
          {/* Glowing top border */}
          <div
            className="absolute top-0 left-1/4 right-1/4 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${neuralCyan}, transparent)`, boxShadow: `0 0 10px ${neuralCyan}` }}
          />

          <div className="flex items-center gap-6">
            {showPhoto && personalInfo.avatarUrl && (
              <div className="relative">
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    background: `conic-gradient(from 0deg, ${neuralPurple}, ${neuralCyan}, ${neuralPink}, ${neuralPurple})`,
                    padding: "3px",
                    filter: "blur(4px)",
                    opacity: 0.6,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(from 0deg, ${neuralPurple}, ${neuralCyan}, ${neuralPink}, ${neuralPurple})`,
                    padding: "2px",
                  }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: deepBlue }} />
                </div>
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className={cn("relative object-cover", photoShapeClass)}
                  style={{ width: photoSize, height: photoSize }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <Brain className="h-5 w-5" style={{ color: neuralCyan }} />
                <span className="text-xs tracking-widest uppercase" style={{ color: textMuted }}>
                  Neural Profile v2.0
                </span>
              </div>
              <h1
                className="text-3xl font-bold tracking-tight mb-1"
                style={{
                  background: `linear-gradient(135deg, ${textLight}, ${neuralCyan})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {personalInfo.fullName || "Your Name"}
              </h1>
              <p
                className="text-base font-medium mb-4"
                style={{ color: neuralPurple }}
              >
                {personalInfo.headline || "Professional Title"}
              </p>

              {/* Contact as data points */}
              <div className="flex flex-wrap gap-4 text-xs" style={{ color: textMuted }}>
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail className="h-3.5 w-3.5" style={{ color: neuralCyan }} />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" style={{ color: neuralPurple }} />
                    {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" style={{ color: neuralPink }} />
                    {personalInfo.location}
                  </span>
                )}
                {personalInfo.linkedinUrl && (
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Linkedin className="h-3.5 w-3.5" style={{ color: neuralCyan }} />
                    LinkedIn
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Github className="h-3.5 w-3.5" style={{ color: neuralPurple }} />
                    GitHub
                  </a>
                )}
              </div>
            </div>

            {/* Neural activity indicator */}
            <div className="hidden md:flex flex-col items-center gap-1">
              <Activity className="h-8 w-8" style={{ color: neuralCyan }} />
              <span className="text-[10px] uppercase tracking-wider" style={{ color: textMuted }}>Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-8 pb-8 space-y-5">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <section
              key={section.id}
              className="relative rounded-xl p-5 backdrop-blur-md"
              style={{ background: `${deepBlue}80`, border: `1px solid ${neuralPurple}20` }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{ background: `${neuralPurple}20`, border: `1px solid ${neuralPurple}40` }}
                >
                  <Network className="h-4 w-4" style={{ color: neuralCyan }} />
                </div>
                <h2
                  className="text-sm font-semibold tracking-wide uppercase"
                  style={{ color: neuralCyan }}
                >
                  {section.title}
                </h2>
                <div className="flex-1 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(90deg, ${neuralPurple}${60 - i * 10}, transparent)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* About Section */}
              {section.type === "about" && section.items.length > 0 && (
                <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
                  {(section.items[0] as { content?: string })?.content || personalInfo.summary}
                </p>
              )}

              {/* Experience Section */}
              {section.type === "experience" && (
                <div className="space-y-4">
                  {(section.items as ExperienceItem[]).map((item, idx) => (
                    <div key={item.id} className="relative pl-6">
                      {/* Node connector */}
                      <div
                        className="absolute left-0 top-2 w-3 h-3 rounded-full"
                        style={{
                          background: neuralPurple,
                          boxShadow: `0 0 8px ${neuralPurple}`,
                        }}
                      />
                      {idx < (section.items as ExperienceItem[]).length - 1 && (
                        <div
                          className="absolute left-[5px] top-5 w-0.5 h-full"
                          style={{ background: `linear-gradient(180deg, ${neuralPurple}60, transparent)` }}
                        />
                      )}

                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold text-sm" style={{ color: textLight }}>
                            {item.role}
                          </h3>
                          <p className="text-xs" style={{ color: neuralCyan }}>
                            {item.company}
                            {item.location && <span style={{ color: textMuted }}> • {item.location}</span>}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${neuralPurple}20`, color: neuralPurple }}
                        >
                          {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                        </span>
                      </div>
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {item.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="flex items-start gap-2 text-xs" style={{ color: textMuted }}>
                              <Zap className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: neuralCyan }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education Section */}
              {section.type === "education" && (
                <div className="space-y-3">
                  {(section.items as EducationItem[]).map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-sm" style={{ color: textLight }}>
                          {item.degree} {item.fieldOfStudy && `• ${item.fieldOfStudy}`}
                        </h3>
                        <p className="text-xs" style={{ color: neuralCyan }}>
                          {item.institution}
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: textMuted }}>
                        {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section - Neural nodes style */}
              {section.type === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((skill, idx) => (
                    <div
                      key={skill.id}
                      className="relative px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${idx % 3 === 0 ? neuralPurple : idx % 3 === 1 ? neuralCyan : neuralPink}20, transparent)`,
                        border: `1px solid ${idx % 3 === 0 ? neuralPurple : idx % 3 === 1 ? neuralCyan : neuralPink}40`,
                        color: textLight,
                      }}
                    >
                      <span
                        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: idx % 3 === 0 ? neuralPurple : idx % 3 === 1 ? neuralCyan : neuralPink,
                          boxShadow: `0 0 4px ${idx % 3 === 0 ? neuralPurple : idx % 3 === 1 ? neuralCyan : neuralPink}`,
                        }}
                      />
                      <span className="pl-2">{skill.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {section.type === "projects" && (
                <div className="grid gap-3">
                  {(section.items as ProjectItem[]).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg"
                      style={{ background: `${neuralPurple}10`, border: `1px solid ${neuralPurple}20` }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: textLight }}>
                          {item.title}
                        </h3>
                        <div className="flex gap-2">
                          {item.liveUrl && (
                            <a href={item.liveUrl} target="_blank" rel="noopener" className="text-xs" style={{ color: neuralCyan }}>
                              Demo ↗
                            </a>
                          )}
                          {item.githubUrl && (
                            <a href={item.githubUrl} target="_blank" rel="noopener" className="text-xs" style={{ color: neuralPurple }}>
                              Code ↗
                            </a>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-xs mb-2" style={{ color: textMuted }}>
                          {item.description}
                        </p>
                      )}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded"
                              style={{ background: `${neuralCyan}20`, color: neuralCyan }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications */}
              {section.type === "certifications" && (
                <div className="space-y-2">
                  {(section.items as CertificationItem[]).map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-xs" style={{ color: textLight }}>
                          {item.name}
                        </h3>
                        <p className="text-[10px]" style={{ color: textMuted }}>
                          {item.issuer}
                        </p>
                      </div>
                      <span className="text-[10px]" style={{ color: neuralCyan }}>
                        {item.issueDate}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Languages */}
              {section.type === "languages" && (
                <div className="flex flex-wrap gap-3">
                  {(section.items as LanguageItem[]).map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: textLight }}>
                        {item.name}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: `${neuralPink}20`, color: neuralPink }}
                      >
                        {item.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Awards */}
              {section.type === "awards" && (
                <div className="space-y-2">
                  {(section.items as AwardItem[]).map((item) => (
                    <div key={item.id}>
                      <h3 className="font-medium text-xs" style={{ color: textLight }}>
                        {item.title}
                      </h3>
                      <p className="text-[10px]" style={{ color: textMuted }}>
                        {item.issuer} • {item.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests */}
              {section.type === "interests" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as InterestItem[]).map((item, idx) => (
                    <span
                      key={item.id}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        background: `${idx % 2 === 0 ? neuralPurple : neuralCyan}15`,
                        color: textMuted,
                      }}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Custom */}
              {section.type === "custom" && (
                <div className="space-y-2">
                  {(section.items as CustomItem[]).map((item) => (
                    <div key={item.id}>
                      <h3 className="font-medium text-xs" style={{ color: textLight }}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[10px]" style={{ color: neuralCyan }}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-xs mt-1" style={{ color: textMuted }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
      </main>
    </div>
  );
}
