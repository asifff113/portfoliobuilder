"use client";

/**
 * Neon Minimal Template (Upgraded)
 * 
 * Clean, modern template with neon purple accents.
 * Features:
 * - All section types properly rendered
 * - Bullet points with proper alignment
 * - Tech stack badges
 * - Skills with proficiency indicators
 * - Achievement highlights
 * - Profile photo support
 * - A4 print-ready sizing
 * - Template settings support
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Award, Calendar, Twitter, Facebook, Instagram } from "lucide-react";
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
  PatentItem,
  SpeakingItem,
  TeachingItem,
  CourseItem,
  OpenSourceItem,
  MembershipItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function NeonMinimalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Apply settings with fallbacks
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 96;
  const photoShape = settings?.photoShape ?? "circle";
  const printSafe = settings?.printSafeMode ?? false;
  
  // Get photo shape class
  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded-none",
    none: "hidden",
  }[photoShape];

  // Dynamic colors based on settings (using CSS variables set by parent)
  const primaryColor = "var(--cv-primary, #7c3aed)";
  const accentColor = "var(--cv-accent, #a78bfa)";
  const textColor = "var(--cv-text, #1f2937)";
  const mutedColor = "var(--cv-text-muted, #6b7280)";
  const fontFamily = "var(--cv-font-family, 'Inter', system-ui, sans-serif)";
  const lineHeight = "var(--cv-line-height, 1.5)";
  
  return (
    <div 
      className="bg-white"
      style={{ 
        fontFamily: fontFamily,
        fontSize: '10.5pt',
        lineHeight: lineHeight,
        color: textColor,
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: 'var(--cv-margin-top, 15mm) var(--cv-margin-right, 18mm) var(--cv-margin-bottom, 15mm) var(--cv-margin-left, 18mm)',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header 
        className="mb-6 pb-5"
        style={{ borderBottom: `2px solid ${primaryColor}` }}
      >
        <div className="flex items-start gap-5">
          {/* Profile Photo */}
          {showPhoto && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={cn("object-cover border-2", photoShapeClass)}
              style={{ 
                width: photoSize, 
                height: photoSize,
                borderColor: primaryColor,
              }}
            />
          )}
          
          <div className="flex-1">
            <h1 
              className="text-3xl font-bold tracking-tight"
              style={{ color: textColor }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <p 
              className="mt-1 text-lg font-medium"
              style={{ color: primaryColor }}
            >
              {personalInfo.headline || "Professional Title"}
            </p>

            {/* Contact Info */}
            <div 
              className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm"
              style={{ color: mutedColor }}
            >
              {personalInfo.email && (
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                  style={{ color: 'inherit' }}
                >
                  <Mail className="h-3.5 w-3.5" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a 
                  href={personalInfo.website} 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a 
                  href={personalInfo.linkedinUrl} 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  {personalInfo.linkedinLabel || "LinkedIn"}
                </a>
              )}
              {personalInfo.githubUrl && (
                <a 
                  href={personalInfo.githubUrl} 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                >
                  <Github className="h-3.5 w-3.5" />
                  {personalInfo.githubLabel || "GitHub"}
                </a>
              )}
              {personalInfo.twitterUrl && (
                <a 
                  href={personalInfo.twitterUrl} 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                >
                  <Twitter className="h-3.5 w-3.5" />
                  {personalInfo.twitterLabel || "Twitter"}
                </a>
              )}
              {personalInfo.instagramUrl && (
                <a 
                  href={personalInfo.instagramUrl} 
                  target="_blank" 
                  rel="noopener" 
                  className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  {personalInfo.instagramLabel || "Instagram"}
                </a>
              )}
              {/* Custom Links */}
              {personalInfo.customLinks && personalInfo.customLinks.length > 0 && personalInfo.customLinks.map((link) => (
                link.url && (
                  <a 
                    key={link.id}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener" 
                    className="flex items-center gap-1.5 transition-colors hover:opacity-80"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label || "Link"}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 
            className="mb-2 text-sm font-bold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            About
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Sections */}
      {sections.filter(s => s.isVisible).map((section) => (
        <section key={section.id} className="mb-6">
          <h2 
            className="mb-3 text-sm font-bold uppercase tracking-wider pb-1.5"
            style={{ 
              color: primaryColor,
              borderBottom: `1px solid ${accentColor}40`,
            }}
          >
            {section.title}
          </h2>

          {/* Experience Section */}
          {section.type === "experience" && (
            <div className="space-y-5">
              {(section.items as ExperienceItem[]).map((item, idx) => (
                <div key={item.id} className={idx > 0 ? "pt-4 border-t border-gray-100" : ""}>
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.role || "Role"}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: primaryColor }}>
                        {item.company || "Company"}
                        {item.location && <span style={{ color: mutedColor }}> · {item.location}</span>}
                      </p>
                    </div>
                    <div className="text-right text-sm flex-shrink-0 ml-4" style={{ color: mutedColor }}>
                      <div className="flex items-center gap-1 justify-end">
                        <Calendar className="h-3 w-3" />
                        <span>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: mutedColor }}>{item.description}</p>
                  )}
                  
                  {/* Bullet Points */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {item.bullets.map((bullet, bulletIdx) => (
                        <li 
                          key={bulletIdx} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: textColor }}
                        >
                          <span 
                            className="mt-2 h-1 w-1 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: primaryColor }}
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Tech Stack */}
                  {item.techStack && item.techStack.length > 0 && !printSafe && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.techStack.map((tech, techIdx) => (
                        <span 
                          key={techIdx} 
                          className="px-2 py-0.5 text-xs rounded border"
                          style={{ 
                            backgroundColor: `${primaryColor}10`,
                            color: primaryColor,
                            borderColor: `${primaryColor}30`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Tech Stack - Print Safe Mode (simple text) */}
                  {item.techStack && item.techStack.length > 0 && printSafe && (
                    <p className="mt-2 text-xs" style={{ color: mutedColor }}>
                      <strong>Technologies:</strong> {item.techStack.join(", ")}
                    </p>
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
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: primaryColor }}>
                        {item.institution}
                      </p>
                    </div>
                    <div className="text-right text-sm flex-shrink-0 ml-4" style={{ color: mutedColor }}>
                      <p>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                      {item.gpa && <p className="font-medium">GPA: {item.gpa}</p>}
                    </div>
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 text-sm" style={{ color: mutedColor }}>{item.description}</p>
                  )}
                  
                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {item.achievements.map((achievement, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: textColor }}
                        >
                          <Award 
                            className="h-3 w-3 mt-0.5 flex-shrink-0" 
                            style={{ color: primaryColor }}
                          />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section - Grouped by Category */}
          {section.type === "skills" && (
            <div className="grid grid-cols-2 gap-4">
              {(() => {
                const categories: Record<string, SkillItem[]> = {};
                (section.items as SkillItem[]).forEach((skill) => {
                  const cat = skill.category || "Skills";
                  if (!categories[cat]) categories[cat] = [];
                  categories[cat].push(skill);
                });
                
                return Object.entries(categories).map(([category, skills]) => (
                  <div key={category}>
                    <h3 
                      className="text-xs font-semibold uppercase tracking-wide mb-2"
                      style={{ color: mutedColor }}
                    >
                      {category}
                    </h3>
                    <div className="space-y-1.5">
                      {skills.map((skill) => (
                        <div key={skill.id} className="flex items-center justify-between gap-2">
                          <span className="text-sm" style={{ color: textColor }}>
                            {skill.name}
                          </span>
                          {skill.proficiency > 0 && !printSafe && (
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className="h-2 w-2 rounded-full"
                                  style={{ 
                                    backgroundColor: level <= skill.proficiency 
                                      ? primaryColor 
                                      : "#e5e7eb"
                                  }}
                                />
                              ))}
                            </div>
                          )}
                          {skill.proficiency > 0 && printSafe && (
                            <span className="text-xs" style={{ color: mutedColor }}>
                              {["", "Basic", "Intermediate", "Advanced", "Expert", "Master"][skill.proficiency]}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}

          {/* Projects Section */}
          {section.type === "projects" && (
            <div className="space-y-4">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.title || "Project"}
                      </h3>
                      <div className="flex gap-2">
                        {item.liveUrl && (
                          <a 
                            href={item.liveUrl} 
                            target="_blank" 
                            rel="noopener" 
                            className="text-xs hover:underline flex items-center gap-0.5"
                            style={{ color: primaryColor }}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live
                          </a>
                        )}
                        {item.githubUrl && (
                          <a 
                            href={item.githubUrl} 
                            target="_blank" 
                            rel="noopener" 
                            className="text-xs hover:underline flex items-center gap-0.5"
                            style={{ color: primaryColor }}
                          >
                            <Github className="h-3 w-3" />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    {(item.startDate || item.endDate) && (
                      <span className="text-sm" style={{ color: mutedColor }}>
                        {item.startDate}{item.endDate && ` - ${item.endDate}`}
                      </span>
                    )}
                  </div>
                  
                  {item.role && (
                    <p className="text-sm" style={{ color: primaryColor }}>{item.role}</p>
                  )}
                  
                  {item.description && (
                    <p className="mt-1 text-sm" style={{ color: mutedColor }}>{item.description}</p>
                  )}
                  
                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-0.5">
                      {item.highlights.map((highlight, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2 text-sm"
                          style={{ color: textColor }}
                        >
                          <span 
                            className="mt-2 h-1 w-1 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: primaryColor }}
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  {/* Tech Stack */}
                  {item.techStack && item.techStack.length > 0 && !printSafe && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.techStack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ 
                            backgroundColor: `${primaryColor}10`,
                            color: primaryColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.techStack && item.techStack.length > 0 && printSafe && (
                    <p className="mt-2 text-xs" style={{ color: mutedColor }}>
                      <strong>Technologies:</strong> {item.techStack.join(", ")}
                    </p>
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
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: printSafe ? "transparent" : `${primaryColor}05`,
                    borderColor: `${primaryColor}20`,
                  }}
                >
                  <h3 className="font-semibold text-sm" style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  <p className="text-xs" style={{ color: primaryColor }}>{item.issuer}</p>
                  <p className="text-xs mt-1" style={{ color: mutedColor }}>
                    {item.issueDate}
                    {item.expiryDate && ` - ${item.expiryDate}`}
                  </p>
                  {item.credentialId && (
                    <p className="text-xs mt-0.5" style={{ color: `${mutedColor}80` }}>
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
                  className="px-3 py-2 rounded-lg border text-center min-w-[100px]"
                  style={{ 
                    backgroundColor: printSafe ? "transparent" : `${primaryColor}05`,
                    borderColor: `${primaryColor}20`,
                  }}
                >
                  <p className="font-medium text-sm" style={{ color: textColor }}>
                    {item.name}
                  </p>
                  <p className="text-xs capitalize" style={{ color: primaryColor }}>
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
                  <Award 
                    className="h-5 w-5 flex-shrink-0 mt-0.5" 
                    style={{ color: primaryColor }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm" style={{ color: textColor }}>
                          {item.title}
                        </h3>
                        <p className="text-xs" style={{ color: primaryColor }}>{item.issuer}</p>
                      </div>
                      <span className="text-xs" style={{ color: mutedColor }}>{item.date}</span>
                    </div>
                    {item.description && (
                      <p className="text-xs mt-1" style={{ color: mutedColor }}>{item.description}</p>
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
                      <h3 className="font-semibold text-sm" style={{ color: textColor }}>
                        {item.role}
                      </h3>
                      <p className="text-xs" style={{ color: primaryColor }}>
                        {item.organization}
                        {item.location && ` · ${item.location}`}
                      </p>
                    </div>
                    <span className="text-xs" style={{ color: mutedColor }}>
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs mt-1" style={{ color: mutedColor }}>{item.description}</p>
                  )}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {item.highlights.map((h, idx) => (
                        <li 
                          key={idx} 
                          className="text-xs flex items-start gap-1.5"
                          style={{ color: textColor }}
                        >
                          <span style={{ color: primaryColor }}>•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
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
                  <h3 className="font-semibold text-sm" style={{ color: textColor }}>
                    {item.title}
                  </h3>
                  <p className="text-xs" style={{ color: primaryColor }}>
                    {item.authors?.join(", ")} · {item.publisher} · {item.date}
                  </p>
                  {item.description && (
                    <p className="text-xs mt-1" style={{ color: mutedColor }}>{item.description}</p>
                  )}
                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener"
                      className="text-xs hover:underline mt-1 inline-block"
                      style={{ color: primaryColor }}
                    >
                      View Publication →
                    </a>
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
                  className="p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: printSafe ? "transparent" : `${primaryColor}05`,
                    borderColor: `${primaryColor}20`,
                  }}
                >
                  <h3 className="font-semibold text-sm" style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  <p className="text-xs" style={{ color: primaryColor }}>
                    {item.title}{item.company && ` at ${item.company}`}
                  </p>
                  <div className="mt-1 text-xs" style={{ color: mutedColor }}>
                    {item.email && <p>{item.email}</p>}
                    {item.phone && <p>{item.phone}</p>}
                  </div>
                  {item.relationship && (
                    <p 
                      className="text-xs italic mt-1" 
                      style={{ color: `${mutedColor}80` }}
                    >
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
                    backgroundColor: printSafe ? "transparent" : `${primaryColor}15`,
                    color: primaryColor,
                    border: printSafe ? `1px solid ${primaryColor}40` : "none",
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
                  style={{ color: textColor }}
                >
                  {item.content}
                </p>
              ))}
            </div>
          )}

          {/* Patents Section */}
          {section.type === "patents" && (
            <div className="space-y-4">
              {(section.items as PatentItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.title || "Patent Title"}
                      </h3>
                      <p className="text-sm" style={{ color: mutedColor }}>
                        {item.patentNumber && <span className="font-medium" style={{ color: primaryColor }}>{item.patentNumber}</span>}
                        {item.patentNumber && item.patentOffice && " • "}
                        {item.patentOffice}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor,
                        }}
                      >
                        {item.status}
                      </span>
                      <span style={{ color: primaryColor }}>
                        {item.filingDate}{item.issueDate && ` – ${item.issueDate}`}
                      </span>
                    </div>
                  </div>
                  {item.inventors && item.inventors.length > 0 && (
                    <p className="text-sm mt-1" style={{ color: mutedColor }}>
                      Inventors: {item.inventors.join(", ")}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>{item.description}</p>
                  )}
                  {item.url && (
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener" 
                      className="inline-flex items-center gap-1 mt-2 text-sm hover:underline"
                      style={{ color: primaryColor }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Patent
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Speaking Section */}
          {section.type === "speaking" && (
            <div className="space-y-4">
              {(section.items as SpeakingItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.title || "Presentation Title"}
                      </h3>
                      <p className="text-sm" style={{ color: mutedColor }}>
                        {item.eventName}{item.location && ` • ${item.location}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={{ 
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor,
                        }}
                      >
                        {item.type}
                      </span>
                      <span style={{ color: primaryColor }}>{item.date}</span>
                    </div>
                  </div>
                  {item.audienceSize && (
                    <p className="text-sm mt-1" style={{ color: mutedColor }}>
                      Audience: {item.audienceSize}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>{item.description}</p>
                  )}
                  {(item.slidesUrl || item.videoUrl) && (
                    <div className="flex gap-4 mt-2">
                      {item.slidesUrl && (
                        <a 
                          href={item.slidesUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="inline-flex items-center gap-1 text-sm hover:underline"
                          style={{ color: primaryColor }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Slides
                        </a>
                      )}
                      {item.videoUrl && (
                        <a 
                          href={item.videoUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="inline-flex items-center gap-1 text-sm hover:underline"
                          style={{ color: primaryColor }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Video
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Teaching Section */}
          {section.type === "teaching" && (
            <div className="space-y-4">
              {(section.items as TeachingItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.courseName || "Course Name"}
                        {item.courseNumber && <span style={{ color: mutedColor }}> ({item.courseNumber})</span>}
                      </h3>
                      <p className="text-sm" style={{ color: mutedColor }}>
                        {item.institution}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                        style={{ 
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor,
                        }}
                      >
                        {item.role?.replace("_", " ")}
                      </span>
                      <span style={{ color: primaryColor }}>
                        {item.semester} {item.year}
                      </span>
                    </div>
                  </div>
                  {item.studentCount && (
                    <p className="text-sm mt-1" style={{ color: mutedColor }}>
                      {item.studentCount} students
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Courses Section */}
          {section.type === "courses" && (
            <div className="space-y-4">
              {(section.items as CourseItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.courseName || "Course Name"}
                      </h3>
                      <p className="text-sm" style={{ color: mutedColor }}>
                        {item.provider}
                      </p>
                    </div>
                    <span className="text-sm whitespace-nowrap" style={{ color: primaryColor }}>
                      {item.completionDate}
                    </span>
                  </div>
                  {item.duration && (
                    <p className="text-sm mt-1" style={{ color: mutedColor }}>
                      Duration: {item.duration}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>{item.description}</p>
                  )}
                  {item.skills && item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{ 
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.certificateUrl && (
                    <a 
                      href={item.certificateUrl} 
                      target="_blank" 
                      rel="noopener" 
                      className="inline-flex items-center gap-1 mt-2 text-sm hover:underline"
                      style={{ color: primaryColor }}
                    >
                      <Award className="h-3.5 w-3.5" />
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Open Source Section */}
          {section.type === "opensource" && (
            <div className="space-y-4">
              {(section.items as OpenSourceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.projectName || "Project Name"}
                      </h3>
                      {item.stars && (
                        <p className="text-sm" style={{ color: mutedColor }}>
                          ⭐ {item.stars}
                        </p>
                      )}
                    </div>
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs font-medium capitalize"
                      style={{ 
                        backgroundColor: `${primaryColor}20`,
                        color: primaryColor,
                      }}
                    >
                      {item.role?.replace("_", " ")}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>{item.description}</p>
                  )}
                  {item.contributions && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>
                      <span className="font-medium">Contributions:</span> {item.contributions}
                    </p>
                  )}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{ 
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.repositoryUrl && (
                    <a 
                      href={item.repositoryUrl} 
                      target="_blank" 
                      rel="noopener" 
                      className="inline-flex items-center gap-1 mt-2 text-sm hover:underline"
                      style={{ color: primaryColor }}
                    >
                      <Github className="h-3.5 w-3.5" />
                      View Repository
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Memberships Section */}
          {section.type === "memberships" && (
            <div className="space-y-4">
              {(section.items as MembershipItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: textColor }}>
                        {item.organization || "Organization"}
                      </h3>
                      <p className="text-sm capitalize" style={{ color: mutedColor }}>
                        {item.membershipType?.replace("_", " ")}
                        {item.memberId && ` • ID: ${item.memberId}`}
                      </p>
                    </div>
                    <span className="text-sm whitespace-nowrap" style={{ color: primaryColor }}>
                      {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-sm" style={{ color: textColor }}>{item.description}</p>
                  )}
                  {item.website && (
                    <a 
                      href={item.website} 
                      target="_blank" 
                      rel="noopener" 
                      className="inline-flex items-center gap-1 mt-2 text-sm hover:underline"
                      style={{ color: primaryColor }}
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Website
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Empty State */}
      {sections.length === 0 && !personalInfo.summary && (
        <div 
          className="flex flex-col items-center justify-center py-20 text-center"
          style={{ color: mutedColor }}
        >
          <p>Start filling out your information</p>
          <p className="text-sm">Your CV preview will appear here</p>
        </div>
      )}
    </div>
  );
}
