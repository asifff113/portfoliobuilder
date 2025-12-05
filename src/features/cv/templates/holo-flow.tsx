"use client";

/**
 * Holo Flow Template
 * 
 * An advanced, fluid, holographic template with iridescent effects and glassmorphism.
 * Features:
 * - Soft, moving gradients
 * - Glassmorphism cards with iridescent borders
 * - Rounded, organic shapes
 * - Modern sans-serif typography
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Code, Award, Languages, Heart, Users, FileText, Sparkles, Zap, Layers, GraduationCap } from "lucide-react";
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
  experience: Layers,
  education: GraduationCap,
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

export function HoloFlowTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 120;
  
  // Use CSS variables if available, otherwise fallback to defaults

  return (
    <div 
      className="relative overflow-hidden text-slate-800"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Outfit", "Inter", sans-serif)',
        fontSize: '10pt',
        lineHeight: '1.6',
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        boxSizing: 'border-box',
        background: "#f8fafc",
      }}
    >
      {/* Animated Background Gradients (Static for PDF but styled to look fluid) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[50%] rounded-full blur-[100px] opacity-40"
          style={{ background: "linear-gradient(135deg, #c084fc, #6366f1)" }} 
        />
        <div 
          className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[100px] opacity-30"
          style={{ background: "linear-gradient(135deg, #2dd4bf, #3b82f6)" }} 
        />
        <div 
          className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full blur-[100px] opacity-30"
          style={{ background: "linear-gradient(135deg, #f472b6, #fb7185)" }} 
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header Card */}
        <header className="mb-8 p-8 rounded-3xl backdrop-blur-xl border border-white/50 shadow-lg"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))",
          }}
        >
          <div className="flex items-center gap-8">
            {showPhoto && personalInfo.avatarUrl && (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className="relative rounded-full object-cover border-4 border-white"
                  style={{ width: photoSize, height: photoSize }}
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 
                className="text-4xl font-bold tracking-tight mb-2 bg-clip-text text-transparent bg-linear-to-r from-slate-900 to-slate-700"
              >
                {personalInfo.fullName}
              </h1>
              <p className="text-lg font-medium text-violet-600 mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {personalInfo.headline}
              </p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                {personalInfo.email && (
                  <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{personalInfo.location}</span>
                  </span>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
                    <Globe className="h-3.5 w-3.5" />
                    <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                {personalInfo.linkedinUrl && (
                  <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-violet-600 transition-colors">
                    <Linkedin className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Summary */}
            {personalInfo.summary && (
              <section className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-violet-600 mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  About Me
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {sections.filter(s => s.isVisible && ['experience', 'projects', 'education'].includes(s.type)).map((section) => {
              const Icon = sectionIcons[section.type] || Layers;
              
              return (
                <section key={section.id} className="p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-violet-100 text-violet-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {section.title}
                    </h2>
                  </div>

                  {/* Experience & Education */}
                  {(section.type === "experience" || section.type === "education") && (
                    <div className="space-y-8 relative">
                      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-linear-to-b from-violet-200 to-transparent" />
                      
                      {(section.items as (ExperienceItem | EducationItem)[]).map((item) => (
                        <div key={item.id} className="relative pl-10">
                          <div className="absolute left-[15px] top-2 w-2.5 h-2.5 rounded-full bg-violet-500 ring-4 ring-violet-100" />
                          
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="text-lg font-bold text-slate-800">
                              {'role' in item ? item.role : item.degree}
                            </h3>
                            <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                              {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                            </span>
                          </div>
                          
                          <p className="text-sm font-medium text-slate-600 mb-2">
                            {'company' in item ? item.company : item.institution}
                            {'location' in item && item.location && ` • ${item.location}`}
                          </p>

                          {item.description && (
                            <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                              {item.description}
                            </p>
                          )}

                          {'bullets' in item && item.bullets && item.bullets.length > 0 && (
                            <ul className="space-y-1.5">
                              {item.bullets.map((bullet, idx) => (
                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                  <span className="text-violet-400 mt-1.5">•</span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Projects */}
                  {section.type === "projects" && (
                    <div className="grid grid-cols-1 gap-4">
                      {(section.items as ProjectItem[]).map((item) => (
                        <div key={item.id} className="group p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-colors border border-white/20">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-base font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                              {item.title}
                            </h3>
                            <div className="flex gap-2 text-slate-400">
                              {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noopener" className="hover:text-violet-600"><ExternalLink className="h-4 w-4" /></a>}
                              {item.githubUrl && <a href={item.githubUrl} target="_blank" rel="noopener" className="hover:text-violet-600"><Github className="h-4 w-4" /></a>}
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                          
                          {item.techStack && item.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {item.techStack.map((tech, idx) => (
                                <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 border border-violet-100">
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

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            {sections.filter(s => s.isVisible && !['experience', 'projects', 'education'].includes(s.type)).map((section) => {
              const Icon = sectionIcons[section.type] || Layers;

              return (
                <section key={section.id} className="p-5 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-violet-500" />
                    {section.title}
                  </h2>

                  {/* Skills */}
                  {section.type === "skills" && (
                    <div className="flex flex-wrap gap-2">
                      {(section.items as SkillItem[]).map((skill) => (
                        <div 
                          key={skill.id}
                          className="px-3 py-1.5 rounded-lg bg-white/60 border border-white/40 text-sm font-medium text-slate-700 flex items-center gap-2 shadow-sm"
                        >
                          {skill.name}
                          {skill.proficiency >= 4 && <Sparkles className="h-3 w-3 text-amber-400" />}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Languages */}
                  {section.type === "languages" && (
                    <div className="space-y-3">
                      {(section.items as LanguageItem[]).map((item) => (
                        <div key={item.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium text-slate-700">{item.name}</span>
                            <span className="text-slate-500 text-xs uppercase">{item.proficiency}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-violet-400 to-fuchsia-400 w-3/4 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Generic List */}
                  {!['skills', 'languages'].includes(section.type) && (
                    <div className="space-y-3">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      {section.items.map((item: any) => (
                        <div key={item.id} className="p-3 rounded-lg bg-white/40">
                          <h3 className="text-sm font-bold text-slate-800">
                            {'name' in item ? item.name : 'title' in item ? item.title : ''}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
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
        </div>
      </div>
    </div>
  );
}
