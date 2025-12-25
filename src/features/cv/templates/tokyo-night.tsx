"use client";

/**
 * Tokyo Night CV Template
 * 
 * Code-inspired Japanese nighttime aesthetics with syntax highlighting.
 * Features:
 * - Dark theme with purple/pink accents
 * - Code-like typography
 * - Cherry blossom decorations
 * - Syntax highlighting colors
 */

import { Github, ExternalLink, Mail, MapPin, Phone, Linkedin } from "lucide-react";
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

export function TokyoNightCVTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 100;

  const colors = {
    bg: "#1a1b26",
    bgLight: "#24283b",
    purple: "#bb9af7",
    pink: "#f7768e",
    cyan: "#7dcfff",
    green: "#9ece6a",
    orange: "#ff9e64",
    text: "#c0caf5",
    textDim: "#565f89",
  };

  return (
    <div 
      className="min-h-[297mm] w-full max-w-[210mm] mx-auto"
      style={{ 
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        fontSize: '9pt',
        lineHeight: '1.5',
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {/* Japanese pattern background */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23bb9af7' stroke-width='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-8">
        {/* Header */}
        <header className="mb-8 pb-6 border-b-2" style={{ borderColor: colors.purple }}>
          <div className="flex items-start justify-between">
            <div>
              {/* Code comment style */}
              <p className="text-sm mb-2" style={{ color: colors.textDim }}>
                {"// "}Portfolio.developer
              </p>
              <h1 
                className="text-4xl font-bold mb-2"
                style={{ color: colors.purple }}
              >
                <span style={{ color: colors.pink }}>const</span> name = "{personalInfo.fullName}"
              </h1>
              <p className="text-lg" style={{ color: colors.cyan }}>
                <span style={{ color: colors.textDim }}>{"// "}</span>
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

          {/* Contact info as code */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
              <span style={{ color: colors.green }}>
                email: "<span style={{ color: colors.orange }}>{personalInfo.email}</span>"
              </span>
            )}
            {personalInfo.phone && (
              <span style={{ color: colors.green }}>
                phone: "<span style={{ color: colors.orange }}>{personalInfo.phone}</span>"
              </span>
            )}
            {personalInfo.location && (
              <span style={{ color: colors.green }}>
                location: "<span style={{ color: colors.orange }}>{personalInfo.location}</span>"
              </span>
            )}
          </div>
        </header>

        {/* Bio */}
        {personalInfo.bio && (
          <section className="mb-6 p-4 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
            <p style={{ color: colors.textDim }}>{"/* "}</p>
            <p className="px-4">{personalInfo.bio}</p>
            <p style={{ color: colors.textDim }}>{" */"}</p>
          </section>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: colors.pink }}
              >
                <span style={{ color: colors.textDim }}>{"// "}</span>
                {section.title}
                <span className="text-xs" style={{ color: colors.textDim }}>🌸</span>
              </h2>

              {section.type === "experience" && (
                <div className="space-y-4">
                  {(section.items as ExperienceItem[]).map((item, i) => (
                    <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold" style={{ color: colors.cyan }}>{item.position}</h3>
                          <p style={{ color: colors.purple }}>{item.company}</p>
                        </div>
                        <span className="text-sm" style={{ color: colors.orange }}>
                          {item.startDate} - {item.endDate || "present"}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm mt-2" style={{ color: colors.text }}>{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.type === "education" && (
                <div className="space-y-4">
                  {(section.items as EducationItem[]).map((item, i) => (
                    <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                      <h3 className="font-bold" style={{ color: colors.cyan }}>{item.degree}</h3>
                      <p style={{ color: colors.purple }}>{item.institution}</p>
                      <p className="text-sm" style={{ color: colors.orange }}>{item.graduationDate}</p>
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
                        backgroundColor: colors.bgLight,
                        color: [colors.purple, colors.cyan, colors.green, colors.pink][i % 4],
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {section.type === "projects" && (
                <div className="grid grid-cols-2 gap-4">
                  {(section.items as ProjectItem[]).map((project, i) => (
                    <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: colors.bgLight }}>
                      <h3 className="font-bold mb-2" style={{ color: colors.cyan }}>{project.title}</h3>
                      <p className="text-sm mb-2" style={{ color: colors.text }}>{project.description}</p>
                      <div className="flex gap-2">
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} style={{ color: colors.purple }} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github size={14} style={{ color: colors.purple }} />
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
        <footer className="mt-8 pt-4 border-t text-center text-sm" style={{ borderColor: colors.purple, color: colors.textDim }}>
          夜の東京 • Tokyo Night
        </footer>
      </div>
    </div>
  );
}
