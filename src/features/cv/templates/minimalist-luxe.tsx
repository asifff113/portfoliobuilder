"use client";

/**
 * Minimalist Luxe Template
 * 
 * A high-end, minimalist template with elegant typography and subtle luxury accents.
 * Features:
 * - Serif headings (Playfair Display/Merriweather)
 * - Gold/Silver accents
 * - Generous whitespace
 * - Centered header
 * - Sophisticated layout
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function MinimalistLuxeTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Default colors if not provided
  const primaryColor = "var(--cv-primary, #1a1a1a)"; // Dark Charcoal
  const accentColor = "var(--cv-accent, #d4af37)"; // Gold
  const bgColor = "#ffffff";
  const textColor = "#333333";
  const mutedColor = "#666666";

  return (
    <div 
      className="min-h-[1100px] p-12 relative bg-white"
      style={{ 
        backgroundColor: bgColor,
        fontFamily: "var(--cv-font-family, 'Georgia', serif)",
        color: textColor,
      }}
    >
      {/* Decorative Border */}
      <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: accentColor }} />

      {/* Header */}
      <header className="text-center mb-16">
        <h1 
          className="text-5xl font-serif tracking-wide mb-4 uppercase"
          style={{ color: primaryColor, letterSpacing: '0.1em' }}
        >
          {personalInfo.fullName}
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-gray-300" />
          <p className="text-lg uppercase tracking-widest text-sm font-sans" style={{ color: accentColor }}>
            {personalInfo.headline}
          </p>
          <div className="h-[1px] w-12 bg-gray-300" />
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-gray-500">
          {personalInfo.email && (
            <span className="flex items-center gap-2">
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2">
              • {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2">
              • {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-2">
              • {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-lg leading-relaxed italic text-gray-600">
            "{personalInfo.summary}"
          </p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column */}
        <div className="md:col-span-4 space-y-12 border-r border-gray-100 pr-8">
          {sections.filter(s => s.type === 'education').map(section => (
            <section key={section.id}>
              <h2 
                className="text-sm font-sans font-bold uppercase tracking-widest mb-6 pb-2 border-b"
                style={{ color: primaryColor, borderColor: accentColor }}
              >
                {section.title}
              </h2>
              <div className="space-y-6">
                {(section.items as EducationItem[]).map((item, i) => (
                  <div key={i}>
                    <h3 className="font-serif text-lg font-medium">{item.institution}</h3>
                    <p className="text-sm text-gray-600 italic">{item.degree}</p>
                    <p className="text-xs font-sans mt-1 text-gray-400 uppercase tracking-wider">
                      {item.startDate} - {item.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {sections.filter(s => s.type === 'skills').map(section => (
            <section key={section.id}>
              <h2 
                className="text-sm font-sans font-bold uppercase tracking-widest mb-6 pb-2 border-b"
                style={{ color: primaryColor, borderColor: accentColor }}
              >
                {section.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {(section.items as SkillItem[]).map((item, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gray-50 text-xs font-sans uppercase tracking-wider text-gray-600 border border-gray-100"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </section>
          ))}

          {sections.filter(s => s.type === 'languages').map(section => (
            <section key={section.id}>
              <h2 
                className="text-sm font-sans font-bold uppercase tracking-widest mb-6 pb-2 border-b"
                style={{ color: primaryColor, borderColor: accentColor }}
              >
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as LanguageItem[]).map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="font-serif">{item.name}</span>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">{item.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 space-y-12">
          {sections.filter(s => s.type === 'experience').map(section => (
            <section key={section.id}>
              <h2 
                className="text-sm font-sans font-bold uppercase tracking-widest mb-8 pb-2 border-b"
                style={{ color: primaryColor, borderColor: accentColor }}
              >
                {section.title}
              </h2>
              <div className="space-y-10">
                {(section.items as ExperienceItem[]).map((item, i) => (
                  <div key={i} className="relative">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h3 className="text-xl font-serif font-medium" style={{ color: primaryColor }}>{item.role}</h3>
                      <span className="text-xs font-sans uppercase tracking-wider text-gray-400">
                        {item.startDate} — {item.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-sm font-sans font-bold uppercase tracking-wide mb-3" style={{ color: accentColor }}>
                      {item.company} {item.location && `• ${item.location}`}
                    </div>
                    <div 
                      className="text-sm leading-relaxed text-gray-600 font-sans"
                      dangerouslySetInnerHTML={{ __html: item.description }} 
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {sections.filter(s => s.type === 'projects').map(section => (
            <section key={section.id}>
              <h2 
                className="text-sm font-sans font-bold uppercase tracking-widest mb-8 pb-2 border-b"
                style={{ color: primaryColor, borderColor: accentColor }}
              >
                {section.title}
              </h2>
              <div className="space-y-8">
                {(section.items as ProjectItem[]).map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-serif font-medium">{item.title}</h3>
                      {item.liveUrl && (
                        <a href={item.liveUrl} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                          View Project →
                        </a>
                      )}
                    </div>
                    <div 
                      className="text-sm leading-relaxed text-gray-600 font-sans mb-2"
                      dangerouslySetInnerHTML={{ __html: item.description }} 
                    />
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex gap-2 text-xs text-gray-400 italic font-serif">
                        {item.techStack.join(" • ")}
                      </div>
                    )}
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
