"use client";

/**
 * Glitch Cyber Template
 * 
 * A futuristic template with glitch effects and cyber aesthetics.
 * Features:
 * - Glitch text effects
 * - RGB split accents
 * - Cyberpunk layout
 * - Tech-inspired typography
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Terminal, Cpu, Wifi, Share2, Database, Code, Zap, Layers, Activity } from "lucide-react";
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

export function GlitchCyberTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Default colors if not provided
  const primaryColor = "var(--cv-primary, #ff003c)"; // Cyber Red
  const secondaryColor = "var(--cv-secondary, #00f0ff)"; // Cyber Cyan
  const bgColor = "#050505";
  const cardBg = "#0a0a0a";
  const textColor = "#e0e0e0";
  const mutedColor = "#8a8a9b";

  return (
    <div 
      className="min-h-[1100px] p-8 relative overflow-hidden"
      style={{ 
        backgroundColor: bgColor,
        fontFamily: "var(--cv-font-family, 'Courier New', monospace)",
        color: textColor,
      }}
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 mb-12 border-b-2 border-dashed pb-8" style={{ borderColor: primaryColor }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 
              className="text-5xl font-black uppercase tracking-tighter mb-2 relative inline-block"
              style={{ 
                textShadow: `2px 2px 0px ${secondaryColor}, -2px -2px 0px ${primaryColor}`,
              }}
            >
              {personalInfo.fullName}
            </h1>
            <p className="text-xl tracking-widest uppercase" style={{ color: secondaryColor }}>
              {personalInfo.headline}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm font-mono">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: primaryColor }} />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} style={{ color: primaryColor }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: primaryColor }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe size={14} style={{ color: primaryColor }} />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        {/* Main Column */}
        <div className="md:col-span-8 space-y-10">
          {personalInfo.summary && (
            <section>
              <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color: secondaryColor }}>
                <Terminal size={24} />
                <span>System.Init()</span>
              </h2>
              <div className="p-4 border-l-4" style={{ borderColor: primaryColor, backgroundColor: "rgba(255,255,255,0.03)" }}>
                <p className="leading-relaxed font-mono text-sm md:text-base">
                  {personalInfo.summary}
                </p>
              </div>
            </section>
          )}

          {sections.filter(s => s.type === 'experience').map(section => (
            <section key={section.id}>
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2" style={{ color: secondaryColor }}>
                <Activity size={24} />
                <span>{section.title}</span>
              </h2>
              <div className="space-y-8">
                {(section.items as ExperienceItem[]).map((item, i) => (
                  <div key={i} className="relative pl-6 border-l border-dashed" style={{ borderColor: mutedColor }}>
                    <div 
                      className="absolute -left-[5px] top-0 w-2.5 h-2.5 rotate-45" 
                      style={{ backgroundColor: primaryColor }}
                    />
                    <div className="mb-2">
                      <h3 className="text-xl font-bold">{item.position}</h3>
                      <div className="flex flex-wrap gap-x-4 text-sm font-mono mt-1" style={{ color: secondaryColor }}>
                        <span>{item.company}</span>
                        <span>|</span>
                        <span>{item.startDate} - {item.endDate || "Present"}</span>
                        {item.location && (
                          <>
                            <span>|</span>
                            <span>{item.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div 
                      className="text-sm leading-relaxed opacity-90"
                      dangerouslySetInnerHTML={{ __html: item.description }} 
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {sections.filter(s => s.type === 'projects').map(section => (
            <section key={section.id}>
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2" style={{ color: secondaryColor }}>
                <Code size={24} />
                <span>{section.title}</span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {(section.items as ProjectItem[]).map((item, i) => (
                  <div 
                    key={i} 
                    className="p-4 border border-dashed relative group"
                    style={{ borderColor: mutedColor }}
                  >
                    <div className="absolute top-0 right-0 p-1 bg-black border-l border-b border-dashed" style={{ borderColor: primaryColor }}>
                      <Cpu size={14} style={{ color: primaryColor }} />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                    <p className="text-xs font-mono mb-2" style={{ color: secondaryColor }}>
                      {item.url}
                    </p>
                    <div 
                      className="text-sm opacity-80 mb-3"
                      dangerouslySetInnerHTML={{ __html: item.description }} 
                    />
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, t) => (
                          <span 
                            key={t} 
                            className="text-xs px-2 py-0.5 font-mono uppercase"
                            style={{ backgroundColor: "rgba(255,255,255,0.1)", color: primaryColor }}
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
          ))}
        </div>

        {/* Sidebar Column */}
        <div className="md:col-span-4 space-y-10">
          {sections.filter(s => s.type === 'skills').map(section => (
            <section key={section.id}>
              <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Zap size={20} />
                <span>{section.title}</span>
              </h2>
              <div className="space-y-4">
                {(section.items as SkillItem[]).map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1 font-mono">
                      <span>{item.name}</span>
                      <span style={{ color: secondaryColor }}>{item.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 relative overflow-hidden">
                      <div 
                        className="h-full absolute top-0 left-0"
                        style={{ 
                          width: `${item.level}%`, 
                          backgroundColor: primaryColor,
                          boxShadow: `0 0 10px ${primaryColor}`
                        }}
                      />
                      {/* Glitch lines */}
                      <div className="absolute inset-0 w-full h-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-30" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {sections.filter(s => s.type === 'education').map(section => (
            <section key={section.id}>
              <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Database size={20} />
                <span>{section.title}</span>
              </h2>
              <div className="space-y-6">
                {(section.items as EducationItem[]).map((item, i) => (
                  <div key={i} className="relative pl-4 border-l-2" style={{ borderColor: secondaryColor }}>
                    <h3 className="font-bold">{item.institution}</h3>
                    <p className="text-sm" style={{ color: mutedColor }}>{item.degree}</p>
                    <p className="text-xs font-mono mt-1" style={{ color: primaryColor }}>
                      {item.startDate} - {item.endDate || "Present"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {sections.filter(s => s.type === 'languages').map(section => (
            <section key={section.id}>
              <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Globe size={20} />
                <span>{section.title}</span>
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {(section.items as LanguageItem[]).map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-white/5 border border-white/10">
                    <span className="font-mono text-sm">{item.language}</span>
                    <span className="text-xs uppercase" style={{ color: secondaryColor }}>{item.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
          
          {/* Social Links */}
          <section>
             <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Share2 size={20} />
                <span>Connect</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {personalInfo.linkedin && (
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <Linkedin size={18} />
                  </a>
                )}
                {personalInfo.github && (
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <Github size={18} />
                  </a>
                )}
              </div>
          </section>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="mt-12 pt-4 border-t border-dashed flex justify-between items-center text-xs font-mono opacity-50" style={{ borderColor: mutedColor }}>
        <span>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
        <span>STATUS: ONLINE</span>
        <span>VER: 2.0.45</span>
      </div>
    </div>
  );
}
