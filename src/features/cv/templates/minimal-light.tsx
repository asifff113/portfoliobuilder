"use client";

import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function MinimalLightTemplate({ personalInfo, sections, settings }: TemplateProps) {
  return (
    <div 
      className="min-h-[1000px] bg-white p-10 text-gray-800"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Georgia', serif)",
        color: "var(--cv-text, #1f2937)",
        lineHeight: "var(--cv-line-height, 1.6)",
        padding: 'var(--cv-margin-top, 10mm) var(--cv-margin-right, 10mm) var(--cv-margin-bottom, 10mm) var(--cv-margin-left, 10mm)',
      }}
    >
      {/* Header - Simple and Clean */}
      <header className="mb-10">
        <h1 
          className="text-3xl font-normal tracking-wide"
          style={{ color: "var(--cv-primary, #111827)" }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p 
          className="mt-1 text-lg"
          style={{ color: "var(--cv-text-muted, #6b7280)" }}
        >
          {personalInfo.headline || "Professional Title"}
        </p>

        {/* Contact Info - Minimal */}
        <div 
          className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm"
          style={{ color: "var(--cv-text-muted, #6b7280)" }}
        >
          {personalInfo.email && (
            <span>{personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span>{personalInfo.location}</span>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener" className="hover:text-gray-700">
              {personalInfo.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="hover:text-gray-700">
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="hover:text-gray-700">
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-10">
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Sections */}
      {sections.filter(s => s.isVisible).map((section) => (
        <section key={section.id} className="mb-10">
          <h2 className="mb-4 border-b border-gray-200 pb-2 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            {section.title}
          </h2>

          {section.type === "experience" && (
            <div className="space-y-6">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.role || "Role"}</h3>
                      <p className="text-gray-600">{item.company || "Company"}{item.location && ` · ${item.location}`}</p>
                    </div>
                    <p className="text-sm text-gray-400">
                      {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                    </p>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  )}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-sm text-gray-600 leading-relaxed pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.type === "education" && (
            <div className="space-y-4">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.degree}{item.fieldOfStudy && `, ${item.fieldOfStudy}`}
                      </h3>
                      <p className="text-gray-600">{item.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <p>{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                      {item.gpa && <p>GPA: {item.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section.type === "skills" && (
            <div className="space-y-3">
              {/* Group skills by category */}
              {(() => {
                const categories: Record<string, SkillItem[]> = {};
                (section.items as SkillItem[]).forEach((item) => {
                  const cat = item.category || "Other";
                  if (!categories[cat]) categories[cat] = [];
                  categories[cat].push(item);
                });
                return Object.entries(categories).map(([category, skills]) => (
                  <div key={category}>
                    <span className="text-sm font-medium text-gray-700">{category}:</span>
                    <span className="ml-2 text-sm text-gray-600">
                      {skills.map(s => s.name).join(", ")}
                    </span>
                  </div>
                ));
              })()}
            </div>
          )}

          {section.type === "projects" && (
            <div className="space-y-4">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-semibold text-gray-900">{item.title || "Project"}</h3>
                    <div className="flex gap-3 text-sm text-gray-400">
                      {item.liveUrl && (
                        <a href={item.liveUrl} target="_blank" rel="noopener" className="hover:text-gray-600">
                          Live
                        </a>
                      )}
                      {item.githubUrl && (
                        <a href={item.githubUrl} target="_blank" rel="noopener" className="hover:text-gray-600">
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  )}
                  {item.techStack && item.techStack.length > 0 && (
                    <p className="mt-1 text-xs text-gray-400">
                      {item.techStack.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 pt-4 text-center text-xs text-gray-300">
        References available upon request
      </footer>
    </div>
  );
}

