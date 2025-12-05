"use client";

/**
 * Obsidian Edge Template
 *
 * A sleek, dark obsidian-themed template with sharp geometric edges:
 * - Deep black obsidian background with subtle texture
 * - Sharp angular dividers and section borders
 * - Subtle gold accent highlights
 * - Premium typography with tracking
 * - Geometric corner accents
 * - Professional yet striking aesthetic
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Languages,
  Heart,
  ChevronRight,
  Diamond,
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

const obsidianBlack = "#0a0a0a";
const obsidianGray = "#1a1a1a";
const goldAccent = "#d4af37";
const goldSoft = "#f4e4ba";
const textLight = "#e8e8e8";
const textMuted = "#888888";

export function ObsidianEdgeTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "square";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
    none: "hidden",
  }[photoShape];

  const formatDateRange = (start?: string, end?: string | null, isCurrent?: boolean) => {
    if (!start) return "";
    return `${start} — ${isCurrent ? "Present" : end || ""}`;
  };

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: textLight,
        padding: "0",
        background: obsidianBlack,
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${goldAccent}15 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header Section */}
      <header className="relative p-8 pb-6" style={{ background: obsidianGray }}>
        {/* Angular corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${goldAccent}, transparent)` }} />
          <div className="absolute top-0 left-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, ${goldAccent}, transparent)` }} />
        </div>
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="absolute top-0 right-0 w-full h-[2px]" style={{ background: `linear-gradient(270deg, ${goldAccent}, transparent)` }} />
          <div className="absolute top-0 right-0 w-[2px] h-full" style={{ background: `linear-gradient(180deg, ${goldAccent}, transparent)` }} />
        </div>

        <div className="relative flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${goldAccent}40, transparent)`,
                  transform: "translate(4px, 4px)",
                }}
              />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover border-2", photoShapeClass)}
                style={{ width: photoSize, height: photoSize, borderColor: goldAccent }}
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{ color: textLight }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p
              className="text-lg font-medium tracking-wide uppercase mb-4"
              style={{ color: goldAccent }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>

            {/* Contact Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm" style={{ color: textMuted }}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" style={{ color: goldAccent }} />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" style={{ color: goldAccent }} />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" style={{ color: goldAccent }} />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Globe className="h-4 w-4" style={{ color: goldAccent }} />
                  <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" style={{ color: goldAccent }} />
                  <span>LinkedIn</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Github className="h-4 w-4" style={{ color: goldAccent }} />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Gold bottom border with angular cut */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${goldAccent}, transparent)` }}
        />
      </header>

      {/* Main Content */}
      <main className="relative p-8 pt-6 space-y-6">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <section key={section.id} className="relative">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <Diamond className="h-4 w-4" style={{ color: goldAccent }} />
                <h2
                  className="text-sm font-bold tracking-[0.2em] uppercase"
                  style={{ color: goldAccent }}
                >
                  {section.title}
                </h2>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${goldAccent}40, transparent)` }} />
              </div>

              {/* About Section */}
              {section.type === "about" && section.items.length > 0 && (
                <p className="text-sm leading-relaxed pl-7" style={{ color: textMuted }}>
                  {(section.items[0] as { content?: string })?.content || personalInfo.summary}
                </p>
              )}

              {/* Experience Section */}
              {section.type === "experience" && (
                <div className="space-y-4 pl-7">
                  {(section.items as ExperienceItem[]).map((item) => (
                    <div key={item.id} className="relative">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold text-base" style={{ color: textLight }}>
                            {item.role}
                          </h3>
                          <p className="text-sm" style={{ color: goldSoft }}>
                            {item.company}
                            {item.location && <span style={{ color: textMuted }}> • {item.location}</span>}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded" style={{ background: obsidianGray, color: textMuted }}>
                          {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm mt-2" style={{ color: textMuted }}>
                          {item.description}
                        </p>
                      )}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: textMuted }}>
                              <ChevronRight className="h-3 w-3 mt-1 flex-shrink-0" style={{ color: goldAccent }} />
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
                <div className="space-y-4 pl-7">
                  {(section.items as EducationItem[]).map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold text-base" style={{ color: textLight }}>
                            {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                          </h3>
                          <p className="text-sm" style={{ color: goldSoft }}>
                            {item.institution}
                            {item.location && <span style={{ color: textMuted }}> • {item.location}</span>}
                          </p>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 rounded" style={{ background: obsidianGray, color: textMuted }}>
                          {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                        </span>
                      </div>
                      {item.gpa && (
                        <p className="text-sm mt-1" style={{ color: textMuted }}>
                          GPA: {item.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {section.type === "skills" && (
                <div className="pl-7">
                  <div className="flex flex-wrap gap-2">
                    {(section.items as SkillItem[]).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 text-xs font-medium border"
                        style={{
                          background: obsidianGray,
                          borderColor: `${goldAccent}40`,
                          color: textLight,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {section.type === "projects" && (
                <div className="space-y-4 pl-7">
                  {(section.items as ProjectItem[]).map((item) => (
                    <div key={item.id}>
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-base" style={{ color: textLight }}>
                          {item.title}
                        </h3>
                        <div className="flex gap-2">
                          {item.liveUrl && (
                            <a href={item.liveUrl} target="_blank" rel="noopener" className="text-xs" style={{ color: goldAccent }}>
                              Live ↗
                            </a>
                          )}
                          {item.githubUrl && (
                            <a href={item.githubUrl} target="_blank" rel="noopener" className="text-xs" style={{ color: goldAccent }}>
                              Code ↗
                            </a>
                          )}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-sm" style={{ color: textMuted }}>
                          {item.description}
                        </p>
                      )}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5" style={{ background: `${goldAccent}20`, color: goldSoft }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications Section */}
              {section.type === "certifications" && (
                <div className="space-y-3 pl-7">
                  {(section.items as CertificationItem[]).map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-sm" style={{ color: textLight }}>
                          {item.name}
                        </h3>
                        <p className="text-xs" style={{ color: textMuted }}>
                          {item.issuer}
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: textMuted }}>
                        {item.issueDate}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Languages Section */}
              {section.type === "languages" && (
                <div className="flex flex-wrap gap-4 pl-7">
                  {(section.items as LanguageItem[]).map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="font-medium text-sm" style={{ color: textLight }}>
                        {item.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: obsidianGray, color: goldSoft }}>
                        {item.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Awards Section */}
              {section.type === "awards" && (
                <div className="space-y-3 pl-7">
                  {(section.items as AwardItem[]).map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm" style={{ color: textLight }}>
                          {item.title}
                        </h3>
                        <span className="text-xs" style={{ color: textMuted }}>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: goldSoft }}>
                        {item.issuer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests Section */}
              {section.type === "interests" && (
                <div className="flex flex-wrap gap-2 pl-7">
                  {(section.items as InterestItem[]).map((item) => (
                    <span
                      key={item.id}
                      className="px-3 py-1 text-xs"
                      style={{ background: obsidianGray, color: textMuted }}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Custom Section */}
              {section.type === "custom" && (
                <div className="space-y-3 pl-7">
                  {(section.items as CustomItem[]).map((item) => (
                    <div key={item.id}>
                      <h3 className="font-medium text-sm" style={{ color: textLight }}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-xs" style={{ color: goldSoft }}>
                          {item.subtitle}
                        </p>
                      )}
                      {item.description && (
                        <p className="text-sm mt-1" style={{ color: textMuted }}>
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

      {/* Footer accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${goldAccent}, transparent)` }}
      />
    </div>
  );
}
