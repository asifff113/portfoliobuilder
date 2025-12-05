"use client";

/**
 * Zen Garden Template
 * 
 * A Japanese minimalist aesthetic with serene design:
 * - Clean lines and generous whitespace
 * - Muted earth tones and soft greens
 * - Elegant brushstroke accents
 * - Balanced asymmetry
 * - Subtle ink-wash gradients
 * - Refined typography
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Leaf, Circle, Minus, Mountain } from "lucide-react";
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

const zenColors = {
  ink: "#2d3436",
  stone: "#636e72",
  bamboo: "#00b894",
  sand: "#ffeaa7",
  paper: "#faf9f7",
  moss: "#55a38b",
};

export function ZenGardenTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 90;
  const photoShape = settings?.photoShape ?? "circle";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-2xl",
    square: "rounded-none",
    none: "hidden",
  }[photoShape];

  const formatDateRange = (start?: string, end?: string | null, isCurrent?: boolean) => {
    if (!start) return "";
    return `${start} — ${isCurrent ? "Present" : end || ""}`;
  };

  return (
    <div
      className="relative w-full max-w-[820px] min-h-[1100px]"
      style={{
        fontFamily: 'var(--cv-font-family, "Noto Serif", Georgia, serif)',
        color: zenColors.ink,
        padding: "16mm 20mm",
        background: zenColors.paper,
      }}
    >
      {/* Subtle ink wash accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-5"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${zenColors.bamboo}, transparent 70%)`,
        }}
      />

      {/* Header */}
      <header className="relative mb-12">
        <div className="flex items-start gap-8">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="relative shrink-0">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("object-cover border-2", photoShapeClass)}
                style={{ 
                  width: photoSize, 
                  height: photoSize,
                  borderColor: zenColors.moss,
                }}
              />
            </div>
          )}

          <div className="flex-1">
            <h1
              className="text-4xl font-light tracking-wide mb-2"
              style={{ color: zenColors.ink }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p 
              className="text-lg font-light tracking-widest uppercase"
              style={{ color: zenColors.moss }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>

            {/* Brushstroke divider */}
            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${zenColors.moss}, transparent)` }} />
              <Leaf className="w-4 h-4" style={{ color: zenColors.bamboo }} />
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${zenColors.moss})` }} />
            </div>

            {/* Contact - minimalist style */}
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: zenColors.stone }}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>

        {personalInfo.summary && (
          <div className="mt-8 pl-8 border-l-2" style={{ borderColor: zenColors.moss }}>
            <p className="text-sm leading-relaxed font-light" style={{ color: zenColors.stone }}>
              {personalInfo.summary}
            </p>
          </div>
        )}
      </header>

      {/* Content Sections */}
      <div className="space-y-10">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <section key={section.id}>
              {/* Section Header */}
              <header className="flex items-center gap-4 mb-6">
                <Circle className="w-2 h-2 fill-current" style={{ color: zenColors.bamboo }} />
                <h3 
                  className="text-sm uppercase tracking-[0.3em] font-medium"
                  style={{ color: zenColors.moss }}
                >
                  {section.title}
                </h3>
                <div className="flex-1 h-px" style={{ background: zenColors.moss, opacity: 0.3 }} />
              </header>

              {/* Skills - Zen dot visualization */}
              {section.type === "skills" && (
                <div className="grid grid-cols-2 gap-4">
                  {(section.items as SkillItem[]).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: zenColors.ink }}>{skill.name}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Circle
                            key={level}
                            className={cn("w-2 h-2", level <= skill.proficiency ? "fill-current" : "")}
                            style={{ color: level <= skill.proficiency ? zenColors.bamboo : zenColors.stone, opacity: level <= skill.proficiency ? 1 : 0.3 }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience/Education/Projects */}
              {["experience", "education", "projects", "certifications", "awards"].includes(section.type) && (
                <div className="space-y-6">
                  {section.items.length === 0 && (
                    <p className="text-sm italic" style={{ color: zenColors.stone }}>Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="relative">
                          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                            <div>
                              <h4 className="font-medium" style={{ color: zenColors.ink }}>{exp.role || "Role"}</h4>
                              <p className="text-sm" style={{ color: zenColors.moss }}>{exp.company}</p>
                            </div>
                            <span className="text-xs tracking-wider" style={{ color: zenColors.stone }}>
                              {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-sm mb-2 font-light" style={{ color: zenColors.stone }}>{exp.description}</p>
                          )}
                          {exp.bullets?.length > 0 && (
                            <ul className="space-y-1.5">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: zenColors.stone }}>
                                  <Minus className="w-3 h-3 mt-1.5 shrink-0" style={{ color: zenColors.bamboo }} />
                                  <span className="font-light">{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.techStack?.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {exp.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 border"
                                  style={{ borderColor: zenColors.moss, color: zenColors.moss }}
                                >
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
                        <div key={edu.id}>
                          <h4 className="font-medium" style={{ color: zenColors.ink }}>{edu.degree || "Degree"}</h4>
                          <p className="text-sm" style={{ color: zenColors.moss }}>{edu.institution}</p>
                          <p className="text-xs tracking-wider" style={{ color: zenColors.stone }}>
                            {formatDateRange(edu.startDate, edu.endDate)}
                          </p>
                          {edu.description && (
                            <p className="mt-1 text-sm font-light" style={{ color: zenColors.stone }}>{edu.description}</p>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id}>
                          <h4 className="font-medium flex items-center gap-2" style={{ color: zenColors.ink }}>
                            <Mountain className="w-4 h-4" style={{ color: zenColors.bamboo }} />
                            {proj.name || "Project"}
                          </h4>
                          {proj.description && (
                            <p className="mt-1 text-sm font-light" style={{ color: zenColors.stone }}>{proj.description}</p>
                          )}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-2 py-0.5 border" style={{ borderColor: zenColors.moss, color: zenColors.moss }}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {proj.url && (
                            <a href={proj.url} className="mt-2 inline-flex items-center gap-1 text-xs hover:opacity-70" style={{ color: zenColors.bamboo }}>
                              <Globe className="w-3 h-3" /> View Project
                            </a>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "certifications") {
                      const cert = item as CertificationItem;
                      return (
                        <div key={cert.id}>
                          <h4 className="font-medium" style={{ color: zenColors.ink }}>{cert.name}</h4>
                          <p className="text-sm" style={{ color: zenColors.stone }}>{cert.issuer}</p>
                          {cert.issueDate && <p className="text-xs" style={{ color: zenColors.stone }}>{cert.issueDate}</p>}
                        </div>
                      );
                    }
                    if (section.type === "awards") {
                      const award = item as AwardItem;
                      return (
                        <div key={award.id}>
                          <h4 className="font-medium" style={{ color: zenColors.ink }}>{award.title}</h4>
                          <p className="text-sm" style={{ color: zenColors.stone }}>{award.issuer}</p>
                          {award.date && <p className="text-xs" style={{ color: zenColors.stone }}>{award.date}</p>}
                        </div>
                      );
                    }
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id}>
                        <h4 className="font-medium" style={{ color: zenColors.ink }}>{custom.title || "Item"}</h4>
                        {custom.description && <p className="text-sm font-light" style={{ color: zenColors.stone }}>{custom.description}</p>}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Languages */}
              {section.type === "languages" && (
                <div className="flex flex-wrap gap-4">
                  {(section.items as LanguageItem[]).map((lang) => (
                    <div key={lang.id} className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: zenColors.ink }}>{lang.name}</span>
                      <span className="text-xs px-2 py-0.5 border" style={{ borderColor: zenColors.moss, color: zenColors.moss }}>
                        {lang.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests */}
              {section.type === "interests" && (
                <div className="flex flex-wrap gap-3">
                  {(section.items as InterestItem[]).map((interest) => (
                    <span key={interest.id} className="text-sm flex items-center gap-2" style={{ color: zenColors.stone }}>
                      <Leaf className="w-3 h-3" style={{ color: zenColors.bamboo }} />
                      {interest.name}
                    </span>
                  ))}
                </div>
              )}
            </section>
          ))}
      </div>
    </div>
  );
}
