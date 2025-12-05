"use client";

import React from "react";
import { BadgeCheck, Cpu, Github, Globe2, MapPin, Mail, Phone, Sparkles, Zap } from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  SkillItem,
  CertificationItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

const fallbackPrimary = "#8b5cf6";
const fallbackAccent = "#22d3ee";
const fallbackBg = "#050712";
const fallbackText = "#e5e7eb";

const cardClass = "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl";

export function AetherSynthTemplate({ personalInfo, sections }: TemplateProps) {
  const primary = "var(--cv-primary, " + fallbackPrimary + ")";
  const accent = "var(--cv-accent, " + fallbackAccent + ")";
  const text = "var(--cv-text, " + fallbackText + ")";
  const textMuted = "var(--cv-text-muted, #9ca3af)";

  const contactItems = [
    personalInfo.email && { icon: <Mail className="h-4 w-4" />, label: personalInfo.email },
    personalInfo.phone && { icon: <Phone className="h-4 w-4" />, label: personalInfo.phone },
    personalInfo.location && { icon: <MapPin className="h-4 w-4" />, label: personalInfo.location },
    personalInfo.website && { icon: <Globe2 className="h-4 w-4" />, label: personalInfo.website.replace(/^https?:\/\//, "") },
    personalInfo.githubUrl && { icon: <Github className="h-4 w-4" />, label: "GitHub" },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  const experience = sections.find((s) => s.type === "experience" && s.isVisible)?.items as ExperienceItem[] | undefined;
  const projects = sections.find((s) => s.type === "projects" && s.isVisible)?.items as ProjectItem[] | undefined;
  const education = sections.find((s) => s.type === "education" && s.isVisible)?.items as EducationItem[] | undefined;
  const skills = sections.find((s) => s.type === "skills" && s.isVisible)?.items as SkillItem[] | undefined;
  const certifications = sections.find((s) => s.type === "certifications" && s.isVisible)?.items as CertificationItem[] | undefined;
  const languages = sections.find((s) => s.type === "languages" && s.isVisible)?.items as LanguageItem[] | undefined;

  return (
    <div
      className="min-h-[1100px]"
      style={{
        fontFamily: "var(--cv-font-family, 'Space Grotesk', 'Inter', system-ui, sans-serif)",
        background: "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.08), transparent 30%), radial-gradient(circle at 80% 10%, rgba(139,92,246,0.12), transparent 35%), radial-gradient(circle at 50% 70%, rgba(59,130,246,0.1), transparent 40%)",
        color: text,
        padding: "var(--cv-margin-top, 18mm) var(--cv-margin-right, 18mm) var(--cv-margin-bottom, 18mm) var(--cv-margin-left, 18mm)",
        backgroundColor: "var(--cv-background, " + fallbackBg + ")",
      }}
    >
      <div className={`${cardClass} overflow-hidden`}>
        <div
          className="relative p-8"
          style={{
            background: `linear-gradient(135deg, ${primary}, ${accent})`,
            color: "#0b1021",
          }}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/80">Aether Synth</p>
              <h1 className="text-3xl font-semibold leading-tight">{personalInfo.fullName || "Your Name"}</h1>
              <p className="mt-2 text-base text-white/80">{personalInfo.headline || "Futuristic Professional"}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-white">
              {contactItems.map((item, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                  {item.icon}
                  {item.label}
                </span>
              ))}
            </div>
          </div>
          {personalInfo.summary && (
            <p className="relative mt-4 max-w-3xl text-sm text-white/80">
              {personalInfo.summary}
            </p>
          )}
        </div>

        <div className="grid gap-6 p-8 md:grid-cols-3" style={{ color: text }}>
          <div className="md:col-span-2 space-y-6">
            {experience && experience.length > 0 && (
              <section className={`${cardClass} border-white/5 bg-white/0 p-6`}>
                <header className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  <Cpu className="h-4 w-4 text-white/70" /> Experience
                </header>
                <div className="mt-4 space-y-5">
                  {experience.map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/5 bg-white/5 p-4">
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-lg font-semibold" style={{ color: primary }}>{item.role || "Role"}</p>
                          <p className="text-sm text-white/70">{item.company} {item.location && `· ${item.location}`}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                          {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                        </p>
                      </div>
                      {item.bullets && item.bullets.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm text-white/80">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        item.description && <p className="mt-3 text-sm text-white/70">{item.description}</p>
                      )}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="rounded-full bg-white/10 px-2 py-1 text-white/80">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects && projects.length > 0 && (
              <section className={`${cardClass} border-white/5 bg-white/0 p-6`}>
                <header className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  <Sparkles className="h-4 w-4 text-white/70" /> Projects
                </header>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {projects.map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/5 bg-gradient-to-br from-white/10 to-white/0 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold" style={{ color: primary }}>{item.title || "Project"}</p>
                          <p className="text-sm text-white/70">{item.role || "Owner"}</p>
                        </div>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-white/70">{item.status || "Built"}</span>
                      </div>
                      {item.description && <p className="mt-2 text-sm text-white/80">{item.description}</p>}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="rounded border border-white/10 bg-white/5 px-2 py-1">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            {skills && skills.length > 0 && (
              <section className={`${cardClass} border-white/5 bg-white/0 p-5`}>
                <header className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/60">
                  <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-white/70" /> Skills Matrix</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] text-white/70">{skills.length} items</span>
                </header>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {skills.map((skill) => (
                    <span key={skill.id} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white/80">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education && education.length > 0 && (
              <section className={`${cardClass} border-white/5 bg-white/0 p-5`}>
                <header className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
                  <BadgeCheck className="h-4 w-4 text-white/70" /> Education
                </header>
                <div className="mt-3 space-y-3 text-sm text-white/80">
                  {education.map((item) => (
                    <div key={item.id} className="rounded-lg border border-white/5 bg-white/5 p-3">
                      <p className="font-semibold" style={{ color: primary }}>{item.institution}</p>
                      <p className="text-white/70">{item.degree} {item.fieldOfStudy && `· ${item.fieldOfStudy}`}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className={`${cardClass} border-white/5 bg-white/0 p-5`}>
                <header className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
                  <BadgeCheck className="h-4 w-4 text-white/70" /> Certifications
                </header>
                <div className="mt-3 space-y-2 text-sm text-white/80">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                      <div>
                        <p className="font-semibold" style={{ color: primary }}>{cert.name}</p>
                        <p className="text-xs text-white/60">{cert.issuer}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">{cert.issueDate}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section className={`${cardClass} border-white/5 bg-white/0 p-5`}>
                <header className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60">
                  <Globe2 className="h-4 w-4 text-white/70" /> Languages
                </header>
                <div className="mt-3 space-y-2 text-sm">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                      <span className="font-semibold" style={{ color: primary }}>{lang.name}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/60">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
