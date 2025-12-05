"use client";

/**
 * Liquid Mercury Template
 *
 * A fluid, metallic chrome/mercury themed template:
 * - Liquid metallic gradients
 * - Chrome/silver reflective effects
 * - Fluid, organic shapes
 * - Premium metallic typography
 * - Subtle iridescent highlights
 * - Sophisticated modern aesthetic
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Droplets,
  ChevronRight,
  Sparkles,
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

const mercuryDark = "#1a1a2e";
const mercurySilver = "#c0c0c0";
const mercuryChrome = "#e8e8e8";
const mercuryBlue = "#4a90a4";
const mercuryPurple = "#8a7ca8";
const textLight = "#f5f5f5";
const textMuted = "#a0a0a0";

export function LiquidMercuryTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "circle";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-3xl",
    square: "rounded-2xl",
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
        background: `linear-gradient(180deg, ${mercuryDark} 0%, #16162a 50%, ${mercuryDark} 100%)`,
      }}
    >
      {/* Liquid Mercury Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Metallic blobs */}
        <div
          className="absolute top-20 -right-20 w-80 h-80 rounded-full opacity-20"
          style={{
            background: `radial-gradient(ellipse at 30% 30%, ${mercuryChrome}, ${mercurySilver}60, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-40 -left-20 w-64 h-64 rounded-full opacity-15"
          style={{
            background: `radial-gradient(ellipse at 60% 40%, ${mercuryBlue}, ${mercuryPurple}50, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-10"
          style={{
            background: `radial-gradient(ellipse, ${mercurySilver}, transparent 60%)`,
            filter: "blur(20px)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${mercurySilver} 1px, transparent 1px),
                              linear-gradient(90deg, ${mercurySilver} 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header Section */}
      <header className="relative z-10 p-8">
        <div
          className="relative rounded-3xl p-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, rgba(192,192,192,0.1), rgba(255,255,255,0.05), rgba(192,192,192,0.1))`,
            border: `1px solid rgba(192,192,192,0.2)`,
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Metallic shine effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
            }}
          />

          <div className="relative flex items-center gap-6">
            {showPhoto && personalInfo.avatarUrl && (
              <div className="relative">
                {/* Mercury ring effect */}
                <div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: `conic-gradient(from 180deg, ${mercurySilver}40, ${mercuryChrome}60, ${mercuryBlue}40, ${mercurySilver}40)`,
                    filter: "blur(2px)",
                  }}
                />
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className={cn("relative object-cover border-2", photoShapeClass)}
                  style={{ width: photoSize, height: photoSize, borderColor: "rgba(255,255,255,0.3)" }}
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4" style={{ color: mercurySilver }} />
                <span className="text-xs tracking-[0.3em] uppercase" style={{ color: textMuted }}>
                  Profile
                </span>
              </div>
              <h1
                className="text-3xl font-bold tracking-tight mb-1"
                style={{
                  background: `linear-gradient(135deg, ${textLight}, ${mercurySilver}, ${mercuryBlue})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {personalInfo.fullName || "Your Name"}
              </h1>
              <p
                className="text-base font-medium tracking-wide mb-4"
                style={{ color: mercurySilver }}
              >
                {personalInfo.headline || "Professional Title"}
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-xs">
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)", color: textMuted }}
                  >
                    <Mail className="h-3.5 w-3.5" style={{ color: mercuryBlue }} />
                    {personalInfo.email}
                  </a>
                )}
                {personalInfo.phone && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", color: textMuted }}
                  >
                    <Phone className="h-3.5 w-3.5" style={{ color: mercuryPurple }} />
                    {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.05)", color: textMuted }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: mercurySilver }} />
                    {personalInfo.location}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-3">
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded-full transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <Linkedin className="h-4 w-4" style={{ color: mercuryBlue }} />
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded-full transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <Github className="h-4 w-4" style={{ color: mercurySilver }} />
                  </a>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener"
                    className="p-2 rounded-full transition-all hover:bg-white/10"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <Globe className="h-4 w-4" style={{ color: mercuryPurple }} />
                  </a>
                )}
              </div>
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
                background: `linear-gradient(180deg, rgba(192,192,192,0.08), rgba(192,192,192,0.03))`,
                border: `1px solid rgba(192,192,192,0.15)`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${mercurySilver}30, ${mercuryBlue}20)`,
                  }}
                >
                  <Sparkles className="h-4 w-4" style={{ color: mercurySilver }} />
                </div>
                <h2
                  className="text-sm font-semibold tracking-[0.15em] uppercase"
                  style={{ color: mercurySilver }}
                >
                  {section.title}
                </h2>
                <div
                  className="flex-1 h-px"
                  style={{
                    background: `linear-gradient(90deg, ${mercurySilver}40, transparent)`,
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
                      className="relative p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-sm" style={{ color: textLight }}>
                            {item.role}
                          </h3>
                          <p className="text-xs" style={{ color: mercuryBlue }}>
                            {item.company}
                            {item.location && (
                              <span style={{ color: textMuted }}> • {item.location}</span>
                            )}
                          </p>
                        </div>
                        <span
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ background: `${mercurySilver}15`, color: mercurySilver }}
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
                              <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: mercurySilver }} />
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
                              style={{ background: `${mercuryBlue}20`, color: mercuryBlue }}
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
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-sm" style={{ color: textLight }}>
                            {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                          </h3>
                          <p className="text-xs" style={{ color: mercuryBlue }}>
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

              {/* Skills Section - Liquid bubbles */}
              {section.type === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((skill, idx) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 text-xs font-medium rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${idx % 3 === 0 ? mercurySilver : idx % 3 === 1 ? mercuryBlue : mercuryPurple}20, transparent)`,
                        border: `1px solid ${idx % 3 === 0 ? mercurySilver : idx % 3 === 1 ? mercuryBlue : mercuryPurple}30`,
                        color: textLight,
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
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: textLight }}>
                          {item.title}
                        </h3>
                        <div className="flex gap-2">
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener"
                              className="text-xs hover:underline"
                              style={{ color: mercuryBlue }}
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
                              style={{ color: mercurySilver }}
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
                              style={{ background: `${mercuryPurple}20`, color: mercuryPurple }}
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
                    <div key={item.id} className="flex justify-between items-center p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div>
                        <h3 className="font-medium text-xs" style={{ color: textLight }}>
                          {item.name}
                        </h3>
                        <p className="text-[10px]" style={{ color: textMuted }}>
                          {item.issuer}
                        </p>
                      </div>
                      <span className="text-[10px]" style={{ color: mercurySilver }}>
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
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <span className="text-xs font-medium" style={{ color: textLight }}>
                        {item.name}
                      </span>
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ background: `${mercuryBlue}20`, color: mercuryBlue }}
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
                    <div key={item.id} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-xs" style={{ color: textLight }}>
                          {item.title}
                        </h3>
                        <span className="text-[10px]" style={{ color: textMuted }}>
                          {item.date}
                        </span>
                      </div>
                      <p className="text-[10px]" style={{ color: mercurySilver }}>
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
                      style={{ background: "rgba(255,255,255,0.05)", color: textMuted }}
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
                    <div key={item.id} className="p-2 rounded-lg" style={{ background: "rgba(255,255,255,0.02)" }}>
                      <h3 className="font-medium text-xs" style={{ color: textLight }}>
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[10px]" style={{ color: mercuryBlue }}>
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
