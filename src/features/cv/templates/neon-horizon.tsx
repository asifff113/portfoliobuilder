"use client";

/**
 * Neon Horizon Template
 *
 * A synthwave/retrowave themed template:
 * - Sunset gradient background (pink, purple, orange)
 * - Retro grid perspective effect
 * - Neon glow text effects
 * - 80s inspired typography
 * - Sun/horizon visual element
 * - Cyberpunk aesthetic with retro vibes
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Sun,
  ChevronRight,
  Zap,
  Star,
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

const synthPink = "#ff2a6d";
const synthPurple = "#d300c5";
const synthBlue = "#05d9e8";
const synthOrange = "#ff6b35";
const synthYellow = "#f9c80e";
const darkBg = "#1a0a2e";
const textLight = "#ffffff";
const textMuted = "#c4b5d4";

export function NeonHorizonTemplate({ personalInfo, sections, settings }: TemplateProps) {
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
    return `${start} — ${isCurrent ? "NOW" : end || ""}`;
  };

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: textLight,
        padding: "0",
        background: darkBg,
      }}
    >
      {/* Synthwave Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sunset gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-80"
          style={{
            background: `linear-gradient(180deg, 
              ${synthPurple}40 0%, 
              ${synthPink}50 30%, 
              ${synthOrange}40 60%, 
              ${synthYellow}20 80%,
              transparent 100%)`,
          }}
        />

        {/* Sun element */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full"
          style={{
            background: `linear-gradient(180deg, ${synthYellow}, ${synthOrange}, ${synthPink})`,
            boxShadow: `0 0 60px ${synthOrange}80, 0 0 120px ${synthPink}40`,
          }}
        />
        {/* Sun horizontal lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `${140 + i * 8}px`,
              width: `${160 - i * 20}px`,
              height: "4px",
              background: darkBg,
            }}
          />
        ))}

        {/* Grid perspective */}
        <div
          className="absolute bottom-0 left-0 right-0 h-96"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${darkBg} 20%)`,
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-80 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(${synthPink}60 1px, transparent 1px),
              linear-gradient(90deg, ${synthPink}60 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "bottom center",
          }}
        />

        {/* Neon glow lines */}
        <div
          className="absolute top-72 left-0 right-0 h-0.5"
          style={{
            background: `linear-gradient(90deg, transparent, ${synthBlue}, transparent)`,
            boxShadow: `0 0 20px ${synthBlue}`,
          }}
        />
      </div>

      {/* Header Section */}
      <header className="relative z-10 px-8 pt-8 pb-6">
        <div
          className="relative rounded-2xl p-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(26,10,46,0.9), rgba(26,10,46,0.95))`,
            border: `2px solid ${synthPink}50`,
            boxShadow: `0 0 30px ${synthPink}30, inset 0 0 30px ${synthPurple}10`,
          }}
        >
          <div className="flex items-center gap-6">
            {showPhoto && personalInfo.avatarUrl && (
              <div className="relative">
                {/* Neon ring */}
                <div
                  className="absolute -inset-1.5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${synthPink}, ${synthBlue})`,
                    boxShadow: `0 0 15px ${synthPink}80`,
                  }}
                />
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className={cn("relative object-cover", photoShapeClass)}
                  style={{ width: photoSize, height: photoSize }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h1
                className="text-4xl font-extrabold tracking-tight uppercase mb-1"
                style={{
                  color: textLight,
                  textShadow: `0 0 10px ${synthPink}, 0 0 20px ${synthPink}80, 0 0 40px ${synthPink}40`,
                }}
              >
                {personalInfo.fullName || "Your Name"}
              </h1>
              <p
                className="text-lg font-bold tracking-[0.2em] uppercase mb-4"
                style={{
                  color: synthBlue,
                  textShadow: `0 0 10px ${synthBlue}`,
                }}
              >
                {personalInfo.headline || "Professional Title"}
              </p>

              {/* Contact info */}
              <div className="flex flex-wrap gap-3 text-xs">
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 px-3 py-1 rounded border"
                    style={{ borderColor: `${synthPink}50`, color: textMuted }}
                  >
                    <Mail className="h-3.5 w-3.5" style={{ color: synthPink }} />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded border"
                    style={{ borderColor: `${synthBlue}50`, color: textMuted }}
                  >
                    <Phone className="h-3.5 w-3.5" style={{ color: synthBlue }} />
                    {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded border"
                    style={{ borderColor: `${synthPurple}50`, color: textMuted }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: synthPurple }} />
                    {personalInfo.location}
                  </span>
                )}
              </div>

              {/* Social links */}
              <div className="flex gap-2 mt-3">
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded border transition-all hover:bg-white/5"
                    style={{ borderColor: `${synthBlue}40` }}
                  >
                    <Linkedin className="h-4 w-4" style={{ color: synthBlue }} />
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded border transition-all hover:bg-white/5"
                    style={{ borderColor: `${synthPink}40` }}
                  >
                    <Github className="h-4 w-4" style={{ color: synthPink }} />
                  </a>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded border transition-all hover:bg-white/5"
                    style={{ borderColor: `${synthPurple}40` }}
                  >
                    <Globe className="h-4 w-4" style={{ color: synthPurple }} />
                  </a>
                )}
              </div>
            </div>

            {/* Decorative sun icon */}
            <div className="hidden md:block">
              <Sun className="h-12 w-12" style={{ color: synthOrange, filter: `drop-shadow(0 0 10px ${synthOrange})` }} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-8 pb-8 space-y-5">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section, sectionIdx) => {
            const sectionColor = sectionIdx % 3 === 0 ? synthPink : sectionIdx % 3 === 1 ? synthBlue : synthPurple;
            
            return (
              <section
                key={section.id}
                className="relative rounded-xl p-5 overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, rgba(26,10,46,0.95), rgba(26,10,46,0.9))`,
                  border: `1px solid ${sectionColor}40`,
                  boxShadow: `0 0 20px ${sectionColor}20`,
                }}
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-4 w-4" style={{ color: sectionColor, filter: `drop-shadow(0 0 5px ${sectionColor})` }} />
                  <h2
                    className="text-sm font-bold tracking-[0.2em] uppercase"
                    style={{
                      color: sectionColor,
                      textShadow: `0 0 10px ${sectionColor}80`,
                    }}
                  >
                    {section.title}
                  </h2>
                  <div
                    className="flex-1 h-px"
                    style={{
                      background: `linear-gradient(90deg, ${sectionColor}60, transparent)`,
                      boxShadow: `0 0 5px ${sectionColor}40`,
                    }}
                  />
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
                    {(section.items as ExperienceItem[]).map((item) => (
                      <div
                        key={item.id}
                        className="relative p-4 rounded-lg"
                        style={{ background: `${sectionColor}10`, border: `1px solid ${sectionColor}20` }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3
                              className="font-bold text-sm uppercase tracking-wide"
                              style={{ color: textLight }}
                            >
                              {item.role}
                            </h3>
                            <p className="text-xs" style={{ color: sectionColor }}>
                              {item.company}
                              {item.location && <span style={{ color: textMuted }}> // {item.location}</span>}
                            </p>
                          </div>
                          <span
                            className="text-xs px-2 py-1 rounded font-mono"
                            style={{ background: `${sectionColor}30`, color: textLight }}
                          >
                            {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                          </span>
                        </div>
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: textMuted }}>
                                <Zap className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: synthYellow }} />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.techStack && item.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {item.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded font-mono"
                                style={{ background: `${synthBlue}20`, color: synthBlue }}
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

                {/* Education Section */}
                {section.type === "education" && (
                  <div className="space-y-3">
                    {(section.items as EducationItem[]).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg"
                        style={{ background: `${sectionColor}10` }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-sm uppercase" style={{ color: textLight }}>
                              {item.degree} {item.fieldOfStudy && `// ${item.fieldOfStudy}`}
                            </h3>
                            <p className="text-xs" style={{ color: sectionColor }}>
                              {item.institution}
                            </p>
                          </div>
                          <span className="text-xs font-mono" style={{ color: textMuted }}>
                            {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills Section - Neon tags */}
                {section.type === "skills" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as SkillItem[]).map((skill, idx) => {
                      const skillColor = idx % 4 === 0 ? synthPink : idx % 4 === 1 ? synthBlue : idx % 4 === 2 ? synthPurple : synthOrange;
                      return (
                        <span
                          key={skill.id}
                          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded"
                          style={{
                            background: `${skillColor}20`,
                            border: `1px solid ${skillColor}60`,
                            color: skillColor,
                            textShadow: `0 0 5px ${skillColor}60`,
                          }}
                        >
                          {skill.name}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Projects Section */}
                {section.type === "projects" && (
                  <div className="grid gap-3">
                    {(section.items as ProjectItem[]).map((item, idx) => {
                      const projectColor = idx % 2 === 0 ? synthPink : synthBlue;
                      return (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg"
                          style={{ background: `${projectColor}10`, border: `1px solid ${projectColor}30` }}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-sm uppercase" style={{ color: textLight }}>
                              {item.title}
                            </h3>
                            <div className="flex gap-2">
                              {item.liveUrl && (
                                <a href={item.liveUrl} target="_blank" rel="noopener" className="text-xs font-bold" style={{ color: synthYellow }}>
                                  [LIVE]
                                </a>
                              )}
                              {item.githubUrl && (
                                <a href={item.githubUrl} target="_blank" rel="noopener" className="text-xs font-bold" style={{ color: synthBlue }}>
                                  [CODE]
                                </a>
                              )}
                            </div>
                          </div>
                          {item.description && (
                            <p className="text-xs" style={{ color: textMuted }}>
                              {item.description}
                            </p>
                          )}
                          {item.techStack && item.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.techStack.map((tech, techIdx) => (
                                <span
                                  key={techIdx}
                                  className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                                  style={{ background: `${synthPurple}30`, color: synthPurple }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Certifications */}
                {section.type === "certifications" && (
                  <div className="space-y-2">
                    {(section.items as CertificationItem[]).map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 rounded" style={{ background: `${sectionColor}10` }}>
                        <div>
                          <h3 className="font-bold text-xs uppercase" style={{ color: textLight }}>
                            {item.name}
                          </h3>
                          <p className="text-[10px]" style={{ color: textMuted }}>
                            {item.issuer}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: sectionColor }}>
                          {item.issueDate}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {section.type === "languages" && (
                  <div className="flex flex-wrap gap-3">
                    {(section.items as LanguageItem[]).map((item, idx) => {
                      const langColor = idx % 3 === 0 ? synthPink : idx % 3 === 1 ? synthBlue : synthPurple;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 px-3 py-1.5 rounded"
                          style={{ background: `${langColor}20`, border: `1px solid ${langColor}40` }}
                        >
                          <span className="text-xs font-bold uppercase" style={{ color: textLight }}>
                            {item.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: darkBg, color: langColor }}>
                            {item.proficiency}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Awards */}
                {section.type === "awards" && (
                  <div className="space-y-2">
                    {(section.items as AwardItem[]).map((item) => (
                      <div key={item.id} className="p-2 rounded" style={{ background: `${sectionColor}10` }}>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-xs uppercase" style={{ color: textLight }}>
                            {item.title}
                          </h3>
                          <span className="text-[10px] font-mono" style={{ color: textMuted }}>
                            {item.date}
                          </span>
                        </div>
                        <p className="text-[10px]" style={{ color: sectionColor }}>
                          {item.issuer}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Interests */}
                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as InterestItem[]).map((item, idx) => {
                      const intColor = idx % 4 === 0 ? synthPink : idx % 4 === 1 ? synthBlue : idx % 4 === 2 ? synthPurple : synthOrange;
                      return (
                        <span
                          key={item.id}
                          className="px-3 py-1 text-xs font-bold uppercase rounded"
                          style={{ background: `${intColor}15`, color: intColor }}
                        >
                          {item.name}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Custom */}
                {section.type === "custom" && (
                  <div className="space-y-2">
                    {(section.items as CustomItem[]).map((item) => (
                      <div key={item.id} className="p-2 rounded" style={{ background: `${sectionColor}10` }}>
                        <h3 className="font-bold text-xs uppercase" style={{ color: textLight }}>
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-[10px]" style={{ color: sectionColor }}>
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
            );
          })}
      </main>
    </div>
  );
}
