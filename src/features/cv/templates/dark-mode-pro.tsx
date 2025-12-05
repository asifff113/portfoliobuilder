"use client";

/**
 * Dark Mode Pro Template
 * 
 * Dark theme with neon glow effects for futuristic tech CVs:
 * - Dark background (#1a1a2e)
 * - Neon accent colors (cyan, purple, pink)
 * - Glowing progress bars for skills
 * - Neon photo border effect
 * - Glowing section headers
 */

import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Briefcase, GraduationCap, Code, Award, Zap } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function DarkModeProTemplate({ personalInfo, sections }: TemplateProps) {
  const bgColor = "#0f0f1a";
  const cardBg = "#1a1a2e";
  const neonCyan = "#00f5ff";
  const neonPurple = "#bf00ff";
  const neonPink = "#ff00aa";
  const textColor = "#e4e4e7";
  const mutedColor = "#71717a";

  // Glowing progress bar for skills
  const GlowingProgressBar = ({ value, color }: { value: number; color: string }) => {
    const percentage = (value / 5) * 100;
    return (
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${color}20` }}>
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}, 0 0 20px ${color}50`,
          }}
        />
      </div>
    );
  };

  const neonColors = [neonCyan, neonPurple, neonPink];

  return (
    <div 
      className="min-h-[1000px] p-8"
      style={{ 
        fontFamily: "var(--cv-font-family, 'JetBrains Mono', monospace)",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Header with Neon Glow Photo */}
      <header className="mb-8 flex items-center gap-8">
        {/* Photo with Neon Border */}
        <div className="relative">
          <div 
            className="absolute -inset-1 rounded-full blur-md opacity-75"
            style={{ background: `linear-gradient(135deg, ${neonCyan}, ${neonPurple}, ${neonPink})` }}
          />
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="relative h-32 w-32 rounded-full object-cover border-2"
              style={{ borderColor: neonCyan }}
            />
          ) : (
            <div 
              className="relative h-32 w-32 rounded-full flex items-center justify-center text-4xl font-bold border-2"
              style={{ backgroundColor: cardBg, borderColor: neonCyan, color: neonCyan }}
            >
              {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 
            className="text-3xl font-bold mb-1"
            style={{ 
              color: neonCyan,
              textShadow: `0 0 10px ${neonCyan}50`,
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg mb-4" style={{ color: neonPurple }}>{personalInfo.headline || "Tech Professional"}</p>
          
          {/* Contact with Neon Icons */}
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:opacity-80" style={{ color: neonCyan }}>
                <Mail className="h-4 w-4" />
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2" style={{ color: neonPurple }}>
                <Phone className="h-4 w-4" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2" style={{ color: neonPink }}>
                <MapPin className="h-4 w-4" />
                {personalInfo.location}
              </span>
            )}
          </div>
        </div>

        {/* Social Links with Glow */}
        <div className="flex gap-3">
          {personalInfo.linkedinUrl && (
            <a 
              href={personalInfo.linkedinUrl} 
              className="p-3 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: cardBg, color: neonCyan, boxShadow: `0 0 10px ${neonCyan}30` }}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {personalInfo.githubUrl && (
            <a 
              href={personalInfo.githubUrl} 
              className="p-3 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: cardBg, color: neonPurple, boxShadow: `0 0 10px ${neonPurple}30` }}
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {personalInfo.twitterUrl && (
            <a 
              href={personalInfo.twitterUrl} 
              className="p-3 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: cardBg, color: neonPink, boxShadow: `0 0 10px ${neonPink}30` }}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>
      </header>

      {/* Summary Card */}
      {personalInfo.summary && (
        <div 
          className="mb-8 p-4 rounded-xl border"
          style={{ backgroundColor: cardBg, borderColor: `${neonCyan}30` }}
        >
          <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Skills */}
        <div className="col-span-1 space-y-6">
          {/* Skills with Glowing Progress */}
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
            <section key={section.id} className="p-4 rounded-xl" style={{ backgroundColor: cardBg }}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: neonCyan, textShadow: `0 0 10px ${neonCyan}50` }}
              >
                <Code className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-4">
                {(section.items as SkillItem[]).map((skill, idx) => (
                  <div key={skill.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm" style={{ color: neonColors[idx % 3] }}>{skill.name}</span>
                      <span className="text-xs" style={{ color: mutedColor }}>{skill.proficiency * 20}%</span>
                    </div>
                    <GlowingProgressBar value={skill.proficiency} color={neonColors[idx % 3]} />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Languages */}
          {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
            <section key={section.id} className="p-4 rounded-xl" style={{ backgroundColor: cardBg }}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: neonPurple, textShadow: `0 0 10px ${neonPurple}50` }}
              >
                <Zap className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as LanguageItem[]).map((lang, idx) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span style={{ color: neonColors[idx % 3] }}>{lang.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: `${neonColors[idx % 3]}20`, color: neonColors[idx % 3] }}>
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Certifications */}
          {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
            <section key={section.id} className="p-4 rounded-xl" style={{ backgroundColor: cardBg }}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: neonPink, textShadow: `0 0 10px ${neonPink}50` }}
              >
                <Award className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as CertificationItem[]).map((item, idx) => (
                  <div key={item.id} className="text-sm">
                    <p style={{ color: neonColors[idx % 3] }}>{item.name}</p>
                    <p className="text-xs" style={{ color: mutedColor }}>{item.issuer} • {item.issueDate}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Right Column - Experience & Education */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id} className="p-4 rounded-xl" style={{ backgroundColor: cardBg }}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: neonCyan, textShadow: `0 0 10px ${neonCyan}50` }}
              >
                <Briefcase className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-6">
                {(section.items as ExperienceItem[]).map((item, idx) => (
                  <div key={item.id} className="relative pl-6 border-l-2" style={{ borderColor: neonColors[idx % 3] }}>
                    <div 
                      className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                      style={{ backgroundColor: neonColors[idx % 3], boxShadow: `0 0 10px ${neonColors[idx % 3]}` }}
                    />
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold" style={{ color: textColor }}>{item.role}</h3>
                        <p className="text-sm" style={{ color: neonColors[idx % 3] }}>{item.company}</p>
                      </div>
                      <span 
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${neonColors[idx % 3]}20`, color: neonColors[idx % 3] }}
                      >
                        {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="text-sm space-y-1" style={{ color: mutedColor }}>
                        {item.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: neonColors[idx % 3] }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.techStack.map((tech, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{ backgroundColor: `${neonColors[idx % 3]}15`, color: neonColors[idx % 3] }}
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

          {/* Education */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <section key={section.id} className="p-4 rounded-xl" style={{ backgroundColor: cardBg }}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: neonPurple, textShadow: `0 0 10px ${neonPurple}50` }}
              >
                <GraduationCap className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(section.items as EducationItem[]).map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="p-3 rounded-lg border"
                    style={{ borderColor: `${neonColors[idx % 3]}30`, backgroundColor: `${neonColors[idx % 3]}05` }}
                  >
                    <h3 className="font-bold text-sm" style={{ color: textColor }}>{item.degree}</h3>
                    <p className="text-sm" style={{ color: neonColors[idx % 3] }}>{item.institution}</p>
                    <p className="text-xs mt-1" style={{ color: mutedColor }}>
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </p>
                    {item.gpa && <p className="text-xs" style={{ color: mutedColor }}>GPA: {item.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Projects */}
          {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
            <section key={section.id} className="p-4 rounded-xl" style={{ backgroundColor: cardBg }}>
              <h2 
                className="text-lg font-bold mb-4 flex items-center gap-2"
                style={{ color: neonPink, textShadow: `0 0 10px ${neonPink}50` }}
              >
                <Code className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(section.items as ProjectItem[]).map((project, idx) => (
                  <div 
                    key={project.id}
                    className="p-3 rounded-lg border"
                    style={{ borderColor: `${neonColors[idx % 3]}30` }}
                  >
                    <h3 className="font-bold text-sm mb-1" style={{ color: neonColors[idx % 3] }}>{project.title}</h3>
                    <p className="text-xs mb-2" style={{ color: mutedColor }}>{project.description}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${neonColors[idx % 3]}15`, color: neonColors[idx % 3] }}>
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
