"use client";

/**
 * Art Deco Luxe Template
 * 
 * A glamorous 1920s inspired design:
 * - Gold geometric patterns
 * - Vintage art deco typography
 * - Symmetrical layouts
 * - Ornate borders and dividers
 * - Rich dark backgrounds
 * - Elegant serif fonts
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Diamond, Crown, Star, Sparkles } from "lucide-react";
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

const decoGold = "#d4af37";
const decoGoldLight = "#f4e4b5";
const decoDark = "#1a1a2e";
const decoCard = "bg-[#16162a] border border-[#d4af37]/30";

export function ArtDecoLuxeTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;
  const photoShape = settings?.photoShape ?? "rounded";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-none",
    square: "rounded-none",
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
        fontFamily: 'var(--cv-font-family, "Playfair Display", Georgia, serif)',
        color: decoGoldLight,
        padding: "14mm 18mm",
        background: decoDark,
      }}
    >
      {/* Art Deco Corner Ornaments */}
      <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
        <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2" style={{ borderColor: decoGold }} />
        <div className="absolute top-6 left-6 w-12 h-12 border-l border-t" style={{ borderColor: decoGold, opacity: 0.5 }} />
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none">
        <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2" style={{ borderColor: decoGold }} />
        <div className="absolute top-6 right-6 w-12 h-12 border-r border-t" style={{ borderColor: decoGold, opacity: 0.5 }} />
      </div>
      <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none">
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2" style={{ borderColor: decoGold }} />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l border-b" style={{ borderColor: decoGold, opacity: 0.5 }} />
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2" style={{ borderColor: decoGold }} />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b" style={{ borderColor: decoGold, opacity: 0.5 }} />
      </div>

      {/* Radial Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${decoGold}, transparent 70%)` }}
      />

      {/* Header */}
      <header className="relative z-10 text-center mb-10">
        {/* Decorative Top Line */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${decoGold})` }} />
          <Diamond className="w-4 h-4" style={{ color: decoGold }} />
          <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${decoGold}, transparent)` }} />
        </div>

        {showPhoto && personalInfo.avatarUrl && (
          <div className="relative mx-auto mb-6" style={{ width: photoSize, height: photoSize }}>
            <div
              className="absolute -inset-2"
              style={{
                background: `linear-gradient(45deg, ${decoGold}, transparent, ${decoGold})`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={cn("relative object-cover", photoShapeClass)}
              style={{ 
                width: photoSize, 
                height: photoSize,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
          </div>
        )}

        <h1
          className="text-4xl font-bold tracking-[0.15em] uppercase mb-2"
          style={{ color: decoGold }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="text-lg tracking-[0.3em] uppercase font-light" style={{ color: decoGoldLight }}>
          {personalInfo.headline || "Professional Title"}
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-2 my-6">
          <div className="h-px w-20" style={{ background: decoGold }} />
          <Star className="w-3 h-3 fill-current" style={{ color: decoGold }} />
          <Crown className="w-5 h-5" style={{ color: decoGold }} />
          <Star className="w-3 h-3 fill-current" style={{ color: decoGold }} />
          <div className="h-px w-20" style={{ background: decoGold }} />
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Mail className="w-4 h-4" style={{ color: decoGold }} />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: decoGold }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: decoGold }} />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Globe className="w-4 h-4" style={{ color: decoGold }} />
              Website
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Linkedin className="w-4 h-4" style={{ color: decoGold }} />
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Github className="w-4 h-4" style={{ color: decoGold }} />
              GitHub
            </a>
          )}
        </div>

        {personalInfo.summary && (
          <div className="mt-6 max-w-2xl mx-auto">
            <p className="text-sm leading-relaxed font-light text-center" style={{ color: decoGoldLight }}>
              {personalInfo.summary}
            </p>
          </div>
        )}
      </header>

      {/* Content Sections */}
      <div className="relative z-10 space-y-8">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <section key={section.id} className={cn("rounded-none p-6", decoCard)}>
              {/* Section Header */}
              <header className="text-center mb-6">
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, transparent, ${decoGold})` }} />
                  <h3
                    className="text-sm uppercase tracking-[0.3em] font-semibold"
                    style={{ color: decoGold }}
                  >
                    {section.title}
                  </h3>
                  <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, ${decoGold}, transparent)` }} />
                </div>
              </header>

              {/* Skills - Art Deco Gauge */}
              {section.type === "skills" && (
                <div className="grid grid-cols-2 gap-4">
                  {(section.items as SkillItem[]).map((skill) => (
                    <div key={skill.id} className="text-center">
                      <p className="text-sm mb-2 tracking-wider uppercase" style={{ color: decoGoldLight }}>{skill.name}</p>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Diamond
                            key={level}
                            className={cn("w-3 h-3", level <= skill.proficiency ? "fill-current" : "")}
                            style={{ color: level <= skill.proficiency ? decoGold : `${decoGold}30` }}
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
                    <p className="text-sm italic text-center" style={{ color: `${decoGoldLight}80` }}>Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    if (section.type === "experience") {
                      const exp = item as ExperienceItem;
                      return (
                        <div key={exp.id} className="text-center">
                          <h4 className="font-semibold text-lg tracking-wider" style={{ color: decoGold }}>{exp.role || "Role"}</h4>
                          <p className="text-sm tracking-widest uppercase" style={{ color: decoGoldLight }}>{exp.company}</p>
                          <p className="text-xs tracking-wider mt-1" style={{ color: `${decoGoldLight}80` }}>
                            {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                          </p>
                          {exp.description && (
                            <p className="mt-3 text-sm font-light" style={{ color: decoGoldLight }}>{exp.description}</p>
                          )}
                          {exp.bullets?.length > 0 && (
                            <ul className="mt-3 space-y-2 text-left max-w-lg mx-auto">
                              {exp.bullets.map((b, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm" style={{ color: decoGoldLight }}>
                                  <Diamond className="w-2 h-2 mt-1.5 fill-current shrink-0" style={{ color: decoGold }} />
                                  <span className="font-light">{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.techStack?.length > 0 && (
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
                              {exp.techStack.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-3 py-1 border tracking-wider uppercase"
                                  style={{ borderColor: decoGold, color: decoGold }}
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
                        <div key={edu.id} className="text-center">
                          <h4 className="font-semibold text-lg tracking-wider" style={{ color: decoGold }}>{edu.degree || "Degree"}</h4>
                          <p className="text-sm tracking-widest uppercase" style={{ color: decoGoldLight }}>{edu.institution}</p>
                          <p className="text-xs tracking-wider mt-1" style={{ color: `${decoGoldLight}80` }}>
                            {formatDateRange(edu.startDate, edu.endDate)}
                          </p>
                          {edu.description && (
                            <p className="mt-2 text-sm font-light" style={{ color: decoGoldLight }}>{edu.description}</p>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "projects") {
                      const proj = item as ProjectItem;
                      return (
                        <div key={proj.id} className="text-center">
                          <h4 className="font-semibold text-lg tracking-wider flex items-center justify-center gap-2" style={{ color: decoGold }}>
                            <Sparkles className="w-4 h-4" />
                            {proj.title || "Project"}
                          </h4>
                          {proj.description && (
                            <p className="mt-2 text-sm font-light" style={{ color: decoGoldLight }}>{proj.description}</p>
                          )}
                          {proj.techStack?.length > 0 && (
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
                              {proj.techStack.map((tech, idx) => (
                                <span key={idx} className="text-xs px-3 py-1 border tracking-wider uppercase" style={{ borderColor: decoGold, color: decoGold }}>
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} className="mt-2 inline-flex items-center gap-1 text-xs tracking-wider uppercase hover:opacity-70" style={{ color: decoGold }}>
                              <Globe className="w-3 h-3" /> View Project
                            </a>
                          )}
                        </div>
                      );
                    }
                    if (section.type === "certifications") {
                      const cert = item as CertificationItem;
                      return (
                        <div key={cert.id} className="text-center">
                          <h4 className="font-semibold tracking-wider" style={{ color: decoGold }}>{cert.name}</h4>
                          <p className="text-sm" style={{ color: decoGoldLight }}>{cert.issuer}</p>
                          {cert.issueDate && <p className="text-xs" style={{ color: `${decoGoldLight}80` }}>{cert.issueDate}</p>}
                        </div>
                      );
                    }
                    if (section.type === "awards") {
                      const award = item as AwardItem;
                      return (
                        <div key={award.id} className="text-center">
                          <h4 className="font-semibold tracking-wider flex items-center justify-center gap-2" style={{ color: decoGold }}>
                            <Crown className="w-4 h-4" />
                            {award.title}
                          </h4>
                          <p className="text-sm" style={{ color: decoGoldLight }}>{award.issuer}</p>
                          {award.date && <p className="text-xs" style={{ color: `${decoGoldLight}80` }}>{award.date}</p>}
                        </div>
                      );
                    }
                    const custom = item as CustomItem;
                    return (
                      <div key={custom.id} className="text-center">
                        <h4 className="font-semibold tracking-wider" style={{ color: decoGold }}>{custom.title || "Item"}</h4>
                        {custom.description && <p className="text-sm font-light" style={{ color: decoGoldLight }}>{custom.description}</p>}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Languages */}
              {section.type === "languages" && (
                <div className="flex flex-wrap justify-center gap-4">
                  {(section.items as LanguageItem[]).map((lang) => (
                    <div key={lang.id} className="text-center">
                      <span className="text-sm tracking-wider" style={{ color: decoGoldLight }}>{lang.name}</span>
                      <span className="text-xs ml-2 px-2 py-0.5 border" style={{ borderColor: decoGold, color: decoGold }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests */}
              {section.type === "interests" && (
                <div className="flex flex-wrap justify-center gap-3">
                  {(section.items as InterestItem[]).map((interest) => (
                    <span key={interest.id} className="text-sm tracking-wider flex items-center gap-2" style={{ color: decoGoldLight }}>
                      <Star className="w-3 h-3 fill-current" style={{ color: decoGold }} />
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
