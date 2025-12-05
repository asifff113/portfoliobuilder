"use client";

/**
 * ATS-Safe Template
 * 
 * A clean, semantic HTML template optimized for Applicant Tracking Systems.
 * Features:
 * - System fonts only (no custom fonts)
 * - Simple, linear layout
 * - Semantic HTML (h1, h2, ul, li)
 * - No images, icons, or complex styling
 * - Standard bullet points
 * - Clear section headings
 * - Proper date formatting
 */

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
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function ATSSafeTemplate({ personalInfo, sections }: TemplateProps) {
  return (
    <div 
      className="min-h-[1000px] bg-white p-8 text-black"
      style={{ 
        fontFamily: 'var(--cv-font-family, Arial, Helvetica, sans-serif)',
        fontSize: '11pt',
        lineHeight: '1.4',
        color: 'var(--cv-text, #000000)',
      }}
    >
      {/* Header - Name and Contact */}
      <header className="mb-6 text-center">
        <h1 
          className="mb-2 text-2xl font-bold uppercase tracking-wide"
          style={{ 
            fontFamily: 'var(--cv-font-family, Arial, Helvetica, sans-serif)',
            color: 'var(--cv-primary, #000000)'
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        
        {personalInfo.headline && (
          <p className="mb-3 text-base font-medium text-gray-700">
            {personalInfo.headline}
          </p>
        )}

        {/* Contact Info - Single Line */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedinUrl && (
            <span>| LinkedIn: {personalInfo.linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>
          )}
          {personalInfo.website && (
            <span>| {personalInfo.website.replace(/^https?:\/\//, '')}</span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <h2 
            className="mb-2 border-b-2 pb-1 text-sm font-bold uppercase"
            style={{ 
              borderColor: 'var(--cv-primary, #000000)',
              color: 'var(--cv-primary, #000000)'
            }}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-800">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Dynamic Sections */}
      {sections.filter(s => s.isVisible).map((section) => (
        <section key={section.id} className="mb-5">
          <h2 
            className="mb-2 border-b-2 pb-1 text-sm font-bold uppercase"
            style={{ 
              borderColor: 'var(--cv-primary, #000000)',
              color: 'var(--cv-primary, #000000)'
            }}
          >
            {section.title}
          </h2>

          {/* Experience Section */}
          {section.type === "experience" && (
            <div className="space-y-4">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.role || "Position Title"}</h3>
                      <p className="text-sm font-medium text-gray-700">
                        {item.company || "Company Name"}{item.location && `, ${item.location}`}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                      {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                    </p>
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                  )}
                  
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {section.type === "education" && (
            <div className="space-y-3">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                      </h3>
                      <p className="text-sm font-medium text-gray-700">{item.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                      {item.gpa && <p>GPA: {item.gpa}</p>}
                    </div>
                  </div>
                  
                  {item.achievements && item.achievements.length > 0 && (
                    <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {section.type === "skills" && (
            <div className="text-sm">
              {(() => {
                const categories: Record<string, SkillItem[]> = {};
                (section.items as SkillItem[]).forEach((item) => {
                  const cat = item.category || "Technical Skills";
                  if (!categories[cat]) categories[cat] = [];
                  categories[cat].push(item);
                });
                
                return Object.entries(categories).map(([category, skills]) => (
                  <p key={category} className="mb-1">
                    <strong>{category}:</strong>{" "}
                    {skills.map(s => s.name).join(", ")}
                  </p>
                ));
              })()}
            </div>
          )}

          {/* Projects Section */}
          {section.type === "projects" && (
            <div className="space-y-3">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900">{item.title || "Project Name"}</h3>
                    {(item.startDate || item.endDate) && (
                      <p className="text-sm text-gray-600">
                        {item.startDate}{item.endDate && ` – ${item.endDate}`}
                      </p>
                    )}
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                  )}
                  
                  {item.techStack && item.techStack.length > 0 && (
                    <p className="mt-1 text-sm text-gray-600">
                      <strong>Technologies:</strong> {item.techStack.join(", ")}
                    </p>
                  )}
                  
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications Section */}
          {section.type === "certifications" && (
            <div className="space-y-2">
              {(section.items as CertificationItem[]).map((item) => (
                <div key={item.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-700">{item.issuer}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {item.issueDate}
                    {item.expiryDate && ` – ${item.expiryDate}`}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Languages Section */}
          {section.type === "languages" && (
            <div className="text-sm">
              <p>
                {(section.items as LanguageItem[]).map((item, idx) => (
                  <span key={item.id}>
                    {item.name} ({item.proficiency.charAt(0).toUpperCase() + item.proficiency.slice(1)})
                    {idx < section.items.length - 1 && " • "}
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* Awards Section */}
          {section.type === "awards" && (
            <div className="space-y-2">
              {(section.items as AwardItem[]).map((item) => (
                <div key={item.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-700">{item.issuer}</p>
                    {item.description && (
                      <p className="text-sm text-gray-600">{item.description}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Volunteer Section */}
          {section.type === "volunteer" && (
            <div className="space-y-3">
              {(section.items as VolunteerItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.role}</h3>
                      <p className="text-sm font-medium text-gray-700">
                        {item.organization}{item.location && `, ${item.location}`}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                    </p>
                  </div>
                  
                  {item.description && (
                    <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                  )}
                  
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-1 list-disc pl-5 text-sm text-gray-700">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Publications Section */}
          {section.type === "publications" && (
            <div className="space-y-2">
              {(section.items as PublicationItem[]).map((item) => (
                <div key={item.id}>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-700">
                    {item.authors && item.authors.length > 0 && `${item.authors.join(", ")} • `}
                    {item.publisher} • {item.date}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* References Section */}
          {section.type === "references" && (
            <div className="space-y-3">
              {(section.items as ReferenceItem[]).map((item) => (
                <div key={item.id}>
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-700">
                    {item.title}{item.company && ` at ${item.company}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.email}{item.phone && ` • ${item.phone}`}
                  </p>
                  {item.relationship && (
                    <p className="text-sm text-gray-500 italic">{item.relationship}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

