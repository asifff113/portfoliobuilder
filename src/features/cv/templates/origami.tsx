"use client";

/**
 * Origami CV Template
 * 
 * Japanese paper-folding aesthetics with delicate patterns.
 * Features:
 * - Light, airy color palette
 * - Folded paper effects
 * - Japanese-inspired patterns
 * - Elegant card layouts
 */

import { Github, ExternalLink, Mail, MapPin, Phone, Globe } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  SkillItem, 
  ProjectItem,
  ExperienceItem,
  EducationItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function OrigamiCVTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;

  const colors = {
    rose: "#fecdd3",
    roseLight: "#fdf2f4",
    roseDark: "#be123c",
    sky: "#e0f2fe",
    text: "#374151",
    textLight: "#6b7280",
  };

  return (
    <div 
      className="min-h-[297mm] w-full max-w-[210mm] mx-auto relative"
      style={{ 
        fontFamily: '"Noto Serif", Georgia, serif',
        fontSize: '10pt',
        lineHeight: '1.5',
        background: `linear-gradient(135deg, ${colors.roseLight} 0%, white 50%, ${colors.sky} 100%)`,
        color: colors.text,
      }}
    >
      {/* Diamond pattern background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23fecdd3' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          {/* Origami crane decoration */}
          <div className="text-4xl mb-4">🕊️</div>
          
          <h1 
            className="text-4xl font-light mb-2 tracking-wide"
            style={{ color: colors.roseDark }}
          >
            {personalInfo.fullName}
          </h1>
          
          <div className="w-24 h-px mx-auto mb-4" style={{ background: `linear-gradient(to right, transparent, ${colors.roseDark}, transparent)` }} />
          
          <p className="text-lg" style={{ color: colors.textLight }}>
            {personalInfo.headline}
          </p>

          {/* Contact */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm" style={{ color: colors.textLight }}>
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail size={14} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone size={14} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            )}
          </div>
        </header>

        {/* Photo */}
        {showPhoto && personalInfo.avatarUrl && (
          <div className="flex justify-center mb-8">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="rounded-lg shadow-lg"
              style={{ 
                width: photoSize, 
                height: photoSize, 
                objectFit: 'cover',
                border: `3px solid ${colors.rose}`,
              }}
            />
          </div>
        )}

        {/* Bio */}
        {personalInfo.bio && (
          <section 
            className="mb-8 p-6 rounded-lg relative"
            style={{ 
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(254, 205, 211, 0.3)',
            }}
          >
            {/* Folded corner effect */}
            <div 
              className="absolute -top-2 -right-2 w-8 h-8 transform rotate-45"
              style={{ backgroundColor: colors.rose }}
            />
            <p className="text-center italic">{personalInfo.bio}</p>
          </section>
        )}

        {/* Sections */}
        <div className="grid grid-cols-2 gap-6">
          {sections.map((section, sectionIndex) => (
            <section 
              key={section.id} 
              className={`p-5 rounded-lg relative ${sectionIndex % 2 === 0 ? 'col-span-2' : ''}`}
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(254, 205, 211, 0.2)',
                borderLeft: `4px solid ${colors.rose}`,
              }}
            >
              <h2 
                className="text-lg font-semibold mb-4 flex items-center gap-2"
                style={{ color: colors.roseDark }}
              >
                <span>{["🦩", "🌸", "🍃", "🦋", "🌊", "🗻"][sectionIndex % 6]}</span>
                {section.title}
              </h2>

              {section.type === "experience" && (
                <div className="space-y-4">
                  {(section.items as ExperienceItem[]).map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{item.position}</h3>
                          <p style={{ color: colors.textLight }}>{item.company}</p>
                        </div>
                        <span className="text-sm px-2 py-1 rounded" style={{ backgroundColor: colors.roseLight, color: colors.roseDark }}>
                          {item.startDate} - {item.endDate || "Present"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm mt-2" style={{ color: colors.textLight }}>{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === "education" && (
                <div className="space-y-3">
                  {(section.items as EducationItem[]).map((item, i) => (
                    <div key={i}>
                      <h3 className="font-semibold">{item.degree}</h3>
                      <p style={{ color: colors.textLight }}>{item.institution}</p>
                      <p className="text-sm" style={{ color: colors.textLight }}>{item.graduationDate}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: colors.roseLight,
                        color: colors.roseDark,
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {section.type === "projects" && (
                <div className="space-y-3">
                  {(section.items as ProjectItem[]).map((project, i) => (
                    <div key={i} className="p-3 rounded" style={{ backgroundColor: colors.roseLight }}>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm mt-1" style={{ color: colors.textLight }}>{project.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center" style={{ color: colors.textLight }}>
          <p className="text-sm">千羽鶴 — {personalInfo.fullName}</p>
        </footer>
      </div>
    </div>
  );
}
