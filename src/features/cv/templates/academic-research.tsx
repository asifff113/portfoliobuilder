"use client";

/**
 * Academic Research Template
 * 
 * A clean, professional template inspired by academic/research CVs.
 * Features:
 * - Dense, information-rich layout
 * - Dark maroon color scheme
 * - Section headers with horizontal lines
 * - Right-aligned dates throughout
 * - Academic citation formatting for publications
 * - No photo (ATS/academic standard)
 * - Proper bullet alignment
 * - Page numbering footer
 */

import { Mail, Linkedin, Globe } from "lucide-react";
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

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

function AcademicSectionHeader({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0">
      <h2
        className="text-sm font-bold uppercase tracking-wide whitespace-nowrap"
        style={{ color }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px" style={{ backgroundColor: color }} />
    </div>
  );
}

function AcademicDateRange({ start, end, isCurrent, color }: { start?: string; end?: string; isCurrent?: boolean; color: string }) {
  return (
    <span className="text-sm whitespace-nowrap" style={{ color }}>
      {start && end ? `${start} – ${isCurrent ? "Present" : end}` : start || end || ""}
    </span>
  );
}

export function AcademicResearchTemplate({ personalInfo, sections }: TemplateProps) {
  // Use CSS variables if available
  const primaryColor = "var(--cv-primary, #8B2500)";
  const textColor = "var(--cv-text, #1a1a1a)";
  const mutedColor = "var(--cv-text-muted, #4a4a4a)";

  return (
    <div 
      className="bg-white"
      style={{ 
        fontFamily: 'var(--cv-font-family, "Times New Roman", Georgia, serif)',
        fontSize: '10pt',
        lineHeight: '1.4',
        color: textColor,
        minHeight: '297mm',
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: '12mm 15mm 15mm 15mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header - Name and Contact */}
      <header className="text-center mb-4 pb-2 border-b" style={{ borderColor: '#ccc' }}>
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ 
            fontFamily: '"Arial", sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        {/* Contact Info Row */}
        <div 
          className="flex items-center justify-center gap-4 text-sm flex-wrap"
          style={{ color: mutedColor }}
        >
          {personalInfo.email && (
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-1 hover:underline"
              style={{ color: textColor }}
            >
              <Mail className="h-3.5 w-3.5" style={{ color: primaryColor }} />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a 
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1 hover:underline"
              style={{ color: textColor }}
            >
              <Linkedin className="h-3.5 w-3.5" style={{ color: primaryColor }} />
              {personalInfo.linkedinLabel || personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '').replace(/\/$/, '')}
            </a>
          )}
          {personalInfo.website && (
            <a 
              href={personalInfo.website}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-1 hover:underline"
              style={{ color: textColor }}
            >
              <Globe className="h-3.5 w-3.5" style={{ color: primaryColor }} />
              {personalInfo.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {personalInfo.phone && (
            <span>{personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span>{personalInfo.location}</span>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      {sections.filter(s => s.isVisible).map((section) => (
        <div key={section.id}>
          <AcademicSectionHeader title={section.title} color={primaryColor} />

          {/* Education Section */}
          {section.type === "education" && (
            <div className="space-y-3">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 
                        className="font-bold"
                        style={{ color: primaryColor, fontFamily: '"Arial", sans-serif' }}
                      >
                        {item.degree}{item.fieldOfStudy && ` (${item.fieldOfStudy})`}
                      </h3>
                      <p style={{ fontFamily: '"Arial", sans-serif' }}>
                        {item.institution}
                        {item.location && `, ${item.location}`}
                      </p>
                    </div>
                    <AcademicDateRange start={item.startDate || undefined} end={item.endDate || undefined} isCurrent={item.isCurrent} color={primaryColor} />
                  </div>
                  
                  {/* Education Details as bullet points */}
                  <ul className="mt-1 ml-4 space-y-0.5 list-disc">
                    {item.gpa && (
                      <li className="text-sm">GPA: {item.gpa}</li>
                    )}
                    {item.description && (
                      <li className="text-sm italic">Thesis: {item.description}</li>
                    )}
                    {item.achievements?.map((achievement, idx) => (
                      <li key={idx} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Experience Section */}
          {section.type === "experience" && (
            <div className="space-y-3">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 
                        className="font-bold"
                        style={{ color: primaryColor, fontFamily: '"Arial", sans-serif' }}
                      >
                        {item.company || "Company"}
                      </h3>
                      <p style={{ fontFamily: '"Arial", sans-serif' }}>
                        {item.role}
                        {item.location && (
                          <span className="float-right" style={{ color: primaryColor }}>
                            {item.location}
                          </span>
                        )}
                      </p>
                    </div>
                    <AcademicDateRange start={item.startDate || undefined} end={item.endDate || undefined} isCurrent={item.isCurrent} color={primaryColor} />
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 text-sm">{item.description}</p>
                  )}
                  
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-1 ml-4 space-y-0.5 list-disc">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-sm">{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack */}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mt-1 ml-4 text-sm">
                      <span className="font-bold text-xs uppercase tracking-wide" style={{ color: mutedColor }}>Tech Stack: </span>
                      <span style={{ color: mutedColor }}>{item.techStack.join(", ")}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills/Research Interests Section */}
          {section.type === "skills" && (
            <ul className="ml-4 space-y-1 list-disc">
              {(() => {
                const categories: Record<string, SkillItem[]> = {};
                (section.items as SkillItem[]).forEach((skill) => {
                  const cat = skill.category || "General";
                  if (!categories[cat]) categories[cat] = [];
                  categories[cat].push(skill);
                });
                
                return Object.entries(categories).map(([category, skills]) => (
                  <li key={category} className="text-sm">
                    <span className="font-bold">{category}</span>: {skills.map(s => s.name).join(", ")}
                  </li>
                ));
              })()}
            </ul>
          )}

          {/* Projects Section */}
          {section.type === "projects" && (
            <div className="space-y-4">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  {/* Project Title */}
                  <h3 
                    className="font-bold"
                    style={{ color: primaryColor, fontFamily: '"Arial", sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Organization and Date */}
                  <div className="flex items-start justify-between gap-4">
                    <p style={{ fontFamily: '"Arial", sans-serif' }}>
                      {item.role && (
                        <span className="italic">{item.role}</span>
                      )}
                      {item.role && " – "}
                      {item.description?.split('\n')[0]}
                    </p>
                    {(item.startDate || item.endDate) && (
                      <AcademicDateRange start={item.startDate || undefined} end={item.endDate || undefined} color={primaryColor} />
                    )}
                  </div>
                  
                  {/* Bullet points */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1 ml-4 space-y-0.5 list-disc">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm">{highlight}</li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Stack */}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mt-1 ml-4 text-sm">
                      <span className="font-bold text-xs uppercase tracking-wide" style={{ color: mutedColor }}>Tech Stack: </span>
                      <span style={{ color: mutedColor }}>{item.techStack.join(", ")}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications Section - Academic Citation Format */}
          {section.type === "publications" && (
            <div className="space-y-2">
              {(section.items as PublicationItem[]).map((item, idx) => (
                <div key={item.id} className="flex gap-3">
                  <span 
                    className="font-medium text-sm flex-shrink-0 w-6"
                    style={{ color: textColor }}
                  >
                    [{idx + 1}]
                  </span>
                  <p className="text-sm">
                    {item.authors?.join(", ")}. {item.title}. 
                    {item.publisher && <em> {item.publisher}</em>}
                    {item.date && `, ${item.date}`}.
                    {item.description && ` ${item.description}`}
                    {item.url && (
                      <a 
                        href={item.url}
                        className="ml-1 hover:underline"
                        style={{ color: primaryColor }}
                        target="_blank"
                        rel="noopener"
                      >
                        [Link]
                      </a>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Certifications/Patents Section */}
          {section.type === "certifications" && (
            <div className="space-y-2">
              {(section.items as CertificationItem[]).map((item, idx) => (
                <div key={item.id} className="flex gap-3">
                  <span 
                    className="font-medium text-sm flex-shrink-0 w-6"
                    style={{ color: textColor }}
                  >
                    P{idx + 1}
                  </span>
                  <p className="text-sm">
                    {item.name}. 
                    {item.issuer && ` ${item.issuer}`}
                    {item.issueDate && `, ${item.issueDate}`}.
                    {item.credentialId && ` ${item.credentialId}`}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Awards Section */}
          {section.type === "awards" && (
            <ul className="ml-4 space-y-1 list-disc">
              {(section.items as AwardItem[]).map((item) => (
                <li key={item.id} className="text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <span>
                      {item.title}
                      {item.issuer && `, ${item.issuer}`}
                      {item.description && ` – ${item.description}`}
                    </span>
                    <span 
                      className="flex-shrink-0 font-medium"
                      style={{ color: primaryColor }}
                    >
                      {item.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Languages Section */}
          {section.type === "languages" && (
            <div className="text-sm">
              <p>
                <span className="font-bold">Human Languages</span>: {
                  (section.items as LanguageItem[]).map(item => 
                    `${item.name}${item.proficiency ? ` (${item.proficiency})` : ''}`
                  ).join(", ")
                }
              </p>
            </div>
          )}

          {/* Volunteer Section */}
          {section.type === "volunteer" && (
            <div className="space-y-3">
              {(section.items as VolunteerItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-bold" style={{ color: primaryColor }}>
                        {item.role}
                      </span>
                      {item.organization && `, ${item.organization}`}
                      {item.location && ` – ${item.location}`}
                    </div>
                    <AcademicDateRange start={item.startDate || undefined} end={item.endDate || undefined} isCurrent={item.isCurrent} color={primaryColor} />
                  </div>
                  {item.description && (
                    <p className="text-sm mt-1">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* References Section */}
          {section.type === "references" && (
            <div className="grid grid-cols-2 gap-4">
              {(section.items as ReferenceItem[]).map((item) => (
                <div key={item.id} className="text-sm">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.title}{item.company && `, ${item.company}`}</p>
                  {item.email && <p>{item.email}</p>}
                  {item.phone && <p>{item.phone}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Interests Section */}
          {section.type === "interests" && (
            <p className="text-sm">
              {(section.items as InterestItem[]).map(item => item.name).join(", ")}
            </p>
          )}

          {/* About Section */}
          {section.type === "about" && (
            <div className="text-sm">
              {(section.items as AboutItem[]).map((item) => (
                <p key={item.id}>{item.content}</p>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Summary if exists and no "about" section */}
      {personalInfo.summary && !sections.find(s => s.type === "about" && s.isVisible) && (
        <div>
          <AcademicSectionHeader title="Summary" color={primaryColor} />
          <p className="text-sm">{personalInfo.summary}</p>
        </div>
      )}

      {/* Page Footer */}
      <footer 
        className="mt-8 pt-2 border-t text-center text-xs"
        style={{ borderColor: '#ccc', color: mutedColor }}
      >
        {personalInfo.fullName} Résumé (Update: {new Date().toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        })}) – Page 1 of 1
      </footer>
    </div>
  );
}

