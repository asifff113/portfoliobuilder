"use client";

import { Mail, Phone, MapPin, Linkedin, Github, Calendar } from "lucide-react";
import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function TimelineTemplate({ personalInfo, sections, settings }: TemplateProps) {
  return (
    <div 
      className="min-h-[1000px] bg-linear-to-br from-slate-50 to-slate-100 p-8 text-gray-900"
      style={{ 
        fontFamily: "var(--cv-font-family, system-ui, sans-serif)",
        color: "var(--cv-text, #0f172a)",
        lineHeight: "var(--cv-line-height, 1.5)",
        padding: 'var(--cv-margin-top, 8mm) var(--cv-margin-right, 8mm) var(--cv-margin-bottom, 8mm) var(--cv-margin-left, 8mm)',
      }}
    >
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 
          className="text-5xl font-light tracking-tight"
          style={{ color: "var(--cv-primary, #1e293b)" }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p 
          className="mt-3 text-xl font-medium"
          style={{ color: "var(--cv-accent, #059669)" }}
        >
          {personalInfo.headline || "Professional Title"}
        </p>

        {/* Contact Info - Centered */}
        <div 
          className="mt-6 flex flex-wrap justify-center gap-4 text-sm"
          style={{ color: "var(--cv-text-muted, #475569)" }}
        >
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-emerald-600">
              <Mail className="h-4 w-4" />
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-emerald-600">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-emerald-600">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-slate-600">{personalInfo.summary}</p>
        </section>
      )}

      {/* Timeline Sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-12">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {section.title}
          </h2>

          {/* Timeline for Experience/Education */}
          {(section.type === "experience" || section.type === "education") && (
            <div className="relative mx-auto max-w-4xl">
              {/* Timeline Line */}
              <div 
                className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2"
                style={{ 
                  background: `linear-gradient(to bottom, var(--cv-accent, #34d399), transparent)` 
                }}
              />

              <div className="space-y-12">
                {section.type === "experience" && (section.items as ExperienceItem[]).map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    isLeft={index % 2 === 0}
                    date={`${item.startDate} - ${item.isCurrent ? "Present" : item.endDate}`}
                    title={item.role || "Role"}
                    subtitle={item.company || "Company"}
                    location={item.location}
                    description={item.description}
                    bullets={item.bullets}
                    tags={item.techStack}
                  />
                ))}
                {section.type === "education" && (section.items as EducationItem[]).map((item, index) => (
                  <TimelineItem
                    key={item.id}
                    isLeft={index % 2 === 0}
                    date={`${item.startDate} - ${item.isCurrent ? "Present" : item.endDate}`}
                    title={`${item.degree}${item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ""}`}
                    subtitle={item.institution || "Institution"}
                    location={item.location}
                    extra={item.gpa ? `GPA: ${item.gpa}` : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Skills - Grid */}
          {section.type === "skills" && (
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(section.items as SkillItem[]).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 w-2 rounded-full ${
                              level <= item.proficiency ? "bg-emerald-400" : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {item.category && (
                      <p className="mt-1 text-xs text-slate-400">{item.category}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects - Cards */}
          {section.type === "projects" && (
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-6 sm:grid-cols-2">
                {(section.items as ProjectItem[]).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
                  >
                    <h3 className="text-lg font-semibold text-slate-800">{item.title || "Project"}</h3>
                    {item.description && (
                      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex gap-3">
                      {item.liveUrl && (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener"
                          className="text-sm text-emerald-600 hover:underline"
                        >
                          View Live →
                        </a>
                      )}
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener"
                          className="text-sm text-slate-500 hover:text-slate-700"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

// Timeline Item Component
function TimelineItem({
  isLeft,
  date,
  title,
  subtitle,
  location,
  description,
  bullets,
  tags,
  extra,
}: {
  isLeft: boolean;
  date: string;
  title: string;
  subtitle: string;
  location?: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
  extra?: string;
}) {
  return (
    <div className={`relative flex items-start ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* Content */}
      <div className={`w-[calc(50%-2rem)] ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-emerald-600">{subtitle}</p>
          {location && <p className="text-sm text-slate-400">{location}</p>}
          {extra && <p className="text-sm text-slate-500">{extra}</p>}
          {description && (
            <p className="mt-2 text-sm text-slate-600">{description}</p>
          )}
          {bullets && bullets.length > 0 && (
            <ul className={`mt-2 space-y-1 ${isLeft ? "text-right" : "text-left"}`}>
              {bullets.map((bullet, idx) => (
                <li key={idx} className="text-sm text-slate-600">
                  {isLeft ? `${bullet} •` : `• ${bullet}`}
                </li>
              ))}
            </ul>
          )}
          {tags && tags.length > 0 && (
            <div className={`mt-3 flex flex-wrap gap-1 ${isLeft ? "justify-end" : "justify-start"}`}>
              {tags.map((tag, idx) => (
                <span key={idx} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timeline Node */}
      <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-white shadow-lg">
          <Calendar className="h-5 w-5" />
        </div>
        <span className="mt-2 whitespace-nowrap text-xs font-medium text-slate-500">{date}</span>
      </div>

      {/* Spacer for the other side */}
      <div className="w-[calc(50%-2rem)]" />
    </div>
  );
}

