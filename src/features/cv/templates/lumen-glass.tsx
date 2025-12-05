"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, Sparkles, Code2 } from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
  InterestItem,
  CustomItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

const glassPanel = "backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg";

export function LumenGlassTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 96;
  const photoShape = settings?.photoShape ?? "rounded";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded",
    none: "hidden",
  }[photoShape];

  return (
    <div
      className="relative w-full max-w-[820px] overflow-hidden"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: "var(--cv-text, #0f172a)",
        padding: "14mm 18mm",
        background: "radial-gradient(circle at 20% 20%, #dbeafe, transparent 35%), radial-gradient(circle at 80% 10%, #e9d5ff, transparent 30%), #f8fafc",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), transparent), linear-gradient(45deg, rgba(14,165,233,0.08), transparent)" }} />

      <header className={cn("relative flex flex-col gap-5 rounded-2xl p-6", glassPanel)}>
        <div className="flex items-start gap-5">
          {showPhoto && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={cn("object-cover border-2 border-white/60 shadow-xl shadow-indigo-200", photoShapeClass)}
              style={{ width: photoSize, height: photoSize }}
            />
          )}
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{personalInfo.fullName || "Your Name"}</h1>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">Premium</span>
            </div>
            <p className="mt-1 text-lg font-medium text-indigo-700">{personalInfo.headline || "Professional Title"}</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-500" />
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-indigo-500" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-indigo-500" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-indigo-500" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-indigo-500" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2">
                  <Github className="h-4 w-4 text-indigo-500" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
        {personalInfo.summary && (
          <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        )}
      </header>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4">
          {sections
            .filter((s) => s.isVisible)
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              if (["skills", "certifications", "languages", "interests"].includes(section.type)) {
                return null; // render in sidebar
              }
              return (
                <section key={section.id} className={cn("rounded-2xl p-5", glassPanel)}>
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Sparkles className="h-4 w-4" />
                    <h3 className="text-sm font-semibold uppercase tracking-wide">{section.title}</h3>
                  </div>
                  <div className="mt-3 space-y-4">
                    {section.items.length === 0 && (
                      <p className="text-sm text-slate-500">Add content to populate this section.</p>
                    )}
                    {section.items.map((item) => {
                      if (section.type === "experience") {
                        const exp = item as ExperienceItem;
                        return (
                          <div key={exp.id} className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-white/60">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-slate-900">{exp.role || "Role"}</p>
                                <p className="text-sm text-indigo-700">{exp.company}</p>
                              </div>
                              <span className="text-xs text-slate-500">{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}</span>
                            </div>
                            {exp.description && <p className="mt-2 text-sm text-slate-600">{exp.description}</p>}
                            {exp.bullets?.length > 0 && (
                              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }

                      if (section.type === "education") {
                        const edu = item as EducationItem;
                        return (
                          <div key={edu.id} className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-white/60">
                            <p className="text-base font-semibold text-slate-900">{edu.degree}</p>
                            <p className="text-sm text-indigo-700">{edu.institution}</p>
                            <p className="text-xs text-slate-500">{edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}</p>
                            {edu.fieldOfStudy && <p className="mt-1 text-sm text-slate-600">{edu.fieldOfStudy}</p>}
                          </div>
                        );
                      }

                      if (section.type === "projects") {
                        const proj = item as ProjectItem;
                        return (
                          <div key={proj.id} className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-white/60">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-slate-900">{proj.title}</p>
                                {proj.role && <p className="text-sm text-indigo-700">{proj.role}</p>}
                              </div>
                              <span className="text-xs text-slate-500">{proj.startDate} – {proj.endDate}</span>
                            </div>
                            {proj.description && <p className="mt-2 text-sm text-slate-600">{proj.description}</p>}
                            {proj.techStack?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                {proj.techStack.map((tech) => (
                                  <span key={tech} className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700 ring-1 ring-indigo-100">{tech}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      const custom = item as CustomItem;
                      return (
                        <div key={custom.id} className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-white/60">
                          <p className="text-base font-semibold text-slate-900">{custom.title}</p>
                          {custom.subtitle && <p className="text-sm text-indigo-700">{custom.subtitle}</p>}
                          {custom.description && <p className="mt-2 text-sm text-slate-600">{custom.description}</p>}
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
        </div>

        <aside className="grid gap-4">
          <section className={cn("rounded-2xl p-5", glassPanel)}>
            <div className="flex items-center gap-2 text-indigo-700">
              <Code2 className="h-4 w-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Skills</h3>
            </div>
            <div className="mt-3 grid gap-2">
              {sections.find((s) => s.type === "skills")?.items.map((item) => {
                const skill = item as SkillItem;
                return (
                  <div key={skill.id} className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 text-sm ring-1 ring-white/60">
                    <span className="font-medium text-slate-800">{skill.name}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((lvl) => (
                        <span key={lvl} className={cn("h-1.5 w-5 rounded-full", lvl <= (skill.proficiency || 0) ? "bg-indigo-500" : "bg-slate-200")} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {(!sections.find((s) => s.type === "skills") || sections.find((s) => s.type === "skills")?.items.length === 0) && (
                <p className="text-sm text-slate-500">Add your skills to showcase here.</p>
              )}
            </div>
          </section>

          <section className={cn("rounded-2xl p-5", glassPanel)}>
            <div className="flex items-center gap-2 text-indigo-700">
              <Award className="h-4 w-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Certifications</h3>
            </div>
            <div className="mt-3 space-y-3">
              {sections.find((s) => s.type === "certifications")?.items.map((item) => {
                const cert = item as CertificationItem;
                return (
                  <div key={cert.id} className="rounded-lg bg-white/70 px-3 py-2 text-sm ring-1 ring-white/60">
                    <p className="font-medium text-slate-800">{cert.name}</p>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                );
              })}
              {(!sections.find((s) => s.type === "certifications") || sections.find((s) => s.type === "certifications")?.items.length === 0) && (
                <p className="text-sm text-slate-500">List certifications to add credibility.</p>
              )}
            </div>
          </section>

          <section className={cn("rounded-2xl p-5", glassPanel)}>
            <div className="flex items-center gap-2 text-indigo-700">
              <Briefcase className="h-4 w-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Languages</h3>
            </div>
            <div className="mt-3 grid gap-2">
              {sections.find((s) => s.type === "languages")?.items.map((item) => {
                const lang = item as LanguageItem;
                return (
                  <div key={lang.id} className="flex items-center justify-between rounded-lg bg-white/70 px-3 py-2 text-sm ring-1 ring-white/60">
                    <span className="font-medium text-slate-800">{lang.name}</span>
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-semibold uppercase text-indigo-700">{lang.proficiency}</span>
                  </div>
                );
              })}
              {(!sections.find((s) => s.type === "languages") || sections.find((s) => s.type === "languages")?.items.length === 0) && (
                <p className="text-sm text-slate-500">Add languages you speak.</p>
              )}
            </div>
          </section>

          <section className={cn("rounded-2xl p-5", glassPanel)}>
            <div className="flex items-center gap-2 text-indigo-700">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wide">Interests</h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {sections.find((s) => s.type === "interests")?.items.map((item) => {
                const interest = item as InterestItem;
                return (
                  <span key={interest.id} className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-800 ring-1 ring-white/60">
                    {interest.name}
                  </span>
                );
              })}
              {(!sections.find((s) => s.type === "interests") || sections.find((s) => s.type === "interests")?.items.length === 0) && (
                <p className="text-sm text-slate-500">Share interests to add personality.</p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
