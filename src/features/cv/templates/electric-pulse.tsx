"use client";

/**
 * Electric Pulse Template
 * 
 * A high-energy, dynamic design with electric aesthetics:
 * - Vibrant gradient pulses
 * - Electric blue and neon accents
 * - Dynamic visual elements
 * - Energy wave patterns
 * - Bold typography
 * - Glowing highlights
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Zap, Activity, Bolt, Sparkles, ArrowRight, Radio } from "lucide-react";
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

const electricGradient = "linear-gradient(135deg, #00d9ff 0%, #0099ff 30%, #6366f1 60%, #a855f7 100%)";
const pulseCard = "bg-slate-900/90 backdrop-blur-md border border-cyan-500/20";

export function ElectricPulseTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "rounded";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded-sm",
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
        background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Electric Pulse Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-px h-full opacity-20"
          style={{ background: "linear-gradient(180deg, transparent, #00d9ff, transparent)" }}
        />
        <div
          className="absolute top-0 right-1/3 w-px h-full opacity-15"
          style={{ background: "linear-gradient(180deg, transparent, #a855f7, #00d9ff, transparent)" }}
        />
        <div
          className="absolute top-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #00d9ff, transparent 70%)" }}
        />
        <div
          className="absolute bottom-20 -left-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)" }}
        />
      </div>

      {/* Header */}
      <header className={cn("relative z-10 rounded-2xl p-6 mb-6", pulseCard)}>
        {/* Electric Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: electricGradient }} />
        
        <div className="flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              <div
                className="absolute -inset-1 rounded-xl opacity-70"
                style={{ background: electricGradient }}
              />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover", photoShapeClass)}
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-cyan-300 font-semibold">Active Profile</span>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight mb-2"
              style={{
                background: electricGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium text-cyan-200">{personalInfo.headline || "Professional Title"}</p>

            {/* Contact Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm text-cyan-100 hover:bg-cyan-500/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm text-cyan-100">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-sm text-purple-100">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-sm text-purple-100 hover:bg-purple-500/20 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm text-blue-100 hover:bg-blue-500/20 transition-colors">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-500/10 border border-slate-500/30 text-sm text-slate-100 hover:bg-slate-500/20 transition-colors">
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-5 pt-5 border-t border-cyan-500/20">
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
              <section key={section.id} className={cn("rounded-2xl p-5", pulseCard)}>
                <header className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg" style={{ background: "linear-gradient(135deg, rgba(0,217,255,0.2), rgba(168,85,247,0.2))" }}>
                    {section.type === "experience" && <Activity className="w-4 h-4 text-cyan-400" />}
                    {section.type === "education" && <Radio className="w-4 h-4 text-purple-400" />}
                    {section.type === "projects" && <Bolt className="w-4 h-4 text-cyan-400" />}
                    {section.type === "awards" && <Sparkles className="w-4 h-4 text-purple-400" />}
                    {!["experience", "education", "projects", "awards"].includes(section.type) && <Zap className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-200">{section.title}</h3>
                  <div className="flex-1 h-px" style={{ background: electricGradient, opacity: 0.3 }} />
                </header>

                <div className="space-y-5">
                  {section.items.length === 0 && (
                    <p className="text-sm text-slate-500 italic">Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="relative pl-5 border-l-2 border-cyan-500/30">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-semibold text-white">{exp.role || "Role"}</h4>
                              <p className="text-sm text-cyan-300">{exp.company}</p>
                            </div>
                            <span className="text-xs text-slate-400 font-mono px-2 py-1 rounded bg-slate-800">{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                          </div>
                          {exp.description && <p className="text-sm text-slate-400 mb-2">{exp.description}</p>}
                          {exp.bullets?.length > 0 && (
                            <ul className="space-y-1.5">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                  <ArrowRight className="w-3 h-3 mt-1 text-cyan-400 shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.techStack?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {exp.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/30">{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "education") {
                      const edu = item as EducationItem;
                      return (
                        <div key={edu.id} className="pl-5 border-l-2 border-purple-500/30">
                          <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50" />
                          <h4 className="font-semibold text-white">{edu.degree || "Degree"}</h4>
                          <p className="text-sm text-purple-300">{edu.institution}</p>
                          <p className="text-xs text-slate-500 font-mono">{formatDateRange(edu.startDate, edu.endDate)}</p>
                          {edu.description && <p className="mt-1 text-sm text-slate-400">{edu.description}</p>}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id} className="p-4 rounded-xl bg-slate-800/50 border border-cyan-500/20">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Bolt className="w-4 h-4 text-cyan-400" />
                            {proj.title || "Project"}
                          </h4>
                          {proj.description && <p className="mt-1 text-sm text-slate-400">{proj.description}</p>}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-200 border border-purple-500/30">{tech}</span>
                              ))}
                            </div>
                          )}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} className="mt-2 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                              <Globe className="w-3 h-3" /> Launch
                            </a>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "awards") {
                      const award = item as AwardItem;
                      return (
                        <div key={award.id} className="pl-5 border-l-2 border-purple-500/30">
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-purple-400" />
                            {award.title}
                          </h4>
                          <p className="text-sm text-slate-400">{award.issuer}</p>
                          {award.date && <p className="text-xs text-slate-500">{award.date}</p>}
                        </div>
                      );
                    }
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id} className="pl-5 border-l-2 border-slate-500/30">
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
              <section key={section.id} className={cn("rounded-2xl p-5", pulseCard)}>
                <header className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-200">{section.title}</h3>
                </header>

                {section.type === "skills" && (
                  <div className="space-y-4">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-slate-200">{skill.name}</span>
                          <span className="text-cyan-400 font-mono text-xs">{skill.proficiency * 20}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${skill.proficiency * 20}%`,
                              background: electricGradient,
                              boxShadow: "0 0 10px rgba(0,217,255,0.5)",
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
                        <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
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
                        <span className="text-sm text-slate-200">{lang.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-2">
                    {(section.items as InterestItem[]).map((interest) => (
                      <span key={interest.id} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-200 border border-purple-500/30">
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
