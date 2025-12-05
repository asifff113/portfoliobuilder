"use client";

/**
 * Terminal Template
 * 
 * A retro-futuristic command line interface design featuring:
 * - Monospace typography
 * - High contrast (Green/Amber on Black)
 * - CLI-like structure
 * - "Hacker" aesthetic
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

export function TerminalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #00ff00)"; // Default terminal green
  
  return (
    <div 
      className="min-h-[1100px] bg-[#0c0c0c] p-8 text-[#00ff00] font-mono text-sm"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Courier New', Courier, monospace)",
        color: primaryColor,
      }}
    >
      {/* Top Bar */}
      <div className="border-b border-[#00ff00] pb-2 mb-8 flex justify-between opacity-70">
        <span>user@{personalInfo.fullName.toLowerCase().replace(/\s+/g, '')}:~</span>
        <span>{new Date().toLocaleDateString()}</span>
      </div>

      {/* Header Command */}
      <div className="mb-12">
        <div className="flex gap-2 mb-4">
          <span className="text-white">$</span>
          <span>whoami</span>
        </div>
        <div className="pl-4 border-l-2 border-[#00ff00] ml-1">
          <h1 className="text-4xl font-bold mb-2 text-white tracking-tighter">
            {personalInfo.fullName}
          </h1>
          <p className="text-xl opacity-80 mb-4">{personalInfo.headline}</p>
          
          <div className="grid grid-cols-2 gap-4 max-w-2xl opacity-70">
            {personalInfo.email && (
              <div>
                <span className="text-white">email:</span> <span className="opacity-90">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div>
                <span className="text-white">phone:</span> <span className="opacity-90">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div>
                <span className="text-white">location:</span> <span className="opacity-90">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div>
                <span className="text-white">web:</span> <span className="opacity-90">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Command */}
      {personalInfo.summary && (
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <span className="text-white">$</span>
            <span>cat about.txt</span>
          </div>
          <p className="pl-4 opacity-90 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        </div>
      )}

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4 space-y-12">
          {/* Skills Command */}
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
            <div key={section.id}>
              <div className="flex gap-2 mb-4">
                <span className="text-white">$</span>
                <span>ls -la ./skills</span>
              </div>
              <div className="pl-4 space-y-1">
                {(section.items as SkillItem[]).map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="text-white opacity-50">-rwxr-xr-x</span>
                    <span className="opacity-70">1 root</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Education Command */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <div key={section.id}>
              <div className="flex gap-2 mb-4">
                <span className="text-white">$</span>
                <span>cat /etc/education</span>
              </div>
              <div className="pl-4 space-y-6">
                {(section.items as EducationItem[]).map((item) => (
                  <div key={item.id}>
                    <div className="text-white font-bold">{item.institution}</div>
                    <div className="opacity-80">{item.degree}</div>
                    <div className="opacity-50 text-xs">[{item.startDate} :: {item.endDate}]</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="col-span-8 space-y-12">
          {/* Experience Command */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <div key={section.id}>
              <div className="flex gap-2 mb-4">
                <span className="text-white">$</span>
                <span>tail -f /var/log/experience</span>
              </div>
              
              <div className="pl-4 space-y-8">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id} className="relative">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-white font-bold text-lg">[{item.role}]</span>
                      <span className="opacity-70">@ {item.company}</span>
                    </div>
                    <div className="text-xs opacity-50 mb-2">
                      TIMESTAMP: {item.startDate} -- {item.isCurrent ? "CURRENT" : item.endDate}
                    </div>
                    
                    {item.description && (
                      <p className="opacity-80 mb-2">{item.description}</p>
                    )}

                    {item.bullets && (
                      <ul className="space-y-1">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2 opacity-90">
                            <span>&gt;</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Projects Command */}
          {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
            <div key={section.id}>
              <div className="flex gap-2 mb-4">
                <span className="text-white">$</span>
                <span>./run_projects.sh</span>
              </div>
              
              <div className="pl-4 grid grid-cols-1 gap-6">
                {(section.items as ProjectItem[]).map((item) => (
                  <div key={item.id} className="border border-[#00ff00] p-4 border-opacity-30 hover:border-opacity-100 transition-all">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white">{item.title}</span>
                      <span className="text-xs opacity-50">[ACTIVE]</span>
                    </div>
                    <p className="opacity-80 mb-3 text-xs">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack?.map((tech, idx) => (
                        <span key={idx} className="text-xs bg-[#00ff00] bg-opacity-10 px-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Blinking Cursor at bottom */}
      <div className="mt-12 flex gap-2 animate-pulse">
        <span className="text-white">$</span>
        <span className="w-3 h-5 bg-[#00ff00]" />
      </div>
    </div>
  );
}
