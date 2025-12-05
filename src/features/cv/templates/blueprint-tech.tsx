"use client";

/**
 * Blueprint Tech Template
 *
 * Technical blueprint-inspired layout:
 * - Blueprint grid background with neon corners
 * - Strong hierarchy with numbered section badges
 * - Mixed single/two-column layout optimized for readability
 * - Tag rails for projects and skills
 */

import type React from "react";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter, Briefcase, GraduationCap, FolderOpen, Award, Code, CircleDot } from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  AwardItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}

function BlueprintContactRow({ icon, label, value, accent }: ContactRowProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/80">
      <span className="rounded-md bg-white/5 p-2 shrink-0" style={{ color: accent }}>
        {icon}
      </span>
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{label}</span>
        <span className="break-words">{value}</span>
      </div>
    </div>
  );
}

export function BlueprintTechTemplate({ personalInfo, sections }: TemplateProps) {
  const primary = "var(--cv-primary, #1e3a8a)";
  const accent = "var(--cv-accent, #38bdf8)";
  const text = "var(--cv-text, #e5e7eb)";

  const experienceSections = sections.filter((s) => s.type === "experience" && s.isVisible);
  const projectSections = sections.filter((s) => s.type === "projects" && s.isVisible);
  const educationSections = sections.filter((s) => s.type === "education" && s.isVisible);
  const skillSections = sections.filter((s) => s.type === "skills" && s.isVisible);
  const certificationSections = sections.filter((s) => s.type === "certifications" && s.isVisible);
  const awardSections = sections.filter((s) => s.type === "awards" && s.isVisible);

  const card =
    "rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur";

  return (
    <div
      className="min-h-[1100px] p-10"
      style={{
        backgroundColor: "#0a1020",
        color: text,
        fontFamily: "var(--cv-font-family, 'Inter', sans-serif)",
        backgroundImage: `
          radial-gradient(circle at 16% 20%, ${primary}22, transparent 32%),
          radial-gradient(circle at 84% 12%, ${accent}18, transparent 28%),
          linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c1226]/80 p-8 shadow-2xl">
        {/* Accent corners */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-1 -top-1 h-8 w-8 border-l-2 border-t-2" style={{ borderColor: accent }} />
          <div className="absolute -right-1 -top-1 h-8 w-8 border-r-2 border-t-2" style={{ borderColor: accent }} />
          <div className="absolute -left-1 -bottom-1 h-8 w-8 border-l-2 border-b-2" style={{ borderColor: accent }} />
          <div className="absolute -right-1 -bottom-1 h-8 w-8 border-r-2 border-b-2" style={{ borderColor: accent }} />
        </div>

        {/* Header */}
        <header className="grid grid-cols-1 gap-6 pb-6 md:grid-cols-3">
          <div className="col-span-1 space-y-2 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Blueprint CV</p>
            <h1 className="break-words text-4xl font-semibold text-white">{personalInfo.fullName || "Your Name"}</h1>
            <p className="break-words text-lg text-white/70">{personalInfo.headline || "Technical Leader"}</p>
          </div>
          <div className="flex min-w-0 flex-col gap-3 text-sm text-white/80">
            {personalInfo.email && (
              <BlueprintContactRow icon={<Mail className="h-4 w-4" />} label="Email" value={personalInfo.email} accent={accent} />
            )}
            {personalInfo.phone && (
              <BlueprintContactRow icon={<Phone className="h-4 w-4" />} label="Phone" value={personalInfo.phone} accent={accent} />
            )}
            {personalInfo.location && (
              <BlueprintContactRow icon={<MapPin className="h-4 w-4" />} label="Location" value={personalInfo.location} accent={accent} />
            )}
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="space-y-5">
            <div className={`${card} p-5`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  <Code className="h-4 w-4" style={{ color: accent }} />
                  Skills
                </div>
                <div className="h-px flex-1 ml-3" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              </div>
              {skillSections.length === 0 && (
                <p className="text-sm text-white/60">Showcase your core capabilities here.</p>
              )}
              {skillSections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <p className="text-sm font-semibold text-white">{section.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {(section.items as SkillItem[]).map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80"
                        style={{ boxShadow: `0 0 0 1px ${accent}30` }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {certificationSections.map((section) => (
              <section key={section.id} className={`${card} p-5`}>
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  <Award className="h-4 w-4" style={{ color: accent }} />
                  {section.title}
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  {(section.items as CertificationItem[]).map((cert) => (
                    <div key={cert.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="font-semibold text-white">{cert.name}</p>
                      <p className="text-xs text-white/60">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {awardSections.map((section) => (
              <section key={section.id} className={`${card} p-5`}>
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                  <Award className="h-4 w-4" style={{ color: accent }} />
                  {section.title}
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  {(section.items as AwardItem[]).map((award) => (
                    <div key={award.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                      <div>
                        <p className="font-semibold text-white">{award.title}</p>
                        <p className="text-xs text-white/60">{award.issuer}</p>
                      </div>
                      {award.date && <span className="text-xs text-white/60">{award.date}</span>}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <div className={`${card} p-5`}>
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                <CircleDot className="h-4 w-4" style={{ color: accent }} />
                Links
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-white/80">
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 hover:border-white/30"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 hover:border-white/30"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                )}
                {personalInfo.twitterUrl && (
                  <a
                    href={personalInfo.twitterUrl}
                    className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 hover:border-white/30"
                  >
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </a>
                )}
                {personalInfo.website && (
                  <a
                    href={personalInfo.website}
                    className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 hover:border-white/30"
                  >
                    <Globe className="h-4 w-4" />
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="col-span-2 space-y-6">
            <section className={`${card} p-6`}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  style={{ background: accent }}
                >
                  01
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" style={{ color: accent }} />
                  <div>
                    <h2 className="text-xl font-semibold text-white">Experience</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Impact & delivery</p>
                  </div>
                </div>
              </div>
              {experienceSections.length === 0 && (
                <p className="mt-4 text-sm text-white/60">Add experience entries to unlock this section.</p>
              )}
              <div className="mt-5 space-y-5">
                {experienceSections.flatMap((section) => section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id} className="grid grid-cols-[10px_1fr] gap-4">
                    <div className="relative flex justify-center">
                      <div className="w-px rounded-full bg-white/15" />
                      <div
                        className="absolute -left-[6px] top-0 h-3 w-3 rounded-full border border-white/50"
                        style={{ background: accent }}
                      />
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                          <p className="text-sm text-white/70">{item.company}</p>
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                          {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                        </span>
                      </div>
                      {item.description && <p className="mt-2 text-sm text-white/80">{item.description}</p>}
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="mt-2 space-y-1 text-sm text-white/80">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1 block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className={`${card} p-6`}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  style={{ background: accent }}
                >
                  02
                </div>
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" style={{ color: accent }} />
                  <div>
                    <h2 className="text-xl font-semibold text-white">Projects</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Selected builds</p>
                  </div>
                </div>
              </div>
              {projectSections.length === 0 && (
                <p className="mt-4 text-sm text-white/60">Highlight projects that prove your impact.</p>
              )}
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {projectSections.flatMap((section) => section.items as ProjectItem[]).map((project) => (
                  <div key={project.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-white/70">{project.role}</p>
                      </div>
                      <div className="flex gap-2 text-xs text-white/70">
                        {project.liveUrl && <a href={project.liveUrl} className="underline">Live</a>}
                        {project.githubUrl && <a href={project.githubUrl} className="underline">Code</a>}
                      </div>
                    </div>
                    {project.description && <p className="mt-2 text-sm text-white/80">{project.description}</p>}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                            style={{ boxShadow: `0 0 0 1px ${accent}30` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className={`${card} p-6`}>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-white"
                  style={{ background: accent }}
                >
                  03
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" style={{ color: accent }} />
                  <div>
                    <h2 className="text-xl font-semibold text-white">Education</h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">Foundations</p>
                  </div>
                </div>
              </div>
              {educationSections.length === 0 && (
                <p className="mt-4 text-sm text-white/60">Add your academic foundation.</p>
              )}
              <div className="mt-4 space-y-4">
                {educationSections.flatMap((section) => section.items as EducationItem[]).map((edu) => (
                  <div key={edu.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white/5 p-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                      <p className="text-sm text-white/70">{edu.institution}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                      {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
