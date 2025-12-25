"use client";

import React from "react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { Mail, Phone, MapPin, Globe2, Briefcase, Award, Layers } from "lucide-react";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

const primary = "var(--cv-primary, #2563eb)";
const text = "var(--cv-text, #0f172a)";

const chip = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em]";

export function CobaltPrecisionTemplate({ personalInfo, sections }: TemplateProps) {
  const experience = sections.find((s) => s.type === "experience" && s.isVisible)?.items as ExperienceItem[] | undefined;
  const projects = sections.find((s) => s.type === "projects" && s.isVisible)?.items as ProjectItem[] | undefined;
  const education = sections.find((s) => s.type === "education" && s.isVisible)?.items as EducationItem[] | undefined;
  const skills = sections.find((s) => s.type === "skills" && s.isVisible)?.items as SkillItem[] | undefined;
  const certifications = sections.find((s) => s.type === "certifications" && s.isVisible)?.items as CertificationItem[] | undefined;

  return (
    <div
      className="min-h-[1100px] bg-white"
      style={{
        fontFamily: "var(--cv-font-family, 'Satoshi', 'Inter', system-ui, sans-serif)",
        color: text,
        padding: "var(--cv-margin-top, 18mm) var(--cv-margin-right, 18mm) var(--cv-margin-bottom, 18mm) var(--cv-margin-left, 18mm)",
      }}
    >
      <div className="overflow-hidden rounded-[28px] border border-slate-200 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
        <header className="relative overflow-hidden bg-slate-900 px-10 py-10 text-white">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(120deg, rgba(37,99,235,0.35), rgba(6,182,212,0.35))" }} />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">Precision Profile</p>
              <h1 className="mt-1 text-4xl font-semibold leading-tight">{personalInfo.fullName || "Your Name"}</h1>
              <p className="mt-2 text-lg text-white/70">{personalInfo.headline || "Strategic Professional"}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              {personalInfo.email && <span className={`${chip} border-white/20 bg-white/10`}><Mail className="h-4 w-4" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className={`${chip} border-white/20 bg-white/10`}><Phone className="h-4 w-4" />{personalInfo.phone}</span>}
              {personalInfo.location && <span className={`${chip} border-white/20 bg-white/10`}><MapPin className="h-4 w-4" />{personalInfo.location}</span>}
              {personalInfo.website && <span className={`${chip} border-white/20 bg-white/10`}><Globe2 className="h-4 w-4" />{personalInfo.website.replace(/^https?:\/\//, "")}</span>}
            </div>
          </div>
          {personalInfo.summary && (
            <p className="relative mt-4 max-w-3xl text-sm text-white/70">{personalInfo.summary}</p>
          )}
        </header>

        <div className="grid gap-10 bg-white px-10 py-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            {experience && experience.length > 0 && (
              <section>
                <SectionTitle icon={<Briefcase className="h-5 w-5" />} label="Experience" />
                <div className="mt-4 space-y-5">
                  {experience.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold" style={{ color: primary }}>{item.role || "Role"}</h3>
                          <p className="text-sm text-slate-600">{item.company}{item.location && ` · ${item.location}`}</p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                      </div>
                      {item.bullets && item.bullets.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm text-slate-700">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="mt-[6px] h-[6px] w-[6px] rounded-full" style={{ backgroundColor: primary }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : item.description ? (
                        <p className="mt-3 text-sm text-slate-700">{item.description}</p>
                      ) : null}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">{tech}</span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {projects && projects.length > 0 && (
              <section>
                <SectionTitle icon={<Layers className="h-5 w-5" />} label="Highlighted Projects" />
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {projects.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h4 className="text-lg font-semibold" style={{ color: primary }}>{item.title || "Project"}</h4>
                          <p className="text-sm text-slate-600">{item.role || "Lead"}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-600">Built</span>
                      </div>
                      {item.description && <p className="mt-2 text-sm text-slate-700">{item.description}</p>}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">{tech}</span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-7">
            {skills && skills.length > 0 && (
              <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <SectionTitle icon={<Layers className="h-4 w-4" />} label="Skills" subtle />
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700">
                  {skills.map((skill) => (
                    <span key={skill.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education && education.length > 0 && (
              <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <SectionTitle icon={<Award className="h-4 w-4" />} label="Education" subtle />
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  {education.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <p className="font-semibold" style={{ color: primary }}>{item.institution}</p>
                      <p className="text-slate-600">{item.degree}{item.fieldOfStudy && ` · ${item.fieldOfStudy}`}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="rounded-2xl border border-slate-200 p-5 shadow-sm">
                <SectionTitle icon={<Award className="h-4 w-4" />} label="Certifications" subtle />
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="font-semibold" style={{ color: primary }}>{cert.name}</p>
                        <p className="text-xs text-slate-500">{cert.issuer}</p>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{cert.issueDate}</span>
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

interface SectionTitleProps {
  icon: React.ReactNode;
  label: string;
  subtle?: boolean;
}

function SectionTitle({ icon, label, subtle }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex h-9 w-9 items-center justify-center rounded-full ${subtle ? "bg-slate-100" : "bg-slate-900"}`}>
        <span className={`${subtle ? "text-slate-600" : "text-white"}`}>{icon}</span>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{label}</p>
        {!subtle && <div className="h-0.5 w-10 rounded-full" style={{ backgroundColor: primary }} />}
      </div>
    </div>
  );
}
