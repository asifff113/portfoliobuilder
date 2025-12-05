"use client";

/**
 * Swiss Minimalist Template
 * 
 * A clean, grid-based template inspired by Swiss International Typographic Style.
 * Features:
 * - Heavy use of grid systems
 * - Large, bold typography (Helvetica/Inter)
 * - Asymmetric layouts
 * - High contrast (Black & White)
 * - Minimal decoration, focus on content and whitespace
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

export function SwissMinimalistTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #000000)";
  
  return (
    <div 
      className="min-h-[1100px] bg-white p-12"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Helvetica Neue', 'Arial', sans-serif)",
        color: "#000",
      }}
    >
      {/* Header - Massive Typography */}
      <header className="mb-16 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <h1 
            className="text-7xl font-bold tracking-tighter leading-[0.9] mb-6"
            style={{ color: primaryColor }}
          >
            {personalInfo.fullName?.split(' ').map((name, i) => (
              <span key={i} className="block">{name}</span>
            ))}
          </h1>
        </div>
        <div className="col-span-4 flex flex-col justify-end items-start text-sm font-medium leading-relaxed">
          <p className="mb-4 text-lg font-bold">{personalInfo.headline}</p>
          {personalInfo.email && <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <a href={personalInfo.website} className="hover:underline">{personalInfo.website.replace(/^https?:\/\//, '')}</a>}
        </div>
      </header>

      {/* Thick Divider */}
      <div className="w-full h-4 bg-black mb-16" style={{ backgroundColor: primaryColor }} />

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Meta Info */}
        <div className="col-span-4 space-y-12">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-t-2 border-black pt-2">About</h2>
              <p className="text-sm leading-relaxed font-medium">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-t-2 border-black pt-2">Expertise</h2>
              <ul className="space-y-2">
                {(section.items as SkillItem[]).map((item) => (
                  <li key={item.id} className="text-sm font-bold flex justify-between items-center">
                    {item.name}
                    {item.proficiency >= 4 && <span className="w-2 h-2 bg-black rounded-full" />}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Education */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4 border-t-2 border-black pt-2">Education</h2>
              <div className="space-y-6">
                {(section.items as EducationItem[]).map((item) => (
                  <div key={item.id}>
                    <p className="text-sm font-bold">{item.institution}</p>
                    <p className="text-sm">{item.degree}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.startDate} — {item.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Column - Main Content */}
        <div className="col-span-8 space-y-16">
          {/* Experience */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-4xl font-bold tracking-tight mb-8">Experience</h2>
              
              <div className="space-y-12">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id} className="grid grid-cols-8 gap-4">
                    <div className="col-span-2 text-xs font-bold pt-1">
                      {item.startDate} —<br/>
                      {item.isCurrent ? "Present" : item.endDate}
                    </div>
                    <div className="col-span-6">
                      <h3 className="text-xl font-bold mb-1">{item.role}</h3>
                      <p className="text-sm font-medium mb-4 text-gray-600">{item.company}</p>
                      
                      {item.description && (
                        <p className="text-sm mb-4 leading-relaxed">{item.description}</p>
                      )}

                      {item.bullets && (
                        <ul className="space-y-2">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm pl-4 border-l-2 border-gray-200">
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
              <h2 className="text-4xl font-bold tracking-tight mb-8">Selected Works</h2>
              
              <div className="grid grid-cols-2 gap-8">
                {(section.items as ProjectItem[]).map((item) => (
                  <div key={item.id} className="border-t-2 border-black pt-4">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm mb-4 h-10 overflow-hidden">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack?.map((tech, idx) => (
                        <span key={idx} className="text-xs font-bold bg-gray-100 px-2 py-1">
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
  );
}
