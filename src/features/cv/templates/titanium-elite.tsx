"use client";

/**
 * Titanium Elite Template
 *
 * A professional, metallic-styled template with sharp angles and distinct sections.
 * Features:
 * - Metallic color palette (Silvers, Grays, Cool Blues)
 * - Sharp, angular design elements
 * - "Business Card" style header
 * - Distinct section separators
 * - Professional typography
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code,
  Award,
  Languages,
  Heart,
  Users,
  FileText,
} from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  AwardItem,
  VolunteerItem,
  ReferenceItem,
  PublicationItem,
  InterestItem,
  AboutItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

// Section icons mapping
const sectionIcons: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: Code,
  certifications: Award,
  languages: Languages,
  awards: Award,
  volunteer: Heart,
  references: Users,
  publications: FileText,
  interests: Heart,
};

export function TitaniumEliteTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 110;

  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #1e293b)", // Slate 800
    secondary: "var(--cv-secondary, #334155)", // Slate 700
    accent: "var(--cv-accent, #475569)", // Slate 600
    text: "var(--cv-text, #0f172a)", // Slate 900
    textMuted: "var(--cv-text-muted, #64748b)", // Slate 500
    background: "var(--cv-background, #ffffff)",
    headerBg: "#f1f5f9", // Slate 100
    borderColor: "#cbd5e1", // Slate 300
  };

  return (
    <div
      className="bg-white text-slate-900"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", sans-serif)',
        fontSize: "10pt",
        lineHeight: "1.5",
        minHeight: "297mm",
        width: "100%",
        maxWidth: "210mm",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Header - Business Card Style */}
      <header
        className="relative mb-8 border-b-4 px-8 py-10"
        style={{
          backgroundColor: colors.headerBg,
          borderColor: colors.primary,
        }}
      >
        <div className="flex items-center gap-8">
          {/* Profile Photo - Hexagon-ish Clip */}
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative flex-shrink-0">
              <div
                className="absolute inset-0 rotate-3 transform"
                style={{
                  width: photoSize,
                  height: photoSize,
                  backgroundColor: colors.primary,
                  opacity: 0.1,
                }}
              />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="relative z-10 object-cover shadow-lg"
                style={{
                  width: photoSize,
                  height: photoSize,
                  clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)",
                }}
              />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h1
              className="mb-2 text-4xl font-extrabold tracking-tight uppercase"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p
              className="mb-4 text-lg font-medium tracking-wide uppercase"
              style={{ color: colors.accent }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>

            {/* Contact Info - Horizontal Bar */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium"
              style={{ color: colors.secondary }}
            >
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-slate-900"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-1.5 transition-colors hover:text-slate-900"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-1.5 transition-colors hover:text-slate-900"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Corner Accent */}
        <div
          className="absolute top-0 right-0 h-24 w-24"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${colors.primary} 50%)`,
            opacity: 0.05,
          }}
        />
      </header>

      <div className="px-8 pb-12">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <div className="flex items-start gap-4">
              <div
                className="w-1 flex-shrink-0 self-stretch bg-slate-300"
                style={{ backgroundColor: colors.accent }}
              />
              <p className="text-justify text-sm leading-relaxed" style={{ color: colors.text }}>
                {personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Main Column (Experience, Projects) */}
          <div className="col-span-8 space-y-8">
            {sections
              .filter(
                (s) =>
                  s.isVisible &&
                  ["experience", "projects", "education", "volunteer", "publications"].includes(
                    s.type
                  )
              )
              .map((section) => {
                const Icon = sectionIcons[section.type] || Briefcase;

                return (
                  <section key={section.id}>
                    <div
                      className="mb-4 flex items-center gap-3 border-b-2 pb-2"
                      style={{ borderColor: colors.borderColor }}
                    >
                      <div className="rounded bg-slate-100 p-1.5" style={{ color: colors.primary }}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2
                        className="text-lg font-bold tracking-wider uppercase"
                        style={{ color: colors.primary }}
                      >
                        {section.title}
                      </h2>
                    </div>

                    {/* Experience */}
                    {section.type === "experience" && (
                      <div className="space-y-6">
                        {(section.items as ExperienceItem[]).map((item) => (
                          <div
                            key={item.id}
                            className="relative border-l-2 pl-4"
                            style={{ borderColor: colors.borderColor }}
                          >
                            <div
                              className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full border-2 bg-white"
                              style={{ borderColor: colors.accent }}
                            />

                            <div className="mb-1 flex items-baseline justify-between">
                              <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
                                {item.role}
                              </h3>
                              <span
                                className="text-xs font-semibold"
                                style={{ color: colors.accent }}
                              >
                                {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                              </span>
                            </div>

                            <div className="mb-2 flex items-center justify-between">
                              <span
                                className="text-xs font-bold uppercase"
                                style={{ color: colors.secondary }}
                              >
                                {item.company}
                              </span>
                              {item.location && (
                                <span className="text-xs text-slate-500">{item.location}</span>
                              )}
                            </div>

                            {item.description && (
                              <p className="mb-2 text-xs" style={{ color: colors.textMuted }}>
                                {item.description}
                              </p>
                            )}

                            {item.bullets && item.bullets.length > 0 && (
                              <ul className="ml-3 list-outside list-disc space-y-1">
                                {item.bullets.map((bullet, idx) => (
                                  <li
                                    key={idx}
                                    className="pl-1 text-xs"
                                    style={{ color: colors.text }}
                                  >
                                    {bullet}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Projects */}
                    {section.type === "projects" && (
                      <div className="space-y-4">
                        {(section.items as ProjectItem[]).map((item) => (
                          <div
                            key={item.id}
                            className="rounded-sm border-l-4 bg-slate-50 p-4"
                            style={{ borderColor: colors.accent }}
                          >
                            <div className="mb-1 flex items-start justify-between">
                              <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
                                {item.title}
                              </h3>
                              <div className="flex gap-2">
                                {item.liveUrl && (
                                  <a href={item.liveUrl} target="_blank" rel="noopener">
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                )}
                                {item.githubUrl && (
                                  <a href={item.githubUrl} target="_blank" rel="noopener">
                                    <Github className="h-3 w-3" />
                                  </a>
                                )}
                              </div>
                            </div>

                            <p className="mb-2 text-xs" style={{ color: colors.textMuted }}>
                              {item.description}
                            </p>

                            {item.techStack && item.techStack.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.techStack.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
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

                    {/* Education (if in main column) */}
                    {section.type === "education" && (
                      <div className="space-y-4">
                        {(section.items as EducationItem[]).map((item) => (
                          <div key={item.id}>
                            <div className="flex items-baseline justify-between">
                              <h3 className="text-sm font-bold" style={{ color: colors.primary }}>
                                {item.institution}
                              </h3>
                              <span className="text-xs" style={{ color: colors.textMuted }}>
                                {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                              </span>
                            </div>
                            <p className="text-xs font-medium" style={{ color: colors.secondary }}>
                              {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                            </p>
                            {item.gpa && (
                              <p className="mt-0.5 text-xs text-slate-500">GPA: {item.gpa}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Generic for others */}
                    {!["experience", "projects", "education"].includes(section.type) && (
                      <div className="space-y-2">
                        {/* Simplified rendering for other sections in main column */}
                        <p className="text-xs text-slate-500 italic">Section content...</p>
                      </div>
                    )}
                  </section>
                );
              })}
          </div>

          {/* Sidebar Column (Skills, Languages, Awards, etc.) */}
          <div className="col-span-4 space-y-8">
            {sections
              .filter(
                (s) =>
                  s.isVisible &&
                  !["experience", "projects", "education", "volunteer", "publications"].includes(
                    s.type
                  )
              )
              .map((section) => {
                const Icon = sectionIcons[section.type] || Briefcase;

                return (
                  <section
                    key={section.id}
                    className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="mb-3 flex items-center gap-2 border-b border-slate-200 pb-2">
                      <Icon className="h-3.5 w-3.5" style={{ color: colors.accent }} />
                      <h2
                        className="text-sm font-bold tracking-wider uppercase"
                        style={{ color: colors.primary }}
                      >
                        {section.title}
                      </h2>
                    </div>

                    {/* Skills */}
                    {section.type === "skills" && (
                      <div className="space-y-3">
                        {(section.items as SkillItem[]).map((skill) => (
                          <div key={skill.id}>
                            <div className="mb-1 flex justify-between">
                              <span className="text-xs font-medium" style={{ color: colors.text }}>
                                {skill.name}
                              </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(skill.proficiency / 5) * 100}%`,
                                  backgroundColor: colors.accent,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Languages */}
                    {section.type === "languages" && (
                      <div className="space-y-2">
                        {(section.items as LanguageItem[]).map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <span className="text-xs font-medium" style={{ color: colors.text }}>
                              {item.name}
                            </span>
                            <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-500 capitalize">
                              {item.proficiency}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Certifications & Awards */}
                    {(section.type === "certifications" || section.type === "awards") && (
                      <div className="space-y-3">
                        {(section.items as (CertificationItem | AwardItem)[]).map((item) => (
                          <div key={item.id} className="text-xs">
                            <p className="font-bold" style={{ color: colors.primary }}>
                              {"name" in item ? item.name : item.title}
                            </p>
                            <p style={{ color: colors.secondary }}>{item.issuer}</p>
                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {"issueDate" in item ? item.issueDate : item.date}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Interests */}
                    {section.type === "interests" && (
                      <div className="flex flex-wrap gap-1.5">
                        {(section.items as InterestItem[]).map((item) => (
                          <span
                            key={item.id}
                            className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-600"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* References */}
                    {section.type === "references" && (
                      <div className="space-y-3">
                        {(section.items as ReferenceItem[]).map((item) => (
                          <div key={item.id} className="text-xs">
                            <p className="font-bold" style={{ color: colors.primary }}>
                              {item.name}
                            </p>
                            <p style={{ color: colors.secondary }}>
                              {item.title}, {item.company}
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-400">{item.email}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
