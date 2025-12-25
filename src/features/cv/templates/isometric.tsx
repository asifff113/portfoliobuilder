"use client";

/**
 * Isometric CV Template
 * 
 * 3D geometric blocks with purple/pink gradient aesthetic.
 * Features:
 * - Isometric grid background
 * - 3D box decorations
 * - Purple/pink color palette
 * - Modern geometric design
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

export function IsometricCVTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;

  const colors = {
    bgDark: "#0f0a1e",
    bgLight: "#1a1230",
    purple: "#a855f7",
    pink: "#ec4899",
    cyan: "#06b6d4",
    text: "#e5e7eb",
    textDim: "#9ca3af",
  };

  return (
    <div 
      className="min-h-[297mm] w-full max-w-[210mm] mx-auto relative overflow-hidden"
      style={{ 
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        fontSize: '10pt',
        lineHeight: '1.5',
        background: `linear-gradient(135deg, ${colors.bgDark} 0%, #1e1040 50%, ${colors.bgLight} 100%)`,
        color: colors.text,
      }}
    >
      {/* Isometric Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='57.7' viewBox='0 0 100 57.7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 28.85 L50 57.7 L0 28.85 Z' fill='none' stroke='%23a855f7' stroke-width='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start gap-6">
            {/* 3D Isometric Box Decoration */}
            <div className="relative w-20 h-20 flex-shrink-0">
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.pink} 100%)`,
                  transform: 'rotateX(45deg) rotateZ(45deg) scale(0.7)',
                  boxShadow: `5px 5px 0 ${colors.cyan}`,
                }}
              />
            </div>

            <div className="flex-1">
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.pink} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {personalInfo.fullName}
              </h1>
              <p className="text-lg" style={{ color: colors.textDim }}>
                {personalInfo.headline}
              </p>
            </div>

            {showPhoto && personalInfo.avatarUrl && (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="rounded-lg"
                style={{ 
                  width: photoSize, 
                  height: photoSize, 
                  objectFit: 'cover',
                  border: `2px solid ${colors.purple}`,
                }}
              />
            )}
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            {personalInfo.email && (
              <span className="flex items-center gap-1 px-3 py-1 rounded" style={{ backgroundColor: colors.bgLight, color: colors.purple }}>
                <Mail size={14} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1 px-3 py-1 rounded" style={{ backgroundColor: colors.bgLight, color: colors.pink }}>
                <Phone size={14} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1 px-3 py-1 rounded" style={{ backgroundColor: colors.bgLight, color: colors.cyan }}>
                <MapPin size={14} /> {personalInfo.location}
              </span>
            )}
          </div>
        </header>

        {/* Bio */}
        {personalInfo.summary && (
          <section 
            className="mb-6 p-4 rounded-lg"
            style={{ 
              backgroundColor: colors.bgLight,
              borderLeft: `3px solid ${colors.purple}`,
            }}
          >
            <p>{personalInfo.summary}</p>
          </section>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <section 
              key={section.id}
              className="p-5 rounded-lg"
              style={{ 
                backgroundColor: colors.bgLight,
                borderLeft: `3px solid ${[colors.purple, colors.pink, colors.cyan][sectionIndex % 3]}`,
              }}
            >
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-3"
                style={{ color: [colors.purple, colors.pink, colors.cyan][sectionIndex % 3] }}
              >
                {/* Small isometric box */}
                <span 
                  className="inline-block w-4 h-4"
                  style={{
                    background: `linear-gradient(135deg, ${colors.purple} 0%, ${colors.pink} 100%)`,
                    transform: 'rotate(45deg)',
                  }}
                />
                {section.title}
              </h2>

              {section.type === "experience" && (
                <div className="space-y-4">
                  {(section.items as ExperienceItem[]).map((item, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded"
                      style={{ backgroundColor: `${colors.bgDark}80` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold" style={{ color: colors.cyan }}>{item.role}</h3>
                          <p style={{ color: colors.purple }}>{item.company}</p>
                        </div>
                        <span className="text-sm" style={{ color: colors.pink }}>
                          {item.startDate} - {item.endDate || "Present"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm" style={{ color: colors.textDim }}>{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === "education" && (
                <div className="space-y-3">
                  {(section.items as EducationItem[]).map((item, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded"
                      style={{ backgroundColor: `${colors.bgDark}80` }}
                    >
                      <h3 className="font-semibold" style={{ color: colors.cyan }}>{item.degree}</h3>
                      <p style={{ color: colors.purple }}>{item.institution}</p>
                      <p className="text-sm" style={{ color: colors.textDim }}>{item.endDate || 'Present'}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 rounded text-sm"
                      style={{ 
                        backgroundColor: `${colors.bgDark}80`,
                        color: [colors.purple, colors.pink, colors.cyan][i % 3],
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {section.type === "projects" && (
                <div className="grid grid-cols-2 gap-3">
                  {(section.items as ProjectItem[]).map((project, i) => (
                    <div 
                      key={i} 
                      className="p-3 rounded"
                      style={{ backgroundColor: `${colors.bgDark}80` }}
                    >
                      <h3 className="font-semibold mb-1" style={{ color: colors.cyan }}>{project.title}</h3>
                      <p className="text-sm" style={{ color: colors.textDim }}>{project.description}</p>
                      <div className="flex gap-2 mt-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} style={{ color: colors.purple }}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} style={{ color: colors.purple }}>
                            <Github size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm" style={{ color: colors.textDim }}>
          <p>◆ Designed with precision ◆</p>
        </footer>
      </div>
    </div>
  );
}
