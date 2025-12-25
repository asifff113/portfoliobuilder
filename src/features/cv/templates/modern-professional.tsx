"use client";

/**
 * Modern Professional Template
 * 
 * A clean, modern template with subtle accents and grid-based layout.
 * Features:
 * - Clean sans-serif typography (Inter/System)
 * - Subtle color accents
 * - Grid-based skills and projects
 * - Professional timeline for experience
 * - Proper bullet alignment and date formatting
 * - Profile photo with multiple shape options
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Calendar, GraduationCap, Briefcase, Code, Award, Languages, Heart, Users, FileText } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  CertificationItem,
  LanguageItem,
  AwardItem,
  VolunteerItem,
  ReferenceItem,
  PublicationItem,
  InterestItem,
  AboutItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

// Section icons mapping
const sectionIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  projects: Code,
  certifications: Award,
  languages: Languages,
  awards: Award,
  volunteer: Heart,
  references: Users,
  publications: FileText,
  interests: Heart,
};

export function ModernProfessionalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 96;
  const photoShape = settings?.photoShape ?? "circle";
  
  // Get photo shape class
  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded-none",
    none: "hidden",
  }[photoShape];

  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #0f172a)",
    secondary: "var(--cv-secondary, #334155)",
    accent: "var(--cv-accent, #0ea5e9)",
    accentLight: "#e0f2fe",
    text: "var(--cv-text, #1e293b)",
    textMuted: "var(--cv-text-muted, #64748b)",
    textLight: "#94a3b8",
    border: "#e2e8f0",
    background: "var(--cv-background, #ffffff)",
    cardBg: "#f8fafc",
  };
  // Proficiency level labels
  const getProficiencyLabel = (level: number) => {
    const labels = ["Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];
    return labels[level - 1] || "";
  };

  return (
    <div 
      className="bg-white text-gray-900"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
        fontSize: '10pt',
        lineHeight: '1.55',
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: '12mm 16mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header - Clean Modern Design */}
      <header className="mb-6">
        <div className="flex items-start gap-5">
          {/* Profile Photo */}
          {showPhoto && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={cn("object-cover ring-2 ring-offset-2", photoShapeClass)}
              style={{ 
                width: photoSize, 
                height: photoSize, 
                borderColor: colors.accent,
                ["--tw-ring-color" as string]: colors.accent,
              }}
            />
          )}
          
          {/* Name and Contact */}
          <div className="flex-1">
            <h1 
              className="text-2xl font-bold tracking-tight mb-0.5"
              style={{ color: colors.primary }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p 
              className="text-base font-medium mb-3"
              style={{ color: colors.accent }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>
            
            {/* Contact Grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-xs" style={{ color: colors.textMuted }}>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-sky-500">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{personalInfo.email}</span>
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
                <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-sky-500">
                  <Globe className="h-3 w-3" />
                  <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-sky-500">
                  <Linkedin className="h-3 w-3" />
                  <span>LinkedIn</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-sky-500">
                  <Github className="h-3 w-3" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: colors.accentLight }}
          >
            <p 
              className="text-sm leading-relaxed"
              style={{ color: colors.text }}
            >
              {personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      {/* Sections */}
      {sections.filter(s => s.isVisible).map((section) => {
        const Icon = sectionIcons[section.type] || Briefcase;
        
        return (
          <section key={section.id} className="mb-5">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-3 pb-1.5 border-b" style={{ borderColor: colors.border }}>
              <Icon className="h-4 w-4" style={{ color: colors.accent }} />
              <h2 
                className="text-sm font-bold uppercase tracking-wide"
                style={{ color: colors.primary }}
              >
                {section.title}
              </h2>
            </div>

            {/* Experience Section */}
            {section.type === "experience" && (
              <div className="space-y-4">
                {(section.items as ExperienceItem[]).map((item, idx) => (
                  <div 
                    key={item.id} 
                    className={`relative pl-4 ${idx > 0 ? "pt-3 border-t" : ""}`}
                    style={{ borderColor: colors.border }}
                  >
                    {/* Timeline dot */}
                    <div 
                      className="absolute left-0 top-1 h-2 w-2 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    />
                    
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                          {item.role || "Position"}
                        </h3>
                        <p className="text-xs font-medium" style={{ color: colors.accent }}>
                          {item.company}
                          {item.location && <span style={{ color: colors.textMuted }}> · {item.location}</span>}
                        </p>
                      </div>
                      <span 
                        className="text-xs whitespace-nowrap px-2 py-0.5 rounded"
                        style={{ backgroundColor: colors.cardBg, color: colors.textMuted }}
                      >
                        {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    
                    {item.description && (
                      <p className="mt-1.5 text-xs" style={{ color: colors.textMuted }}>
                        {item.description}
                      </p>
                    )}
                    
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {item.bullets.map((bullet, bulletIdx) => (
                          <li 
                            key={bulletIdx} 
                            className="flex items-start gap-2 text-xs"
                            style={{ color: colors.text }}
                          >
                            <span 
                              className="mt-1.5 h-1 w-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: colors.accent }}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.techStack.map((tech, techIdx) => (
                          <span 
                            key={techIdx} 
                            className="px-1.5 py-0.5 text-[10px] rounded"
                            style={{ backgroundColor: colors.cardBg, color: colors.textMuted }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {section.type === "education" && (
              <div className="space-y-3">
                {(section.items as EducationItem[]).map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                        {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                      </h3>
                      <p className="text-xs" style={{ color: colors.accent }}>
                        {item.institution}
                        {item.location && <span style={{ color: colors.textMuted }}> · {item.location}</span>}
                      </p>
                      {item.gpa && (
                        <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
                          GPA: {item.gpa}
                        </p>
                      )}
                      {item.achievements && item.achievements.length > 0 && (
                        <ul className="mt-1 space-y-0.5">
                          {item.achievements.map((a, idx) => (
                            <li key={idx} className="text-xs flex items-start gap-1" style={{ color: colors.text }}>
                              <span style={{ color: colors.accent }}>•</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <span 
                      className="text-xs whitespace-nowrap"
                      style={{ color: colors.textLight }}
                    >
                      {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section - Modern Grid Layout */}
            {section.type === "skills" && (
              <div className="grid grid-cols-3 gap-3">
                {(() => {
                  const categories: Record<string, SkillItem[]> = {};
                  (section.items as SkillItem[]).forEach((skill) => {
                    const cat = skill.category || "Skills";
                    if (!categories[cat]) categories[cat] = [];
                    categories[cat].push(skill);
                  });
                  
                  return Object.entries(categories).map(([category, skills]) => (
                    <div 
                      key={category}
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors.cardBg }}
                    >
                      <h3 
                        className="text-xs font-semibold uppercase tracking-wide mb-2"
                        style={{ color: colors.accent }}
                      >
                        {category}
                      </h3>
                      <div className="space-y-1.5">
                        {skills.map((skill) => (
                          <div key={skill.id} className="flex items-center justify-between gap-2">
                            <span className="text-xs" style={{ color: colors.text }}>
                              {skill.name}
                            </span>
                            {skill.proficiency > 0 && (
                              <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{
                                      backgroundColor: level <= skill.proficiency ? colors.accent : colors.border,
                                    }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}

            {/* Projects Section - Card Grid */}
            {section.type === "projects" && (
              <div className="grid grid-cols-2 gap-3">
                {(section.items as ProjectItem[]).map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                        {item.title}
                      </h3>
                      <div className="flex gap-1.5 flex-shrink-0">
                        {item.liveUrl && (
                          <a href={item.liveUrl} target="_blank" rel="noopener">
                            <ExternalLink className="h-3 w-3" style={{ color: colors.accent }} />
                          </a>
                        )}
                        {item.githubUrl && (
                          <a href={item.githubUrl} target="_blank" rel="noopener">
                            <Github className="h-3 w-3" style={{ color: colors.accent }} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {item.role && (
                      <p className="text-xs mb-1" style={{ color: colors.accent }}>
                        {item.role}
                      </p>
                    )}
                    
                    {item.description && (
                      <p className="text-xs mb-2" style={{ color: colors.textMuted }}>
                        {item.description}
                      </p>
                    )}
                    
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.techStack.slice(0, 5).map((tech, idx) => (
                          <span 
                            key={idx} 
                            className="px-1.5 py-0.5 text-[9px] rounded"
                            style={{ backgroundColor: colors.accentLight, color: colors.accent }}
                          >
                            {tech}
                          </span>
                        ))}
                        {item.techStack.length > 5 && (
                          <span className="text-[9px]" style={{ color: colors.textLight }}>
                            +{item.techStack.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {section.type === "certifications" && (
              <div className="space-y-2">
                {(section.items as CertificationItem[]).map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                        {item.name}
                      </h3>
                      <p className="text-xs" style={{ color: colors.accent }}>
                        {item.issuer}
                        {item.credentialId && <span style={{ color: colors.textMuted }}> · {item.credentialId}</span>}
                      </p>
                    </div>
                    <span className="text-xs whitespace-nowrap" style={{ color: colors.textLight }}>
                      {item.issueDate}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {section.type === "languages" && (
              <div className="flex flex-wrap gap-2">
                {(section.items as LanguageItem[]).map((item) => (
                  <div 
                    key={item.id}
                    className="px-3 py-1.5 rounded-full flex items-center gap-2"
                    style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
                  >
                    <span className="text-xs font-medium" style={{ color: colors.text }}>
                      {item.name}
                    </span>
                    <span 
                      className="text-[10px] px-1.5 py-0.5 rounded capitalize"
                      style={{ backgroundColor: colors.accentLight, color: colors.accent }}
                    >
                      {item.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Awards */}
            {section.type === "awards" && (
              <div className="space-y-2">
                {(section.items as AwardItem[]).map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                        {item.title}
                      </h3>
                      <p className="text-xs" style={{ color: colors.accent }}>
                        {item.issuer}
                      </p>
                      {item.description && (
                        <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-xs whitespace-nowrap" style={{ color: colors.textLight }}>
                      {item.date}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Volunteer */}
            {section.type === "volunteer" && (
              <div className="space-y-3">
                {(section.items as VolunteerItem[]).map((item) => (
                  <div key={item.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                          {item.role}
                        </h3>
                        <p className="text-xs" style={{ color: colors.accent }}>
                          {item.organization}
                          {item.location && ` · ${item.location}`}
                        </p>
                      </div>
                      <span className="text-xs whitespace-nowrap" style={{ color: colors.textLight }}>
                        {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Publications */}
            {section.type === "publications" && (
              <div className="space-y-2">
                {(section.items as PublicationItem[]).map((item) => (
                  <div key={item.id}>
                    <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                      {item.title}
                    </h3>
                    <p className="text-xs" style={{ color: colors.textMuted }}>
                      {item.authors?.join(", ")} · {item.publisher} · {item.date}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* References */}
            {section.type === "references" && (
              <div className="grid grid-cols-2 gap-3">
                {(section.items as ReferenceItem[]).map((item) => (
                  <div 
                    key={item.id}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: colors.cardBg }}
                  >
                    <h3 className="text-sm font-semibold" style={{ color: colors.primary }}>
                      {item.name}
                    </h3>
                    <p className="text-xs" style={{ color: colors.accent }}>
                      {item.title}{item.company && ` at ${item.company}`}
                    </p>
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                      {item.email}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Interests */}
            {section.type === "interests" && (
              <div className="flex flex-wrap gap-1.5">
                {(section.items as InterestItem[]).map((item) => (
                  <span 
                    key={item.id}
                    className="px-2.5 py-1 text-xs rounded-full"
                    style={{ backgroundColor: colors.accentLight, color: colors.accent }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            )}

            {/* About */}
            {section.type === "about" && (
              <div>
                {(section.items as AboutItem[]).map((item) => (
                  <p key={item.id} className="text-sm" style={{ color: colors.text }}>
                    {item.content}
                  </p>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

