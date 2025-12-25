"use client";

/**
 * Creative Portfolio Template
 * 
 * Asymmetric layout with bold gradients for creative roles:
 * - Large photo with geometric frame
 * - Project cards with thumbnails
 * - Skill tag cloud with size based on proficiency
 * - Gradient section headers
 * - Overlapping design elements
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
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

export function CreativePortfolioTemplate({ personalInfo, sections }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #8b5cf6)";
  const secondaryColor = "var(--cv-secondary, #ec4899)";
  const accentColor = "var(--cv-accent, #06b6d4)";

  // Tag cloud sizing based on proficiency
  const getTagSize = (proficiency: number) => {
    const sizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"];
    return sizes[Math.min(proficiency - 1, 4)];
  };

  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
  };

  return (
    <div 
      className="min-h-[1000px] bg-gray-50"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Poppins', sans-serif)",
        color: "var(--cv-text, #1f2937)",
      }}
    >
      {/* Hero Header with Geometric Design */}
      <header className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 opacity-10" style={gradientStyle} />
        
        {/* Geometric Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20" style={{ backgroundColor: primaryColor, transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: secondaryColor, transform: "translate(-30%, 30%)" }} />
        
        <div className="relative z-10 p-8 flex items-center gap-8">
          {/* Photo with Geometric Frame */}
          <div className="relative">
            <div className="absolute -inset-2 rounded-2xl rotate-6" style={gradientStyle} />
            {personalInfo.avatarUrl ? (
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="relative h-40 w-40 rounded-xl object-cover"
              />
            ) : (
              <div 
                className="relative h-40 w-40 rounded-xl flex items-center justify-center text-5xl font-bold text-white"
                style={gradientStyle}
              >
                {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-black mb-2 bg-clip-text text-transparent" style={gradientStyle}>
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{personalInfo.headline || "Creative Professional"}</p>
            
            {personalInfo.summary && (
              <p className="text-sm text-gray-600 max-w-xl leading-relaxed">{personalInfo.summary}</p>
            )}
          </div>

          {/* Contact Sidebar */}
          <div className="flex flex-col gap-2 text-sm">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                </div>
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-2 text-gray-600">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${secondaryColor}20` }}>
                  <Phone className="h-4 w-4" style={{ color: secondaryColor }} />
                </div>
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-2 text-gray-600">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}20` }}>
                  <MapPin className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Linkedin className="h-4 w-4" style={{ color: primaryColor }} />
                </div>
                LinkedIn
              </a>
            )}
            {personalInfo.githubUrl && (
              <a href={personalInfo.githubUrl} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${secondaryColor}20` }}>
                  <Github className="h-4 w-4" style={{ color: secondaryColor }} />
                </div>
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="p-8">
        {/* Skills Tag Cloud */}
        {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 inline-block px-4 py-2 rounded-lg text-white" style={gradientStyle}>
              {section.title}
            </h2>
            <div className="flex flex-wrap gap-3 items-center justify-center p-6 rounded-2xl bg-white shadow-sm">
              {(section.items as SkillItem[]).map((skill, idx) => {
                const colors = [primaryColor, secondaryColor, accentColor];
                const color = colors[idx % colors.length];
                return (
                  <span 
                    key={skill.id}
                    className={`${getTagSize(skill.proficiency)} font-medium px-3 py-1 rounded-full transition-transform hover:scale-110`}
                    style={{ 
                      backgroundColor: `${color}15`,
                      color: color,
                    }}
                  >
                    {skill.name}
                  </span>
                );
              })}
            </div>
          </section>
        ))}

        {/* Projects Grid */}
        {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-6 inline-block px-4 py-2 rounded-lg text-white" style={gradientStyle}>
              {section.title}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {(section.items as ProjectItem[]).map((project, idx) => {
                const colors = [primaryColor, secondaryColor, accentColor];
                const color = colors[idx % colors.length];
                return (
                  <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    {/* Project Thumbnail Placeholder */}
                    <div className="h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}30, ${color}10)` }}>
                      <span className="text-4xl font-bold" style={{ color }}>{project.title?.charAt(0) || "P"}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1" style={{ color }}>{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.techStack.slice(0, 4).map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} className="text-xs flex items-center gap-1 hover:underline" style={{ color }}>
                            <Globe className="h-3 w-3" /> Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} className="text-xs flex items-center gap-1 hover:underline" style={{ color }}>
                            <Github className="h-3 w-3" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="grid grid-cols-2 gap-8">
          {/* Experience */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-2xl font-bold mb-6 inline-block px-4 py-2 rounded-lg text-white" style={gradientStyle}>
                {section.title}
              </h2>
              <div className="space-y-4">
                {(section.items as ExperienceItem[]).map((item, idx) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderColor: idx % 2 === 0 ? primaryColor : secondaryColor }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{item.role}</h3>
                        <p className="text-sm" style={{ color: idx % 2 === 0 ? primaryColor : secondaryColor }}>{item.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="text-sm text-gray-600 space-y-1">
                        {item.bullets.slice(0, 2).map((bullet, i) => (
                          <li key={i}>• {bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Education */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-2xl font-bold mb-6 inline-block px-4 py-2 rounded-lg text-white" style={gradientStyle}>
                {section.title}
              </h2>
              <div className="space-y-4">
                {(section.items as EducationItem[]).map((item, idx) => (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border-l-4" style={{ borderColor: idx % 2 === 0 ? accentColor : primaryColor }}>
                    <h3 className="font-bold text-gray-900">{item.degree}</h3>
                    <p className="text-sm" style={{ color: idx % 2 === 0 ? accentColor : primaryColor }}>{item.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </p>
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
