"use client";

/**
 * Glassmorphism Template
 * 
 * A modern, premium design featuring:
 * - Frosted glass effects (backdrop-blur)
 * - Soft gradients and shadows
 * - Rounded corners
 * - Clean sans-serif typography
 * - Floating card layout
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

export function GlassmorphismTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #3b82f6)"; // Default blue
  
  return (
    <div 
      className="min-h-[1100px] p-8 relative overflow-hidden"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Inter', sans-serif)",
        background: `linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)`,
      }}
    >
      {/* Background Orbs */}
      <div 
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
        style={{ background: primaryColor }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-400 opacity-20 blur-[80px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-6">
        {/* Header Card */}
        <header className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold text-slate-800 tracking-tight mb-2">
                {personalInfo.fullName}
              </h1>
              <p className="text-xl font-medium text-slate-600 mb-4" style={{ color: primaryColor }}>
                {personalInfo.headline}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-600">
                {personalInfo.email && (
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full">
                    <span>✉️</span> {personalInfo.email}
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full">
                    <span>📱</span> {personalInfo.phone}
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full">
                    <span>📍</span> {personalInfo.location}
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full">
                    <span>🌐</span> {personalInfo.website.replace(/^https?:\/\//, '')}
                  </div>
                )}
              </div>
            </div>
            
            {personalInfo.avatarUrl && (
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/50 shadow-lg shrink-0">
                <img 
                  src={personalInfo.avatarUrl} 
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-4 space-y-6">
            {/* Summary */}
            {personalInfo.summary && (
              <section className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                  About
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {/* Skills */}
            {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
              <section key={section.id} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(section.items as SkillItem[]).map((item) => (
                    <span 
                      key={item.id} 
                      className="px-3 py-1.5 bg-white/60 rounded-xl text-xs font-semibold text-slate-700 shadow-sm border border-white/50"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            {/* Education */}
            {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
              <section key={section.id} className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-lg">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                  Education
                </h2>
                <div className="space-y-6">
                  {(section.items as EducationItem[]).map((item) => (
                    <div key={item.id} className="relative pl-4 border-l-2 border-white/50">
                      <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400" />
                      <h3 className="font-bold text-slate-800 text-sm">{item.institution}</h3>
                      <p className="text-xs font-medium text-slate-600 mt-1">{item.degree}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.startDate} — {item.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Right Column */}
          <div className="col-span-8 space-y-6">
            {/* Experience */}
            {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
              <section key={section.id} className="bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-white/50 shadow-sm">💼</span>
                  Experience
                </h2>
                
                <div className="space-y-10">
                  {(section.items as ExperienceItem[]).map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{item.role}</h3>
                          <p className="text-md font-medium text-slate-600">{item.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-semibold text-slate-600 shadow-sm">
                          {item.startDate} — {item.isCurrent ? "Present" : item.endDate}
                        </span>
                      </div>
                      
                      {item.description && (
                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">{item.description}</p>
                      )}

                      {item.bullets && (
                        <ul className="space-y-2">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="text-sm text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-slate-400">
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
              <section key={section.id} className="bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-white/50 shadow-sm">🚀</span>
                  Projects
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {(section.items as ProjectItem[]).map((item) => (
                    <div key={item.id} className="bg-white/40 rounded-2xl p-5 border border-white/50 hover:bg-white/60 transition-colors">
                      <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 mb-4 line-clamp-3">{item.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack?.slice(0, 4).map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-semibold bg-white/50 px-2 py-1 rounded-md text-slate-600">
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
