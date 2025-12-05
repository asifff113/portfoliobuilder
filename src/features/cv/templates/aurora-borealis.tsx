"use client";

/**
 * Aurora Borealis Template
 * 
 * A stunning northern lights inspired template:
 * - Flowing gradient backgrounds mimicking aurora
 * - Organic wave patterns
 * - Soft glowing effects
 * - Elegant typography with light weight fonts
 * - Nature-inspired color palette (teals, purples, greens)
 * - Frosted glass cards
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Mountain, Compass, Wind, Star, Sun } from "lucide-react";
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

const auroraGradient = "linear-gradient(135deg, #0d9488 0%, #6366f1 40%, #a855f7 70%, #ec4899 100%)";
const frostedCard = "bg-white/60 backdrop-blur-lg border border-white/40 shadow-lg";

export function AuroraBorealisTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 96;
  const photoShape = settings?.photoShape ?? "circle";

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
        color: "#1e293b",
        padding: "12mm 16mm",
        background: "linear-gradient(180deg, #f0fdfa 0%, #f5f3ff 50%, #fdf2f8 100%)",
      }}
    >
      {/* Aurora Wave Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #0d9488, transparent 70%)" }}
        />
        <div
          className="absolute top-1/4 -right-32 w-80 h-80 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -left-20 w-72 h-72 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }}
        />
      </div>

      {/* Header */}
      <header className={cn("relative z-10 rounded-3xl p-7 mb-6", frostedCard)}>
        <div className="flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full blur-lg opacity-50" style={{ background: auroraGradient, transform: "scale(1.15)" }} />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover border-4 border-white shadow-xl", photoShapeClass)}
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span className="text-xs uppercase tracking-widest text-teal-600 font-semibold">Professional Profile</span>
            </div>
            <h1
              className="text-4xl font-light tracking-tight mb-1"
              style={{
                background: auroraGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium text-indigo-600">{personalInfo.headline || "Professional Title"}</p>
            
            {/* Contact Info */}
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
                  <Mail className="w-4 h-4 text-teal-500" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 text-slate-600 hover:text-pink-600 transition-colors">
                  <Globe className="w-4 h-4 text-pink-500" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                  <Linkedin className="w-4 h-4 text-indigo-500" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <Github className="w-4 h-4 text-slate-700" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-6 pt-5 border-t border-white/60">
            <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </header>

      {/* Content Sections */}
      <div className="relative z-10 space-y-5">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section, sectionIdx) => {
            const accentColors = ["text-teal-600", "text-indigo-600", "text-purple-600", "text-pink-600"];
            const borderColors = ["border-teal-400/50", "border-indigo-400/50", "border-purple-400/50", "border-pink-400/50"];
            const bgColors = ["bg-teal-50/50", "bg-indigo-50/50", "bg-purple-50/50", "bg-pink-50/50"];
            const dotColors = ["bg-teal-400", "bg-indigo-400", "bg-purple-400", "bg-pink-400"];
            const colorIdx = sectionIdx % 4;

            return (
              <section key={section.id} className={cn("rounded-2xl p-5", frostedCard)}>
                <header className="flex items-center gap-3 mb-4">
                  <div className={cn("p-2 rounded-xl", bgColors[colorIdx])}>
                    {section.type === "experience" && <Mountain className={cn("w-4 h-4", accentColors[colorIdx])} />}
                    {section.type === "education" && <Compass className={cn("w-4 h-4", accentColors[colorIdx])} />}
                    {section.type === "skills" && <Wind className={cn("w-4 h-4", accentColors[colorIdx])} />}
                    {section.type === "projects" && <Star className={cn("w-4 h-4", accentColors[colorIdx])} />}
                    {section.type === "certifications" && <Sun className={cn("w-4 h-4", accentColors[colorIdx])} />}
                    {!["experience", "education", "skills", "projects", "certifications"].includes(section.type) && <Sparkles className={cn("w-4 h-4", accentColors[colorIdx])} />}
                  </div>
                  <h3 className={cn("text-sm font-semibold uppercase tracking-wider", accentColors[colorIdx])}>{section.title}</h3>
                  <div className={cn("flex-1 h-px rounded-full", "bg-gradient-to-r", "from-current to-transparent")} style={{ color: `var(--${["teal", "indigo", "purple", "pink"][colorIdx]}-200)` }} />
                </header>

                {/* Skills Grid */}
                {section.type === "skills" && (
                  <div className="grid grid-cols-2 gap-3">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id} className="p-3 rounded-xl bg-white/40 border border-white/60">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-800">{skill.name}</span>
                          <span className="text-xs text-slate-500">{skill.proficiency * 20}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.proficiency * 20}%`,
                              background: auroraGradient,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Experience/Education/Projects */}
                {["experience", "education", "projects", "certifications"].includes(section.type) && (
                  <div className="space-y-4">
                    {section.items.length === 0 && (
                      <p className="text-sm text-slate-500 italic">Add content to populate this section.</p>
                    )}
                    {section.items.map((item) => {
                      if (section.type === "experience") {
                        const exp = item as ExperienceItem;
                        return (
                          <div key={exp.id} className={cn("pl-4 border-l-2", borderColors[colorIdx])}>
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h4 className="font-semibold text-slate-900">{exp.role || "Role"}</h4>
                                <p className={cn("text-sm font-medium", accentColors[colorIdx])}>{exp.company}</p>
                              </div>
                              <span className="text-xs text-slate-500">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                            </div>
                            {exp.description && <p className="mt-2 text-sm text-slate-600">{exp.description}</p>}
                            {exp.bullets?.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                    <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", dotColors[colorIdx])} />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {exp.techStack?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {exp.techStack.map((tech, idx) => (
                                  <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-white/60 text-slate-600 border border-slate-200">{tech}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }
                      if (section.type === "education") {
                        const edu = item as EducationItem;
                        return (
                          <div key={edu.id} className={cn("pl-4 border-l-2", borderColors[colorIdx])}>
                            <h4 className="font-semibold text-slate-900">{edu.degree || "Degree"}</h4>
                            <p className={cn("text-sm font-medium", accentColors[colorIdx])}>{edu.institution}</p>
                            <p className="text-xs text-slate-500">{formatDateRange(edu.startDate, edu.endDate)}</p>
                            {edu.description && <p className="mt-1 text-sm text-slate-600">{edu.description}</p>}
                          </div>
                        );
                      }
                      if (section.type === "projects") {
                        const proj = item as ProjectItem;
                        return (
                          <div key={proj.id} className="p-4 rounded-xl bg-white/40 border border-white/60">
                            <h4 className="font-semibold text-slate-900">{proj.name || "Project"}</h4>
                            {proj.description && <p className="mt-1 text-sm text-slate-600">{proj.description}</p>}
                            {proj.techStack?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {proj.techStack.map((tech, idx) => (
                                  <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">{tech}</span>
                                ))}
                              </div>
                            )}
                            {proj.url && (
                              <a href={proj.url} className={cn("mt-2 inline-flex items-center gap-1 text-xs hover:underline", accentColors[colorIdx])}>
                                <Globe className="w-3 h-3" /> View Project
                              </a>
                            )}
                          </div>
                        );
                      }
                      if (section.type === "certifications") {
                        const cert = item as CertificationItem;
                        return (
                          <div key={cert.id} className={cn("pl-4 border-l-2", borderColors[colorIdx])}>
                            <h4 className="font-semibold text-slate-900">{cert.name}</h4>
                            <p className="text-sm text-slate-600">{cert.issuer}</p>
                            {cert.issueDate && <p className="text-xs text-slate-500">{cert.issueDate}</p>}
                          </div>
                        );
                      }
                      // Generic fallback
                      const custom = item as CustomItem;
                      return (
                        <div key={custom.id}>
                          <h4 className="font-semibold text-slate-900">{custom.title || "Item"}</h4>
                          {custom.description && <p className="text-sm text-slate-600">{custom.description}</p>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Languages & Interests */}
                {section.type === "languages" && (
                  <div className="flex flex-wrap gap-3">
                    {(section.items as LanguageItem[]).map((lang) => (
                      <div key={lang.id} className="px-4 py-2 rounded-xl bg-white/40 border border-white/60 flex items-center gap-3">
                        <span className="font-medium text-slate-800">{lang.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as InterestItem[]).map((interest) => (
                      <span key={interest.id} className="text-sm px-3 py-1.5 rounded-full bg-white/40 text-slate-700 border border-white/60">
                        {interest.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Awards */}
                {section.type === "awards" && (
                  <div className="space-y-3">
                    {(section.items as AwardItem[]).map((award) => (
                      <div key={award.id} className={cn("pl-4 border-l-2", borderColors[colorIdx])}>
                        <h4 className="font-semibold text-slate-900">{award.title}</h4>
                        <p className="text-sm text-slate-600">{award.issuer}</p>
                        {award.date && <p className="text-xs text-slate-500">{award.date}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
      </div>
    </div>
  );
}
