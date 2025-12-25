"use client";

import React from "react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  LanguageItem,
  CertificationItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { CircleDot, Globe2, Mail, MapPin, Phone, Sparkles } from "lucide-react";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

const basePrimary = "var(--cv-primary, #f97316)";
const baseAccent = "var(--cv-secondary, #7c3aed)";
const baseSurface = "rgba(255,255,255,0.07)";
const text = "var(--cv-text, #e2e8f0)";
const textMuted = "var(--cv-text-muted, #cbd5e1)";

export function HeliosStrataTemplate({ personalInfo, sections }: TemplateProps) {
  const experience = sections.find((s) => s.type === "experience" && s.isVisible)?.items as ExperienceItem[] | undefined;
  const projects = sections.find((s) => s.type === "projects" && s.isVisible)?.items as ProjectItem[] | undefined;
  const education = sections.find((s) => s.type === "education" && s.isVisible)?.items as EducationItem[] | undefined;
  const skills = sections.find((s) => s.type === "skills" && s.isVisible)?.items as SkillItem[] | undefined;
  const languages = sections.find((s) => s.type === "languages" && s.isVisible)?.items as LanguageItem[] | undefined;
  const certifications = sections.find((s) => s.type === "certifications" && s.isVisible)?.items as CertificationItem[] | undefined;

  // Graceful placeholders so the layout stays visible even when data is sparse.
  const fallbackExperience: ExperienceItem[] = [
    {
      id: "exp-fallback-1",
      company: "Company",
      role: "Role",
      location: "City",
      startDate: "2022",
      endDate: "2024",
      isCurrent: false,
      description: "Describe your impact and responsibilities in this role.",
      bullets: ["Key achievement or metric"],
      techStack: ["Skill", "Tool"],
    },
  ];

  const fallbackProject: ProjectItem[] = [
    {
      id: "proj-fallback-1",
      title: "Project Name",
      description: "Briefly describe what you built and the outcome.",
      role: "Owner",
      startDate: null,
      endDate: null,
      techStack: ["Tech", "Stack"],
      liveUrl: "",
      githubUrl: "",
      imageUrl: null,
      highlights: [],
    },
  ];

  const fallbackEducation: EducationItem[] = [
    {
      id: "edu-fallback-1",
      institution: "University",
      degree: "Degree",
      fieldOfStudy: "Field",
      location: "City",
      startDate: "2018",
      endDate: "2022",
      isCurrent: false,
      gpa: "",
      description: "",
      achievements: [],
    },
  ];

  const fallbackSkills: SkillItem[] = [
    { id: "skill-1", name: "Design", category: "Core", proficiency: 4 },
    { id: "skill-2", name: "Leadership", category: "Core", proficiency: 4 },
    { id: "skill-3", name: "Systems", category: "Core", proficiency: 4 },
  ];

  const fallbackLanguages: LanguageItem[] = [
    { id: "lang-1", name: "English", proficiency: "fluent" },
  ];

  const fallbackCerts: CertificationItem[] = [
    {
      id: "cert-1",
      name: "Certification",
      issuer: "Issuer",
      issueDate: "2023",
      expiryDate: null,
      credentialId: "",
      credentialUrl: "",
    },
  ];

  const expList = experience && experience.length > 0 ? experience : fallbackExperience;
  const projectList = projects && projects.length > 0 ? projects : fallbackProject;
  const eduList = education && education.length > 0 ? education : fallbackEducation;
  const skillList = skills && skills.length > 0 ? skills : fallbackSkills;
  const languageList = languages && languages.length > 0 ? languages : fallbackLanguages;
  const certList = certifications && certifications.length > 0 ? certifications : fallbackCerts;

  return (
    <div
      className="min-h-[1100px] bg-[#0b0d16]"
      style={{
        fontFamily: "var(--cv-font-family, 'General Sans', 'Inter', system-ui, sans-serif)",
        color: text,
        padding: "var(--cv-margin-top, 18mm) var(--cv-margin-right, 18mm) var(--cv-margin-bottom, 18mm) var(--cv-margin-left, 18mm)",
        backgroundImage: `linear-gradient(135deg, rgba(124,58,237,0.12), transparent 35%), radial-gradient(circle at 20% 20%, rgba(249,115,22,0.16), transparent 30%)`,
      }}
    >
      <div className="mx-auto max-w-[980px] overflow-hidden rounded-[30px] border border-white/10 bg-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="relative flex flex-col gap-6 border-b border-white/10 bg-black/60 px-10 py-10">
          <div className="absolute inset-0 opacity-50" style={{ background: `linear-gradient(120deg, ${basePrimary}, ${baseAccent})`, filter: "blur(90px)" }} />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">Helios Strata</p>
              <h1 className="mt-2 text-4xl font-semibold text-white" style={{ textShadow: "0 6px 30px rgba(0,0,0,0.35)" }}>{personalInfo.fullName || "Your Name"}</h1>
              <p className="mt-1 text-lg text-white/80">{personalInfo.headline || "Advanced Professional"}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-white/80">
              {personalInfo.email && <Chip icon={<Mail className="h-4 w-4" />} label={personalInfo.email} tone="bright" />}
              {personalInfo.phone && <Chip icon={<Phone className="h-4 w-4" />} label={personalInfo.phone} tone="bright" />}
              {personalInfo.location && <Chip icon={<MapPin className="h-4 w-4" />} label={personalInfo.location} tone="bright" />}
              {personalInfo.website && <Chip icon={<Globe2 className="h-4 w-4" />} label={personalInfo.website.replace(/^https?:\/\//, "")} tone="bright" />}
            </div>
          </div>
          {personalInfo.summary && (
            <p className="relative z-10 max-w-4xl text-sm text-white/85">
              {personalInfo.summary}
            </p>
          )}
        </div>

        <div className="grid gap-8 px-10 py-10 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            {expList.length > 0 && (
              <section className="space-y-4">
                <SectionHeading title="Experience" />
                <div className="space-y-5">
                  {expList.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-lg text-left">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-0.5">
                          <h3 className="text-xl font-semibold leading-tight" style={{ color: basePrimary }}>{item.role || "Role"}</h3>
                          <p className="text-sm text-white/70 break-words">{item.company}{item.location && ` · ${item.location}`}</p>
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-white/65 whitespace-nowrap">{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                      </div>
                      {item.description && <p className="mt-3 text-sm leading-relaxed text-white/85 break-words">{item.description}</p>}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/80">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2 break-words">
                              <span className="mt-[6px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ backgroundColor: baseAccent }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {projectList.length > 0 && (
              <section className="space-y-4">
                <SectionHeading title="Projects" />
                <div className="grid gap-4 md:grid-cols-2">
                  {projectList.map((item) => (
                    <article key={item.id} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/12 to-white/5 p-5 shadow-lg text-left">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <h4 className="text-lg font-semibold leading-tight" style={{ color: basePrimary }}>{item.title || "Project"}</h4>
                          <p className="text-sm text-white/70 break-words">{item.role || "Lead"}</p>
                        </div>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70 whitespace-nowrap">Built</span>
                      </div>
                      {item.description && <p className="mt-2 text-sm leading-relaxed text-white/85 break-words">{item.description}</p>}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/80">
                          {item.techStack.map((tech, idx) => (
                            <span key={idx} className="rounded-full border border-white/10 bg-white/10 px-2 py-1">{tech}</span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            {skillList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-lg">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/60">
                  <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-white/70" /> Skills Grid</span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-white/70">{skillList.length}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/90">
                  {skillList.map((skill) => (
                    <span key={skill.id} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 break-words">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {certList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-lg">
                <SectionHeading title="Certifications" small />
                <div className="mt-3 space-y-2 text-sm text-white/90">
                  {certList.map((cert) => (
                    <div key={cert.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                      <div className="space-y-0.5">
                        <p className="font-semibold leading-tight" style={{ color: basePrimary }}>{cert.name}</p>
                        <p className="text-xs text-white/70 break-words">{cert.issuer}</p>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">{cert.issueDate}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {eduList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-lg">
                <SectionHeading title="Education" small />
                <div className="mt-3 space-y-3 text-sm text-white/90">
                  {eduList.map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-left">
                      <p className="font-semibold leading-tight" style={{ color: basePrimary }}>{item.institution}</p>
                      <p className="text-white/70 break-words">{item.degree}{item.fieldOfStudy && ` · ${item.fieldOfStudy}`}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">{item.startDate} – {item.isCurrent ? "Present" : item.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languageList.length > 0 && (
              <section className="rounded-2xl border border-white/10 bg-black/35 p-5 shadow-lg">
                <SectionHeading title="Languages" small />
                <div className="mt-3 space-y-2 text-sm text-white/90">
                  {languageList.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                      <span className="font-semibold" style={{ color: baseAccent }}>{lang.name}</span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">{lang.proficiency}</span>
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

interface ChipProps {
  icon: React.ReactNode;
  label: string;
  tone?: "bright" | "muted";
}

function Chip({ icon, label, tone = "muted" }: ChipProps) {
  const styles = tone === "bright" ? "border-white/20 bg-white/10 text-white" : "border-white/10 bg-black/30 text-white/70";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${styles}`} style={{ maxWidth: "240px" }}>
      {icon}
      <span className="truncate">{label}</span>
    </span>
  );
}

interface SectionHeadingProps {
  title: string;
  small?: boolean;
}

function SectionHeading({ title, small }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 text-white">
      <CircleDot className="h-4 w-4" style={{ color: baseAccent }} />
      <span className={`${small ? "text-[11px]" : "text-xs"} uppercase tracking-[0.28em] text-white/60`}>{title}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
    </div>
  );
}
