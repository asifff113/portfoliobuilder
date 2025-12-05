"use client";

/**
 * Noir Elegance Template
 * 
 * An ultra-minimalist, high-contrast monochrome template.
 * Features:
 * - Strictly black and white
 * - Heavy use of negative space
 * - Oversized typography
 * - Divider lines and framing elements
 */

import { Github, ExternalLink, ArrowRight, Circle } from "lucide-react";
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


export function NoirEleganceTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 150;
  
  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #000000)", // Black
    secondary: "var(--cv-secondary, #404040)", // Dark Gray
    accent: "var(--cv-accent, #000000)", // Black
    background: "var(--cv-background, #ffffff)", // White
  };

  return (
    <div 
      className="bg-white text-black"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Helvetica Neue", "Arial", sans-serif)',
        fontSize: '10pt',
        lineHeight: '1.4',
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div className="p-12 border-12 border-black h-full min-h-[297mm] flex flex-col">
        {/* Header */}
        <header className="mb-16 flex items-end justify-between border-b-4 border-black pb-8">
          <div>
            <h1 
              className="text-7xl font-black uppercase tracking-tighter leading-[0.8] mb-4"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName.split(' ').map((n, i) => (
                <span key={i} className="block">{n}</span>
              ))}
            </h1>
            <p className="text-xl font-bold uppercase tracking-widest bg-black text-white inline-block px-4 py-1">
              {personalInfo.headline}
            </p>
          </div>

          {showPhoto && personalInfo.avatarUrl && (
            <div className="mb-2">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="grayscale contrast-125"
                style={{ width: photoSize, height: photoSize, objectFit: "cover" }}
              />
            </div>
          )}
        </header>

        <div className="grid grid-cols-12 gap-12 flex-1">
          {/* Left Column - Contact & Skills */}
          <div className="col-span-4 flex flex-col gap-12 border-r border-black pr-8">
            {/* Contact */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">Contact</h2>
              <div className="flex flex-col gap-3 text-sm font-medium">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 hover:underline">
                    <ArrowRight className="h-4 w-4" />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4" />
                    <span>{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-3">
                    <ArrowRight className="h-4 w-4" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-3 hover:underline">
                    <ArrowRight className="h-4 w-4" />
                    <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                {personalInfo.linkedinUrl && (
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-3 hover:underline">
                    <ArrowRight className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </section>

            {/* Skills */}
            {sections.filter(s => s.isVisible && s.type === "skills").map((section) => (
              <section key={section.id}>
                <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">{section.title}</h2>
                <div className="space-y-4">
                  {(section.items as SkillItem[]).map((skill) => (
                    <div key={skill.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-sm uppercase">{skill.name}</span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 w-full border border-black ${level <= skill.proficiency ? "bg-black" : "bg-transparent"}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Education (if in sidebar) */}
            {sections.filter(s => s.isVisible && s.type === "education").map((section) => (
              <section key={section.id}>
                <h2 className="text-sm font-black uppercase tracking-widest mb-6 border-b-2 border-black pb-2">{section.title}</h2>
                <div className="space-y-6">
                  {(section.items as EducationItem[]).map((item) => (
                    <div key={item.id}>
                      <h3 className="font-bold text-sm uppercase">{item.degree}</h3>
                      <p className="text-xs font-medium mt-1">{item.institution}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.startDate} – {item.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Right Column - Experience & Projects */}
          <div className="col-span-8 flex flex-col gap-12">
            {/* Summary */}
            {personalInfo.summary && (
              <section>
                <p className="text-lg font-medium leading-relaxed border-l-4 border-black pl-6">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {sections.filter(s => s.isVisible && ['experience', 'projects'].includes(s.type)).map((section) => (
              <section key={section.id}>
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center text-lg rounded-full">
                    {section.type === 'experience' ? '1' : '2'}
                  </span>
                  {section.title}
                </h2>

                {/* Experience */}
                {section.type === "experience" && (
                  <div className="space-y-10">
                    {(section.items as ExperienceItem[]).map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 pt-1">
                          <span className="text-xs font-bold uppercase tracking-wider block border-b border-black pb-1 mb-1">
                            {item.startDate} – {item.isCurrent ? "Now" : item.endDate}
                          </span>
                          <span className="text-xs font-bold text-gray-500 uppercase">{item.location}</span>
                        </div>
                        <div className="col-span-9">
                          <h3 className="text-2xl font-bold uppercase leading-none mb-1">{item.role}</h3>
                          <p className="text-lg font-medium mb-4">{item.company}</p>
                          <p className="text-sm leading-relaxed mb-4">{item.description}</p>
                          {item.bullets && (
                            <ul className="space-y-2">
                              {item.bullets.map((bullet, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-3">
                                  <Circle className="h-2 w-2 mt-1.5 fill-black" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {section.type === "projects" && (
                  <div className="space-y-8">
                    {(section.items as ProjectItem[]).map((item) => (
                      <div key={item.id} className="border-2 border-black p-6 hover:bg-black hover:text-white transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold uppercase">{item.title}</h3>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.liveUrl && <ExternalLink className="h-5 w-5" />}
                            {item.githubUrl && <Github className="h-5 w-5" />}
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-4">{item.description}</p>
                        {item.techStack && (
                          <div className="flex flex-wrap gap-2">
                            {item.techStack.map((tech, idx) => (
                              <span key={idx} className="text-xs font-bold uppercase border border-current px-2 py-1">
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
            ))}

            {/* Generic */}
            {sections.filter(s => s.isVisible && !['experience', 'projects', 'skills', 'education'].includes(s.type)).map((section) => (
              <section key={section.id}>
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black inline-block pb-1">
                  {section.title}
                </h2>
                <div className="grid grid-cols-2 gap-6">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {section.items.map((item: any) => (
                    <div key={item.id}>
                      <h3 className="font-bold uppercase">
                        {'name' in item ? item.name : 'title' in item ? item.title : ''}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {'description' in item ? item.description : 'issuer' in item ? item.issuer : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
