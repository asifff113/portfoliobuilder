"use client";

/**
 * Cyberpunk Futuristic Template
 * 
 * A high-tech, futuristic template with neon aesthetics.
 * Features:
 * - Dark mode optimized
 * - Hexagonal profile photo
 * - Neon glow effects
 * - Tech-inspired typography
 * - Circuit board decorative elements
 * - Data-visualization style skills
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Terminal, Cpu, Wifi, Share2, Database, Code, Zap } from "lucide-react";
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

export function CyberpunkFuturisticTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Default colors if not provided
  const primaryColor = "var(--cv-primary, #00f3ff)"; // Cyan
  const secondaryColor = "var(--cv-secondary, #bc13fe)"; // Magenta
  const bgColor = "#0a0a12";
  const cardBg = "#13131f";
  const textColor = "#e0e0e0";
  const mutedColor = "#8a8a9b";

  return (
    <div 
      className="min-h-[1100px] p-8 relative overflow-hidden"
      style={{ 
        backgroundColor: bgColor,
        fontFamily: "var(--cv-font-family, 'Orbitron', 'Rajdhani', 'Segoe UI', sans-serif)",
        color: textColor,
        backgroundImage: `
          linear-gradient(rgba(19, 19, 31, 0.9), rgba(19, 19, 31, 0.9)),
          linear-gradient(0deg, transparent 24%, rgba(0, 243, 255, .03) 25%, rgba(0, 243, 255, .03) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .03) 75%, rgba(0, 243, 255, .03) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0, 243, 255, .03) 25%, rgba(0, 243, 255, .03) 26%, transparent 27%, transparent 74%, rgba(0, 243, 255, .03) 75%, rgba(0, 243, 255, .03) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '50px 50px',
      }}
    >
      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2" style={{ borderColor: primaryColor, opacity: 0.5 }} />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2" style={{ borderColor: secondaryColor, opacity: 0.5 }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2" style={{ borderColor: secondaryColor, opacity: 0.5 }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2" style={{ borderColor: primaryColor, opacity: 0.5 }} />

      {/* Header */}
      <header className="relative z-10 mb-12 flex items-center gap-8">
        {/* Hexagonal Photo */}
        {personalInfo.avatarUrl && (
          <div className="relative shrink-0">
            <div 
              className="w-32 h-32 relative z-10"
              style={{ 
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                backgroundColor: cardBg,
                padding: '4px',
              }}
            >
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
                style={{ 
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              />
            </div>
            {/* Glow effect behind */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 blur-md opacity-50"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: primaryColor }}>System.User.Profile</span>
            <div className="h-px flex-1" style={{ backgroundColor: primaryColor, opacity: 0.3 }} />
          </div>
          <h1 
            className="text-5xl font-black uppercase tracking-tighter mb-2"
            style={{ 
              textShadow: `2px 2px 0px ${secondaryColor}`,
              color: '#fff'
            }}
          >
            {personalInfo.fullName || "CYBER_USER"}
          </h1>
          <p 
            className="text-xl font-light tracking-widest uppercase"
            style={{ color: primaryColor }}
          >
            {personalInfo.headline || "Netrunner / Developer"}
          </p>

          {/* Contact Grid */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
            {personalInfo.email && (
              <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded">
                <Mail className="w-3 h-3" style={{ color: secondaryColor }} />
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded">
                <Phone className="w-3 h-3" style={{ color: secondaryColor }} />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded">
                <MapPin className="w-3 h-3" style={{ color: secondaryColor }} />
                {personalInfo.location}
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded">
                <Globe className="w-3 h-3" style={{ color: secondaryColor }} />
                {personalInfo.website.replace(/^https?:\/\//, '')}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column (Sidebar-ish) */}
        <div className="col-span-4 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section className="relative p-6 border border-white/10 bg-white/5">
              <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: secondaryColor }} />
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Terminal className="w-4 h-4" />
                Bio_Data
              </h2>
              <p className="text-sm leading-relaxed font-mono text-white/80">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
            <section key={section.id} className="relative p-6 border border-white/10 bg-white/5">
              <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: secondaryColor }}>
                <Cpu className="w-4 h-4" />
                Modules
              </h2>
              <div className="space-y-4">
                {(section.items as SkillItem[]).map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between text-xs mb-1 font-mono">
                      <span>{item.name}</span>
                      <span style={{ color: primaryColor }}>{item.proficiency * 20}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full relative"
                        style={{ 
                          width: `${item.proficiency * 20}%`,
                          backgroundColor: secondaryColor,
                          boxShadow: `0 0 10px ${secondaryColor}`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Languages */}
          {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
            <section key={section.id} className="relative p-6 border border-white/10 bg-white/5">
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Share2 className="w-4 h-4" />
                Protocols
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {(section.items as LanguageItem[]).map((item) => (
                  <div key={item.id} className="text-xs font-mono px-2 py-1 border border-white/10 text-center">
                    {item.name}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Column (Main) */}
        <div className="col-span-8 space-y-8">
          {/* Experience */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: '#fff' }}>
                  Experience_Log
                </h2>
                <div className="h-px flex-1" style={{ backgroundColor: primaryColor }} />
                <Database className="w-5 h-5" style={{ color: primaryColor }} />
              </div>

              <div className="space-y-8 border-l-2 pl-8 relative" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {(section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id} className="relative">
                    {/* Timeline Node */}
                    <div 
                      className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-[#0a0a12]"
                      style={{ backgroundColor: secondaryColor, boxShadow: `0 0 10px ${secondaryColor}` }}
                    />
                    
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: primaryColor }}>{item.role}</h3>
                        <p className="text-sm font-mono uppercase tracking-wider" style={{ color: mutedColor }}>
                          {item.company} {item.location && `// ${item.location}`}
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded text-xs font-mono font-bold bg-white/5 border border-white/10">
                        {item.startDate} — {item.isCurrent ? "NOW" : item.endDate}
                      </div>
                    </div>

                    {item.description && (
                      <p className="text-sm text-white/70 mb-3">{item.description}</p>
                    )}

                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-1 mb-4">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2 text-white/80">
                            <span className="mt-1.5 w-1 h-1 rounded-full" style={{ backgroundColor: primaryColor }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.techStack.map((tech, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] uppercase tracking-wider px-2 py-0.5 border rounded"
                            style={{ borderColor: primaryColor, color: primaryColor }}
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

          {/* Projects */}
          {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
            <section key={section.id}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: '#fff' }}>
                  Project_Database
                </h2>
                <div className="h-px flex-1" style={{ backgroundColor: secondaryColor }} />
                <Code className="w-5 h-5" style={{ color: secondaryColor }} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(section.items as ProjectItem[]).map((item) => (
                  <div 
                    key={item.id} 
                    className="p-4 border border-white/10 bg-white/5 hover:border-white/30 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold group-hover:text-cyan-400 transition-colors" style={{ color: textColor }}>
                        {item.title}
                      </h3>
                      <div className="flex gap-2">
                        {item.liveUrl && <ExternalLink className="w-3 h-3 text-white/50 hover:text-white" />}
                        {item.githubUrl && <Github className="w-3 h-3 text-white/50 hover:text-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-white/60 mb-3 line-clamp-2">{item.description}</p>
                    {item.techStack && (
                      <div className="flex flex-wrap gap-1">
                        {item.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-[9px] px-1 bg-white/10 rounded text-white/50">
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
      </div>
    </div>
  );
}
