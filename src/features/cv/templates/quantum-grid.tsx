"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Briefcase, GraduationCap, Code2, LayoutPanelLeft, Star } from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
  AwardItem,
  VolunteerItem,
  ReferenceItem,
  PublicationItem,
  InterestItem,
  AboutItem,
  CustomItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { cn } from "@/lib/utils";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

const bgVars = {
  primary: "var(--cv-primary, #22d3ee)",
  accent: "var(--cv-accent, #7c3aed)",
  text: "var(--cv-text, #0f172a)",
  muted: "var(--cv-text-muted, #475569)",
  surface: "var(--cv-background, #ffffff)",
};

const SectionIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  experience: Briefcase,
  education: GraduationCap,
  skills: Code2,
  projects: LayoutPanelLeft,
  certifications: Award,
  languages: Star,
  awards: Award,
};

function formatRange(start?: string, end?: string | null, isCurrent?: boolean) {
  if (!start && !end) return "";
  const endLabel = isCurrent ? "Present" : end || "";
  return [start, endLabel].filter(Boolean).join(" – ");
}

export function QuantumGridTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const showPhoto = settings?.showPhoto ?? true;
  const photoSize = settings?.photoSize ?? 96;
  const photoShape = settings?.photoShape ?? "circle";

  const photoShapeClass = {
    circle: "rounded-full",
    rounded: "rounded-xl",
    square: "rounded",
    none: "hidden",
  }[photoShape];

  return (
    <div
      className="w-full max-w-[820px] bg-white"
      style={{
        fontFamily: 'var(--cv-font-family, "Inter", system-ui, sans-serif)',
        color: bgVars.text,
        padding: "14mm 18mm",
        lineHeight: "1.5",
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl border"
        style={{ borderColor: "rgba(34,211,238,0.3)", background: "linear-gradient(135deg, #0f172a 0%, #0b1220 55%, #0f172a 100%)" }}
      >
        <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.2), transparent 35%), radial-gradient(circle at 80% 30%, rgba(124,58,237,0.25), transparent 40%)" }} />
        <div className="relative flex gap-6 px-7 py-7 text-white">
          {showPhoto && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={cn("object-cover border-2 border-cyan-300/60 shadow-lg shadow-cyan-500/20", photoShapeClass)}
              style={{ width: photoSize, height: photoSize }}
            />
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
                <p className="mt-1 text-lg font-medium text-cyan-200">{personalInfo.headline || "Professional Title"}</p>
              </div>
              <div className="flex gap-2 text-xs text-cyan-100/90">
                <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">Future Ready</span>
                <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10">ATS Friendly</span>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3 text-white/80">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} className="flex items-center gap-2 hover:text-white">
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} className="flex items-center gap-2 hover:text-white">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} className="flex items-center gap-2 hover:text-white">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {personalInfo.summary && (
        <section className="mt-6">
          <div className="rounded-xl border bg-white shadow-sm" style={{ borderColor: "rgba(34,211,238,0.2)" }}>
            <div className="border-b px-5 py-3 text-sm font-semibold" style={{ borderColor: "rgba(124,58,237,0.15)", color: "#0f172a" }}>
              Professional Summary
            </div>
            <p className="px-5 py-4 text-sm" style={{ color: bgVars.muted }}>
              {personalInfo.summary}
            </p>
          </div>
        </section>
      )}

      <div className="mt-6 grid gap-4">
        {sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section) => {
            const Icon = SectionIcon[section.type] || LayoutPanelLeft;
            return (
              <section key={section.id} className="rounded-xl border bg-white shadow-sm" style={{ borderColor: "rgba(34,211,238,0.15)" }}>
                <header className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: "rgba(124,58,237,0.1)" }}>
                  <Icon className="h-4 w-4 text-cyan-600" />
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">{section.title}</h3>
                </header>
                <div className="divide-y" style={{ borderColor: "rgba(15,23,42,0.05)" }}>
                  {section.items.length === 0 && (
                    <p className="px-5 py-4 text-sm text-slate-500">Add content to populate this section.</p>
                  )}
                  {section.items.map((item) => {
                    switch (section.type) {
                      case "experience": {
                        const exp = item as ExperienceItem;
                        return (
                          <div key={exp.id} className="px-5 py-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-slate-900">{exp.role || "Role"}</p>
                                <p className="text-sm text-cyan-700">{exp.company}</p>
                              </div>
                              <span className="text-xs text-slate-500">{formatRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                            </div>
                            {exp.description && <p className="mt-2 text-sm text-slate-600">{exp.description}</p>}
                            {exp.bullets?.length > 0 && (
                              <ul className="mt-2 grid gap-1 text-sm text-slate-700">
                                {exp.bullets.map((b, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }
                      case "education": {
                        const edu = item as EducationItem;
                        return (
                          <div key={edu.id} className="px-5 py-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-slate-900">{edu.degree || "Degree"}</p>
                                <p className="text-sm text-cyan-700">{edu.institution}</p>
                              </div>
                              <span className="text-xs text-slate-500">{formatRange(edu.startDate, edu.endDate, edu.isCurrent)}</span>
                            </div>
                            {edu.fieldOfStudy && <p className="mt-1 text-sm text-slate-600">{edu.fieldOfStudy}</p>}
                            {edu.achievements?.length > 0 && (
                              <ul className="mt-2 grid gap-1 text-sm text-slate-700">
                                {edu.achievements.map((b, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }
                      case "projects": {
                        const proj = item as ProjectItem;
                        return (
                          <div key={proj.id} className="px-5 py-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-base font-semibold text-slate-900">{proj.title || "Project"}</p>
                                {proj.role && <p className="text-sm text-cyan-700">{proj.role}</p>}
                              </div>
                              <span className="text-xs text-slate-500">{formatRange(proj.startDate || undefined, proj.endDate || undefined)}</span>
                            </div>
                            {proj.description && <p className="mt-2 text-sm text-slate-600">{proj.description}</p>}
                            {proj.techStack?.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                                {proj.techStack.map((tech) => (
                                  <span key={tech} className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700 ring-1 ring-cyan-100">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            {proj.highlights?.length > 0 && (
                              <ul className="mt-2 grid gap-1 text-sm text-slate-700">
                                {proj.highlights.map((h, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                    <span>{h}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }
                      case "skills": {
                        const skill = item as SkillItem;
                        return (
                          <div key={skill.id} className="px-5 py-3 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-800">{skill.name}</p>
                              {skill.category && <p className="text-xs text-slate-500">{skill.category}</p>}
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((lvl) => (
                                <span
                                  key={lvl}
                                  className={cn("h-2 w-6 rounded-full", lvl <= (skill.proficiency || 0) ? "bg-cyan-500" : "bg-slate-200")}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      }
                      case "certifications": {
                        const cert = item as CertificationItem;
                        return (
                          <div key={cert.id} className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{cert.name}</p>
                            <p className="text-xs text-slate-500">{cert.issuer} • {cert.issueDate}</p>
                            {cert.description && <p className="mt-1 text-sm text-slate-600">{cert.description}</p>}
                          </div>
                        );
                      }
                      case "languages": {
                        const lang = item as LanguageItem;
                        return (
                          <div key={lang.id} className="px-5 py-3 flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-800">{lang.name}</p>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase text-slate-600">{lang.proficiency}</span>
                          </div>
                        );
                      }
                      case "awards": {
                        const awd = item as AwardItem;
                        return (
                          <div key={awd.id} className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{awd.title}</p>
                            <p className="text-xs text-slate-500">{awd.issuer} • {awd.date}</p>
                            {awd.description && <p className="mt-1 text-sm text-slate-600">{awd.description}</p>}
                          </div>
                        );
                      }
                      case "volunteer": {
                        const vol = item as VolunteerItem;
                        return (
                          <div key={vol.id} className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{vol.role}</p>
                            <p className="text-xs text-slate-500">{vol.organization} • {formatRange(vol.startDate, vol.endDate, vol.isCurrent)}</p>
                            {vol.description && <p className="mt-1 text-sm text-slate-600">{vol.description}</p>}
                          </div>
                        );
                      }
                      case "references": {
                        const ref = item as ReferenceItem;
                        return (
                          <div key={ref.id} className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{ref.name}</p>
                            <p className="text-xs text-slate-500">{ref.title} • {ref.company}</p>
                            {ref.email && <p className="text-xs text-slate-500">{ref.email}</p>}
                          </div>
                        );
                      }
                      case "publications": {
                        const pub = item as PublicationItem;
                        return (
                          <div key={pub.id} className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{pub.title}</p>
                            <p className="text-xs text-slate-500">{pub.publisher} • {pub.date}</p>
                            {pub.description && <p className="mt-1 text-sm text-slate-600">{pub.description}</p>}
                          </div>
                        );
                      }
                      case "interests": {
                        const int = item as InterestItem;
                        return (
                          <div key={int.id} className="px-5 py-3 text-sm text-slate-700">
                            {int.name} {int.description && <span className="text-slate-500">— {int.description}</span>}
                          </div>
                        );
                      }
                      case "about": {
                        const about = item as AboutItem;
                        return (
                          <div key={about.id} className="px-5 py-4 text-sm text-slate-700 whitespace-pre-line">{about.content}</div>
                        );
                      }
                      default: {
                        const custom = item as CustomItem;
                        return (
                          <div key={custom.id} className="px-5 py-4">
                            <p className="text-sm font-semibold text-slate-900">{custom.title}</p>
                            {custom.subtitle && <p className="text-xs text-slate-500">{custom.subtitle}</p>}
                            {custom.description && <p className="mt-1 text-sm text-slate-600">{custom.description}</p>}
                            {custom.bullets?.length > 0 && (
                              <ul className="mt-2 grid gap-1 text-sm text-slate-700">
                                {custom.bullets.map((b, idx) => (
                                  <li key={idx} className="flex gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" />
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
}
