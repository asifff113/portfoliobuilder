"use client";

/**
 * Newspaper CV Template
 * 
 * Classic newspaper/print layout with columns and headlines.
 * Features:
 * - Serif typography
 * - Multi-column layout
 * - Masthead style header
 * - Classic print aesthetics
 */

import { Github, ExternalLink, Mail, MapPin, Phone, Globe } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  SkillItem, 
  ProjectItem,
  ExperienceItem,
  EducationItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function NewspaperCVTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 80;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div 
      className="min-h-[297mm] w-full max-w-[210mm] mx-auto"
      style={{ 
        fontFamily: '"Georgia", "Times New Roman", serif',
        fontSize: '10pt',
        lineHeight: '1.4',
        backgroundColor: '#f5f1e8',
        color: '#1a1a1a',
      }}
    >
      {/* Paper texture */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.2'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative p-8">
        {/* Masthead */}
        <header className="text-center border-b-4 border-double border-black pb-4 mb-6">
          <p className="text-xs tracking-widest mb-2">{today}</p>
          <h1 className="text-5xl font-black tracking-tight mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            THE {personalInfo.fullName.toUpperCase()} GAZETTE
          </h1>
          <div className="flex justify-center items-center gap-4 text-xs">
            <span>Vol. MMXXIV</span>
            <span>•</span>
            <span>Curriculum Vitae Edition</span>
            <span>•</span>
            <span>Free</span>
          </div>
        </header>

        {/* Main Headline */}
        <div className="text-center mb-6 border-b border-black pb-4">
          <h2 className="text-3xl font-bold mb-2">{personalInfo.headline}</h2>
          {personalInfo.bio && (
            <p className="text-sm italic max-w-lg mx-auto">{personalInfo.bio}</p>
          )}
        </div>

        {/* Contact Bar */}
        <div className="flex justify-center gap-6 mb-6 text-xs border-b border-black pb-4">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail size={12} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone size={12} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {personalInfo.location}
            </span>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="col-span-2 space-y-6">
            {sections.filter(s => s.type === "experience" || s.type === "projects").map((section) => (
              <section key={section.id}>
                <h3 className="text-xl font-bold border-b border-black pb-1 mb-3">
                  {section.title.toUpperCase()}
                </h3>

                {section.type === "experience" && (
                  <div className="space-y-4">
                    {(section.items as ExperienceItem[]).map((item, i) => (
                      <article key={i} className="border-b border-gray-300 pb-4">
                        <h4 className="font-bold text-lg">{item.position}</h4>
                        <p className="text-sm font-semibold">{item.company} • {item.startDate} - {item.endDate || "Present"}</p>
                        {item.description && (
                          <p className="text-sm mt-2 text-justify" style={{ columnCount: 2, columnGap: '1rem' }}>
                            {item.description}
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                )}

                {section.type === "projects" && (
                  <div className="space-y-3">
                    {(section.items as ProjectItem[]).map((project, i) => (
                      <article key={i} className="border-b border-gray-300 pb-3">
                        <h4 className="font-bold">{project.title}</h4>
                        <p className="text-sm text-justify">{project.description}</p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {showPhoto && personalInfo.avatarUrl && (
              <div className="text-center">
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className="mx-auto grayscale"
                  style={{ 
                    width: photoSize, 
                    height: photoSize, 
                    objectFit: 'cover',
                    border: '2px solid #1a1a1a',
                  }}
                />
              </div>
            )}

            {sections.filter(s => s.type === "education" || s.type === "skills").map((section) => (
              <section key={section.id} className="border-2 border-black p-3">
                <h3 className="text-sm font-bold border-b border-black pb-1 mb-2 text-center">
                  {section.title.toUpperCase()}
                </h3>

                {section.type === "education" && (
                  <div className="space-y-2 text-sm">
                    {(section.items as EducationItem[]).map((item, i) => (
                      <div key={i}>
                        <p className="font-bold">{item.degree}</p>
                        <p>{item.institution}</p>
                        <p className="text-xs">{item.graduationDate}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "skills" && (
                  <ul className="text-sm space-y-1">
                    {(section.items as SkillItem[]).map((skill, i) => (
                      <li key={i}>◆ {skill.name}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t-2 border-black text-center text-xs">
          <p>© {new Date().getFullYear()} {personalInfo.fullName}. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}
