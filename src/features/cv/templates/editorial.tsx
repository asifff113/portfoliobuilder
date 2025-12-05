"use client";

/**
 * Editorial Template
 * 
 * A sophisticated, high-fashion magazine layout featuring:
 * - Elegant serif typography
 * - Centered layouts mixed with multi-column text
 * - Fine lines and generous whitespace
 * - "Vogue" or "Monocle" magazine aesthetic
 */

import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function EditorialTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #1a1a1a)";
  
  return (
    <div 
      className="min-h-[1100px] bg-[#fdfbf7] p-16 text-[#1a1a1a]"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Georgia', 'Times New Roman', serif)",
      }}
    >
      {/* Header - Centered & Elegant */}
      <header className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -z-10" />
        <h1 
          className="text-6xl font-serif tracking-widest bg-[#fdfbf7] inline-block px-8 uppercase"
          style={{ color: primaryColor }}
        >
          {personalInfo.fullName}
        </h1>
        <div className="mt-6 flex justify-center gap-6 text-xs tracking-[0.2em] uppercase font-sans text-gray-500 bg-[#fdfbf7] inline-block px-4 relative z-10">
          <span>{personalInfo.headline}</span>
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-12">
        {/* Main Content - 2 Columns like a magazine article */}
        <div className="col-span-12 space-y-12">
          
          {/* Summary with Drop Cap */}
          {personalInfo.summary && (
            <section className="mb-12 max-w-3xl mx-auto text-center">
              <p className="text-lg leading-loose italic text-gray-700">
                &ldquo;{personalInfo.summary}&rdquo;
              </p>
            </section>
          )}

          <div className="grid grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="col-span-4 space-y-12 border-r border-gray-200 pr-12">
              {/* Skills - Tag Cloud Style */}
              {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
                <section key={section.id}>
                  <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase mb-6 text-gray-400">
                    Competencies
                  </h2>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {(section.items as SkillItem[]).map((item, idx) => (
                      <span key={item.id} className="text-sm italic border-b border-gray-300 pb-1">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </section>
              ))}

              {/* Education */}
              {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
                <section key={section.id}>
                  <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase mb-6 text-gray-400">
                    Education
                  </h2>
                  <div className="space-y-8">
                    {(section.items as EducationItem[]).map((item) => (
                      <div key={item.id}>
                        <h3 className="font-bold text-lg leading-tight mb-1">{item.institution}</h3>
                        <p className="text-sm italic text-gray-600 mb-2">{item.degree}</p>
                        <p className="text-xs font-sans text-gray-400 uppercase tracking-wider">
                          {item.startDate} — {item.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Contact / Links */}
              <section>
                <h2 className="text-xs font-sans font-bold tracking-[0.2em] uppercase mb-6 text-gray-400">
                  Connect
                </h2>
                <div className="space-y-2 text-sm">
                  {personalInfo.website && (
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span className="italic">Portfolio</span>
                      <a href={personalInfo.website} className="font-sans text-xs">{personalInfo.website.replace(/^https?:\/\//, '')}</a>
                    </div>
                  )}
                  {personalInfo.linkedinUrl && (
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span className="italic">LinkedIn</span>
                      <a href={personalInfo.linkedinUrl} className="font-sans text-xs">Profile ↗</a>
                    </div>
                  )}
                  {personalInfo.githubUrl && (
                    <div className="flex justify-between border-b border-gray-100 pb-1">
                      <span className="italic">GitHub</span>
                      <a href={personalInfo.githubUrl} className="font-sans text-xs">Profile ↗</a>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="col-span-8 space-y-16">
              {/* Experience */}
              {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
                <section key={section.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-serif italic">Experience</h2>
                    <div className="h-px bg-gray-200 flex-grow" />
                  </div>
                  
                  <div className="space-y-12">
                    {(section.items as ExperienceItem[]).map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-4">
                        <div className="col-span-3 text-right pt-1">
                          <span className="text-xs font-sans text-gray-400 uppercase tracking-wider block">
                            {item.startDate}
                          </span>
                          <span className="text-xs font-sans text-gray-300 uppercase tracking-wider block">
                            to
                          </span>
                          <span className="text-xs font-sans text-gray-400 uppercase tracking-wider block">
                            {item.isCurrent ? "Present" : item.endDate}
                          </span>
                        </div>
                        <div className="col-span-9 border-l border-gray-200 pl-6">
                          <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                          <p className="text-sm font-sans uppercase tracking-wider text-gray-500 mb-4">{item.company}</p>
                          
                          {item.description && (
                            <p className="text-sm leading-relaxed text-gray-700 mb-4 font-serif">{item.description}</p>
                          )}

                          {item.bullets && (
                            <ul className="space-y-2">
                              {item.bullets.map((bullet, idx) => (
                                <li key={idx} className="text-sm text-gray-600 leading-relaxed pl-4 relative">
                                  <span className="absolute left-0 top-2 w-1 h-1 bg-gray-300 rounded-full" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* Projects */}
              {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
                <section key={section.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-serif italic">Selected Works</h2>
                    <div className="h-px bg-gray-200 flex-grow" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {(section.items as ProjectItem[]).map((item) => (
                      <div key={item.id} className="bg-white p-6 shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed italic">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.techStack?.map((tech, idx) => (
                            <span key={idx} className="text-[10px] font-sans uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-1">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
