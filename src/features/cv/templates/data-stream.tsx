"use client";

/**
 * Data Stream Template
 * 
 * An advanced, unique template inspired by data streams and matrix aesthetics.
 * Features:
 * - Monospace typography
 * - Vertical data lines
 * - Unique layout
 * - Code-like styling
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Hash, Code, Terminal, Database, Cpu, Server } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function DataStreamTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Default colors if not provided
  const primaryColor = "var(--cv-primary, #00ff41)"; // Matrix Green
  const secondaryColor = "var(--cv-secondary, #008f11)"; // Darker Green
  const bgColor = "#0d0d0d";
  const textColor = "#cccccc";
  const mutedColor = "#555555";

  return (
    <div 
      className="min-h-[1100px] p-0 relative overflow-hidden flex"
      style={{ 
        backgroundColor: bgColor,
        fontFamily: "var(--cv-font-family, 'Consolas', 'Monaco', monospace)",
        color: textColor,
      }}
    >
      {/* Left Sidebar - Data Stream */}
      <div className="w-16 border-r border-dashed flex flex-col items-center py-8 gap-8 select-none opacity-50" style={{ borderColor: mutedColor }}>
        <div className="writing-vertical-rl text-xs tracking-widest" style={{ color: secondaryColor }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i}>{Math.random().toString(2).substr(2, 8)} </span>
          ))}
        </div>
      </div>

      <div className="flex-1 p-8">
        {/* Header */}
        <header className="mb-12 border-b border-dashed pb-8" style={{ borderColor: mutedColor }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs mb-2" style={{ color: primaryColor }}>&lt;candidate_profile&gt;</div>
              <h1 className="text-4xl font-bold mb-2 tracking-tight">
                {personalInfo.fullName}
              </h1>
              <p className="text-xl opacity-80 mb-4" style={{ color: secondaryColor }}>
                {`// ${personalInfo.headline}`}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm opacity-70">
                {personalInfo.email && (
                  <span className="flex items-center gap-2">
                    <span style={{ color: primaryColor }}>@</span> {personalInfo.email}
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-2">
                    <span style={{ color: primaryColor }}>#</span> {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-2">
                    <span style={{ color: primaryColor }}>📍</span> {personalInfo.location}
                  </span>
                )}
              </div>
            </div>
            
            <div className="hidden md:block text-right text-xs opacity-40">
              <div>HASH: {Math.random().toString(16).substr(2, 8)}</div>
              <div>NODE: {Math.random().toString(36).substr(2, 4).toUpperCase()}</div>
              <div>UPTIME: 99.9%</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-10">
            {personalInfo.summary && (
              <section>
                <div className="text-xs mb-2 opacity-50" style={{ color: primaryColor }}>
                  /* SUMMARY */
                </div>
                <p className="text-sm leading-relaxed border-l-2 pl-4" style={{ borderColor: secondaryColor }}>
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {sections.filter(s => s.type === 'experience').map(section => (
              <section key={section.id}>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-dashed" style={{ borderColor: mutedColor }}>
                  <Server size={16} style={{ color: primaryColor }} />
                  <h2 className="text-lg font-bold uppercase tracking-wider">{section.title}</h2>
                </div>
                
                <div className="space-y-8">
                  {(section.items as ExperienceItem[]).map((item, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-3 top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-lg font-bold" style={{ color: "#fff" }}>{item.position}</h3>
                        <span className="text-xs font-mono opacity-60">
                          [{item.startDate} :: {item.endDate || "NOW"}]
                        </span>
                      </div>
                      <div className="text-sm mb-2" style={{ color: secondaryColor }}>
                        @{item.company}
                      </div>
                      <div 
                        className="text-sm opacity-80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.description }} 
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {sections.filter(s => s.type === 'projects').map(section => (
              <section key={section.id}>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-dashed" style={{ borderColor: mutedColor }}>
                  <Code size={16} style={{ color: primaryColor }} />
                  <h2 className="text-lg font-bold uppercase tracking-wider">{section.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {(section.items as ProjectItem[]).map((item, i) => (
                    <div key={i} className="bg-white/5 p-4 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{item.name}</h3>
                        {item.url && (
                          <a href={item.url} className="text-xs opacity-50 hover:opacity-100 hover:text-primary transition-opacity">
                            LINK ↗
                          </a>
                        )}
                      </div>
                      <div 
                        className="text-sm opacity-70 mb-3"
                        dangerouslySetInnerHTML={{ __html: item.description }} 
                      />
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, t) => (
                            <span key={t} className="text-xs px-1.5 py-0.5 bg-white/10 rounded text-primary-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Sidebar Content */}
          <div className="space-y-10">
            {sections.filter(s => s.type === 'skills').map(section => (
              <section key={section.id}>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-dashed" style={{ borderColor: mutedColor }}>
                  <Cpu size={16} style={{ color: primaryColor }} />
                  <h2 className="text-lg font-bold uppercase tracking-wider">{section.title}</h2>
                </div>
                
                <div className="space-y-3">
                  {(section.items as SkillItem[]).map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.name}</span>
                        <span style={{ color: secondaryColor }}>{item.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10">
                        <div 
                          className="h-full" 
                          style={{ width: `${item.level}%`, backgroundColor: primaryColor }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {sections.filter(s => s.type === 'education').map(section => (
              <section key={section.id}>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-dashed" style={{ borderColor: mutedColor }}>
                  <Database size={16} style={{ color: primaryColor }} />
                  <h2 className="text-lg font-bold uppercase tracking-wider">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {(section.items as EducationItem[]).map((item, i) => (
                    <div key={i}>
                      <h3 className="font-bold text-sm">{item.institution}</h3>
                      <p className="text-xs opacity-70 mb-1">{item.degree}</p>
                      <p className="text-xs font-mono" style={{ color: secondaryColor }}>
                        {item.startDate} - {item.endDate || "Present"}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {sections.filter(s => s.type === 'languages').map(section => (
              <section key={section.id}>
                <div className="flex items-center gap-2 mb-6 pb-2 border-b border-dashed" style={{ borderColor: mutedColor }}>
                  <Globe size={16} style={{ color: primaryColor }} />
                  <h2 className="text-lg font-bold uppercase tracking-wider">{section.title}</h2>
                </div>
                
                <div className="space-y-2">
                  {(section.items as LanguageItem[]).map((item, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-dashed pb-1 border-white/10">
                      <span>{item.language}</span>
                      <span className="opacity-50 text-xs">{item.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-xs opacity-30 text-center">
          &lt;/candidate_profile&gt;
        </div>
      </div>
    </div>
  );
}
