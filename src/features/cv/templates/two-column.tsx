"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem, LanguageItem, CertificationItem } from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function TwoColumnTemplate({ personalInfo, sections, settings }: TemplateProps) {
  // Split sections into sidebar and main content
  const sidebarSections = sections.filter(s => 
    ["skills", "languages", "certifications", "interests"].includes(s.type) && s.isVisible
  );
  const mainSections = sections.filter(s => 
    !["skills", "languages", "certifications", "interests"].includes(s.type) && s.isVisible
  );

  return (
    <div 
      className="flex min-h-[1000px] bg-white text-gray-900"
      style={{ fontFamily: 'var(--cv-font-family, sans-serif)' }}
    >
      {/* Sidebar */}
      <aside 
        className="w-[280px] p-6 text-white"
        style={{ backgroundColor: 'var(--cv-secondary, #1e293b)' }}
      >
        {/* Profile Photo Placeholder */}
        <div className="mb-6 flex justify-center">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="h-32 w-32 rounded-full border-4 object-cover"
              style={{ borderColor: 'var(--cv-primary, #22d3ee)' }}
            />
          ) : (
            <div 
              className="flex h-32 w-32 items-center justify-center rounded-full border-4 bg-slate-700 text-4xl font-bold"
              style={{ borderColor: 'var(--cv-primary, #22d3ee)', color: 'var(--cv-primary, #22d3ee)' }}
            >
              {personalInfo.fullName?.charAt(0) || "?"}
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="mb-8 space-y-3 text-sm">
          <h3 
            className="mb-3 border-b pb-2 text-xs font-semibold uppercase tracking-wider"
            style={{ borderColor: 'var(--cv-primary, #22d3ee)', color: 'var(--cv-primary, #22d3ee)' }}
          >
            Contact
          </h3>
          {personalInfo.email && (
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="flex items-center gap-2 text-gray-300 hover:opacity-80"
            >
              <Mail className="h-4 w-4" style={{ color: 'var(--cv-primary, #22d3ee)' }} />
              <span className="break-all">{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="h-4 w-4" style={{ color: 'var(--cv-primary, #22d3ee)' }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="h-4 w-4" style={{ color: 'var(--cv-primary, #22d3ee)' }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-2 text-gray-300 hover:opacity-80">
              <Globe className="h-4 w-4" style={{ color: 'var(--cv-primary, #22d3ee)' }} />
              <span className="break-all">Website</span>
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-gray-300 hover:opacity-80">
              <Linkedin className="h-4 w-4" style={{ color: 'var(--cv-primary, #22d3ee)' }} />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-gray-300 hover:opacity-80">
              <Github className="h-4 w-4" style={{ color: 'var(--cv-primary, #22d3ee)' }} />
              <span>GitHub</span>
            </a>
          )}
        </div>

        {/* Sidebar Sections */}
        {sidebarSections.map((section) => (
          <div key={section.id} className="mb-6">
            <h3 
              className="mb-3 border-b pb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ borderColor: 'var(--cv-primary, #22d3ee)', color: 'var(--cv-primary, #22d3ee)' }}
            >
              {section.title}
            </h3>

            {section.type === "skills" && (
              <div className="space-y-2">
                {(section.items as SkillItem[]).map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.name}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-600">
                      <div
                        className="h-full rounded-full"
                        style={{ 
                          width: `${(item.proficiency / 5) * 100}%`,
                          background: 'linear-gradient(to right, var(--cv-primary, #22d3ee), var(--cv-primary, #22d3ee))',
                          opacity: 0.8
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.type === "languages" && (
              <div className="space-y-2">
                {(section.items as LanguageItem[]).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.name}</span>
                    <span className="capitalize" style={{ color: 'var(--cv-primary, #22d3ee)' }}>{item.proficiency}</span>
                  </div>
                ))}
              </div>
            )}

            {section.type === "certifications" && (
              <div className="space-y-3">
                {(section.items as CertificationItem[]).map((item) => (
                  <div key={item.id} className="text-sm">
                    <p className="font-medium text-gray-200">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.issuer}</p>
                    {item.issueDate && (
                      <p className="text-xs" style={{ color: 'var(--cv-primary, #22d3ee)' }}>{item.issueDate}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="mt-2 text-xl" style={{ color: 'var(--cv-primary, #0891b2)' }}>
            {personalInfo.headline || "Professional Title"}
          </p>
        </header>

        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Main Sections */}
        {mainSections.map((section) => (
          <section key={section.id} className="mb-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {section.title}
            </h2>

            {section.type === "experience" && (
              <div className="space-y-6">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div 
                    key={item.id} 
                    className="border-l-2 pl-4"
                    style={{ borderColor: 'var(--cv-primary, #22d3ee)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">{item.role || "Role"}</h3>
                        <p style={{ color: 'var(--cv-primary, #0891b2)' }}>{item.company || "Company"}</p>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <p>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                        {item.location && <p>{item.location}</p>}
                      </div>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <span 
                              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: 'var(--cv-primary, #22d3ee)' }}
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span key={idx} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === "education" && (
              <div className="space-y-4">
                {(section.items as EducationItem[]).map((item) => (
                  <div 
                    key={item.id} 
                    className="border-l-2 pl-4"
                    style={{ borderColor: 'var(--cv-primary, #22d3ee)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                        </h3>
                        <p style={{ color: 'var(--cv-primary, #0891b2)' }}>{item.institution}</p>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <p>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                        {item.gpa && <p>GPA: {item.gpa}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.type === "projects" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {(section.items as ProjectItem[]).map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-800">{item.title || "Project"}</h3>
                    {item.description && (
                      <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                    )}
                    <div className="mt-2 flex gap-2">
                      {item.liveUrl && (
                        <a 
                          href={item.liveUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="text-xs hover:underline"
                          style={{ color: 'var(--cv-primary, #0891b2)' }}
                        >
                          Live Demo
                        </a>
                      )}
                      {item.githubUrl && (
                        <a 
                          href={item.githubUrl} 
                          target="_blank" 
                          rel="noopener" 
                          className="text-xs hover:underline"
                          style={{ color: 'var(--cv-primary, #0891b2)' }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </main>
    </div>
  );
}

