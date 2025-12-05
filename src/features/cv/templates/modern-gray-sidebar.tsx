"use client";

/**
 * Modern Gray Sidebar Template
 * 
 * Based on Example 2 (Lorna Alvarado style)
 * Features:
 * - Dark gray/charcoal sidebar with angled section headers
 * - Large name at top right with serif font
 * - Clean bullet points for experience
 * - References section at bottom (2-column)
 * - Minimal, professional feel
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
  CertificationItem,
  ProjectItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function ModernGraySidebarTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const sidebarBg = "var(--cv-primary, #374151)";
  const sidebarText = "#ffffff";
  const sidebarMuted = "rgba(255, 255, 255, 0.7)";
  const accentColor = "var(--cv-primary, #374151)";
  const headerBg = "#f3f4f6";

  return (
    <div 
      className="flex min-h-[1100px] bg-white" 
      style={{ 
        fontFamily: "var(--cv-font-family, 'Inter', Arial, sans-serif)",
        color: "var(--cv-text, #111827)",
        lineHeight: "var(--cv-line-height, 1.5)",
        padding: 'var(--cv-margin-top, 0) var(--cv-margin-right, 0) var(--cv-margin-bottom, 0) var(--cv-margin-left, 0)',
      }}
    >
      {/* Left Sidebar - Dark Gray */}
      <aside 
        className="w-[240px] p-6"
        style={{ backgroundColor: sidebarBg, color: sidebarText }}
      >
        {/* Profile Photo */}
        <div className="mb-6 flex justify-center">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="h-28 w-28 rounded-full border-4 border-white object-cover"
            />
          ) : (
            <div 
              className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white text-3xl font-bold"
              style={{ backgroundColor: '#4b5563', color: sidebarText }}
            >
              {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mb-6">
          <h3 
            className="mb-3 px-2 py-1 text-sm font-bold uppercase tracking-wider"
            style={{ backgroundColor: '#4b5563', color: sidebarText }}
          >
            Contact
          </h3>
          <div className="space-y-2 text-xs" style={{ color: sidebarMuted }}>
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-3 w-3 shrink-0" style={{ color: sidebarMuted }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 h-3 w-3 shrink-0" style={{ color: sidebarMuted }} />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0" style={{ color: sidebarMuted }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Education Section */}
        {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <h3 
              className="mb-3 px-2 py-1 text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#4b5563', color: sidebarText }}
            >
              Education
            </h3>
            <div className="space-y-3">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id} className="text-xs" style={{ color: sidebarMuted }}>
                  <p className="font-semibold" style={{ color: sidebarText }}>
                    {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                  </p>
                  <p className="italic">{item.institution}</p>
                  <p>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Skills Section */}
        {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <h3 
              className="mb-3 px-2 py-1 text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#4b5563', color: sidebarText }}
            >
              Skills
            </h3>
            <ul className="space-y-1 text-xs" style={{ color: sidebarMuted }}>
              {(section.items as SkillItem[]).map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: sidebarMuted }} />
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
              className="mb-3 px-2 py-1 text-sm font-bold uppercase tracking-wider"
              style={{ backgroundColor: '#4b5563', color: sidebarText }}
            >
              Language
            </h3>
            <ul className="space-y-1 text-xs" style={{ color: sidebarMuted }}>
              {(section.items as LanguageItem[]).map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full" style={{ backgroundColor: sidebarMuted }} />
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
        <header className="mb-8">
          <h1 
            className="text-4xl font-bold uppercase tracking-wide"
            style={{ fontFamily: "'Georgia', serif", color: accentColor }}
          >
            {personalInfo.fullName?.split(' ').map((name, i, arr) => (
              <span key={i}>
                {i === 0 ? (
                  <span className="font-normal">{name}</span>
                ) : (
                  <span className="font-bold"> {name}</span>
                )}
              </span>
            )) || "Your Name"}
          </h1>
          <p className="mt-1 text-lg text-gray-500">
            {personalInfo.headline || "Professional Title"}
          </p>
        </header>

        {/* Professional Experience */}
        {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <h2 
              className="mb-4 border-b-2 pb-2 text-lg font-bold"
              style={{ borderColor: accentColor, color: accentColor, fontFamily: "'Georgia', serif" }}
            >
              Professional Experience
            </h2>
            <div className="space-y-6">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.role || "Role"}</h3>
                      <p className="text-sm text-gray-600">
                        {item.company}{item.location && `, ${item.location}`}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </span>
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-sm text-gray-700">
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
          <section key={section.id} className="mb-8">
            <h2 
              className="mb-4 border-b-2 pb-2 text-lg font-bold"
              style={{ borderColor: accentColor, color: accentColor, fontFamily: "'Georgia', serif" }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* References */}
        {sections.filter(s => s.type === "references" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <h2 
              className="mb-4 border-b-2 pb-2 text-lg font-bold"
              style={{ borderColor: accentColor, color: accentColor, fontFamily: "'Georgia', serif" }}
            >
              References
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {(section.items as ReferenceItem[]).map((item) => (
                <div key={item.id} className="text-sm">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-gray-600">{item.title}{item.company && ` / ${item.company}`}</p>
                  {item.phone && <p className="text-gray-500">Phone: {item.phone}</p>}
                  {item.email && <p className="text-gray-500">Email: {item.email}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

