"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/types/cv";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

export function NeonMinimalTemplate({ personalInfo, sections }: TemplateProps) {
  return (
    <div className="min-h-[1000px] bg-white p-8 text-gray-900">
      {/* Header */}
      <header className="mb-8 border-b-2 border-purple-500 pb-6">
        <h1 className="text-4xl font-bold text-gray-900">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-xl text-purple-600">
          {personalInfo.headline || "Professional Title"}
        </p>

        {/* Contact Info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1 hover:text-purple-600">
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
            <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-purple-600">
              <Globe className="h-4 w-4" />
              Website
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-purple-600">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-purple-600">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-purple-600">About</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Sections */}
      {sections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-purple-600 border-b border-purple-200 pb-2">
            {section.title}
          </h2>

          {section.type === "experience" && (
            <div className="space-y-6">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.role || "Role"}</h3>
                      <p className="text-purple-600">{item.company || "Company"}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                      {item.location && <p>{item.location}</p>}
                    </div>
                  </div>
                  {item.description && (
                    <p className="mt-2 text-gray-700">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.type === "education" && (
            <div className="space-y-4">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.degree} {item.fieldOfStudy && `in ${item.fieldOfStudy}`}
                      </h3>
                      <p className="text-purple-600">{item.institution}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p>{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                      {item.gpa && <p>GPA: {item.gpa}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {section.type === "skills" && (
            <div className="flex flex-wrap gap-2">
              {(section.items as SkillItem[]).map((item) => (
                <span
                  key={item.id}
                  className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                >
                  {item.name}
                  {item.proficiency && (
                    <span className="ml-1 text-purple-400">
                      {"●".repeat(item.proficiency)}{"○".repeat(5 - item.proficiency)}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}

          {section.type === "projects" && (
            <div className="space-y-4">
              {(section.items as ProjectItem[]).map((item) => (
                <div key={item.id}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{item.title || "Project"}</h3>
                    <div className="flex gap-2 text-sm">
                      {item.liveUrl && (
                        <a href={item.liveUrl} target="_blank" rel="noopener" className="text-purple-600 hover:underline">
                          Live
                        </a>
                      )}
                      {item.githubUrl && (
                        <a href={item.githubUrl} target="_blank" rel="noopener" className="text-purple-600 hover:underline">
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="mt-1 text-gray-700">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* Empty State */}
      {sections.length === 0 && !personalInfo.summary && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <p>Start filling out your information</p>
          <p className="text-sm">Your CV preview will appear here</p>
        </div>
      )}
    </div>
  );
}

