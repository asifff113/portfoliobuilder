"use client";

/**
 * Gradient Wave CV Template
 * 
 * Flowing colorful gradient backgrounds with modern aesthetics.
 * Features:
 * - Animated-look gradient background
 * - White text on colorful background
 * - Modern rounded cards
 * - Vibrant color palette
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

export function GradientWaveCVTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 120;

  return (
    <div 
      className="min-h-[297mm] w-full max-w-[210mm] mx-auto relative overflow-hidden"
      style={{ 
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        fontSize: '10pt',
        lineHeight: '1.5',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #ffecd2 100%)',
        color: 'white',
      }}
    >
      {/* Wave overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      />

      <div className="relative p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          {showPhoto && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="mx-auto mb-4 rounded-full shadow-2xl"
              style={{ 
                width: photoSize, 
                height: photoSize, 
                objectFit: 'cover',
                border: '4px solid rgba(255,255,255,0.5)',
              }}
            />
          )}
          
          <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">
            {personalInfo.fullName}
          </h1>
          <p className="text-xl opacity-90 mb-4">{personalInfo.headline}</p>

          {/* Contact */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {personalInfo.email && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Mail size={14} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Phone size={14} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            )}
          </div>
        </header>

        {/* Bio */}
        {personalInfo.summary && (
          <section className="mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
            <p className="text-center">{personalInfo.summary}</p>
          </section>
        )}

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.id} className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-white/30">
                {section.title}
              </h2>

              {section.type === "experience" && (
                <div className="space-y-4">
                  {(section.items as ExperienceItem[]).map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{item.role}</h3>
                          <p className="opacity-80">{item.company}</p>
                        </div>
                        <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                          {item.startDate} - {item.endDate || "Present"}
                        </span>
                      </div>
                      {item.description && <p className="text-sm opacity-80 mt-2">{item.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {section.type === "education" && (
                <div className="space-y-4">
                  {(section.items as EducationItem[]).map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/10">
                      <h3 className="font-bold">{item.degree}</h3>
                      <p className="opacity-80">{item.institution}</p>
                      <p className="text-sm opacity-60">{item.endDate || 'Present'}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.type === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((skill, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {section.type === "projects" && (
                <div className="grid grid-cols-2 gap-4">
                  {(section.items as ProjectItem[]).map((project, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/10">
                      <h3 className="font-bold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-80 mb-3">{project.description}</p>
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} className="opacity-70 hover:opacity-100">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="opacity-70 hover:opacity-100">
                            <Github size={16} />
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
      </div>
    </div>
  );
}
