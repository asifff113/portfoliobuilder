"use client";

/**
 * Vogue Starlight Template
 * 
 * A high-fashion, editorial-style template with elegant typography and asymmetric layout.
 * Features:
 * - Editorial design aesthetic
 * - Large, bold serif typography
 * - Asymmetric grid
 * - Minimalist use of whitespace
 * - Elegant accent lines
 */

import type { 
  PersonalInfo, 
  CVSection, 
  SkillItem, 
  ProjectItem,
  ExperienceItem,
  EducationItem,
  LanguageItem,
  InterestItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}


export function VogueStarlightTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 180;
  
  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #1c1917)", // Stone 900
    secondary: "var(--cv-secondary, #44403c)", // Stone 700
    accent: "var(--cv-accent, #d6d3d1)", // Stone 300
    text: "var(--cv-text, #292524)", // Stone 800
    textMuted: "var(--cv-text-muted, #78716c)", // Stone 500
    background: "var(--cv-background, #fafaf9)", // Stone 50
    lineColor: "#e7e5e4", // Stone 200
  };

  return (
    <div 
      className="bg-stone-50 text-stone-900"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Playfair Display", "Georgia", serif)',
        fontSize: '10pt',
        lineHeight: '1.6',
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '0',
      }}
    >
      <div className="grid grid-cols-12 h-full min-h-[297mm]">
        {/* Left Sidebar - 4 cols */}
        <div className="col-span-4 bg-stone-100 p-8 border-r border-stone-200 flex flex-col h-full">
          {/* Photo */}
          {showPhoto && personalInfo.avatarUrl && (
            <div className="mb-10 self-center">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="object-cover grayscale contrast-125"
                style={{ 
                  width: photoSize, 
                  height: photoSize * 1.2, 
                  objectPosition: "center top"
                }}
              />
            </div>
          )}

          {/* Contact */}
          <div className="mb-12 space-y-3 text-xs font-sans tracking-wide">
            <h3 className="uppercase font-bold tracking-[0.2em] text-stone-400 mb-4 text-[10px]">Contact</h3>
            
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="block hover:text-stone-600 transition-colors">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="block">{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span className="block">{personalInfo.location}</span>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener" className="block hover:text-stone-600 transition-colors">
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="block hover:text-stone-600 transition-colors">
                LinkedIn Profile
              </a>
            )}
          </div>

          {/* Skills & Languages */}
          {sections.filter(s => s.isVisible && ['skills', 'languages', 'interests'].includes(s.type)).map((section) => (
            <div key={section.id} className="mb-10">
              <h3 className="uppercase font-bold tracking-[0.2em] text-stone-400 mb-4 text-[10px] font-sans">
                {section.title}
              </h3>

              {section.type === "skills" && (
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {(section.items as SkillItem[]).map((skill) => (
                    <span key={skill.id} className="text-sm border-b border-stone-300 pb-0.5">
                      {skill.name}
                    </span>
                  ))}
                </div>
              )}

              {section.type === "languages" && (
                <ul className="space-y-2">
                  {(section.items as LanguageItem[]).map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="text-stone-400 italic font-serif">{item.proficiency}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.type === "interests" && (
                <div className="text-sm leading-relaxed">
                  {(section.items as InterestItem[]).map(i => i.name).join(" • ")}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content - 8 cols */}
        <div className="col-span-8 p-12 pt-16">
          {/* Header Name */}
          <header className="mb-16">
            <h1 
              className="text-6xl font-medium tracking-tight mb-4 leading-[0.9]"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName.split(' ').map((n, i) => (
                <span key={i} className="block">{n}</span>
              ))}
            </h1>
            <p 
              className="text-lg font-sans uppercase tracking-[0.3em] text-stone-400"
            >
              {personalInfo.headline}
            </p>
          </header>

          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-16">
              <p className="text-lg leading-relaxed font-serif italic text-stone-600 border-l-2 border-stone-200 pl-6">
                &quot;{personalInfo.summary}&quot;
              </p>
            </section>
          )}

          {/* Experience & Education */}
          <div className="space-y-12">
            {sections.filter(s => s.isVisible && !['skills', 'languages', 'interests'].includes(s.type)).map((section) => (
              <section key={section.id}>
                <div className="flex items-baseline gap-4 mb-8 border-b border-stone-200 pb-4">
                  <h2 className="text-2xl font-serif italic text-stone-800">
                    {section.title}
                  </h2>
                  <span className="flex-1 border-b border-stone-100"></span>
                </div>

                {/* Experience */}
                {section.type === "experience" && (
                  <div className="space-y-10">
                    {(section.items as ExperienceItem[]).map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-xs font-sans uppercase tracking-wider text-stone-400 pt-1.5">
                          {item.startDate} — {item.isCurrent ? "Present" : item.endDate}
                        </div>
                        <div className="col-span-9">
                          <h3 className="text-xl font-medium mb-1">{item.role}</h3>
                          <p className="text-sm font-sans uppercase tracking-wide text-stone-500 mb-4">{item.company}, {item.location}</p>
                          <p className="text-sm text-stone-600 leading-relaxed mb-3">{item.description}</p>
                          {item.bullets && (
                            <ul className="list-disc ml-4 space-y-1 text-sm text-stone-600">
                              {item.bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {section.type === "education" && (
                  <div className="space-y-8">
                    {(section.items as EducationItem[]).map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-xs font-sans uppercase tracking-wider text-stone-400 pt-1.5">
                          {item.startDate} — {item.endDate}
                        </div>
                        <div className="col-span-9">
                          <h3 className="text-lg font-medium mb-1">{item.institution}</h3>
                          <p className="text-sm font-serif italic text-stone-600">{item.degree} in {item.fieldOfStudy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {section.type === "projects" && (
                  <div className="grid grid-cols-2 gap-8">
                    {(section.items as ProjectItem[]).map((item) => (
                      <div key={item.id}>
                        <h3 className="text-lg font-medium mb-2 border-b border-stone-200 pb-1 inline-block">{item.title}</h3>
                        <p className="text-sm text-stone-600 leading-relaxed mb-2">{item.description}</p>
                        <div className="flex gap-2 text-xs font-sans text-stone-400">
                          {item.techStack?.slice(0, 3).join(" / ")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Generic */}
                {!['experience', 'education', 'projects'].includes(section.type) && (
                   <div className="space-y-4">
                     {section.items.map((item) => (
                       <div key={item.id}>
                         <h3 className="font-medium">{'name' in item ? item.name : 'title' in item ? item.title : ''}</h3>
                         <p className="text-sm text-stone-500">
                           {'description' in item ? item.description : 'issuer' in item ? item.issuer : ''}
                         </p>
                       </div>
                     ))}
                   </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
