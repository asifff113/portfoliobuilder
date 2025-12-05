"use client";

/**
 * Prismatic Crystal Template
 * 
 * An elegant crystalline design with gem-like aesthetics:
 * - Light refraction effects with rainbow highlights
 * - Diamond/crystal geometric patterns
 * - Prismatic color shifts
 * - Multi-faceted card designs
 * - Elegant serif typography
 * - Luxurious gemstone color palette
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Diamond, Gem, Sparkles, Star, Crown, Hexagon, Triangle } from "lucide-react";
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

const prismGradient = "linear-gradient(135deg, #f472b6 0%, #c084fc 25%, #60a5fa 50%, #34d399 75%, #fbbf24 100%)";
const crystalCard = "bg-white/90 backdrop-blur-sm border border-white shadow-xl";

export function PrismaticCrystalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "circle";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-lg",
    none: "hidden",
  }[photoShape];

  const formatDateRange = (start?: string, end?: string | null, isCurrent?: boolean) => {
    if (!start) return "";
    return `${start} – ${isCurrent ? "Present" : end || ""}`;
  };

  // Gem colors for different sections
  const gemColors = [
    { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-600", dot: "bg-rose-400" },
    { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-600", dot: "bg-violet-400" },
    { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-600", dot: "bg-sky-400" },
    { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-600", dot: "bg-emerald-400" },
    { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600", dot: "bg-amber-400" },
  ];

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Playfair Display", "Georgia", serif)',
        color: "#1f2937",
        padding: "14mm 18mm",
        background: "linear-gradient(180deg, #fdf4ff 0%, #f0f9ff 50%, #f0fdf4 100%)",
      }}
    >
      {/* Crystal Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Prismatic Light Rays */}
        <div className="absolute top-0 left-1/4 w-1 h-96 rotate-12 opacity-20" style={{ background: prismGradient }} />
        <div className="absolute top-20 right-1/3 w-0.5 h-64 -rotate-12 opacity-15" style={{ background: prismGradient }} />
        <div className="absolute bottom-20 left-1/3 w-0.5 h-48 rotate-6 opacity-15" style={{ background: prismGradient }} />
        
        {/* Crystal Facets */}
        <div className="absolute top-10 right-10 w-32 h-32 opacity-10" style={{ background: "linear-gradient(135deg, #c084fc, transparent)" }} />
        <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10" style={{ background: "linear-gradient(45deg, #60a5fa, transparent)" }} />
      </div>

      {/* Header */}
      <header className={cn("relative z-10 rounded-3xl p-7 mb-6", crystalCard)}>
        {/* Prismatic Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl" style={{ background: prismGradient }} />
        
        {/* Diamond Corner Decoration */}
        <div className="absolute -top-3 -right-3">
          <Diamond className="w-8 h-8 text-violet-300 fill-violet-100" />
        </div>

        <div className="flex items-start gap-7">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              {/* Prismatic Ring Around Photo */}
              <div className="absolute -inset-2 rounded-full opacity-70" style={{ background: prismGradient, padding: "2px" }}>
                <div className="w-full h-full rounded-full bg-white" />
              </div>
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover border-4 border-white shadow-lg", photoShapeClass)}
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Gem className="w-4 h-4 text-violet-400" />
              <span className="text-xs uppercase tracking-[0.2em] text-violet-500 font-sans font-semibold">Distinguished Profile</span>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{
                background: prismGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium text-violet-600 font-sans">{personalInfo.headline || "Professional Title"}</p>

            {/* Elegant Contact Line */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-sans">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-slate-600 hover:text-rose-500 transition-colors">
                  <Mail className="w-4 h-4 text-rose-400" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-violet-400" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 text-slate-600 hover:text-emerald-500 transition-colors">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 text-slate-600 hover:text-sky-500 transition-colors">
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <Github className="w-4 h-4 text-slate-500" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-6 pt-5 border-t border-violet-100">
            <p className="text-sm text-slate-600 leading-relaxed font-sans italic">{personalInfo.summary}</p>
          </div>
        )}
      </header>

      {/* Content Sections */}
      <div className="relative z-10 space-y-5">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section, sectionIdx) => {
            const colors = gemColors[sectionIdx % gemColors.length];

            return (
              <section key={section.id} className={cn("rounded-2xl p-6", crystalCard)}>
                {/* Section Header with Gem Icon */}
                <header className="flex items-center gap-3 mb-5">
                  <div className={cn("p-2.5 rounded-xl", colors.bg, colors.border, "border")}>
                    {section.type === "experience" && <Crown className={cn("w-4 h-4", colors.text)} />}
                    {section.type === "education" && <Star className={cn("w-4 h-4", colors.text)} />}
                    {section.type === "skills" && <Hexagon className={cn("w-4 h-4", colors.text)} />}
                    {section.type === "projects" && <Triangle className={cn("w-4 h-4", colors.text)} />}
                    {section.type === "certifications" && <Diamond className={cn("w-4 h-4", colors.text)} />}
                    {!["experience", "education", "skills", "projects", "certifications"].includes(section.type) && <Sparkles className={cn("w-4 h-4", colors.text)} />}
                  </div>
                  <h3 className={cn("text-lg font-semibold", colors.text)}>{section.title}</h3>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: prismGradient, opacity: 0.3 }} />
                    <Gem className={cn("w-3 h-3", colors.text, "opacity-50")} />
                  </div>
                </header>

                {/* Skills Grid */}
                {section.type === "skills" && (
                  <div className="grid grid-cols-2 gap-4">
                    {(section.items as SkillItem[]).map((skill, idx) => {
                      const skillColor = gemColors[idx % gemColors.length];
                      return (
                        <div key={skill.id} className={cn("p-4 rounded-xl border", skillColor.bg, skillColor.border)}>
                          <div className="flex justify-between items-center mb-2 font-sans">
                            <span className="text-sm font-semibold text-slate-800">{skill.name}</span>
                            <span className={cn("text-xs font-medium", skillColor.text)}>{skill.proficiency * 20}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-white/80 overflow-hidden border border-white/50">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${skill.proficiency * 20}%`,
                                background: prismGradient,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Experience/Education/Projects */}
                {["experience", "education", "projects", "certifications", "awards"].includes(section.type) && (
                  <div className="space-y-5">
                    {section.items.length === 0 && (
                      <p className="text-sm text-slate-500 italic font-sans">Add content to populate this section.</p>
                    )}
                    {section.items.map((item) => {
                      if (section.type === "experience") {
                        const exp = item as ExperienceItem;
                        return (
                          <div key={exp.id} className={cn("pl-5 border-l-2", colors.border)}>
                            <div className={cn("absolute -ml-[23px] mt-1 w-2 h-2 rounded-full", colors.dot)} />
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                              <div>
                                <h4 className="font-semibold text-slate-900">{exp.role || "Role"}</h4>
                                <p className={cn("text-sm font-medium font-sans", colors.text)}>{exp.company}</p>
                              </div>
                              <span className="text-xs text-slate-500 font-sans">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                            </div>
                            {exp.description && <p className="text-sm text-slate-600 mb-2 font-sans">{exp.description}</p>}
                            {exp.bullets?.length > 0 && (
                              <ul className="space-y-1.5 font-sans">
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                    <Sparkles className={cn("w-3 h-3 mt-1 shrink-0", colors.text)} />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {exp.techStack?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2 font-sans">
                                {exp.techStack.map((tech, idx) => {
                                  const techColor = gemColors[idx % gemColors.length];
                                  return (
                                    <span key={idx} className={cn("text-xs px-2.5 py-1 rounded-full border", techColor.bg, techColor.border, techColor.text)}>
                                      {tech}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }
                      if (section.type === "education") {
                        const edu = item as EducationItem;
                        return (
                          <div key={edu.id} className={cn("pl-5 border-l-2", colors.border)}>
                            <h4 className="font-semibold text-slate-900">{edu.degree || "Degree"}</h4>
                            <p className={cn("text-sm font-medium font-sans", colors.text)}>{edu.institution}</p>
                            <p className="text-xs text-slate-500 font-sans">{formatDateRange(edu.startDate, edu.endDate)}</p>
                            {edu.description && <p className="mt-1 text-sm text-slate-600 font-sans">{edu.description}</p>}
                          </div>
                        );
                      }
                      if (section.type === "projects") {
                        const proj = item as ProjectItem;
                        return (
                          <div key={proj.id} className={cn("p-4 rounded-xl border", colors.bg, colors.border)}>
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              <Diamond className={cn("w-4 h-4", colors.text)} />
                              {proj.name || "Project"}
                            </h4>
                            {proj.description && <p className="mt-1 text-sm text-slate-600 font-sans">{proj.description}</p>}
                            {proj.techStack?.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2 font-sans">
                                {proj.techStack.map((tech, idx) => (
                                  <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-slate-600 border border-slate-200">{tech}</span>
                                ))}
                              </div>
                            )}
                            {proj.url && (
                              <a href={proj.url} className={cn("mt-2 inline-flex items-center gap-1 text-xs font-sans hover:underline", colors.text)}>
                                <Globe className="w-3 h-3" /> View Project
                              </a>
                            )}
                          </div>
                        );
                      }
                      if (section.type === "certifications") {
                        const cert = item as CertificationItem;
                        return (
                          <div key={cert.id} className="flex items-start gap-3">
                            <Diamond className={cn("w-5 h-5 mt-0.5 shrink-0", colors.text)} />
                            <div className="font-sans">
                              <h4 className="font-semibold text-slate-900">{cert.name}</h4>
                              <p className="text-sm text-slate-600">{cert.issuer}</p>
                              {cert.issueDate && <p className="text-xs text-slate-500">{cert.issueDate}</p>}
                            </div>
                          </div>
                        );
                      }
                      if (section.type === "awards") {
                        const award = item as AwardItem;
                        return (
                          <div key={award.id} className="flex items-start gap-3">
                            <Crown className={cn("w-5 h-5 mt-0.5 shrink-0", colors.text)} />
                            <div className="font-sans">
                              <h4 className="font-semibold text-slate-900">{award.title}</h4>
                              <p className="text-sm text-slate-600">{award.issuer}</p>
                              {award.date && <p className="text-xs text-slate-500">{award.date}</p>}
                            </div>
                          </div>
                        );
                      }
                      const custom = item as CustomItem;
                      return (
                        <div key={custom.id}>
                          <h4 className="font-semibold text-slate-900">{custom.title || "Item"}</h4>
                          {custom.description && <p className="text-sm text-slate-600 font-sans">{custom.description}</p>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Languages */}
                {section.type === "languages" && (
                  <div className="flex flex-wrap gap-3 font-sans">
                    {(section.items as LanguageItem[]).map((lang, idx) => {
                      const langColor = gemColors[idx % gemColors.length];
                      return (
                        <div key={lang.id} className={cn("px-4 py-2 rounded-xl border flex items-center gap-3", langColor.bg, langColor.border)}>
                          <span className="font-medium text-slate-800">{lang.name}</span>
                          <span className={cn("text-xs px-2 py-0.5 rounded-full bg-white/80", langColor.text)}>{lang.proficiency}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Interests */}
                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2 font-sans">
                    {(section.items as InterestItem[]).map((interest, idx) => {
                      const interestColor = gemColors[idx % gemColors.length];
                      return (
                        <span key={interest.id} className={cn("text-sm px-4 py-1.5 rounded-full border", interestColor.bg, interestColor.border, interestColor.text)}>
                          {interest.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
      </div>
    </div>
  );
}
