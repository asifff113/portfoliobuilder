"use client";

/**
 * Sidebar Professional Template
 * 
 * Based on professional CV examples with colored sidebar.
 * Features:
 * - Blue sidebar (left) with profile photo, contact, skills with progress bars
 * - White content area (right) with timeline-style dates
 * - Visual progress bars for skills (10 squares)
 * - Timeline connectors for dates
 * - Professional color scheme
 */

import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink, Calendar, User, Target, Zap, GraduationCap, Briefcase, Award, Languages } from "lucide-react";
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

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function SidebarProfessionalTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const sidebarColor = "var(--cv-primary, #2563eb)";
  const sidebarTextColor = "#ffffff";
  const sidebarMutedColor = "rgba(255, 255, 255, 0.7)";
  
  // Render progress bar (10 squares)
  const renderProgressBar = (proficiency: number) => {
    const filled = Math.min(Math.max(Math.round((proficiency / 5) * 10), 0), 10);
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 ${i < filled ? 'bg-white' : 'bg-white/30'}`}
            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
          />
        ))}
      </div>
    );
  };

  // Render timeline date
  const renderTimelineDate = (startDate: string, endDate: string | null, isCurrent: boolean) => {
    return (
      <div className="flex flex-col items-center" style={{ minWidth: '80px' }}>
        <span className="text-xs font-medium" style={{ color: "var(--cv-text-muted, #6b7280)" }}>{startDate}</span>
        <div className="my-1 h-8 w-0.5" style={{ backgroundColor: "var(--cv-text-muted, #e5e7eb)" }} />
        <span className="text-xs font-medium" style={{ color: "var(--cv-text-muted, #6b7280)" }}>
          {isCurrent ? "Now" : endDate || "Present"}
        </span>
      </div>
    );
  };

  return (
    <div 
      className="flex min-h-[1000px] bg-white" 
      style={{ 
        fontFamily: "var(--cv-font-family, Arial, sans-serif)",
        color: "var(--cv-text, #111827)",
        lineHeight: "var(--cv-line-height, 1.5)",
        padding: 'var(--cv-margin-top, 0) var(--cv-margin-right, 0) var(--cv-margin-bottom, 0) var(--cv-margin-left, 0)',
      }}
    >
      {/* Left Sidebar - Blue */}
      <aside 
        className="w-[280px] p-6 text-white"
        style={{ backgroundColor: sidebarColor }}
      >
        {/* Profile Photo */}
        <div className="mb-6 flex justify-center">
          {personalInfo.avatarUrl ? (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div 
              className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white text-4xl font-bold shadow-lg"
              style={{ backgroundColor: sidebarColor }}
            >
              {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-xl font-bold" style={{ color: sidebarTextColor }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-sm" style={{ color: sidebarMutedColor }}>
            {personalInfo.headline || "Professional Title"}
          </p>
        </div>

        {/* PROFILE Section */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2">
            <User className="h-4 w-4" style={{ color: sidebarTextColor }} />
            <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: sidebarTextColor }}>
              PROFILE
            </h2>
          </div>
          <div className="space-y-2 text-xs" style={{ color: sidebarMutedColor }}>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <a href={personalInfo.website} target="_blank" rel="noopener" className="flex items-center gap-2 hover:underline">
                <Globe className="h-3 w-3" />
                <span>{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noopener" className="flex items-center gap-2 hover:underline">
                <Linkedin className="h-3 w-3" />
                <span>{personalInfo.linkedinLabel || "LinkedIn"}</span>
              </a>
            )}
            {personalInfo.githubUrl && (
              <a href={personalInfo.githubUrl} target="_blank" rel="noopener" className="flex items-center gap-2 hover:underline">
                <Github className="h-3 w-3" />
                <span>{personalInfo.githubLabel || "GitHub"}</span>
              </a>
            )}
            {personalInfo.customLinks && personalInfo.customLinks.map((link) => (
              link.url && (
                <a key={link.id} href={link.url} target="_blank" rel="noopener" className="flex items-center gap-2 hover:underline">
                  <ExternalLink className="h-3 w-3" />
                  <span>{link.label || "Link"}</span>
                </a>
              )
            ))}
          </div>
        </div>

        {/* OBJECTIVE Section */}
        {personalInfo.summary && (
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" style={{ color: sidebarTextColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: sidebarTextColor }}>
                OBJECTIVE
              </h2>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: sidebarMutedColor }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* SKILLS Section with Progress Bars */}
        {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4" style={{ color: sidebarTextColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: sidebarTextColor }}>
                SKILLS
              </h2>
            </div>
            <div className="space-y-3">
              {(section.items as SkillItem[]).map((item) => (
                <div key={item.id}>
                  <div className="mb-1 text-xs font-medium uppercase" style={{ color: sidebarTextColor }}>
                    {item.name}
                  </div>
                  {renderProgressBar(item.proficiency)}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* LANGUAGES Section */}
        {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
          <div key={section.id} className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Languages className="h-4 w-4" style={{ color: sidebarTextColor }} />
              <h2 className="text-xs font-bold uppercase tracking-wider" style={{ color: sidebarTextColor }}>
                LANGUAGES
              </h2>
            </div>
            <div className="space-y-2">
              {(section.items as LanguageItem[]).map((item) => (
                <div key={item.id} className="text-xs" style={{ color: sidebarMutedColor }}>
                  <span className="font-medium" style={{ color: sidebarTextColor }}>{item.name}:</span>{" "}
                  <span className="capitalize">{item.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </aside>

      {/* Right Content Area - White */}
      <main className="flex-1 p-8">
        {/* EDUCATION Section */}
        {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" style={{ color: sidebarColor }} />
              <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: sidebarColor }}>
                EDUCATION
              </h2>
            </div>
            <div className="space-y-6">
              {(section.items as EducationItem[]).map((item) => (
                <div key={item.id} className="flex gap-6">
                  {renderTimelineDate(item.startDate, item.endDate, item.isCurrent)}
                  <div className="flex-1">
                    <h3 className="mb-1 text-base font-bold text-gray-900">
                      {item.institution || "Institution"}
                    </h3>
                    <p className="mb-1 text-sm text-gray-700">
                      <span className="font-medium">Major:</span> {item.degree}{item.fieldOfStudy && ` in ${item.fieldOfStudy}`}
                    </p>
                    {item.gpa && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">GPA:</span> {item.gpa}
                      </p>
                    )}
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    )}
                    {item.achievements && item.achievements.length > 0 && (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* WORK EXPERIENCE Section */}
        {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5" style={{ color: sidebarColor }} />
              <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: sidebarColor }}>
                WORK EXPERIENCE
              </h2>
            </div>
            <div className="space-y-6">
              {(section.items as ExperienceItem[]).map((item) => (
                <div key={item.id} className="flex gap-6">
                  {renderTimelineDate(item.startDate, item.endDate, item.isCurrent)}
                  <div className="flex-1">
                    <h3 className="mb-1 text-base font-bold text-gray-900">
                      {item.company || "Company"}
                    </h3>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      {item.role || "Role"}
                    </p>
                    {item.description && (
                      <p className="mb-2 text-sm text-gray-600">{item.description}</p>
                    )}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded px-2 py-0.5 text-xs"
                            style={{ backgroundColor: `${sidebarColor}20`, color: sidebarColor }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* CERTIFICATIONS Section */}
        {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" style={{ color: sidebarColor }} />
              <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: sidebarColor }}>
                CERTIFICATIONS
              </h2>
            </div>
            <div className="space-y-2">
              {(section.items as CertificationItem[]).map((item, idx) => (
                <p key={item.id} className="text-sm text-gray-700">
                  {item.issueDate && `${item.issueDate} `}
                  <span className="font-medium">{item.name}</span>
                  {item.issuer && `, ${item.issuer}`}
                </p>
              ))}
            </div>
          </section>
        ))}

        {/* ACTIVITIES / VOLUNTEER Section */}
        {sections.filter(s => s.type === "volunteer" && s.isVisible).map((section) => (
          <section key={section.id} className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Award className="h-5 w-5" style={{ color: sidebarColor }} />
              <h2 className="text-base font-bold uppercase tracking-wider" style={{ color: sidebarColor }}>
                ACTIVITIES
              </h2>
            </div>
            <div className="space-y-6">
              {(section.items as VolunteerItem[]).map((item) => (
                <div key={item.id} className="flex gap-6">
                  {renderTimelineDate(item.startDate, item.endDate, item.isCurrent)}
                  <div className="flex-1">
                    <h3 className="mb-1 text-base font-bold text-gray-900">
                      {item.organization || "Organization"}
                    </h3>
                    <p className="mb-1 text-sm font-medium text-gray-700">
                      {item.role || "Role"}
                    </p>
                    {item.location && (
                      <p className="mb-2 text-sm text-gray-600">{item.location}</p>
                    )}
                    {item.description && (
                      <p className="mb-2 text-sm text-gray-600">{item.description}</p>
                    )}
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                        {item.highlights.map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Other Sections */}
        {sections.filter(s => 
          !["experience", "education", "skills", "languages", "certifications", "volunteer"].includes(s.type) && s.isVisible
        ).map((section) => (
          <section key={section.id} className="mb-8">
            <h2 className="mb-4 text-base font-bold uppercase tracking-wider" style={{ color: sidebarColor }}>
              {section.title}
            </h2>
            <div className="text-sm text-gray-700">
              {/* Add rendering for other section types as needed */}
              <p className="text-gray-500">Section content rendering...</p>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

