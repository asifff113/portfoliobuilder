"use client";

/**
 * Frost Minimal Template
 *
 * An ultra-clean frosted glass template with icy blue tones:
 * - Clean white/light blue aesthetic
 * - Frosted glass card effects
 * - Ice crystal inspired accents
 * - Minimalist typography
 * - Subtle gradient backgrounds
 * - Elegant and professional
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Snowflake,
  ChevronRight,
  Circle,
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

const frostWhite = "#f8fafc";
const frostBlue = "#0ea5e9";
const frostLightBlue = "#7dd3fc";
const frostPale = "#e0f2fe";
const frostDark = "#0c4a6e";
const textDark = "#1e293b";
const textMuted = "#64748b";

export function FrostMinimalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "rounded";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-lg",
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
        color: textDark,
        padding: "0",
        background: `linear-gradient(180deg, ${frostWhite} 0%, ${frostPale} 50%, ${frostWhite} 100%)`,
      }}
    >
      {/* Frost Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft gradient orbs */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle, ${frostLightBlue}40, transparent 60%)`,
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute bottom-20 left-0 w-80 h-80 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${frostBlue}30, transparent 60%)`,
            filter: "blur(50px)",
          }}
        />
        
        {/* Subtle crystal pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(60deg, ${frostBlue} 25%, transparent 25%, transparent 75%, ${frostBlue} 75%),
              linear-gradient(120deg, ${frostBlue} 25%, transparent 25%, transparent 75%, ${frostBlue} 75%)
            `,
            backgroundSize: "60px 100px",
          }}
        />
      </div>

      {/* Header Section */}
      <header className="relative z-10 p-8">
        <div
          className="relative rounded-3xl p-6 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(14,165,233,0.1)",
          }}
        >
          <div className="flex items-center gap-6">
            {showPhoto && personalInfo.avatarUrl && (
              <div className="relative">
                {/* Frost ring */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-60"
                  style={{
                    background: `linear-gradient(135deg, ${frostLightBlue}, ${frostBlue})`,
                    filter: "blur(4px)",
                  }}
                />
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className={cn("relative object-cover border-2 border-white shadow-lg", photoShapeClass)}
                  style={{ width: photoSize, height: photoSize }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl font-bold tracking-tight mb-1"
                style={{ color: frostDark }}
              >
                {personalInfo.fullName || "Your Name"}
              </h1>
              <p
                className="text-lg font-medium mb-4"
                style={{ color: frostBlue }}
              >
                {personalInfo.headline || "Professional Title"}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-3 text-xs">
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:bg-white"
                    style={{ background: "rgba(255,255,255,0.6)", color: textMuted }}
                  >
                    <Mail className="h-3.5 w-3.5" style={{ color: frostBlue }} />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.6)", color: textMuted }}
                  >
                    <Phone className="h-3.5 w-3.5" style={{ color: frostBlue }} />
                    {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.6)", color: textMuted }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: frostBlue }} />
                    {personalInfo.location}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mt-3">
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded-xl transition-all hover:bg-white"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  >
                    <Linkedin className="h-4 w-4" style={{ color: frostBlue }} />
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded-xl transition-all hover:bg-white"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  >
                    <Github className="h-4 w-4" style={{ color: textMuted }} />
                  </a>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded-xl transition-all hover:bg-white"
                    style={{ background: "rgba(255,255,255,0.5)" }}
                  >
                    <Globe className="h-4 w-4" style={{ color: frostBlue }} />
                  </a>
                )}
              </div>
            </div>

            {/* Decorative snowflake */}
            <div className="hidden md:block opacity-20">
              <Snowflake className="h-16 w-16" style={{ color: frostBlue }} />
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
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 4px 24px rgba(14,165,233,0.05)",
              }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${frostBlue}15` }}
                >
                  <Snowflake className="h-4 w-4" style={{ color: frostBlue }} />
                </div>
                <h2
                  className="text-sm font-semibold tracking-wide uppercase"
                  style={{ color: frostDark }}
                >
                  {section.title}
                </h2>
                <div
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(90deg, ${frostBlue}30, transparent)` }}
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
                      className="relative p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.5)" }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-sm" style={{ color: textDark }}>
                            {item.role}
                          </h3>
                          <p className="text-xs" style={{ color: frostBlue }}>
                            {item.company}
                            {item.location && (
                              <span style={{ color: textMuted }}> • {item.location}</span>
                            )}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ background: frostPale, color: frostDark }}
                        >
                          {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs mt-2" style={{ color: textMuted }}>
                          {item.description}
                        </p>
                      )}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: textMuted }}>
                              <Circle className="h-1.5 w-1.5 mt-1.5 flex-shrink-0 fill-current" style={{ color: frostBlue }} />
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
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{ background: `${frostBlue}15`, color: frostDark }}
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
                      className="p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.5)" }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-sm" style={{ color: textDark }}>
                            {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                          </h3>
                          <p className="text-xs" style={{ color: frostBlue }}>
                            {item.institution}
                          </p>
                        </div>
                        <span className="text-xs" style={{ color: textMuted }}>
                          {formatDateRange(item.startDate, item.endDate, item.isCurrent)}
                        </span>
                      </div>
                      {item.gpa && (
                        <p className="text-xs mt-1" style={{ color: textMuted }}>
                          GPA: {item.gpa}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section - Clean frost chips */}
              {section.type === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 text-xs font-medium rounded-full"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: `1px solid ${frostBlue}30`,
                        color: frostDark,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Projects Section */}
              {section.type === "projects" && (
                <div className="grid gap-3">
                  {(section.items as ProjectItem[]).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.5)" }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: textDark }}>
                          {item.title}
                        </h3>
                        <div className="flex gap-2">
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener"
                              className="text-xs hover:underline"
                              style={{ color: frostBlue }}
                            >
                              Live ↗
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener"
                              className="text-xs hover:underline"
                              style={{ color: textMuted }}
                            >
                              Code ↗
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
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded"
                              style={{ background: frostPale, color: frostDark }}
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
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.4)" }}
                    >
                      <div>
                        <h3 className="font-medium text-xs" style={{ color: textDark }}>
                          {item.name}
                        </h3>
                        <p className="text-[10px]" style={{ color: textMuted }}>
                          {item.issuer}
                        </p>
                      </div>
                      <span className="text-[10px]" style={{ color: frostBlue }}>
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
                    <div
                      key={item.id}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.6)" }}
                    >
                      <span className="text-xs font-medium" style={{ color: textDark }}>
                        {item.name}
                      </span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ background: frostPale, color: frostDark }}
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
                    <div
                      key={item.id}
                      className="p-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.4)" }}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-xs" style={{ color: textDark }}>
                          {item.title}
                        </h3>
                        <span className="text-[10px]" style={{ color: textMuted }}>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-[10px]" style={{ color: frostBlue }}>
                        {item.issuer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests */}
              {section.type === "interests" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as InterestItem[]).map((item) => (
                    <span
                      key={item.id}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{ background: "rgba(255,255,255,0.6)", color: textMuted }}
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
                    <div
                      key={item.id}
                      className="p-2 rounded-lg"
                      style={{ background: "rgba(255,255,255,0.4)" }}
                    >
                      <h3 className="font-medium text-xs" style={{ color: textDark }}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[10px]" style={{ color: frostBlue }}>
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
