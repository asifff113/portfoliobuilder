"use client";

/**
 * Carbon Fiber Template
 * 
 * A premium dark theme with motorsport/luxury aesthetics:
 * - Carbon fiber texture background pattern
 * - Metallic gold/silver accent options
 * - Sharp angular design elements
 * - Racing stripe dividers
 * - High contrast typography
 * - Brushed metal card effects
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code, Target, Flame, Shield, Trophy } from "lucide-react";
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

const metalGold = "linear-gradient(135deg, #d4af37 0%, #f9df7a 50%, #d4af37 100%)";
const carbonCard = "bg-zinc-900 border border-zinc-700/50";

export function CarbonFiberTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "rounded";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-sm",
    none: "hidden",
  }[photoShape];

  const formatDateRange = (start?: string, end?: string | null, isCurrent?: boolean) => {
    if (!start) return "";
    return `${start} – ${isCurrent ? "Present" : end || ""}`;
  };

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: "#fafafa",
        padding: "12mm 16mm",
        background: "#18181b",
      }}
    >
      {/* Carbon Fiber Pattern Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 2px,
              rgba(39, 39, 42, 0.8) 2px,
              rgba(39, 39, 42, 0.8) 4px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 2px,
              rgba(39, 39, 42, 0.8) 2px,
              rgba(39, 39, 42, 0.8) 4px
            )
          `,
          backgroundSize: "8px 8px",
        }}
      />

      {/* Racing Stripe Accent */}
      <div className="absolute top-0 left-[60px] w-1 h-full" style={{ background: metalGold, opacity: 0.6 }} />
      <div className="absolute top-0 left-[66px] w-0.5 h-full" style={{ background: metalGold, opacity: 0.3 }} />

      {/* Header */}
      <header className={cn("relative z-10 rounded-lg p-6 mb-6", carbonCard)}>
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: metalGold }} />
        
        {/* Angled Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 rotate-45" style={{ background: metalGold, opacity: 0.1 }} />
        </div>

        <div className="flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-lg" style={{ background: metalGold, opacity: 0.7 }} />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover", photoShapeClass)}
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <Shield className="w-4 h-4" style={{ color: "#d4af37" }} />
              <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: "#d4af37" }}>Executive Profile</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p
              className="text-lg font-medium"
              style={{
                background: metalGold,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>

            {/* Contact Grid */}
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-2">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 text-sm text-zinc-300">
                  <Phone className="w-4 h-4 text-amber-500" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 text-sm text-zinc-300">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                  <Globe className="w-4 h-4 text-amber-500" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 text-amber-500" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors">
                  <Github className="w-4 h-4 text-zinc-400" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-5 pt-5 border-t border-zinc-700/50">
            <p className="text-sm text-zinc-300 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="relative z-10 grid gap-4 lg:grid-cols-3">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-4">
          {sections
            .filter((s) => s.isVisible && !["skills", "languages", "certifications", "interests"].includes(s.type))
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <section key={section.id} className={cn("rounded-lg p-5", carbonCard)}>
                <header className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded bg-zinc-800 border border-zinc-700">
                    {section.type === "experience" && <Briefcase className="w-4 h-4 text-amber-500" />}
                    {section.type === "education" && <GraduationCap className="w-4 h-4 text-amber-500" />}
                    {section.type === "projects" && <Code className="w-4 h-4 text-amber-500" />}
                    {section.type === "awards" && <Trophy className="w-4 h-4 text-amber-500" />}
                    {!["experience", "education", "projects", "awards"].includes(section.type) && <Target className="w-4 h-4 text-amber-500" />}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">{section.title}</h3>
                  <div className="flex-1 h-px bg-zinc-700/50" />
                  <div className="w-8 h-px" style={{ background: metalGold }} />
                </header>

                <div className="space-y-5">
                  {section.items.length === 0 && (
                    <p className="text-sm text-zinc-500 italic">Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-zinc-700">
                            <div className="absolute top-0 w-full h-1/3" style={{ background: metalGold }} />
                          </div>
                          <div className="pl-4">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                              <div>
                                <h4 className="font-bold text-white">{exp.role || "Role"}</h4>
                                <p className="text-sm text-amber-500 font-medium">{exp.company}</p>
                              </div>
                              <span className="text-xs text-zinc-400 font-mono">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                            </div>
                            {exp.description && <p className="text-sm text-zinc-400 mb-2">{exp.description}</p>}
                            {exp.bullets?.length > 0 && (
                              <ul className="space-y-1.5">
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <Flame className="w-3 h-3 mt-1 text-amber-500 shrink-0" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {exp.techStack?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {exp.techStack.map((tech, idx) => (
                                  <span key={idx} className="text-xs px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700">{tech}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    if (section.type === "education") {
                      const edu = item as EducationItem;
                      return (
                        <div key={edu.id} className="pl-4 border-l-2 border-amber-500/50">
                          <h4 className="font-bold text-white">{edu.degree || "Degree"}</h4>
                          <p className="text-sm text-amber-500 font-medium">{edu.institution}</p>
                          <p className="text-xs text-zinc-500 font-mono">{formatDateRange(edu.startDate, edu.endDate)}</p>
                          {edu.description && <p className="mt-1 text-sm text-zinc-400">{edu.description}</p>}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id} className="p-4 rounded bg-zinc-800/50 border border-zinc-700/50">
                          <h4 className="font-bold text-white flex items-center gap-2">
                            <Code className="w-4 h-4 text-amber-500" />
                            {proj.title || "Project"}
                          </h4>
                          {proj.description && <p className="mt-1 text-sm text-zinc-400">{proj.description}</p>}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-700">{tech}</span>
                              ))}
                            </div>
                          )}
                          {proj.url && (
                            <a href={proj.url} className="mt-2 inline-flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400">
                              <Globe className="w-3 h-3" /> View Project
                            </a>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "awards") {
                      const award = item as AwardItem;
                      return (
                        <div key={award.id} className="pl-4 border-l-2 border-amber-500/50">
                          <h4 className="font-bold text-white flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-500" />
                            {award.title}
                          </h4>
                          <p className="text-sm text-zinc-400">{award.issuer}</p>
                          {award.date && <p className="text-xs text-zinc-500">{award.date}</p>}
                        </div>
                      );
                    }
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id} className="pl-4 border-l-2 border-zinc-600">
                        <h4 className="font-bold text-white">{custom.title || "Item"}</h4>
                        {custom.description && <p className="text-sm text-zinc-400">{custom.description}</p>}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {sections
            .filter((s) => s.isVisible && ["skills", "languages", "certifications", "interests"].includes(s.type))
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <section key={section.id} className={cn("rounded-lg p-5", carbonCard)}>
                <header className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5" style={{ background: metalGold }} />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">{section.title}</h3>
                </header>

                {section.type === "skills" && (
                  <div className="space-y-3">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-zinc-300">{skill.name}</span>
                          <span className="text-amber-500 font-mono text-xs">{skill.proficiency * 20}%</span>
                        </div>
                        <div className="h-1 bg-zinc-800 rounded-sm overflow-hidden">
                          <div
                            className="h-full rounded-sm"
                            style={{
                              width: `${skill.proficiency * 20}%`,
                              background: metalGold,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "certifications" && (
                  <div className="space-y-3">
                    {(section.items as CertificationItem[]).map((cert) => (
                      <div key={cert.id} className="flex items-start gap-2">
                        <Award className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-white">{cert.name}</p>
                          <p className="text-xs text-zinc-500">{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "languages" && (
                  <div className="space-y-2">
                    {(section.items as LanguageItem[]).map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between">
                        <span className="text-sm text-zinc-300">{lang.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-zinc-800 text-amber-500 border border-zinc-700">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as InterestItem[]).map((interest) => (
                      <span key={interest.id} className="text-xs px-3 py-1 bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {interest.name}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}
