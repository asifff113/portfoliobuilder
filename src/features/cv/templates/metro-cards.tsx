"use client";

/**
 * Metro Cards Template
 * 
 * Tile-based grid layout with colored section cards:
 * - Colored section card tiles
 * - Large photo tile in header
 * - Skill category tiles
 * - Experience cards with colored left border
 * - Responsive grid layout
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase, GraduationCap, Code, Award, Languages as LanguagesIcon, FolderOpen } from "lucide-react";
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

export function MetroCardsTemplate({ personalInfo, sections }: TemplateProps) {
  const tileColors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ec4899", // pink
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#06b6d4", // cyan
    "#84cc16", // lime
  ];

  // Group skills by category
  const groupSkillsByCategory = (skills: SkillItem[]) => {
    const grouped: Record<string, SkillItem[]> = {};
    skills.forEach(skill => {
      const category = skill.category || "Other";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(skill);
    });
    return grouped;
  };

  return (
    <div 
      className="min-h-[1000px] bg-gray-100 p-6"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Segoe UI', sans-serif)",
        color: "var(--cv-text, #1f2937)",
      }}
    >
      {/* Header Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* Photo Tile - Large */}
        <div 
          className="col-span-1 row-span-2 rounded-xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: tileColors[0] }}
        >
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-6xl font-bold text-white">
              {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
            </span>
          )}
        </div>

        {/* Name Tile */}
        <div 
          className="col-span-2 p-4 rounded-xl text-white"
          style={{ backgroundColor: tileColors[1] }}
        >
          <h1 className="text-2xl font-bold mb-1">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-white/80">{personalInfo.headline || "Professional Title"}</p>
        </div>

        {/* Contact Tile */}
        <div 
          className="col-span-1 p-4 rounded-xl text-white"
          style={{ backgroundColor: tileColors[2] }}
        >
          <div className="space-y-1 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {personalInfo.location}
              </div>
            )}
          </div>
        </div>

        {/* Summary Tile */}
        {personalInfo.summary && (
          <div 
            className="col-span-2 p-4 rounded-xl text-white"
            style={{ backgroundColor: tileColors[3] }}
          >
            <p className="text-sm leading-relaxed line-clamp-4">{personalInfo.summary}</p>
          </div>
        )}

        {/* Social Links Tile */}
        <div 
          className="col-span-1 p-4 rounded-xl text-white flex flex-wrap gap-2 items-center justify-center"
          style={{ backgroundColor: tileColors[4] }}
        >
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} className="p-2 rounded-lg bg-white/20 hover:bg-white/30">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} className="p-2 rounded-lg bg-white/20 hover:bg-white/30">
              <Github className="h-5 w-5" />
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} className="p-2 rounded-lg bg-white/20 hover:bg-white/30">
              <Globe className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Skills Category Tiles */}
        {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => {
          const grouped = groupSkillsByCategory(section.items as SkillItem[]);
          return Object.entries(grouped).map(([category, skills], idx) => (
            <div 
              key={`${section.id}-${category}`}
              className="p-4 rounded-xl text-white"
              style={{ backgroundColor: tileColors[idx % tileColors.length] }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Code className="h-4 w-4" />
                <h3 className="font-bold text-sm uppercase">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="text-xs px-2 py-1 rounded-full bg-white/20"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ));
        })}

        {/* Experience Cards */}
        {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
          <div key={section.id} className="col-span-2">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: tileColors[0] }}>
                <Briefcase className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-4">
                {(section.items as ExperienceItem[]).map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="p-3 rounded-lg border-l-4"
                    style={{ borderColor: tileColors[idx % tileColors.length], backgroundColor: `${tileColors[idx % tileColors.length]}08` }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-gray-900">{item.role}</h3>
                        <p className="text-sm" style={{ color: tileColors[idx % tileColors.length] }}>{item.company}</p>
                      </div>
                      <span 
                        className="text-xs px-2 py-1 rounded-full text-white"
                        style={{ backgroundColor: tileColors[idx % tileColors.length] }}
                      >
                        {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="text-sm text-gray-600 space-y-1 mt-2">
                        {item.bullets.slice(0, 3).map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: tileColors[idx % tileColors.length] }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.techStack.map((tech, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Education Tile */}
        {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
          <div key={section.id} className="col-span-1">
            <div 
              className="rounded-xl p-4 text-white h-full"
              style={{ backgroundColor: tileColors[5] }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-3">
                {(section.items as EducationItem[]).map((item) => (
                  <div key={item.id} className="p-2 rounded-lg bg-white/10">
                    <h3 className="font-bold text-sm">{item.degree}</h3>
                    <p className="text-sm text-white/80">{item.institution}</p>
                    <p className="text-xs text-white/60 mt-1">
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </p>
                    {item.gpa && <p className="text-xs text-white/60">GPA: {item.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Projects Grid */}
        {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
          <div key={section.id} className="col-span-2">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: tileColors[6] }}>
                <FolderOpen className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {(section.items as ProjectItem[]).map((project, idx) => (
                  <div 
                    key={project.id}
                    className="p-3 rounded-lg border-l-4"
                    style={{ borderColor: tileColors[(idx + 2) % tileColors.length], backgroundColor: `${tileColors[(idx + 2) % tileColors.length]}08` }}
                  >
                    <h3 className="font-bold text-sm" style={{ color: tileColors[(idx + 2) % tileColors.length] }}>{project.title}</h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{project.description}</p>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Certifications Tile */}
        {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
          <div key={section.id} className="col-span-1">
            <div 
              className="rounded-xl p-4 text-white h-full"
              style={{ backgroundColor: tileColors[7] }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as CertificationItem[]).map((item) => (
                  <div key={item.id} className="p-2 rounded-lg bg-white/10">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-white/70">{item.issuer} • {item.issueDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Languages Tile */}
        {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
          <div key={section.id} className="col-span-1">
            <div 
              className="rounded-xl p-4 text-white"
              style={{ backgroundColor: tileColors[3] }}
            >
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <LanguagesIcon className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="space-y-2">
                {(section.items as LanguageItem[]).map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 capitalize">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
