"use client";

/**
 * Aurora Halo Template
 *
 * Futuristic premium layout with holographic glow:
 * - Gradient mesh background with blurred halos
 * - Two-column grid with glass cards
 * - Timeline experience rail with neon markers
 * - Gradient progress bars for skills
 * - Pill-shaped tags for projects and languages
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
  Star,
  Code2,
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

export function AuroraHaloTemplate({ personalInfo, sections }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #7c3aed)";
  const secondaryColor = "var(--cv-secondary, #22d3ee)";
  const accentColor = "var(--cv-accent, #a855f7)";
  const textColor = "var(--cv-text, #e5e7eb)";

  const experienceSections = sections.filter((s) => s.type === "experience" && s.isVisible);
  const educationSections = sections.filter((s) => s.type === "education" && s.isVisible);
  const projectSections = sections.filter((s) => s.type === "projects" && s.isVisible);
  const skillSections = sections.filter((s) => s.type === "skills" && s.isVisible);
  const certificationSections = sections.filter((s) => s.type === "certifications" && s.isVisible);
  const awardSections = sections.filter((s) => s.type === "awards" && s.isVisible);
  const languageSections = sections.filter((s) => s.type === "languages" && s.isVisible);
  const aboutSections = sections.filter((s) => s.type === "about" && s.isVisible);
  const otherSections = sections.filter(
    (s) =>
      ![
        "experience",
        "education",
        "projects",
        "skills",
        "certifications",
        "awards",
        "languages",
        "about",
      ].includes(s.type) && s.isVisible
  );

  const cardClasses =
    "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur";

  return (
    <div
      className="relative min-h-[1100px] p-6 md:p-10"
      style={{
        backgroundColor: "var(--cv-background, #0b1220)",
        color: textColor,
        fontFamily: "var(--cv-font-family, 'Inter', sans-serif)",
      }}
    >
      {/* Ambient halos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full blur-3xl opacity-50" style={{ background: primaryColor }} />
        <div className="absolute -right-16 top-24 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: secondaryColor }} />
        <div className="absolute left-1/3 bottom-0 h-60 w-60 rounded-full blur-3xl opacity-30" style={{ background: accentColor }} />
      </div>

      <div className="relative space-y-8">
        {/* Header */}
        <header className={`${cardClasses} flex flex-col gap-6`}>
          <div className="flex flex-wrap items-center gap-6 md:flex-nowrap">
            {personalInfo.avatarUrl ? (
              <div className="relative">
                <div
                  className="h-28 w-28 rounded-3xl border-4 border-white/20 p-1 shadow-[0_0_25px_rgba(0,0,0,0.35)]"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  }}
                >
                  <div className="h-full w-full rounded-2xl overflow-hidden bg-black/40">
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.fullName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div
                  className="absolute -inset-3 rounded-3xl blur-2xl opacity-50"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                />
              </div>
            ) : (
              <div
                className="flex h-28 w-28 items-center justify-center rounded-3xl text-3xl font-bold uppercase tracking-tight"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  color: "#0b1220",
                }}
              >
                {personalInfo.fullName?.slice(0, 2) || "CV"}
              </div>
            )}

            <div className="flex-1 min-w-0 space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                <Sparkles className="h-3.5 w-3.5" style={{ color: secondaryColor }} />
                curated presence
              </div>
              <h1 className="break-words text-4xl font-semibold leading-tight text-white">
                {personalInfo.fullName || "Your Name"}
              </h1>
              <p className="break-words text-lg text-white/80">{personalInfo.headline || "Futuristic Professional"}</p>
            </div>

            <div className="flex min-w-[220px] max-w-full flex-col items-end gap-2 text-sm text-white/80">
              <div className="flex flex-wrap justify-end gap-2">
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-right hover:bg-white/15"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="break-words">{personalInfo.email}</span>
                  </a>
                )}
                {personalInfo.phone && (
                  <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    <Phone className="h-4 w-4" />
                    <span className="break-words">{personalInfo.phone}</span>
                  </span>
                )}
                {personalInfo.location && (
                  <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    <MapPin className="h-4 w-4" />
                    <span className="break-words">{personalInfo.location}</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/60">
                {personalInfo.linkedinUrl && (
                  <a href={personalInfo.linkedinUrl} className="rounded-full bg-white/5 p-2 hover:bg-white/10">
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a href={personalInfo.githubUrl} className="rounded-full bg-white/5 p-2 hover:bg-white/10">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {personalInfo.twitterUrl && (
                  <a href={personalInfo.twitterUrl} className="rounded-full bg-white/5 p-2 hover:bg-white/10">
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {personalInfo.website && (
                  <a href={personalInfo.website} className="rounded-full bg-white/5 p-2 hover:bg-white/10">
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {(personalInfo.summary || aboutSections.length > 0) && (
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/0" />
            <div className="relative space-y-3">
              <h2 className="text-xs uppercase tracking-[0.3em] text-white/60">Profile</h2>
              <p className="break-words text-base leading-relaxed text-white/80">
                {personalInfo.summary ||
                  aboutSections
                    .flatMap((section) => section.items || [])
                    .map((item) => (item as { content?: string }).content)
                    .filter(Boolean)
                      .join(" ") ||
                    "Add a concise profile summary to highlight your edge."}
                </p>
              </div>
            </div>
          )}
        </header>

        <div className="grid grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 space-y-6">
            {skillSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                    <Code2 className="h-4 w-4" style={{ color: secondaryColor }} />
                    {section.title}
                  </div>
                  <div
                    className="h-1 w-16 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})` }}
                  />
                </div>
                <div className="space-y-3">
                  {(section.items as SkillItem[]).map((skill) => (
                    <div key={skill.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>{skill.name}</span>
                    <span className="text-xs text-white/60">{skill.proficiency}/5</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full shadow-[0_0_12px_rgba(0,0,0,0.35)]"
                          style={{
                            width: `${Math.min(100, (skill.proficiency / 5) * 100)}%`,
                            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {languageSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <Sparkles className="h-4 w-4" style={{ color: accentColor }} />
                  {section.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(section.items as LanguageItem[]).map((lang) => (
                    <span
                      key={lang.id}
                      className="rounded-full px-3 py-1 text-xs font-medium text-white shadow"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    >
                      {lang.name} · {lang.proficiency}
                    </span>
                  ))}
                </div>
              </section>
            ))}

            {certificationSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <Award className="h-4 w-4" style={{ color: primaryColor }} />
                  {section.title}
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  {(section.items as CertificationItem[]).map((cert) => (
                    <div key={cert.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="font-semibold text-white">{cert.name}</p>
                      <p className="text-xs text-white/60">{cert.issuer}</p>
                      {cert.issueDate && (
                        <p className="text-xs text-white/60">Issued {cert.issueDate}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {awardSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <Star className="h-4 w-4" style={{ color: accentColor }} />
                  {section.title}
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  {(section.items as AwardItem[]).map((award) => (
                    <div key={award.id} className="flex items-start justify-between gap-3 rounded-xl bg-white/5 p-3">
                      <div>
                        <p className="font-semibold text-white">{award.title}</p>
                        <p className="text-xs text-white/60">{award.issuer}</p>
                        {award.description && (
                          <p className="mt-1 text-xs text-white/70">{award.description}</p>
                        )}
                      </div>
                      {award.date && (
                        <span className="text-xs text-white/50">{award.date}</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </aside>

          {/* Main column */}
          <main className="col-span-2 space-y-6">
            {experienceSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <Briefcase className="h-4 w-4" style={{ color: primaryColor }} />
                  {section.title}
                </div>
                <div className="space-y-6">
                  {(section.items as ExperienceItem[]).map((item) => (
                    <div key={item.id} className="grid grid-cols-[12px_1fr] gap-4">
                      <div className="relative flex justify-center">
                        <div className="h-full w-px rounded-full" style={{ background: primaryColor }} />
                        <div
                          className="absolute -left-[7px] top-0 h-3.5 w-3.5 rounded-full border border-white/40 shadow-[0_0_15px_rgba(0,0,0,0.25)]"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                        />
                      </div>
                      <div className="space-y-2 rounded-2xl bg-white/5 p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                            <p className="text-sm text-white/70">{item.company}</p>
                          </div>
                          <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                            {item.startDate} – {item.isCurrent ? "Present" : item.endDate}
                          </div>
                        </div>
                        {item.location && (
                          <p className="text-xs uppercase tracking-[0.2em] text-white/50">{item.location}</p>
                        )}
                        {item.description && (
                          <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
                        )}
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="space-y-1 text-sm text-white/80">
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span
                                  className="mt-1 block h-1.5 w-1.5 rounded-full"
                                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {item.techStack && item.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80"
                                style={{ boxShadow: `inset 0 0 0 1px ${primaryColor}` }}
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

            {projectSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <FolderOpen className="h-4 w-4" style={{ color: secondaryColor }} />
                  {section.title}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {(section.items as ProjectItem[]).map((project) => (
                    <div
                      key={project.id}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}10)`,
                        }}
                      />
                      <div className="relative space-y-2">
                        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                        <p className="text-sm text-white/70">{project.description}</p>
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        {(project.liveUrl || project.githubUrl) && (
                          <div className="flex gap-2 text-xs text-white/70">
                            {project.liveUrl && (
                              <a href={project.liveUrl} className="underline decoration-white/30 underline-offset-4">
                                Live
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} className="underline decoration-white/30 underline-offset-4">
                                Code
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {educationSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <GraduationCap className="h-4 w-4" style={{ color: accentColor }} />
                  {section.title}
                </div>
                <div className="space-y-4">
                  {(section.items as EducationItem[]).map((edu) => (
                    <div key={edu.id} className="flex flex-col gap-1 rounded-2xl bg-white/5 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                          <p className="text-sm text-white/70">{edu.institution}</p>
                        </div>
                        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                          {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
                        </span>
                      </div>
                      {edu.fieldOfStudy && (
                        <p className="text-sm text-white/70">{edu.fieldOfStudy}</p>
                      )}
                      {edu.gpa && (
                        <p className="text-xs uppercase tracking-[0.2em] text-white/50">GPA {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {otherSections.map((section) => (
              <section key={section.id} className={cardClasses}>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
                  {section.title}
                </div>
                <div className="space-y-2 text-sm text-white/80">
                  {(section.items || []).map((item, idx) => (
                    <div key={idx} className="rounded-xl bg-white/5 p-3">
                      {typeof item === "string" ? item : JSON.stringify(item)}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
