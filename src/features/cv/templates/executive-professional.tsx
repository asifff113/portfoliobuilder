"use client";

/**
 * Executive Professional Template
 * 
 * A sophisticated, clean template designed for senior professionals.
 * Features:
 * - Elegant serif + sans-serif font pairing
 * - Strong typographic hierarchy
 * - Proper A4 sizing with print-safe margins
 * - Professional color scheme (navy/gray)
 * - All sections with proper data display
 * - Achievement-focused layout
 * - Profile photo support
 * - ATS-friendly structure
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award, Calendar, Briefcase } from "lucide-react";
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

// Professional color scheme defaults defined inline in colors object below

export function ExecutiveProfessionalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 112;
  const photoShape = settings?.photoShape ?? "rounded";
  
  // Get photo shape class
  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
    none: "hidden",
  }[photoShape];

  // Use CSS variables if available, otherwise fallback to defaults
  const colors = {
    primary: "var(--cv-primary, #1e3a5f)",
    secondary: "var(--cv-secondary, #2c5282)",
    accent: "var(--cv-accent, #3182ce)",
    text: "var(--cv-text, #1a202c)",
    textMuted: "var(--cv-text-muted, #4a5568)",
    textLight: "#718096",
    border: "#e2e8f0",
    background: "var(--cv-background, #ffffff)",
    cardBg: "#f7fafc",
  };
  // Group skills by category
  const getSkillsByCategory = (items: SkillItem[]) => {
    const categories: Record<string, SkillItem[]> = {};
    items.forEach((skill) => {
      const cat = skill.category || "Core Skills";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(skill);
    });
    return categories;
  };

  return (
    <div 
      className="bg-white text-gray-900"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Inter", "Segoe UI", system-ui, sans-serif)',
        fontSize: '10.5pt',
        lineHeight: '1.5',
        minHeight: '297mm', // A4 height
        width: '100%',
        maxWidth: '210mm', // A4 width
        margin: '0 auto',
        padding: '15mm 18mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section */}
      <header className="mb-6">
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          {showPhoto && personalInfo.avatarUrl && (
            <div className="flex-shrink-0">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className={cn("object-cover shadow-sm", photoShapeClass)}
                style={{ 
                  width: photoSize, 
                  height: photoSize,
                  border: `3px solid ${colors.primary}`,
                }}
              />
            </div>
          )}
          
          {/* Name and Title */}
          <div className="flex-1">
            <h1 
              className="text-3xl font-semibold tracking-tight"
              style={{ 
                color: colors.primary,
                fontFamily: '"Merriweather", Georgia, serif',
                marginBottom: '4px',
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p 
              className="text-lg font-medium mb-3"
              style={{ color: colors.secondary }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>
            
            {/* Contact Info - Compact Row */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm" style={{ color: colors.textMuted }}>
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
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
                <a 
                  href={personalInfo.website} 
                  target="_blank" 
                  rel="noopener"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Website</span>
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a 
                  href={personalInfo.linkedinUrl} 
                  target="_blank" 
                  rel="noopener"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a 
                  href={personalInfo.githubUrl} 
                  target="_blank" 
                  rel="noopener"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div 
          className="mt-5 h-0.5"
          style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, transparent)` }}
        />
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-wider mb-2"
            style={{ color: colors.primary }}
          >
            Professional Summary
          </h2>
          <p 
            className="text-sm leading-relaxed text-justify"
            style={{ color: colors.text }}
          >
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Dynamic Sections */}
      {sections.filter(s => s.isVisible).map((section) => (
        <section key={section.id} className="mb-6">
          <h2 
            className="text-sm font-bold uppercase tracking-wider mb-3 pb-1.5 border-b-2"
            style={{ color: colors.primary, borderColor: colors.border }}
          >
            {section.title}
          </h2>

          {/* Experience Section */}
          {section.type === "experience" && (
            <div className="space-y-5">
              {(section.items as ExperienceItem[]).map((item, idx) => (
                <div key={item.id} className={idx > 0 ? "pt-4 border-t border-gray-100" : ""}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 
                        className="text-base font-semibold"
                        style={{ color: colors.text }}
                      >
                        {item.role || "Position Title"}
                      </h3>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: colors.accent }}
                      >
                        {item.company || "Company Name"}
                        {item.location && <span className="text-gray-500"> • {item.location}</span>}
                      </p>
                    </div>
                    <div 
                      className="text-right text-sm flex-shrink-0 ml-4"
                      style={{ color: colors.textLight }}
                    >
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        <span>{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: colors.textMuted }}>
                      {item.description}
                    </p>
                  )}
                  
                  {/* Bullet Points - Key Achievements */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {item.bullets.map((bullet, bulletIdx) => (
                        <li 
                          key={bulletIdx} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: colors.text }}
                        >
                          <span 
                            className="mt-2 h-1 w-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Tech Stack */}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.techStack.map((tech, techIdx) => (
                        <span 
                          key={techIdx} 
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ 
                            backgroundColor: colors.cardBg, 
                            color: colors.textMuted,
                            border: `1px solid ${colors.border}`,
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
          )}

          {/* Education Section */}
          {section.type === "education" && (
            <div className="space-y-4">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 
                        className="text-base font-semibold"
                        style={{ color: colors.text }}
                      >
                        {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                      </h3>
                      <p 
                        className="text-sm font-medium"
                        style={{ color: colors.accent }}
                      >
                        {item.institution}
                        {item.location && <span className="text-gray-500"> • {item.location}</span>}
                      </p>
                    </div>
                    <div 
                      className="text-right text-sm flex-shrink-0 ml-4"
                      style={{ color: colors.textLight }}
                    >
                      <p>{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                      {item.gpa && <p className="font-medium">GPA: {item.gpa}</p>}
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
                      {item.description}
                    </p>
                  )}
                  
                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {item.achievements.map((achievement, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: colors.text }}
                        >
                          <Award className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section - Grouped by Category with Proficiency Bars */}
          {section.type === "skills" && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(getSkillsByCategory(section.items as SkillItem[])).map(([category, skills]) => (
                <div key={category}>
                  <h3 
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: colors.textMuted }}
                  >
                    {category}
                  </h3>
                  <div className="space-y-1.5">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <span className="text-sm flex-1" style={{ color: colors.text }}>
                          {skill.name}
                        </span>
                        {skill.proficiency > 0 && (
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className="h-2 w-2 rounded-full"
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
              ))}
            </div>
          )}

          {/* Projects Section */}
          {section.type === "projects" && (
            <div className="space-y-4">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <h3 
                        className="text-base font-semibold"
                        style={{ color: colors.text }}
                      >
                        {item.title || "Project Name"}
                      </h3>
                      <div className="flex gap-2">
                        {item.liveUrl && (
                          <a 
                            href={item.liveUrl} 
                            target="_blank" 
                            rel="noopener"
                            className="text-xs flex items-center gap-0.5 hover:underline"
                            style={{ color: colors.accent }}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Demo
                          </a>
                        )}
                        {item.githubUrl && (
                          <a 
                            href={item.githubUrl} 
                            target="_blank" 
                            rel="noopener"
                            className="text-xs flex items-center gap-0.5 hover:underline"
                            style={{ color: colors.accent }}
                          >
                            <Github className="h-3 w-3" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    {(item.startDate || item.endDate) && (
                      <span 
                        className="text-sm flex-shrink-0"
                        style={{ color: colors.textLight }}
                      >
                        {item.startDate}{item.endDate && ` – ${item.endDate}`}
                      </span>
                    )}
                  </div>
                  
                  {item.role && (
                    <p className="text-sm" style={{ color: colors.accent }}>
                      {item.role}
                    </p>
                  )}
                  
                  {item.description && (
                    <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>
                      {item.description}
                    </p>
                  )}
                  
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {item.highlights.map((highlight, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: colors.text }}
                        >
                          <span 
                            className="mt-2 h-1 w-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {item.techStack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ 
                            backgroundColor: colors.cardBg, 
                            color: colors.textMuted,
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
          )}

          {/* Certifications Section */}
          {section.type === "certifications" && (
            <div className="grid grid-cols-2 gap-3">
              {(section.items as CertificationItem[]).map((item) => (
                <div 
                  key={item.id} 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
                >
                  <h3 className="text-sm font-semibold" style={{ color: colors.text }}>
                    {item.name}
                  </h3>
                  <p className="text-xs" style={{ color: colors.accent }}>
                    {item.issuer}
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.textLight }}>
                    {item.issueDate}
                    {item.expiryDate && ` – ${item.expiryDate}`}
                  </p>
                  {item.credentialId && (
                    <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
                      ID: {item.credentialId}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages Section */}
          {section.type === "languages" && (
            <div className="flex flex-wrap gap-3">
              {(section.items as LanguageItem[]).map((item) => (
                <div 
                  key={item.id}
                  className="px-3 py-2 rounded-lg text-center"
                  style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
                >
                  <p className="text-sm font-medium" style={{ color: colors.text }}>
                    {item.name}
                  </p>
                  <p className="text-xs capitalize" style={{ color: colors.accent }}>
                    {item.proficiency}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Awards Section */}
          {section.type === "awards" && (
            <div className="space-y-3">
              {(section.items as AwardItem[]).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Award className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: colors.accent }} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold" style={{ color: colors.text }}>
                          {item.title}
                        </h3>
                        <p className="text-xs" style={{ color: colors.accent }}>
                          {item.issuer}
                        </p>
                      </div>
                      <span className="text-xs" style={{ color: colors.textLight }}>
                        {item.date}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Volunteer Section */}
          {section.type === "volunteer" && (
            <div className="space-y-4">
              {(section.items as VolunteerItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: colors.text }}>
                        {item.role}
                      </h3>
                      <p className="text-xs" style={{ color: colors.accent }}>
                        {item.organization}
                        {item.location && ` • ${item.location}`}
                      </p>
                    </div>
                    <span className="text-xs" style={{ color: colors.textLight }}>
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

          {/* Publications Section */}
          {section.type === "publications" && (
            <div className="space-y-3">
              {(section.items as PublicationItem[]).map((item) => (
                <div key={item.id}>
                  <h3 className="text-sm font-semibold" style={{ color: colors.text }}>
                    {item.title}
                  </h3>
                  <p className="text-xs" style={{ color: colors.accent }}>
                    {item.authors?.join(", ")} • {item.publisher} • {item.date}
                  </p>
                  {item.description && (
                    <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* References Section */}
          {section.type === "references" && (
            <div className="grid grid-cols-2 gap-4">
              {(section.items as ReferenceItem[]).map((item) => (
                <div 
                  key={item.id}
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
                >
                  <h3 className="text-sm font-semibold" style={{ color: colors.text }}>
                    {item.name}
                  </h3>
                  <p className="text-xs" style={{ color: colors.accent }}>
                    {item.title}{item.company && ` at ${item.company}`}
                  </p>
                  <div className="mt-1 text-xs" style={{ color: colors.textMuted }}>
                    {item.email && <p>{item.email}</p>}
                    {item.phone && <p>{item.phone}</p>}
                  </div>
                  {item.relationship && (
                    <p className="text-xs mt-1 italic" style={{ color: colors.textLight }}>
                      {item.relationship}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Interests Section */}
          {section.type === "interests" && (
            <div className="flex flex-wrap gap-2">
              {(section.items as InterestItem[]).map((item) => (
                <span 
                  key={item.id}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ 
                    backgroundColor: colors.cardBg, 
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          )}

          {/* About Section */}
          {section.type === "about" && (
            <div>
              {(section.items as AboutItem[]).map((item) => (
                <p 
                  key={item.id}
                  className="text-sm leading-relaxed"
                  style={{ color: colors.text }}
                >
                  {item.content}
                </p>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Empty State */}
      {sections.length === 0 && !personalInfo.summary && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Briefcase className="h-12 w-12 mb-4" style={{ color: colors.border }} />
          <p style={{ color: colors.textMuted }}>Start filling out your information</p>
          <p className="text-sm" style={{ color: colors.textLight }}>Your professional CV will appear here</p>
        </div>
      )}
    </div>
  );
}

