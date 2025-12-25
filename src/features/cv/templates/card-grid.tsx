"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function CardGridTemplate({ personalInfo, sections, settings: _settings }: TemplateProps) {
  return (
    <div 
      className="min-h-[1000px] bg-linear-to-br from-slate-50 to-slate-100 p-8 text-gray-900"
      style={{ 
        fontFamily: 'var(--cv-font-family, sans-serif)',
        color: 'var(--cv-text, #111827)'
      }}
    >
      {/* Header Card */}
      <div 
        className="mb-8 rounded-2xl p-8 text-white shadow-xl"
        style={{ 
          background: 'linear-gradient(to right, var(--cv-primary, #06b6d4), var(--cv-secondary, #2563eb))' 
        }}
      >
        <h1 className="text-4xl font-bold">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-xl text-white/90">
          {personalInfo.headline || "Professional Title"}
        </p>

        {/* Contact Info */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-white">
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
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-white">
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-white">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-white">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <p className="mt-6 text-white/80 leading-relaxed">{personalInfo.summary}</p>
        )}
      </div>

      {/* Section Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="rounded-xl bg-white p-6 shadow-lg"
          >
            <h2 
              className="mb-4 text-lg font-semibold"
              style={{ color: 'var(--cv-primary, #0891b2)' }}
            >
              {section.title}
            </h2>

            {section.type === "experience" && (
              <div className="space-y-4">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div 
                    key={item.id} 
                    className="border-l-2 pl-4"
                    style={{ borderColor: 'var(--cv-primary, #0891b2)' }}
                  >
                    <h3 className="font-semibold text-gray-900">{item.role || "Role"}</h3>
                    <p style={{ color: 'var(--cv-primary, #0891b2)' }}>{item.company || "Company"}</p>
                    <p className="text-sm text-gray-500">
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-700">{item.description}</p>
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
                    style={{ borderColor: 'var(--cv-primary, #0891b2)' }}
                  >
                    <h3 className="font-semibold text-gray-900">
                      {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                    </h3>
                    <p style={{ color: 'var(--cv-primary, #0891b2)' }}>{item.institution}</p>
                    <p className="text-sm text-gray-500">
                      {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.type === "skills" && (
              <div className="flex flex-wrap gap-2">
                {(section.items as SkillItem[]).map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg bg-gray-50 px-3 py-2"
                    style={{ color: 'var(--cv-primary, #0891b2)' }}
                  >
                    <span className="font-medium">{item.name}</span>
                    {item.proficiency && (
                      <div className="mt-1 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 w-4 rounded-full ${
                              level <= item.proficiency
                                ? ""
                                : "bg-gray-200"
                            }`}
                            style={{ 
                              backgroundColor: level <= item.proficiency ? 'var(--cv-primary, #06b6d4)' : undefined 
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.type === "projects" && (
              <div className="space-y-4">
                {(section.items as ProjectItem[]).map((item) => (
                  <div key={item.id} className="rounded-lg bg-gray-50 p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900">{item.title || "Project"}</h3>
                      <div className="flex gap-2 text-sm">
                        {item.liveUrl && (
                          <a 
                            href={item.liveUrl} 
                            target="_blank" 
                            rel="noopener" 
                            className="hover:underline"
                            style={{ color: 'var(--cv-primary, #0891b2)' }}
                          >
                            Live
                          </a>
                        )}
                        {item.githubUrl && (
                          <a 
                            href={item.githubUrl} 
                            target="_blank" 
                            rel="noopener" 
                            className="hover:underline"
                            style={{ color: 'var(--cv-primary, #0891b2)' }}
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-700">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.items.length === 0 && (
              <p className="text-sm text-gray-400">No items added yet</p>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sections.length === 0 && !personalInfo.summary && (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white py-20 text-center text-gray-400 shadow-lg">
          <p>Start filling out your information</p>
          <p className="text-sm">Your CV preview will appear here</p>
        </div>
      )}
    </div>
  );
}

