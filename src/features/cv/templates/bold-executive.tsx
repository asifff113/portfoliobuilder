"use client";

/**
 * Bold Executive Template
 * 
 * Distinctive features:
 * - Single column layout with strong visual hierarchy
 * - Large name header with accent line
 * - Bold section headers with background color
 * - Timeline-style experience with dates on left
 * - Grid layout for skills with categories
 * - Clean, authoritative, corporate feel
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Briefcase, GraduationCap, Award, Code } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  LanguageItem,
  CertificationItem,
  ProjectItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function BoldExecutiveTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #0f172a)";
  const accentColor = "var(--cv-accent, #3b82f6)";
  const textColor = "var(--cv-text, #1e293b)";
  const mutedColor = "var(--cv-text-muted, #64748b)";

  // Group skills by category
  const getSkillsByCategory = (items: SkillItem[]) => {
    const categories: Record<string, SkillItem[]> = {};
    items.forEach((skill) => {
      const cat = skill.category || "General";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill);
    });
    return categories;
  };

  return (
    <div 
      className="min-h-[1100px] bg-white p-10"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Inter', Arial, sans-serif)",
        color: textColor,
        lineHeight: "var(--cv-line-height, 1.5)",
        padding: 'var(--cv-margin-top, 10mm) var(--cv-margin-right, 10mm) var(--cv-margin-bottom, 10mm) var(--cv-margin-left, 10mm)',
      }}
    >
      {/* Header - Large Name with Photo */}
      <header className="mb-8 border-b-4 pb-6" style={{ borderColor: accentColor }}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 
              className="text-5xl font-black uppercase tracking-tight"
              style={{ color: primaryColor }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p 
              className="mt-2 text-xl font-light"
              style={{ color: accentColor }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>
            
            {/* Contact Row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm" style={{ color: mutedColor }}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline">
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:underline">
                  <Linkedin className="h-4 w-4" />
                  {personalInfo.linkedinLabel || "LinkedIn"}
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:underline">
                  <Github className="h-4 w-4" />
                  {personalInfo.githubLabel || "GitHub"}
                </a>
              )}
            </div>
          </div>
          
          {/* Photo */}
          {personalInfo.avatarUrl && (
            <div className="ml-6">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="h-28 w-28 rounded object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 
            className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            <span className="h-1 w-8 rounded" style={{ backgroundColor: accentColor }} />
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: textColor }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Two Column Layout for main content */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Main Content (2 cols) */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 
                className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                <Briefcase className="h-4 w-4" style={{ color: accentColor }} />
                Work Experience
              </h2>
              <div className="space-y-6">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id} className="relative pl-4" style={{ borderLeft: `2px solid ${accentColor}` }}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h3 className="text-base font-bold" style={{ color: primaryColor }}>
                          {item.role || "Role"}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: accentColor }}>
                          {item.company}
                        </p>
                      </div>
                      <span 
                        className="rounded px-2 py-0.5 text-xs font-medium"
                        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                      >
                        {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1 text-sm" style={{ color: textColor }}>
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accentColor }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded px-2 py-0.5 text-xs"
                            style={{ backgroundColor: '#f1f5f9', color: mutedColor }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Education */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 
                className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                <GraduationCap className="h-4 w-4" style={{ color: accentColor }} />
                Education
              </h2>
              <div className="space-y-4">
                {(section.items as EducationItem[]).map((item) => (
                  <div key={item.id} className="relative pl-4" style={{ borderLeft: `2px solid ${accentColor}` }}>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h3 className="text-base font-bold" style={{ color: primaryColor }}>
                          {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                        </h3>
                        <p className="text-sm" style={{ color: mutedColor }}>
                          {item.institution}{item.location && `, ${item.location}`}
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: mutedColor }}>
                        {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.gpa && (
                      <p className="mt-1 text-sm" style={{ color: mutedColor }}>
                        GPA: {item.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Projects */}
          {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 
                className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                <Code className="h-4 w-4" style={{ color: accentColor }} />
                Projects
              </h2>
              <div className="space-y-4">
                {(section.items as ProjectItem[]).map((item) => (
                  <div key={item.id}>
                    <h3 className="font-semibold" style={{ color: primaryColor }}>{item.title}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm" style={{ color: textColor }}>{item.description}</p>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded px-2 py-0.5 text-xs"
                            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Column - Skills & Other */}
        <div className="space-y-6">
          {/* Skills */}
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => {
            const skillsByCategory = getSkillsByCategory(section.items as SkillItem[]);
            return (
              <section key={section.id}>
                <h2 
                  className="mb-3 text-sm font-bold uppercase tracking-wider"
                  style={{ color: primaryColor }}
                >
                  Skills
                </h2>
                <div className="space-y-3">
                  {Object.entries(skillsByCategory).map(([category, skills]) => (
                    <div key={category}>
                      <h4 className="mb-1 text-xs font-semibold uppercase" style={{ color: accentColor }}>
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="rounded px-2 py-0.5 text-xs"
                            style={{ backgroundColor: '#f1f5f9', color: textColor }}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Certifications */}
          {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 
                className="mb-3 text-sm font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {(section.items as CertificationItem[]).map((item) => (
                  <div key={item.id} className="text-sm">
                    <p className="font-medium" style={{ color: textColor }}>{item.name}</p>
                    <p className="text-xs" style={{ color: mutedColor }}>
                      {item.issuer} • {item.issueDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Languages */}
          {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 
                className="mb-3 text-sm font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {(section.items as LanguageItem[]).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span style={{ color: textColor }}>{item.name}</span>
                    <span className="text-xs capitalize" style={{ color: mutedColor }}>{item.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

