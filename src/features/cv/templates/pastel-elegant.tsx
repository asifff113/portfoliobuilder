"use client";

/**
 * Pastel Elegant Template
 * 
 * Based on Example 3 (Donna Stroupe style)
 * Features:
 * - Light pastel blue sidebar with rounded corners
 * - Circular centered photo at top
 * - "About Me" prominent section
 * - Clean, soft design with minimal visual elements
 * - References at bottom in 2-column grid
 * - Elegant, friendly, professional feel
 */

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  LanguageItem,
  ReferenceItem,
  ProjectItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function PastelElegantTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const sidebarBg = "color-mix(in srgb, var(--cv-primary, #1e3a5f), white 85%)";
  const sidebarText = "var(--cv-primary, #1e3a5f)";
  const sidebarMuted = "var(--cv-secondary, #3b5998)";
  const headerBg = "color-mix(in srgb, var(--cv-primary, #1e3a5f), white 90%)";
  const accentColor = "var(--cv-primary, #1e3a5f)";

  return (
    <div className="flex min-h-[1100px] bg-white" style={{ fontFamily: "var(--cv-font-family, 'Inter', Arial, sans-serif)" }}>
      {/* Left Sidebar - Pastel Blue */}
      <aside 
        className="w-[260px] p-6"
        style={{ backgroundColor: sidebarBg }}
      >
        {/* Header area with photo */}
        <div 
          className="mb-6 rounded-2xl p-4 text-center"
          style={{ backgroundColor: headerBg }}
        >
          {/* Profile Photo */}
          <div className="mb-3 flex justify-center">
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md"
              />
            ) : (
              <div 
                className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white text-2xl font-bold shadow-md"
                style={{ backgroundColor: accentColor, color: '#ffffff' }}
              >
                {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>
          
          {/* Contact info */}
          <div className="space-y-1 text-xs" style={{ color: sidebarMuted }}>
            {personalInfo.phone && (
              <div className="flex items-center justify-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center justify-center gap-1">
                <Mail className="h-3 w-3" />
                <span className="text-xs">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <h3 
              className="mb-3 text-sm font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Education
            </h3>
            <div className="space-y-3">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id} className="text-xs" style={{ color: sidebarMuted }}>
                  <p className="font-semibold" style={{ color: accentColor }}>
                    {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                  </p>
                  <p className="font-medium" style={{ color: sidebarMuted }}>{item.institution}</p>
                  <p className="text-gray-500">{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Skills Section */}
        {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <h3 
              className="mb-3 text-sm font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Skills
            </h3>
            <ul className="space-y-1 text-xs" style={{ color: sidebarMuted }}>
              {(section.items as SkillItem[]).map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Languages Section */}
        {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <h3 
              className="mb-3 text-sm font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Language
            </h3>
            <ul className="space-y-1 text-xs" style={{ color: sidebarMuted }}>
              {(section.items as LanguageItem[]).map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-8">
        {/* Name & Title */}
        <header className="mb-6">
          <h1 
            className="text-3xl font-light uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="mt-1 text-sm text-gray-500 tracking-wide">
            {personalInfo.headline || "Professional Title"}
          </p>
        </header>

        {/* About Me Section */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 
              className="mb-3 text-base font-bold"
              style={{ color: accentColor }}
            >
              About Me
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-6">
            <h2 
              className="mb-4 text-base font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Work Experience
            </h2>
            <div className="space-y-5">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {item.startDate} - {item.isCurrent ? "present" : item.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{item.company}</p>
                  <h3 className="mt-1 font-semibold text-gray-900">{item.role || "Role"}</h3>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-400" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Projects */}
        {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-6">
            <h2 
              className="mb-4 text-base font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* References */}
        {sections.filter(s => s.type === "references" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-6">
            <h2 
              className="mb-4 text-base font-bold uppercase tracking-wider"
              style={{ color: accentColor }}
            >
              References
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {(section.items as ReferenceItem[]).map((item) => (
                <div key={item.id} className="text-sm">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-gray-600">{item.title}{item.company && ` / ${item.company}`}</p>
                  {item.phone && <p className="text-xs text-gray-500">Phone: {item.phone}</p>}
                  {item.email && <p className="text-xs text-gray-500">Email: {item.email}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

