"use client";

/**
 * Executive Luxe Template
 *
 * Premium black and gold executive layout:
 * - Ribbon headline with monogram
 * - Tall sidebar for contact, skills, languages, certifications
 * - Structured main column for experience, projects, education
 * - Minimal serif accents with luxe dividers
 */

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Award,
  Languages,
  Sparkles,
} from "lucide-react";
import type {
  PersonalInfo,
  CVSection,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  AwardItem,
  LanguageItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function ExecutiveLuxeTemplate({ personalInfo, sections }: TemplateProps) {
  const accent = "var(--cv-primary, #c9a14a)";
  const accentSoft = "var(--cv-accent, #e2c79e)";
  const textColor = "var(--cv-text, #e5e7eb)";

  const experienceSections = sections.filter((s) => s.type === "experience" && s.isVisible);
  const projectSections = sections.filter((s) => s.type === "projects" && s.isVisible);
  const educationSections = sections.filter((s) => s.type === "education" && s.isVisible);
  const skillSections = sections.filter((s) => s.type === "skills" && s.isVisible);
  const certificationSections = sections.filter((s) => s.type === "certifications" && s.isVisible);
  const awardSections = sections.filter((s) => s.type === "awards" && s.isVisible);
  const languageSections = sections.filter((s) => s.type === "languages" && s.isVisible);
  const aboutSections = sections.filter((s) => s.type === "about" && s.isVisible);

  const card = "rounded-2xl border border-white/10 bg-white/5";

  return (
    <div
      className="min-h-[1100px] p-6 md:p-10"
      style={{
        background: "radial-gradient(circle at 20% 20%, rgba(201,161,74,0.08), transparent 35%), #0b0c0f",
        color: textColor,
        fontFamily: "var(--cv-font-family, 'Inter', sans-serif)",
      }}
    >
      <div className="grid grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="col-span-1 space-y-6">
          <div className={`${card} p-6 relative overflow-hidden`}>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(135deg, ${accent}11 25%, transparent 25%, transparent 50%, ${accent}11 50%, ${accent}11 75%, transparent 75%, transparent)`,
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold uppercase tracking-tight"
                  style={{ backgroundColor: accent, color: "#0b0c0f" }}
                >
                  {personalInfo.fullName?.slice(0, 2) || "CV"}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="break-words text-xl font-semibold text-white">{personalInfo.fullName || "Your Name"}</h1>
                  <p className="break-words text-sm text-white/60">{personalInfo.headline || "Executive Leader"}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-white/70">
                {personalInfo.email && (
                  <div className="flex min-w-0 items-center gap-2">
                    <Mail className="h-4 w-4" style={{ color: accent }} />
                    <span className="break-words">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex min-w-0 items-center gap-2">
                    <Phone className="h-4 w-4" style={{ color: accent }} />
                    <span className="break-words">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex min-w-0 items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: accent }} />
                    <span className="break-words">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex min-w-0 items-center gap-2">
                    <Globe className="h-4 w-4" style={{ color: accent }} />
                    <span className="break-words">{personalInfo.website}</span>
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  {personalInfo.linkedinUrl && (
                    <a href={personalInfo.linkedinUrl} className="rounded-full border border-white/10 p-2 hover:border-white/30">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {personalInfo.githubUrl && (
                    <a href={personalInfo.githubUrl} className="rounded-full border border-white/10 p-2 hover:border-white/30">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {personalInfo.twitterUrl && (
                    <a href={personalInfo.twitterUrl} className="rounded-full border border-white/10 p-2 hover:border-white/30">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {skillSections.map((section) => (
            <section key={section.id} className={`${card} p-5`}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                  <Sparkles className="h-4 w-4" style={{ color: accent }} />
                  {section.title}
                </div>
                <div className="h-px flex-1 ml-3" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
              </div>
              <div className="space-y-3">
                {(section.items as SkillItem[]).map((skill) => (
                  <div key={skill.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm text-white/80">
                      <span>{skill.name}</span>
                      <span className="text-xs text-white/60">{skill.proficiency}/5</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full shadow-[0_0_0_1px_rgba(201,161,74,0.35)]"
                        style={{
                          width: `${Math.min(100, (skill.proficiency / 5) * 100)}%`,
                          background: `linear-gradient(90deg, ${accent}, ${accentSoft})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {languageSections.map((section) => (
            <section key={section.id} className={`${card} p-5`}>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                <Languages className="h-4 w-4" style={{ color: accent }} />
                {section.title}
              </div>
              <div className="space-y-2 text-sm text-white/80">
                {(section.items as LanguageItem[]).map((lang) => (
                  <div key={lang.id} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                    <span>{lang.name}</span>
                    <span className="text-xs text-white/60 uppercase tracking-[0.2em]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {certificationSections.map((section) => (
            <section key={section.id} className={`${card} p-5`}>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                <Award className="h-4 w-4" style={{ color: accent }} />
                {section.title}
              </div>
              <div className="space-y-3 text-sm text-white/80">
                {(section.items as CertificationItem[]).map((cert) => (
                  <div key={cert.id} className="rounded-xl border border-white/10 px-3 py-2">
                    <p className="font-semibold text-white">{cert.name}</p>
                    <p className="text-xs text-white/60">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {awardSections.map((section) => (
            <section key={section.id} className={`${card} p-5`}>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70">
                <Award className="h-4 w-4" style={{ color: accent }} />
                {section.title}
              </div>
              <div className="space-y-3 text-sm text-white/80">
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
        </aside>

        {/* Main content */}
        <main className="col-span-2 space-y-6">
          <section className={`${card} p-6`}>
            <div className="flex flex-wrap items-center gap-4">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-semibold uppercase tracking-tight"
                style={{ backgroundColor: accent, color: "#0b0c0f" }}
              >
                {personalInfo.fullName?.slice(0, 2) || "CV"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Executive Profile</p>
                <h2 className="break-words text-3xl font-semibold text-white">{personalInfo.fullName || "Your Name"}</h2>
                <p className="break-words text-sm text-white/70">{personalInfo.headline || "Executive Leader"}</p>
              </div>
            </div>
          </section>

          <section className={`${card} p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 rounded-full" style={{ background: accent }} />
                <div>
                  <h2 className="text-2xl font-semibold text-white">Profile</h2>
                  <p className="text-sm text-white/60">Concise narrative of value delivered</p>
                </div>
              </div>
            </div>
            <p className="mt-4 break-words text-base leading-relaxed text-white/80">
              {personalInfo.summary ||
                aboutSections
                  .flatMap((section) => section.items || [])
                  .map((item) => (item as { content?: string }).content)
                  .filter(Boolean)
                  .join(" ") ||
                "Use this space to articulate your leadership thesis and differentiators."}
            </p>
          </section>

          {experienceSections.map((section) => (
            <section key={section.id} className={`${card} p-6`}>
              <div className="mb-5 flex items-center gap-3">
                <Briefcase className="h-5 w-5" style={{ color: accent }} />
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              <div className="space-y-6">
                {(section.items as ExperienceItem[]).map((item) => (
                  <div key={item.id} className="border-l border-white/15 pl-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                        <p className="text-sm text-white/70">{item.company}</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                        {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                      </span>
                    </div>
                    {item.location && <p className="text-xs text-white/50 uppercase tracking-[0.2em]">{item.location}</p>}
                    {item.description && <p className="mt-2 break-words text-sm text-white/80">{item.description}</p>}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1 text-sm text-white/80">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1 block h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
                            <span className="break-words">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {projectSections.map((section) => (
            <section key={section.id} className={`${card} p-6`}>
              <div className="mb-5 flex items-center gap-3">
                <FolderOpen className="h-5 w-5" style={{ color: accent }} />
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {(section.items as ProjectItem[]).map((project) => (
                  <div key={project.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-white/70">{project.role}</p>
                      </div>
                      <div className="flex gap-2 text-xs text-white/70">
                        {project.liveUrl && <a href={project.liveUrl} className="underline">Live</a>}
                        {project.githubUrl && <a href={project.githubUrl} className="underline">Code</a>}
                      </div>
                    </div>
                    {project.description && <p className="mt-2 break-words text-sm text-white/80">{project.description}</p>}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                            style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
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
          ))}

          {educationSections.map((section) => (
            <section key={section.id} className={`${card} p-6`}>
              <div className="mb-5 flex items-center gap-3">
                <GraduationCap className="h-5 w-5" style={{ color: accent }} />
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {(section.items as EducationItem[]).map((edu) => (
                  <div key={edu.id} className="flex flex-wrap items-center justify-between gap-2 border-l border-white/15 pl-5">
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
          ))}
        </main>
      </div>
    </div>
  );
}
