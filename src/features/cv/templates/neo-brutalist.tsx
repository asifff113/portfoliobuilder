"use client";

/**
 * Neo-Brutalist Template
 * 
 * A trendy, high-contrast design featuring:
 * - Thick black borders
 * - Hard shadows (no blur)
 * - Bold typography
 * - Visible grid lines
 * - Pop-art aesthetic
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

export function NeoBrutalistTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #a855f7)"; // Default purple
  
  return (
    <div 
      className="min-h-[1100px] bg-[#f0f0f0] p-8 font-mono text-black"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Courier New', Courier, monospace)",
      }}
    >
      <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <header className="border-b-4 border-black p-8 bg-yellow-300" style={{ backgroundColor: primaryColor }}>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 break-words">
            {personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm font-bold">
            <span className="bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {personalInfo.headline}
            </span>
            {personalInfo.email && (
              <span className="bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {personalInfo.email}
              </span>
            )}
            {personalInfo.location && (
              <span className="bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </header>

        <div className="grid grid-cols-12 divide-x-4 divide-black">
          {/* Sidebar */}
          <div className="col-span-4 p-6 space-y-8 bg-white">
            {/* Summary */}
            {personalInfo.summary && (
              <section>
                <h2 className="text-xl font-black uppercase mb-4 bg-black text-white inline-block px-2 py-1 transform -rotate-2">
                  About Me
                </h2>
                <p className="text-sm font-medium leading-relaxed border-l-4 border-black pl-3">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {/* Skills */}
            {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
              <section key={section.id}>
                <h2 className="text-xl font-black uppercase mb-4 bg-black text-white inline-block px-2 py-1 transform rotate-1">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((item) => (
                    <div 
                      key={item.id} 
                      className="border-2 border-black px-2 py-1 text-xs font-bold hover:bg-black hover:text-white transition-colors"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Education */}
            {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
              <section key={section.id}>
                <h2 className="text-xl font-black uppercase mb-4 bg-black text-white inline-block px-2 py-1 transform -rotate-1">
                  Education
                </h2>
                <div className="space-y-4">
                  {(section.items as EducationItem[]).map((item) => (
                    <div key={item.id} className="border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="font-black text-sm">{item.institution}</div>
                      <div className="text-xs font-bold mt-1">{item.degree}</div>
                      <div className="text-xs mt-2 border-t-2 border-black pt-1 flex justify-between">
                        <span>{item.startDate}</span>
                        <span>{item.endDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Main Content */}
          <div className="col-span-8 p-8 space-y-10 bg-white">
            {/* Experience */}
            {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
              <section key={section.id}>
                <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-2">
                  Work History
                </h2>
                
                <div className="space-y-8">
                  {(section.items as ExperienceItem[]).map((item) => (
                    <div key={item.id} className="relative pl-6 border-l-4 border-black">
                      <div className="absolute -left-[10px] top-0 w-4 h-4 bg-black rounded-full" />
                      
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-black">{item.role}</h3>
                        <span className="text-xs font-bold bg-black text-white px-2 py-1">
                          {item.startDate} - {item.isCurrent ? "NOW" : item.endDate}
                        </span>
                      </div>
                      
                      <div className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
                        @{item.company}
                      </div>
                      
                      {item.description && (
                        <p className="text-sm font-medium mb-3">{item.description}</p>
                      )}

                      {item.bullets && (
                        <ul className="space-y-1">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm flex items-start">
                              <span className="mr-2 font-black">→</span>
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
              <section key={section.id}>
                <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-2">
                  Projects
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {(section.items as ProjectItem[]).map((item) => (
                    <div key={item.id} className="border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-black">{item.title}</h3>
                        {item.url && (
                          <a href={item.url} className="text-xs font-bold underline decoration-2">
                            LINK ↗
                          </a>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.techStack?.map((tech, idx) => (
                          <span key={idx} className="text-xs font-bold border border-black px-1 bg-gray-100">
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
  );
}
