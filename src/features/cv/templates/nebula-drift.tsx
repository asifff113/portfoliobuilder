"use client";

/**
 * Nebula Drift Template
 * 
 * A futuristic, space-inspired template with deep dark mode and glowing accents.
 * Features:
 * - Deep space background
 * - Glowing neon text effects
 * - Translucent glass cards
 * - Tech-inspired typography
 * - Floating layout
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Code, Award, Languages, Heart, Users, FileText, Zap, Cpu, Radio } from "lucide-react";
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

// Section icons mapping
const sectionIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  experience: Radio,
  education: Cpu,
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

export function NebulaDriftTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 120;
  
  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #e2e8f0)", // Slate 200
    secondary: "var(--cv-secondary, #94a3b8)", // Slate 400
    accent: "var(--cv-accent, #06b6d4)", // Cyan 500
    text: "var(--cv-text, #f8fafc)", // Slate 50
    textMuted: "var(--cv-text-muted, #cbd5e1)", // Slate 300
    background: "var(--cv-background, #0f172a)", // Slate 900
    cardBg: "rgba(30, 41, 59, 0.7)", // Slate 800 with opacity
    glow: "0 0 10px var(--cv-accent, #06b6d4)",
  };

  return (
    <div 
      className="bg-slate-900 text-slate-50 relative overflow-hidden"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Orbitron", "Rajdhani", sans-serif)',
        fontSize: '10pt',
        lineHeight: '1.6',
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        boxSizing: 'border-box',
        background: `radial-gradient(circle at 10% 20%, #1e1b4b 0%, ${colors.background} 90%)`
      }}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform -rotate-45" />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-10">
          {showPhoto && personalInfo.avatarUrl && (
            <div className="mb-6 relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="relative rounded-full object-cover border-2 border-slate-800"
                style={{ 
                  width: photoSize, 
                  height: photoSize, 
                }}
              />
            </div>
          )}
          
          <h1 
            className="text-4xl font-black uppercase tracking-[0.2em] mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
            style={{ textShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
          
          <p 
            className="text-lg font-light tracking-widest uppercase mb-6"
            style={{ color: colors.accent }}
          >
            {personalInfo.headline || "Future Tech Specialist"}
          </p>
          
          {/* Contact Info - Glass Pill */}
          <div 
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs px-6 py-2 rounded-full border border-white/10 backdrop-blur-md"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Mail className="h-3 w-3" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Globe className="h-3 w-3" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                <Linkedin className="h-3 w-3" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-10 max-w-3xl mx-auto text-center">
            <p className="text-sm leading-relaxed font-light" style={{ color: colors.textMuted }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8">
          {sections.filter(s => s.isVisible).map((section) => {
            const Icon = sectionIcons[section.type] || Zap;
            
            return (
              <section key={section.id} className="relative">
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent to-cyan-500/50" />
                  <div className="flex items-center gap-2 px-4 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-sm">
                    <Icon className="h-4 w-4 text-cyan-400" />
                    <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-100">
                      {section.title}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-linear-to-l from-transparent to-cyan-500/50" />
                </div>

                {/* Experience & Education - Timeline Style */}
                {(section.type === "experience" || section.type === "education") && (
                  <div className="space-y-6 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />
                    
                    {(section.items as (ExperienceItem | EducationItem)[]).map((item) => (
                      <div key={item.id} className="relative pl-12 group">
                        {/* Timeline Node */}
                        <div className="absolute left-[13px] top-2 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] group-hover:scale-150 transition-transform" />
                        
                        <div 
                          className="p-5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-white mb-0.5">
                                {'role' in item ? item.role : item.degree}
                              </h3>
                              <p className="text-sm text-cyan-300 font-medium">
                                {'company' in item ? item.company : item.institution}
                              </p>
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-black/30 px-2 py-1 rounded">
                              {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                            </span>
                          </div>
                          
                          {item.description && (
                            <p className="text-sm text-slate-300 mb-3 font-light">{item.description}</p>
                          )}

                          {'bullets' in item && item.bullets && item.bullets.length > 0 && (
                            <ul className="space-y-1">
                              {item.bullets.map((bullet, idx) => (
                                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                                  <span className="text-cyan-500 mt-1">›</span>
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects - Grid Cards */}
                {section.type === "projects" && (
                  <div className="grid grid-cols-2 gap-4">
                    {(section.items as ProjectItem[]).map((item) => (
                      <div 
                        key={item.id} 
                        className="p-5 rounded-xl border border-white/5 bg-linear-to-br from-white/5 to-transparent hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-base font-bold text-white">{item.title}</h3>
                          <div className="flex gap-2">
                            {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener" className="text-cyan-400 hover:text-white"><ExternalLink className="h-3.5 w-3.5" /></a>}
                            {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener" className="text-cyan-400 hover:text-white"><Github className="h-3.5 w-3.5" /></a>}
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mb-3 line-clamp-3">{item.description}</p>
                        {item.techStack && item.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.techStack.map((tech, idx) => (
                              <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-900/50">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills - Tech Bars */}
                {section.type === "skills" && (
                  <div className="grid grid-cols-3 gap-6">
                    {(() => {
                      const categories: Record<string, SkillItem[]> = {};
                      (section.items as SkillItem[]).forEach((skill) => {
                        const cat = skill.category || "General";
                        if (!categories[cat]) categories[cat] = [];
                        categories[cat].push(skill);
                      });
                      
                      return Object.entries(categories).map(([category, skills]) => (
                        <div key={category} className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 border-b border-white/10 pb-2">
                            {category}
                          </h3>
                          <div className="space-y-3">
                            {skills.map((skill) => (
                              <div key={skill.id}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-200">{skill.name}</span>
                                </div>
                                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-linear-to-r from-cyan-600 to-purple-600"
                                    style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                )}

                {/* Other Sections - Simple Grid */}
                {!['experience', 'education', 'projects', 'skills'].includes(section.type) && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {section.items.map((item: any) => (
                      <div key={item.id} className="p-4 rounded-lg bg-white/5 border border-white/5">
                        <h3 className="text-sm font-bold text-white mb-1">
                          {'name' in item ? item.name : 'title' in item ? item.title : 'organization' in item ? item.organization : 'role' in item ? item.role : ''}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {'description' in item ? item.description : 'issuer' in item ? item.issuer : 'location' in item ? item.location : ''}
                        </p>
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
