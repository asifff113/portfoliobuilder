"use client";

/**
 * Crimson Nexus Template
 * 
 * A bold, commanding professional template with a dark theme and strong crimson accents.
 * Features:
 * - Dark theme with high contrast
 * - Sharp, geometric headers
 * - "Power" layout emphasizing current role
 * - Professional typography
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Code, Award, Languages, Heart, Users, FileText, Target, Zap, Layers } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  SkillItem, 
  ProjectItem,
  ExperienceItem,
  EducationItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

// Section icons mapping
const sectionIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  experience: Target,
  education: Layers,
  skills: Zap,
  projects: Code,
  certifications: Award,
  languages: Languages,
  awards: Award,
  volunteer: Heart,
  references: Users,
  publications: FileText,
  interests: Heart,
};

export function CrimsonNexusTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 130;
  
  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #ffffff)", // White text
    secondary: "var(--cv-secondary, #9ca3af)", // Gray 400
    accent: "var(--cv-accent, #dc2626)", // Red 600
    background: "var(--cv-background, #111827)", // Gray 900
    cardBg: "#1f2937", // Gray 800
    borderColor: "#374151", // Gray 700
  };

  return (
    <div 
      className="bg-gray-900 text-white"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Oswald", "Roboto Condensed", sans-serif)',
        fontSize: '10pt',
        lineHeight: '1.5',
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header className="relative bg-gray-800 border-b-4 border-red-600">
        <div className="absolute top-0 right-0 w-32 h-full bg-red-600 transform skew-x-12 origin-bottom-right opacity-20" />
        
        <div className="flex items-stretch">
          {/* Photo Column */}
          {showPhoto && personalInfo.avatarUrl && (
            <div className="w-48 bg-gray-900 flex items-center justify-center p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-red-600 opacity-10" />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-32 h-32 object-cover rounded-sm border-2 border-red-600 relative z-10"
                style={{ width: photoSize, height: photoSize }}
              />
            </div>
          )}

          {/* Info Column */}
          <div className="flex-1 p-8 pl-10">
            <h1 
              className="text-5xl font-bold uppercase tracking-tighter mb-2"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName}
            </h1>
            <p 
              className="text-xl font-medium uppercase tracking-widest text-red-500 mb-6"
            >
              {personalInfo.headline}
            </p>

            {/* Contact Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-400">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Mail className="h-4 w-4 text-red-600" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Globe className="h-4 w-4 text-red-600" />
                  <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Linkedin className="h-4 w-4 text-red-600" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="p-8 grid grid-cols-12 gap-8">
        {/* Left Sidebar (Skills, Education, etc.) */}
        <div className="col-span-4 space-y-8">
          {/* Summary (if short) or About */}
          {personalInfo.summary && (
            <section className="bg-gray-800 p-5 border-l-4 border-red-600">
              <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                <Users className="h-4 w-4 text-red-500" />
                Profile
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {sections.filter(s => s.isVisible && !['experience', 'projects'].includes(s.type)).map((section) => {
            const Icon = sectionIcons[section.type] || Layers;
            
            return (
              <section key={section.id}>
                <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2 border-b border-gray-700 pb-2">
                  <Icon className="h-4 w-4 text-red-500" />
                  {section.title}
                </h2>

                {/* Skills */}
                {section.type === "skills" && (
                  <div className="space-y-4">
                    {(section.items as SkillItem[]).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-800 rounded-none">
                          <div 
                            className="h-full bg-red-600"
                            style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {section.type === "education" && (
                  <div className="space-y-6">
                    {(section.items as EducationItem[]).map((item) => (
                      <div key={item.id} className="relative pl-4 border-l border-gray-700">
                        <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 bg-red-600 rotate-45" />
                        <h3 className="text-sm font-bold text-white">{item.degree}</h3>
                        <p className="text-xs text-red-400 uppercase tracking-wide mb-1">{item.institution}</p>
                        <p className="text-xs text-gray-500 mb-2">
                          {item.startDate} – {item.endDate}
                        </p>
                        {item.description && <p className="text-xs text-gray-400">{item.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Languages */}
                {section.type === "languages" && (
                  <div className="space-y-2">
                    {(section.items as LanguageItem[]).map((item) => (
                      <div key={item.id} className="flex justify-between items-center bg-gray-800 p-2 px-3 border-l-2 border-red-600">
                        <span className="text-sm font-medium text-gray-300">{item.name}</span>
                        <span className="text-xs text-gray-500 uppercase">{item.proficiency}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Generic List */}
                {!['skills', 'education', 'languages'].includes(section.type) && (
                  <div className="space-y-4">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {section.items.map((item: any) => (
                      <div key={item.id}>
                        <h3 className="text-sm font-bold text-white">
                          {'name' in item ? item.name : 'title' in item ? item.title : ''}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {'description' in item ? item.description : 'issuer' in item ? item.issuer : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Main Column (Experience, Projects) */}
        <div className="col-span-8 space-y-10">
          {sections.filter(s => s.isVisible && ['experience', 'projects'].includes(s.type)).map((section) => {
            const Icon = sectionIcons[section.type] || Target;

            return (
              <section key={section.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-red-600 p-2">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
                    {section.title}
                  </h2>
                  <div className="flex-1 h-1 bg-gray-800" />
                </div>

                {/* Experience */}
                {section.type === "experience" && (
                  <div className="space-y-8">
                    {(section.items as ExperienceItem[]).map((item) => (
                      <div key={item.id} className="group">
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                            {item.role}
                          </h3>
                          <span className="text-sm font-mono text-red-500 bg-red-900/20 px-2 py-0.5 rounded">
                            {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4 text-sm">
                          <span className="font-bold uppercase tracking-wider text-gray-400">{item.company}</span>
                          {item.location && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span className="text-gray-500">{item.location}</span>
                            </>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="text-red-600 mt-1.5 h-1.5 w-1.5 bg-red-600 transform rotate-45 flex-shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {item.techStack && item.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.techStack.map((tech, idx) => (
                              <span key={idx} className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-0.5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {section.type === "projects" && (
                  <div className="grid grid-cols-1 gap-6">
                    {(section.items as ProjectItem[]).map((item) => (
                      <div key={item.id} className="bg-gray-800 p-5 border-l-2 border-gray-700 hover:border-red-600 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white">{item.title}</h3>
                          <div className="flex gap-3 text-gray-400">
                            {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener" className="hover:text-white"><ExternalLink className="h-4 w-4" /></a>}
                            {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener" className="hover:text-white"><Github className="h-4 w-4" /></a>}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                        
                        {item.techStack && item.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.techStack.map((tech, idx) => (
                              <span key={idx} className="text-[10px] uppercase font-bold text-red-400 bg-red-900/10 px-2 py-1">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
