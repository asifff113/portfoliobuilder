"use client";

import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem, CertificationItem } from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function VelvetRoseTemplate({ personalInfo, sections }: TemplateProps) {
  const experienceSection = sections.find(s => s.type === "experience" && s.isVisible);
  const educationSection = sections.find(s => s.type === "education" && s.isVisible);
  const skillsSection = sections.find(s => s.type === "skills" && s.isVisible);
  const certificationsSection = sections.find(s => s.type === "certifications" && s.isVisible);
  const projectsSection = sections.find(s => s.type === "projects" && s.isVisible);

  return (
    <div className="min-h-[297mm] w-[210mm] bg-[#1a1418] text-[#e8e0e4] p-0 font-['Cormorant_Garamond',_serif] relative overflow-hidden">
      {/* Rose gold decorative corner elements */}
      <div className="absolute top-0 left-0 w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M0,0 L0,150 Q0,0 150,0 Z" fill="url(#roseGoldGradient)" opacity="0.15"/>
          <path d="M0,0 C80,20 100,100 0,180" stroke="url(#roseGoldGradient)" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M0,0 C60,10 80,80 0,140" stroke="url(#roseGoldGradient)" strokeWidth="1" fill="none" opacity="0.3"/>
          <path d="M0,0 C40,5 60,60 0,100" stroke="url(#roseGoldGradient)" strokeWidth="1" fill="none" opacity="0.2"/>
          <defs>
            <linearGradient id="roseGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a574"/>
              <stop offset="50%" stopColor="#c9a0dc"/>
              <stop offset="100%" stopColor="#b08d8d"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-48 h-48 rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M0,0 L0,150 Q0,0 150,0 Z" fill="url(#roseGoldGradient2)" opacity="0.15"/>
          <path d="M0,0 C80,20 100,100 0,180" stroke="url(#roseGoldGradient2)" strokeWidth="1" fill="none" opacity="0.4"/>
          <path d="M0,0 C60,10 80,80 0,140" stroke="url(#roseGoldGradient2)" strokeWidth="1" fill="none" opacity="0.3"/>
          <defs>
            <linearGradient id="roseGoldGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a574"/>
              <stop offset="50%" stopColor="#c9a0dc"/>
              <stop offset="100%" stopColor="#b08d8d"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Velvet texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, #c9a0dc 0%, transparent 50%),
                          radial-gradient(circle at 80% 50%, #d4a574 0%, transparent 50%)`,
      }}/>

      {/* Header Section */}
      <header className="relative pt-16 pb-12 px-12 text-center">
        {/* Decorative rose */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8">
          <svg viewBox="0 0 40 40" className="w-full h-full">
            <circle cx="20" cy="20" r="8" fill="none" stroke="#c9a0dc" strokeWidth="1" opacity="0.6"/>
            <circle cx="20" cy="20" r="4" fill="#c9a0dc" opacity="0.4"/>
            <path d="M20,12 Q26,16 20,20 Q14,16 20,12" fill="#d4a574" opacity="0.5"/>
            <path d="M20,12 Q26,16 20,20 Q14,16 20,12" fill="none" stroke="#d4a574" strokeWidth="0.5" transform="rotate(72, 20, 20)"/>
            <path d="M20,12 Q26,16 20,20 Q14,16 20,12" fill="none" stroke="#d4a574" strokeWidth="0.5" transform="rotate(144, 20, 20)"/>
            <path d="M20,12 Q26,16 20,20 Q14,16 20,12" fill="none" stroke="#d4a574" strokeWidth="0.5" transform="rotate(216, 20, 20)"/>
            <path d="M20,12 Q26,16 20,20 Q14,16 20,12" fill="none" stroke="#d4a574" strokeWidth="0.5" transform="rotate(288, 20, 20)"/>
          </svg>
        </div>

        <h1 className="text-5xl font-light tracking-[0.25em] mb-3 bg-gradient-to-r from-[#d4a574] via-[#e8d5c4] to-[#c9a0dc] bg-clip-text text-transparent uppercase">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        
        <p className="text-lg tracking-[0.3em] text-[#c9a0dc]/80 uppercase mb-6 font-light">
          {personalInfo?.headline || "Professional Title"}
        </p>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"/>
          <div className="w-2 h-2 rotate-45 border border-[#d4a574]"/>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"/>
        </div>

        {/* Contact Info */}
        <div className="flex items-center justify-center flex-wrap gap-6 text-sm text-[#b08d8d]">
          {personalInfo?.email && (
            <span className="flex items-center gap-2">
              <span className="text-[#c9a0dc]">✉</span>
              {personalInfo.email}
            </span>
          )}
          {personalInfo?.phone && (
            <span className="flex items-center gap-2">
              <span className="text-[#c9a0dc]">☎</span>
              {personalInfo.phone}
            </span>
          )}
          {personalInfo?.location && (
            <span className="flex items-center gap-2">
              <span className="text-[#c9a0dc]">◈</span>
              {personalInfo.location}
            </span>
          )}
          {personalInfo?.website && (
            <span className="flex items-center gap-2">
              <span className="text-[#c9a0dc]">◇</span>
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      <div className="px-12 pb-12 space-y-8">
        {/* Summary Section */}
        {personalInfo?.summary && (
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs tracking-[0.4em] text-[#d4a574] uppercase">Profile</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/30 to-transparent"/>
            </div>
            <p className="text-[#e8e0e4]/80 leading-relaxed text-sm italic pl-4 border-l border-[#c9a0dc]/30">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experienceSection && experienceSection.items.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs tracking-[0.4em] text-[#d4a574] uppercase">Experience</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/30 to-transparent"/>
            </div>
            <div className="space-y-6">
              {(experienceSection.items as ExperienceItem[]).map((exp, index) => (
                <div key={exp.id || index} className="relative pl-6">
                  {/* Timeline decoration */}
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-gradient-to-br from-[#d4a574] to-[#c9a0dc]"/>
                  {index < experienceSection.items.length - 1 && (
                    <div className="absolute left-[3px] top-4 w-0.5 h-full bg-gradient-to-b from-[#d4a574]/30 to-transparent"/>
                  )}
                  
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg text-[#e8d5c4] font-medium">{exp.role}</h3>
                    <span className="text-xs text-[#b08d8d] tracking-wider">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="text-sm text-[#c9a0dc] mb-2">{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                  {exp.description && (
                    <p className="text-sm text-[#e8e0e4]/70 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Column Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Education */}
          {educationSection && educationSection.items.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xs tracking-[0.4em] text-[#d4a574] uppercase">Education</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/30 to-transparent"/>
              </div>
              <div className="space-y-4">
                {(educationSection.items as EducationItem[]).map((edu) => (
                  <div key={edu.id} className="relative pl-4 border-l border-[#c9a0dc]/20">
                    <h3 className="text-sm text-[#e8d5c4] font-medium">{edu.degree}</h3>
                    <p className="text-xs text-[#c9a0dc]">{edu.institution}</p>
                    <p className="text-xs text-[#b08d8d]">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </p>
                    {edu.description && (
                      <p className="text-xs text-[#e8e0e4]/60 mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skillsSection && skillsSection.items.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xs tracking-[0.4em] text-[#d4a574] uppercase">Expertise</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/30 to-transparent"/>
              </div>
              <div className="space-y-3">
                {(skillsSection.items as SkillItem[]).map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-[#e8e0e4]">{skill.name}</span>
                      <span className="text-xs text-[#b08d8d]">{skill.proficiency}/5</span>
                    </div>
                    <div className="h-1 bg-[#2a2025] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#d4a574] via-[#c9a0dc] to-[#b08d8d]"
                        style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certifications */}
        {certificationsSection && certificationsSection.items.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs tracking-[0.4em] text-[#d4a574] uppercase">Certifications</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/30 to-transparent"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(certificationsSection.items as CertificationItem[]).map((cert) => (
                <div
                  key={cert.id}
                  className="relative p-4 bg-gradient-to-br from-[#2a2025] to-[#1a1418] rounded border border-[#d4a574]/20"
                >
                  {/* Rose corner accent */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path d="M24,0 L24,24 L0,0 Z" fill="url(#certRoseGold)" opacity="0.3"/>
                      <defs>
                        <linearGradient id="certRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#d4a574"/>
                          <stop offset="100%" stopColor="#c9a0dc"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-sm text-[#e8d5c4] font-medium pr-4">{cert.name}</h3>
                  <p className="text-xs text-[#c9a0dc]">{cert.issuer}</p>
                  {cert.issueDate && <p className="text-xs text-[#b08d8d] mt-1">{cert.issueDate}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projectsSection && projectsSection.items.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xs tracking-[0.4em] text-[#d4a574] uppercase">Projects</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#d4a574]/30 to-transparent"/>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {(projectsSection.items as ProjectItem[]).map((project) => (
                <div
                  key={project.id}
                  className="p-4 bg-gradient-to-r from-[#2a2025]/50 to-transparent border-l-2 border-[#c9a0dc]/40"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-[#e8d5c4] font-medium">{project.title}</h3>
                    {project.liveUrl && (
                      <span className="text-xs text-[#d4a574] hover:text-[#c9a0dc] transition-colors">
                        View →
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-xs text-[#e8e0e4]/70 leading-relaxed mb-2">{project.description}</p>
                  )}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 text-xs text-[#c9a0dc] bg-[#c9a0dc]/10 rounded-full border border-[#c9a0dc]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer decorative element */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-40">
        <div className="w-8 h-px bg-[#d4a574]"/>
        <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a0dc]"/>
        <div className="w-8 h-px bg-[#d4a574]"/>
      </div>
    </div>
  );
}
