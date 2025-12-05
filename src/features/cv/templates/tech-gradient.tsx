"use client";

/**
 * Tech Gradient Template
 * 
 * Modern gradient accents with clean layout:
 * - Gradient header background
 * - Gradient skill pills
 * - Tech stack as gradient-bordered tags
 * - Icon buttons for contact
 * - Gradient underlines for section headers
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Briefcase, GraduationCap, Code, Award, FolderOpen } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  CertificationItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function TechGradientTemplate({ personalInfo, sections }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #3b82f6)";
  const secondaryColor = "var(--cv-secondary, #8b5cf6)";
  
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
  };

  const gradientText = {
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  } as React.CSSProperties;

  return (
    <div 
      className="min-h-[1000px] bg-white"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Inter', sans-serif)",
        color: "var(--cv-text, #1f2937)",
      }}
    >
      {/* Gradient Header */}
      <header className="relative text-white p-8" style={gradientStyle}>
        <div className="flex items-center gap-6">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="h-28 w-28 rounded-2xl object-cover border-4 border-white/30 shadow-xl"
            />
          ) : (
            <div className="h-28 w-28 rounded-2xl flex items-center justify-center text-4xl font-bold bg-white/20 border-4 border-white/30">
              {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
            <p className="text-lg text-white/80 mb-4">{personalInfo.headline || "Tech Professional"}</p>
            
            {/* Contact Icon Buttons */}
            <div className="flex flex-wrap gap-2">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm">
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-sm">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-sm">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </span>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {personalInfo.githubUrl && (
              <a href={personalInfo.githubUrl} className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {personalInfo.twitterUrl && (
              <a href={personalInfo.twitterUrl} className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} className="p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
                <Globe className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <p className="mt-6 text-sm text-white/90 leading-relaxed max-w-3xl">{personalInfo.summary}</p>
        )}
      </header>

      <div className="p-8">
        {/* Skills with Gradient Pills */}
        {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" style={{ color: primaryColor }} />
              <span style={gradientText}>{section.title}</span>
              <div className="flex-1 h-0.5 ml-4 rounded-full" style={gradientStyle} />
            </h2>
            <div className="flex flex-wrap gap-2">
              {(section.items as SkillItem[]).map((skill) => (
                <span 
                  key={skill.id}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-white shadow-sm"
                  style={gradientStyle}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        ))}

        <div className="grid grid-cols-3 gap-8">
          {/* Experience - 2 columns */}
          <div className="col-span-2">
            {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
              <section key={section.id} className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" style={{ color: primaryColor }} />
                  <span style={gradientText}>{section.title}</span>
                  <div className="flex-1 h-0.5 ml-4 rounded-full" style={gradientStyle} />
                </h2>
                <div className="space-y-6">
                  {(section.items as ExperienceItem[]).map((item) => (
                    <div key={item.id} className="relative pl-6 border-l-2" style={{ borderColor: primaryColor }}>
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full" style={gradientStyle} />
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{item.role}</h3>
                          <p className="text-sm font-medium" style={{ color: primaryColor }}>{item.company}</p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full text-white" style={gradientStyle}>
                          {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      )}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="text-sm text-gray-600 space-y-1 mb-2">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-2 h-1 w-1 rounded-full flex-shrink-0" style={{ backgroundColor: primaryColor }} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                      {/* Tech Stack with Gradient Border */}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {item.techStack.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 rounded-md border-2"
                              style={{ 
                                borderImage: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) 1`,
                                color: primaryColor,
                              }}
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
              <section key={section.id} className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" style={{ color: primaryColor }} />
                  <span style={gradientText}>{section.title}</span>
                  <div className="flex-1 h-0.5 ml-4 rounded-full" style={gradientStyle} />
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {(section.items as ProjectItem[]).map((project) => (
                    <div key={project.id} className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <h3 className="font-bold mb-1" style={{ color: primaryColor }}>{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{project.description}</p>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 rounded-full text-white" style={gradientStyle}>
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

          {/* Right Sidebar */}
          <div className="col-span-1">
            {/* Education */}
            {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
              <section key={section.id} className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" style={{ color: primaryColor }} />
                  <span style={gradientText}>{section.title}</span>
                </h2>
                <div className="space-y-4">
                  {(section.items as EducationItem[]).map((item) => (
                    <div key={item.id} className="p-4 rounded-xl" style={{ background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)` }}>
                      <h3 className="font-bold text-gray-900 text-sm">{item.degree}</h3>
                      <p className="text-sm" style={{ color: primaryColor }}>{item.institution}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                      </p>
                      {item.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {item.gpa}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Certifications */}
            {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
              <section key={section.id}>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5" style={{ color: primaryColor }} />
                  <span style={gradientText}>{section.title}</span>
                </h2>
                <div className="space-y-2">
                  {(section.items as CertificationItem[]).map((item) => (
                    <div key={item.id} className="p-3 rounded-lg border-l-4" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}05` }}>
                      <p className="font-medium text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.issuer} • {item.issueDate}</p>
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
