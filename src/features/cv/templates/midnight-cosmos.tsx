"use client";

/**
 * Midnight Cosmos Template
 * 
 * A stunning space-themed design with cosmic aesthetics:
 * - Starfield background with twinkling effect
 * - Nebula gradient overlays
 * - Constellation-style connections
 * - Cosmic color palette (deep purples, blues, golds)
 * - Planet/orbit decorative elements
 * - Galaxy-inspired typography
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Rocket, Orbit, Sparkles, Star, Sun, Moon, Zap, CircleDot } from "lucide-react";
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

const nebulaGradient = "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4c1d95 60%, #581c87 80%, #1e1b4b 100%)";
const starGold = "#fcd34d";
const cosmicCard = "bg-indigo-950/70 backdrop-blur-md border border-indigo-500/20";

export function MidnightCosmosTemplate({ personalInfo, sections, settings }: TemplateProps) {
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
    return `${start} → ${isCurrent ? "Present" : end || ""}`;
  };

  // Pre-computed star positions for the background (deterministic to avoid React hydration issues)
  const stars = [
    { id: 0, top: "5%", left: "10%", size: 2, opacity: 0.7 },
    { id: 1, top: "15%", left: "85%", size: 1.5, opacity: 0.5 },
    { id: 2, top: "25%", left: "45%", size: 1, opacity: 0.8 },
    { id: 3, top: "8%", left: "30%", size: 2.5, opacity: 0.6 },
    { id: 4, top: "35%", left: "75%", size: 1.2, opacity: 0.9 },
    { id: 5, top: "45%", left: "20%", size: 1.8, opacity: 0.4 },
    { id: 6, top: "55%", left: "90%", size: 1, opacity: 0.7 },
    { id: 7, top: "12%", left: "60%", size: 2.2, opacity: 0.5 },
    { id: 8, top: "65%", left: "35%", size: 1.5, opacity: 0.8 },
    { id: 9, top: "75%", left: "55%", size: 1, opacity: 0.6 },
    { id: 10, top: "85%", left: "15%", size: 2, opacity: 0.9 },
    { id: 11, top: "20%", left: "5%", size: 1.3, opacity: 0.5 },
    { id: 12, top: "40%", left: "95%", size: 1.8, opacity: 0.7 },
    { id: 13, top: "50%", left: "40%", size: 1, opacity: 0.4 },
    { id: 14, top: "30%", left: "25%", size: 2.5, opacity: 0.8 },
    { id: 15, top: "70%", left: "80%", size: 1.2, opacity: 0.6 },
    { id: 16, top: "90%", left: "50%", size: 1.5, opacity: 0.9 },
    { id: 17, top: "3%", left: "70%", size: 1, opacity: 0.5 },
    { id: 18, top: "60%", left: "8%", size: 2, opacity: 0.7 },
    { id: 19, top: "78%", left: "65%", size: 1.8, opacity: 0.4 },
    { id: 20, top: "18%", left: "92%", size: 1.3, opacity: 0.8 },
    { id: 21, top: "48%", left: "12%", size: 2.2, opacity: 0.6 },
    { id: 22, top: "82%", left: "38%", size: 1, opacity: 0.9 },
    { id: 23, top: "28%", left: "58%", size: 1.5, opacity: 0.5 },
    { id: 24, top: "95%", left: "82%", size: 1.8, opacity: 0.7 },
  ];

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: "#e0e7ff",
        padding: "12mm 16mm",
        background: nebulaGradient,
      }}
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255,255,255,0.3)`,
            }}
          />
        ))}
      </div>

      {/* Nebula Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -right-20 w-80 h-80 rounded-full opacity-30 blur-3xl bg-purple-500" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl bg-blue-500" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-15 blur-3xl bg-pink-500" />
      </div>

      {/* Orbit Ring Decoration */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-indigo-500/20 pointer-events-none">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
      </div>

      {/* Header */}
      <header className={cn("relative z-10 rounded-2xl p-7 mb-6", cosmicCard)}>
        {/* Glowing Top Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <div className="flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              {/* Orbital Ring Around Photo */}
              <div className="absolute -inset-3 rounded-full border border-amber-400/30" />
              <div className="absolute -inset-5 rounded-full border border-indigo-400/20" />
              <div className="absolute -inset-3 -top-4 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover border-2 border-indigo-400/50 shadow-2xl", photoShapeClass)}
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-medium">Mission Profile</span>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight mb-2 text-white"
              style={{
                textShadow: "0 0 30px rgba(251, 191, 36, 0.3)",
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium text-amber-200">{personalInfo.headline || "Professional Title"}</p>

            {/* Contact Constellation */}
            <div className="mt-5 flex flex-wrap gap-3">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm hover:border-amber-400/50 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-indigo-100">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-indigo-100">{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-indigo-100">{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm hover:border-amber-400/50 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-indigo-100">Website</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm hover:border-amber-400/50 transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-indigo-100">LinkedIn</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-sm hover:border-amber-400/50 transition-colors">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-indigo-100">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-6 pt-5 border-t border-indigo-500/20">
            <p className="text-sm text-indigo-200 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}
      </header>

      {/* Main Content Grid */}
      <div className="relative z-10 grid gap-4 lg:grid-cols-3">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-4">
          {sections
            .filter((s) => s.isVisible && !["skills", "languages", "certifications", "interests"].includes(s.type))
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <section key={section.id} className={cn("rounded-2xl p-5", cosmicCard)}>
                <header className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-indigo-900/50 border border-indigo-500/30">
                    {section.type === "experience" && <Orbit className="w-4 h-4 text-amber-400" />}
                    {section.type === "education" && <Moon className="w-4 h-4 text-blue-400" />}
                    {section.type === "projects" && <Rocket className="w-4 h-4 text-purple-400" />}
                    {section.type === "awards" && <Star className="w-4 h-4 text-amber-400" />}
                    {!["experience", "education", "projects", "awards"].includes(section.type) && <Sparkles className="w-4 h-4 text-amber-400" />}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-200">{section.title}</h3>
                  <div className="flex-1 flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
                    <Star className="w-3 h-3 text-amber-400/50 mx-2" />
                    <div className="flex-1 h-px bg-gradient-to-l from-indigo-500/50 to-transparent" />
                  </div>
                </header>

                <div className="space-y-5">
                  {section.items.length === 0 && (
                    <p className="text-sm text-indigo-400 italic">Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="relative pl-5">
                          {/* Constellation Line */}
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/50 via-indigo-500/30 to-transparent" />
                          <div className="absolute left-[-3px] top-1 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                          
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-white">{exp.role || "Role"}</h4>
                              <p className="text-sm text-amber-300">{exp.company}</p>
                            </div>
                            <span className="text-xs text-indigo-300 font-mono px-2 py-1 rounded bg-indigo-900/50">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                          </div>
                          {exp.description && <p className="text-sm text-indigo-200 mb-2">{exp.description}</p>}
                          {exp.bullets?.length > 0 && (
                            <ul className="space-y-1.5">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-indigo-100">
                                  <CircleDot className="w-3 h-3 mt-1 text-amber-400/70 shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.techStack?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {exp.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-indigo-200 border border-indigo-500/30">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "education") {
                      const edu = item as EducationItem;
                      return (
                        <div key={edu.id} className="relative pl-5">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/50 via-indigo-500/30 to-transparent" />
                          <div className="absolute left-[-3px] top-1 w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
                          <h4 className="font-semibold text-white">{edu.degree || "Degree"}</h4>
                          <p className="text-sm text-blue-300">{edu.institution}</p>
                          <p className="text-xs text-indigo-400 font-mono">{formatDateRange(edu.startDate, edu.endDate)}</p>
                          {edu.description && <p className="mt-1 text-sm text-indigo-200">{edu.description}</p>}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id} className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-500/20">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Zap className="w-4 h-4 text-purple-400" />
                            {proj.name || "Project"}
                          </h4>
                          {proj.description && <p className="mt-1 text-sm text-indigo-200">{proj.description}</p>}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-purple-900/50 text-purple-200 border border-purple-500/30">{tech}</span>
                              ))}
                            </div>
                          )}
                          {proj.url && (
                            <a href={proj.url} className="mt-2 inline-flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200">
                              <Globe className="w-3 h-3" /> Launch Project
                            </a>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "awards") {
                      const award = item as AwardItem;
                      return (
                        <div key={award.id} className="relative pl-5">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-amber-400/30" />
                          <div className="absolute left-[-3px] top-1 w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-400" />
                            {award.title}
                          </h4>
                          <p className="text-sm text-indigo-200">{award.issuer}</p>
                          {award.date && <p className="text-xs text-indigo-400">{award.date}</p>}
                        </div>
                      );
                    }
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id} className="pl-5 border-l border-indigo-500/30">
                        <h4 className="font-semibold text-white">{custom.title || "Item"}</h4>
                        {custom.description && <p className="text-sm text-indigo-200">{custom.description}</p>}
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
              <section key={section.id} className={cn("rounded-2xl p-5", cosmicCard)}>
                <header className="flex items-center gap-2 mb-4">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-200">{section.title}</h3>
                </header>

                {section.type === "skills" && (
                  <div className="space-y-4">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-indigo-100">{skill.name}</span>
                          <span className="text-amber-400 font-mono text-xs">{skill.proficiency * 20}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-indigo-900/50 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.proficiency * 20}%`,
                              background: `linear-gradient(90deg, ${starGold}, #f97316)`,
                              boxShadow: `0 0 10px ${starGold}`,
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
                        <Star className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-white">{cert.name}</p>
                          <p className="text-xs text-indigo-300">{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "languages" && (
                  <div className="space-y-2">
                    {(section.items as LanguageItem[]).map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between">
                        <span className="text-sm text-indigo-100">{lang.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/50 text-amber-300 border border-indigo-500/30">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as InterestItem[]).map((interest) => (
                      <span key={interest.id} className="text-xs px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-200 border border-indigo-500/30">
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
