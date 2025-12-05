"use client";

/**
 * Cyber Grid Template
 * 
 * A digital wireframe aesthetic design:
 * - Neon grid lines
 * - Circuit board patterns
 * - Scan line effects
 * - Digital data visualization
 * - Holographic accents
 * - Monospace typography
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Cpu, CircuitBoard, Binary, Scan, Database, Terminal, Wifi, Server } from "lucide-react";
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

const neonGreen = "#39ff14";
const neonCyan = "#00fff7";
const gridDark = "#0a0a0f";
const gridCard = "bg-[#0d0d15]/90 border border-[#39ff14]/20";

export function CyberGridTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 90;
  const photoShape = settings?.photoShape ?? "square";

  const photoShapeClass = {
    circle: "rounded-none",
    rounded: "rounded-none",
    square: "rounded-none",
    none: "hidden",
  }[photoShape];

  const formatDateRange = (start?: string, end?: string | null, isCurrent?: boolean) => {
    if (!start) return "";
    return `${start} >> ${isCurrent ? "PRESENT" : end || ""}`;
  };

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "JetBrains Mono", "Fira Code", monospace)',
        color: neonGreen,
        padding: "12mm 16mm",
        background: gridDark,
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(${neonGreen}20 1px, transparent 1px),
            linear-gradient(90deg, ${neonGreen}20 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Circuit Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${neonGreen}40, transparent)` }} />
        <div className="absolute bottom-40 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${neonCyan}30, transparent)` }} />
        <div className="absolute top-0 left-1/4 w-px h-full" style={{ background: `linear-gradient(180deg, transparent, ${neonGreen}20, transparent)` }} />
        <div className="absolute top-0 right-1/3 w-px h-full" style={{ background: `linear-gradient(180deg, transparent, ${neonCyan}15, transparent)` }} />
      </div>

      {/* Header */}
      <header className={cn("relative z-10 p-5 mb-6", gridCard)}>
        {/* Scan Line Effect */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: neonGreen, boxShadow: `0 0 10px ${neonGreen}` }} />
        
        {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2" style={{ borderColor: neonGreen }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2" style={{ borderColor: neonGreen }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2" style={{ borderColor: neonGreen }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2" style={{ borderColor: neonGreen }} />

        <div className="flex items-start gap-6">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              <div className="absolute -inset-1 border" style={{ borderColor: neonGreen }} />
              <div className="absolute -inset-2 border" style={{ borderColor: neonGreen, opacity: 0.3 }} />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("relative object-cover grayscale", photoShapeClass)}
                style={{ width: photoSize, height: photoSize, filter: `grayscale(100%) brightness(1.2) sepia(100%) hue-rotate(50deg) saturate(500%)` }}
              />
              {/* Scan overlay */}
              <div className="absolute inset-0 opacity-30" style={{ background: `linear-gradient(180deg, transparent 50%, ${neonGreen}20 50%)`, backgroundSize: "100% 4px" }} />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4" style={{ color: neonGreen }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: neonCyan }}>// USER_PROFILE</span>
            </div>
            <h1
              className="text-3xl font-bold tracking-tight mb-1 uppercase"
              style={{ 
                color: neonGreen,
                textShadow: `0 0 20px ${neonGreen}60`,
              }}
            >
              {personalInfo.fullName || "USER_NAME"}
            </h1>
            <p className="text-sm tracking-widest uppercase" style={{ color: neonCyan }}>
              &gt; {personalInfo.headline || "DESIGNATION"}
            </p>

            {/* Contact Data */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Mail className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                  <span style={{ color: neonGreen }}>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                  <span style={{ color: neonGreen }}>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                  <span style={{ color: neonGreen }}>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Globe className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                  <span style={{ color: neonGreen }}>WEBSITE</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Linkedin className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                  <span style={{ color: neonGreen }}>LINKEDIN</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Github className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                  <span style={{ color: neonGreen }}>GITHUB</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: `${neonGreen}30` }}>
            <p className="text-xs leading-relaxed" style={{ color: `${neonGreen}cc` }}>
              <span style={{ color: neonCyan }}>&gt;&gt; </span>{personalInfo.summary}
            </p>
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
              <section key={section.id} className={cn("p-4", gridCard)}>
                <header className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 border" style={{ borderColor: neonGreen }}>
                    {section.type === "experience" && <Server className="w-3.5 h-3.5" style={{ color: neonGreen }} />}
                    {section.type === "education" && <Database className="w-3.5 h-3.5" style={{ color: neonGreen }} />}
                    {section.type === "projects" && <Cpu className="w-3.5 h-3.5" style={{ color: neonGreen }} />}
                    {section.type === "awards" && <Binary className="w-3.5 h-3.5" style={{ color: neonGreen }} />}
                    {!["experience", "education", "projects", "awards"].includes(section.type) && <Scan className="w-3.5 h-3.5" style={{ color: neonGreen }} />}
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em]" style={{ color: neonCyan }}>// {section.title}</h3>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${neonGreen}50, transparent)` }} />
                </header>

                <div className="space-y-4">
                  {section.items.length === 0 && (
                    <p className="text-xs" style={{ color: `${neonGreen}60` }}>&gt; NO_DATA_FOUND</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="pl-4 border-l" style={{ borderColor: `${neonGreen}40` }}>
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                            <div>
                              <h4 className="text-sm font-semibold uppercase" style={{ color: neonGreen }}>{exp.role || "ROLE"}</h4>
                              <p className="text-xs" style={{ color: neonCyan }}>&gt; {exp.company}</p>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 border" style={{ borderColor: `${neonGreen}50`, color: `${neonGreen}cc` }}>
                              {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-xs mb-2" style={{ color: `${neonGreen}aa` }}>{exp.description}</p>
                          )}
                          {exp.bullets?.length > 0 && (
                            <ul className="space-y-1">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs" style={{ color: `${neonGreen}cc` }}>
                                  <span style={{ color: neonCyan }}>&gt;</span>
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {exp.techStack.map((tech, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 border uppercase" style={{ borderColor: `${neonCyan}40`, color: neonCyan }}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "education") {
                      const edu = item as EducationItem;
                      return (
                        <div key={edu.id} className="pl-4 border-l" style={{ borderColor: `${neonCyan}40` }}>
                          <h4 className="text-sm font-semibold uppercase" style={{ color: neonGreen }}>{edu.degree || "DEGREE"}</h4>
                          <p className="text-xs" style={{ color: neonCyan }}>&gt; {edu.institution}</p>
                          <p className="text-[10px]" style={{ color: `${neonGreen}80` }}>{formatDateRange(edu.startDate, edu.endDate)}</p>
                          {edu.description && <p className="mt-1 text-xs" style={{ color: `${neonGreen}aa` }}>{edu.description}</p>}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id} className="p-3 border" style={{ borderColor: `${neonGreen}30` }}>
                          <h4 className="text-sm font-semibold uppercase flex items-center gap-2" style={{ color: neonGreen }}>
                            <Cpu className="w-3.5 h-3.5" style={{ color: neonCyan }} />
                            {proj.name || "PROJECT"}
                          </h4>
                          {proj.description && <p className="mt-1 text-xs" style={{ color: `${neonGreen}aa` }}>{proj.description}</p>}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-[10px] px-2 py-0.5 border uppercase" style={{ borderColor: `${neonCyan}40`, color: neonCyan }}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {proj.url && (
                            <a href={proj.url} className="mt-2 inline-flex items-center gap-1 text-[10px] uppercase hover:opacity-70" style={{ color: neonCyan }}>
                              <Wifi className="w-3 h-3" /> LINK
                            </a>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "awards") {
                      const award = item as AwardItem;
                      return (
                        <div key={award.id} className="pl-4 border-l" style={{ borderColor: `${neonGreen}40` }}>
                          <h4 className="text-sm font-semibold uppercase" style={{ color: neonGreen }}>{award.title}</h4>
                          <p className="text-xs" style={{ color: neonCyan }}>&gt; {award.issuer}</p>
                          {award.date && <p className="text-[10px]" style={{ color: `${neonGreen}80` }}>{award.date}</p>}
                        </div>
                      );
                    }
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id} className="pl-4 border-l" style={{ borderColor: `${neonGreen}40` }}>
                        <h4 className="text-sm font-semibold uppercase" style={{ color: neonGreen }}>{custom.title || "ITEM"}</h4>
                        {custom.description && <p className="text-xs" style={{ color: `${neonGreen}aa` }}>{custom.description}</p>}
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
              <section key={section.id} className={cn("p-4", gridCard)}>
                <header className="flex items-center gap-2 mb-4">
                  <CircuitBoard className="w-3.5 h-3.5" style={{ color: neonGreen }} />
                  <h3 className="text-xs uppercase tracking-[0.15em]" style={{ color: neonCyan }}>// {section.title}</h3>
                </header>

                {section.type === "skills" && (
                  <div className="space-y-3">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: neonGreen }}>{skill.name}</span>
                          <span style={{ color: neonCyan }}>{skill.proficiency * 20}%</span>
                        </div>
                        <div className="h-1 border" style={{ borderColor: `${neonGreen}40` }}>
                          <div
                            className="h-full"
                            style={{
                              width: `${skill.proficiency * 20}%`,
                              background: neonGreen,
                              boxShadow: `0 0 10px ${neonGreen}`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "certifications" && (
                  <div className="space-y-2">
                    {(section.items as CertificationItem[]).map((cert) => (
                      <div key={cert.id} className="flex items-start gap-2">
                        <Binary className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: neonCyan }} />
                        <div>
                          <p className="text-xs font-medium" style={{ color: neonGreen }}>{cert.name}</p>
                          <p className="text-[10px]" style={{ color: `${neonGreen}80` }}>{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "languages" && (
                  <div className="space-y-2">
                    {(section.items as LanguageItem[]).map((lang) => (
                      <div key={lang.id} className="flex items-center justify-between text-xs">
                        <span style={{ color: neonGreen }}>{lang.name}</span>
                        <span className="px-2 py-0.5 border text-[10px] uppercase" style={{ borderColor: `${neonCyan}40`, color: neonCyan }}>{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "interests" && (
                  <div className="flex flex-wrap gap-1">
                    {(section.items as InterestItem[]).map((interest) => (
                      <span key={interest.id} className="text-[10px] px-2 py-1 border uppercase" style={{ borderColor: `${neonGreen}30`, color: neonGreen }}>
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
