"use client";

/**
 * Compact Professional Template
 * 
 * Space-efficient dense layout optimized for single-page printing:
 * - Dense two-column layout
 * - Inline dates
 * - Comma-separated skills by category
 * - Single-line education entries
 * - Minimal spacing while maintaining readability
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function CompactProfessionalTemplate({ personalInfo, sections }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #1e40af)";
  
  // Group skills by category
  const groupSkillsByCategory = (skills: SkillItem[]) => {
    const grouped: Record<string, string[]> = {};
    skills.forEach(skill => {
      const category = skill.category || "Other";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(skill.name);
    });
    return grouped;
  };

  return (
    <div 
      className="min-h-[1000px] bg-white p-6"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Arial', sans-serif)",
        color: "var(--cv-text, #1f2937)",
        fontSize: "11px",
        lineHeight: "1.4",
      }}
    >
      {/* Compact Header */}
      <header className="mb-4 pb-3 border-b-2" style={{ borderColor: primaryColor }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-sm text-gray-600">{personalInfo.headline || "Professional Title"}</p>
          </div>
          
          {/* Contact Info - Compact Row */}
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1">
                <Mail className="h-3 w-3" />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1">
                <Phone className="h-3 w-3" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1">
                <MapPin className="h-3 w-3" />
                {personalInfo.location}
              </div>
            )}
            <div className="flex items-center justify-end gap-2 pt-1">
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-0.5 hover:underline" style={{ color: primaryColor }}>
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-0.5 hover:underline" style={{ color: primaryColor }}>
                  <Github className="h-3 w-3" /> GitHub
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-0.5 hover:underline" style={{ color: primaryColor }}>
                  <Globe className="h-3 w-3" /> Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Summary - Compact */}
        {personalInfo.summary && (
          <p className="mt-2 text-xs text-gray-700 leading-snug">{personalInfo.summary}</p>
        )}
      </header>

      <div className="grid grid-cols-3 gap-4">
        {/* Main Content - 2 columns */}
        <div className="col-span-2 space-y-4">
          {/* Experience */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                {section.title}
              </h2>
              <div className="space-y-3">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-gray-900">{item.role}</span>
                        <span className="text-gray-600"> | {item.company}</span>
                        {item.location && <span className="text-gray-500"> • {item.location}</span>}
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-1 text-gray-700 space-y-0.5 pl-3">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="relative before:content-['•'] before:absolute before:-left-2 before:text-gray-400">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <p className="mt-1 text-xs text-gray-500">
                        <span className="font-medium">Tech:</span> {item.techStack.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Projects - Compact */}
          {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as ProjectItem[]).map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-gray-900">{project.title}</span>
                      {project.techStack && project.techStack.length > 0 && (
                        <span className="text-xs text-gray-500">{project.techStack.slice(0, 3).join(", ")}</span>
                      )}
                    </div>
                    <p className="text-gray-700">{project.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Sidebar - 1 column */}
        <div className="col-span-1 space-y-4">
          {/* Skills - Grouped by Category */}
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => {
            const grouped = groupSkillsByCategory(section.items as SkillItem[]);
            return (
              <section key={section.id}>
                <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                  {section.title}
                </h2>
                <div className="space-y-1.5">
                  {Object.entries(grouped).map(([category, skills]) => (
                    <div key={category}>
                      <span className="font-medium text-gray-800">{category}:</span>{" "}
                      <span className="text-gray-600">{skills.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Education - Single Line Format */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as EducationItem[]).map((item) => (
                  <div key={item.id}>
                    <div className="font-bold text-gray-900">{item.degree}</div>
                    <div className="text-gray-600">
                      {item.institution}
                      {item.gpa && <span> • GPA: {item.gpa}</span>}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Certifications - Compact List */}
          {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                {section.title}
              </h2>
              <ul className="space-y-1">
                {(section.items as CertificationItem[]).map((item) => (
                  <li key={item.id}>
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-gray-500"> – {item.issuer}, {item.issueDate}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Languages - Inline */}
          {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-sm font-bold uppercase tracking-wide mb-2 pb-1 border-b" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                {section.title}
              </h2>
              <div className="text-gray-700">
                {(section.items as LanguageItem[]).map((lang, idx, arr) => (
                  <span key={lang.id}>
                    {lang.name} <span className="text-gray-500">({lang.proficiency})</span>
                    {idx < arr.length - 1 && ", "}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
