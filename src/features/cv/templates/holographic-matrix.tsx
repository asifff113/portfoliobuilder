"use client";

/**
 * Holographic Matrix Template
 * 
 * A cutting-edge futuristic template with holographic aesthetics:
 * - Iridescent gradients that shift colors
 * - Matrix-style data grid background
 * - Glowing borders and neon accents
 * - Floating card design with depth
 * - Tech HUD-inspired section headers
 * - Progressive skill visualization
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Sparkles, Layers, Target, Cpu, Activity, Zap, ChevronRight } from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
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

const holoGradient = "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)";
const holoCard = "bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl";

export function HolographicMatrixTemplate({ personalInfo, sections, settings }: TemplateProps) {
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

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: "#e2e8f0",
        padding: "12mm 16mm",
        background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
      }}
    >
      {/* Matrix Grid Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(102, 126, 234, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(102, 126, 234, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
      
      {/* Holographic Glow Orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: holoGradient }} />
      <div className="absolute bottom-40 left-10 w-48 h-48 rounded-full opacity-15 blur-3xl" style={{ background: "linear-gradient(135deg, #f093fb, #4facfe)" }} />

      {/* Header */}
      <header className={cn("relative z-10 rounded-2xl p-6 mb-6", holoCard)}>
        {/* Holographic Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: holoGradient }} />
        
        <div className="flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md opacity-60" style={{ background: holoGradient, transform: "scale(1.1)" }} />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover border-2 border-white/20 shadow-2xl", photoShapeClass)}
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs uppercase tracking-[0.3em] text-purple-300 font-medium">Profile.Initialize</span>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{
                background: holoGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg text-purple-200 font-medium">{personalInfo.headline || "Professional Title"}</p>
            
            {/* Contact Grid */}
            <div className="mt-4 flex flex-wrap gap-2">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-slate-300">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">
                  <Phone className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-slate-300">{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm">
                  <MapPin className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-slate-300">{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-300">Website</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-300">LinkedIn</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {personalInfo.summary && (
          <div className="mt-5 pt-5 border-t border-white/10">
            <p className="text-sm text-slate-300 leading-relaxed">{personalInfo.summary}</p>
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
              <section key={section.id} className={cn("rounded-2xl p-5", holoCard)}>
                <header className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3))" }}>
                    {section.type === "experience" && <Layers className="w-4 h-4 text-purple-300" />}
                    {section.type === "education" && <Target className="w-4 h-4 text-purple-300" />}
                    {section.type === "projects" && <Cpu className="w-4 h-4 text-purple-300" />}
                    {!["experience", "education", "projects"].includes(section.type) && <Activity className="w-4 h-4 text-purple-300" />}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-200">{section.title}</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                </header>
                
                <div className="space-y-4">
                  {section.items.length === 0 && (
                    <p className="text-sm text-slate-500 italic">Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="relative pl-4 border-l-2 border-purple-500/30">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full" style={{ background: holoGradient }} />
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-white">{exp.role || "Role"}</h4>
                              <p className="text-sm text-purple-300">{exp.company}</p>
                            </div>
                            <span className="text-xs text-slate-400 px-2 py-1 rounded bg-white/5">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                          </div>
                          {exp.description && <p className="text-sm text-slate-400 mb-2">{exp.description}</p>}
                          {exp.bullets?.length > 0 && (
                            <ul className="space-y-1">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                  <ChevronRight className="w-3 h-3 mt-1 text-pink-400 shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {exp.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "education") {
                      const edu = item as EducationItem;
                      return (
                        <div key={edu.id} className="relative pl-4 border-l-2 border-pink-500/30">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full" style={{ background: holoGradient }} />
                          <h4 className="font-semibold text-white">{edu.degree || "Degree"}</h4>
                          <p className="text-sm text-pink-300">{edu.institution}</p>
                          <p className="text-xs text-slate-400">{formatDateRange(edu.startDate, edu.endDate)}</p>
                          {edu.description && <p className="mt-1 text-sm text-slate-400">{edu.description}</p>}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Zap className="w-3.5 h-3.5 text-yellow-400" />
                            {proj.title || "Project"}
                          </h4>
                          {proj.description && <p className="mt-1 text-sm text-slate-400">{proj.description}</p>}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30">{tech}</span>
                              ))}
                            </div>
                          )}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} className="mt-2 inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
                              <Globe className="w-3 h-3" /> View Project
                            </a>
                          )}
                        </div>
                      );
                    }
                    // Generic fallback
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id} className="pl-4 border-l-2 border-slate-500/30">
                        <h4 className="font-semibold text-white">{custom.title || "Item"}</h4>
                        {custom.description && <p className="text-sm text-slate-400">{custom.description}</p>}
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
              <section key={section.id} className={cn("rounded-2xl p-5", holoCard)}>
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: holoGradient }} />
                <header className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 rounded-full" style={{ background: holoGradient }} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-200">{section.title}</h3>
                </header>

                {section.type === "skills" && (
                  <div className="space-y-3">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{skill.name}</span>
                          <span className="text-purple-300 font-mono text-xs">{skill.proficiency * 20}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.proficiency * 20}%`,
                              background: holoGradient,
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
                        <div className="mt-1 p-1 rounded bg-purple-500/20">
                          <Target className="w-3 h-3 text-purple-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{cert.name}</p>
                          <p className="text-xs text-slate-400">{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "languages" && (
                  <div className="space-y-2">
                    {(section.items as LanguageItem[]).map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">{lang.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-200">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as InterestItem[]).map((interest) => (
                      <span key={interest.id} className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
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
