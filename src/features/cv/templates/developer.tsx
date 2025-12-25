"use client";

/**
 * Developer Template
 * 
 * A code-themed CV template designed for software developers
 * Features:
 * - Dark IDE-like theme with syntax highlighting colors
 * - Terminal window header with traffic lights
 * - Code-style property formatting
 * - Monospace fonts for headings
 * - Two-column layout for better organization
 * - Support for all section types
 */

import { Terminal, Folder, GitBranch, Award, Globe, BookOpen, FileText } from "lucide-react";
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
  PublicationItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

// VS Code-inspired color palette
const colors = {
  bg: "#1e1e1e",
  bgLight: "#252526",
  bgLighter: "#2d2d2d",
  border: "#3c3c3c",
  text: "#d4d4d4",
  textMuted: "#808080",
  comment: "#6a9955",
  keyword: "#c586c0",
  variable: "#4fc1ff",
  property: "#9cdcfe",
  string: "#ce9178",
  number: "#b5cea8",
  function: "#dcdcaa",
  type: "#4ec9b0",
  operator: "#d4d4d4",
  red: "#f14c4c",
  green: "#27c93f",
  yellow: "#ffbd2e",
  blue: "#569cd6",
  teal: "#4ec9b0",
  orange: "#dcb67a",
};

export function DeveloperTemplate({ personalInfo, sections }: TemplateProps) {
  return (
    <div 
      className="min-h-[1100px] p-6"
      style={{ 
        backgroundColor: colors.bg, 
        fontFamily: "var(--cv-font-family, 'JetBrains Mono', 'Fira Code', 'Consolas', monospace)",
        color: colors.text,
      }}
    >
      {/* Terminal Window */}
      <div className="rounded-lg overflow-hidden border" style={{ borderColor: colors.border }}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: colors.bgLight }}>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.red }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.yellow }} />
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.green }} />
          </div>
          <span className="text-xs" style={{ color: colors.textMuted }}>
            {personalInfo.fullName?.toLowerCase().replace(/\s+/g, "_") || "developer"}.ts — Code
          </span>
          <div className="w-16" />
        </div>

        {/* Terminal Content */}
        <div className="p-6" style={{ backgroundColor: colors.bg }}>
          {/* Line Numbers + Code */}
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Header - Developer Object */}
              <header>
                <div className="flex items-center gap-4 mb-4">
                  {/* Profile Photo */}
                  {personalInfo.avatarUrl && (
                    <img
                      src={personalInfo.avatarUrl}
                      alt={personalInfo.fullName}
                      className="h-16 w-16 rounded-lg border-2 object-cover"
                      style={{ borderColor: colors.blue }}
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2 text-lg">
                      <span style={{ color: colors.keyword }}>const</span>
                      <span style={{ color: colors.variable }}>{personalInfo.fullName?.split(' ')[0]?.toLowerCase() || 'developer'}</span>
                      <span style={{ color: colors.operator }}>=</span>
                      <span style={{ color: colors.keyword }}>new</span>
                      <span style={{ color: colors.type }}>Developer</span>
                      <span style={{ color: colors.operator }}>()</span>
                      <span style={{ color: colors.operator }}>;</span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: colors.comment }}>
                      {"// "}{personalInfo.headline || "Full Stack Developer"}
                    </p>
                  </div>
                </div>

                {/* Contact Info as Object */}
                <div className="rounded-lg p-4 text-sm" style={{ backgroundColor: colors.bgLight }}>
                  <div className="mb-2" style={{ color: colors.comment }}>{"// Contact Information"}</div>
                  <div style={{ color: colors.string }}>{`{`}</div>
                  <div className="ml-4 space-y-0.5">
                    {personalInfo.email && (
                      <div>
                        <span style={{ color: colors.property }}>email</span>
                        <span style={{ color: colors.operator }}>: </span>
                        <span style={{ color: colors.string }}>&quot;{personalInfo.email}&quot;</span>
                        <span style={{ color: colors.operator }}>,</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div>
                        <span style={{ color: colors.property }}>phone</span>
                        <span style={{ color: colors.operator }}>: </span>
                        <span style={{ color: colors.string }}>&quot;{personalInfo.phone}&quot;</span>
                        <span style={{ color: colors.operator }}>,</span>
                      </div>
                    )}
                    {personalInfo.location && (
                      <div>
                        <span style={{ color: colors.property }}>location</span>
                        <span style={{ color: colors.operator }}>: </span>
                        <span style={{ color: colors.string }}>&quot;{personalInfo.location}&quot;</span>
                        <span style={{ color: colors.operator }}>,</span>
                      </div>
                    )}
                    {personalInfo.githubUrl && (
                      <div>
                        <span style={{ color: colors.property }}>github</span>
                        <span style={{ color: colors.operator }}>: </span>
                        <span style={{ color: colors.string }}>&quot;{personalInfo.githubUrl}&quot;</span>
                        <span style={{ color: colors.operator }}>,</span>
                      </div>
                    )}
                    {personalInfo.linkedinUrl && (
                      <div>
                        <span style={{ color: colors.property }}>linkedin</span>
                        <span style={{ color: colors.operator }}>: </span>
                        <span style={{ color: colors.string }}>&quot;{personalInfo.linkedinUrl}&quot;</span>
                        <span style={{ color: colors.operator }}>,</span>
                      </div>
                    )}
                    {personalInfo.website && (
                      <div>
                        <span style={{ color: colors.property }}>website</span>
                        <span style={{ color: colors.operator }}>: </span>
                        <span style={{ color: colors.string }}>&quot;{personalInfo.website}&quot;</span>
                      </div>
                    )}
                  </div>
                  <div style={{ color: colors.string }}>{`}`}</div>
                </div>
              </header>

              {/* Summary as Doc Comment */}
              {personalInfo.summary && (
                <section className="text-sm" style={{ color: colors.comment }}>
                  <p>{"/**"}</p>
                  <p className="ml-2 whitespace-pre-wrap">* @description {personalInfo.summary}</p>
                  <p>{" */"}</p>
                </section>
              )}

              {/* Two Column Layout for Sections */}
              <div className="grid grid-cols-3 gap-6">
                {/* Main Column - Experience, Education, Projects */}
                <div className="col-span-2 space-y-6">
                  {/* Experience */}
                  {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<GitBranch className="h-4 w-4" />} title="experience" />
                      <div className="space-y-4 mt-3">
                        {(section.items as ExperienceItem[]).map((item, _index) => (
                          <div key={item.id} className="rounded-lg p-3" style={{ backgroundColor: colors.bgLight }}>
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span style={{ color: colors.function }}>{item.role || "Role"}</span>
                                  <span style={{ color: colors.textMuted }}>@</span>
                                  <span style={{ color: colors.type }}>{item.company}</span>
                                </div>
                                <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                                  {item.startDate} → {item.isCurrent ? "present" : item.endDate}
                                  {item.location && ` • ${item.location}`}
                                </p>
                              </div>
                            </div>
                            {item.bullets && item.bullets.length > 0 && (
                              <ul className="mt-2 space-y-1 text-xs">
                                {item.bullets.map((bullet, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span style={{ color: colors.comment }}>{"// "}</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {item.techStack && item.techStack.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.techStack.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded px-2 py-0.5 text-xs"
                                    style={{ backgroundColor: colors.bgLighter, color: colors.teal }}
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

                  {/* Projects */}
                  {sections.filter(s => s.type === "projects" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<Folder className="h-4 w-4" />} title="projects" />
                      <div className="grid gap-3 mt-3">
                        {(section.items as ProjectItem[]).map((item) => (
                          <div key={item.id} className="rounded-lg p-3" style={{ backgroundColor: colors.bgLight }}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span style={{ color: colors.orange }}>{item.title || "project"}</span>
                                {item.status === "in-progress" && (
                                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.yellow, color: colors.bg }}>
                                    WIP
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                {item.liveUrl && (
                                  <a href={item.liveUrl} target="_blank" rel="noopener" style={{ color: colors.blue }} className="hover:underline">
                                    [demo]
                                  </a>
                                )}
                                {item.githubUrl && (
                                  <a href={item.githubUrl} target="_blank" rel="noopener" style={{ color: colors.blue }} className="hover:underline">
                                    [code]
                                  </a>
                                )}
                              </div>
                            </div>
                            {item.description && (
                              <p className="mt-1 text-xs" style={{ color: colors.textMuted }}>
                                {item.description}
                              </p>
                            )}
                            {item.techStack && item.techStack.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.techStack.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded px-1.5 py-0.5 text-xs"
                                    style={{ backgroundColor: colors.bgLighter, color: colors.property }}
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

                  {/* Education */}
                  {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<BookOpen className="h-4 w-4" />} title="education" />
                      <div className="space-y-3 mt-3">
                        {(section.items as EducationItem[]).map((item) => (
                          <div key={item.id} className="rounded-lg p-3" style={{ backgroundColor: colors.bgLight }}>
                            <div className="flex items-center gap-2 text-sm">
                              <span style={{ color: colors.type }}>{item.institution}</span>
                            </div>
                            <p className="text-xs mt-1">
                              <span style={{ color: colors.property }}>{item.degree}</span>
                              {item.fieldOfStudy && (
                                <span style={{ color: colors.textMuted }}> in {item.fieldOfStudy}</span>
                              )}
                            </p>
                            <p className="text-xs mt-1" style={{ color: colors.textMuted }}>
                              {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                              {item.gpa && ` • GPA: ${item.gpa}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Side Column - Skills, Languages, Certifications */}
                <div className="space-y-6">
                  {/* Skills */}
                  {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => {
                    const skillsByCategory: Record<string, SkillItem[]> = {};
                    (section.items as SkillItem[]).forEach((item) => {
                      const cat = item.category || "general";
                      if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
                      skillsByCategory[cat].push(item);
                    });

                    return (
                      <section key={section.id}>
                        <SectionHeader icon={<Terminal className="h-4 w-4" />} title="skills" />
                        <div className="space-y-3 mt-3">
                          {Object.entries(skillsByCategory).map(([category, skills]) => (
                            <div key={category} className="rounded-lg p-3" style={{ backgroundColor: colors.bgLight }}>
                              <p className="text-xs mb-2" style={{ color: colors.comment }}>
                                {"// "}{category}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {skills.map((skill) => (
                                  <span
                                    key={skill.id}
                                    className="rounded px-2 py-0.5 text-xs"
                                    style={{ backgroundColor: colors.bgLighter, color: colors.teal }}
                                  >
                                    {skill.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    );
                  })}

                  {/* Certifications */}
                  {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<Award className="h-4 w-4" />} title="certs" />
                      <div className="space-y-2 mt-3">
                        {(section.items as CertificationItem[]).map((item) => (
                          <div key={item.id} className="rounded-lg p-2" style={{ backgroundColor: colors.bgLight }}>
                            <p className="text-xs" style={{ color: colors.function }}>{item.name}</p>
                            <p className="text-xs" style={{ color: colors.textMuted }}>
                              {item.issuer} • {item.issueDate}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}

                  {/* Languages */}
                  {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<Globe className="h-4 w-4" />} title="languages" />
                      <div className="rounded-lg p-3 mt-3" style={{ backgroundColor: colors.bgLight }}>
                        {(section.items as LanguageItem[]).map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs py-0.5">
                            <span>{item.name}</span>
                            <span style={{ color: colors.textMuted }}>{item.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}

                  {/* Awards */}
                  {sections.filter(s => s.type === "awards" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<Award className="h-4 w-4" />} title="awards" />
                      <div className="space-y-2 mt-3">
                        {(section.items as AwardItem[]).map((item) => (
                          <div key={item.id} className="rounded-lg p-2" style={{ backgroundColor: colors.bgLight }}>
                            <p className="text-xs" style={{ color: colors.yellow }}>{item.title}</p>
                            <p className="text-xs" style={{ color: colors.textMuted }}>
                              {item.issuer} • {item.date}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}

                  {/* Publications */}
                  {sections.filter(s => s.type === "publications" && s.isVisible).map((section) => (
                    <section key={section.id}>
                      <SectionHeader icon={<FileText className="h-4 w-4" />} title="publications" />
                      <div className="space-y-2 mt-3">
                        {(section.items as PublicationItem[]).map((item) => (
                          <div key={item.id} className="rounded-lg p-2" style={{ backgroundColor: colors.bgLight }}>
                            <p className="text-xs" style={{ color: colors.property }}>{item.title}</p>
                            <p className="text-xs" style={{ color: colors.textMuted }}>
                              {item.publisher} • {item.date}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t text-xs" style={{ borderColor: colors.border, color: colors.textMuted }}>
            <div className="flex items-center gap-2">
              <span style={{ color: colors.comment }}>{"// "}</span>
              <span>Built with</span>
              <span style={{ color: colors.red }}>♥</span>
              <span>using</span>
              <span style={{ color: colors.teal }}>NeonCV</span>
              <span>—</span>
              <span style={{ color: colors.function }}>console</span>
              <span>.</span>
              <span style={{ color: colors.function }}>log</span>
              <span>(</span>
              <span style={{ color: colors.string }}>&quot;Let&apos;s build something great!&quot;</span>
              <span>)</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// Section Header Component
function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span style={{ color: colors.blue }}>{icon}</span>
      <span style={{ color: colors.keyword }}>const</span>
      <span style={{ color: colors.variable }}>{title}</span>
      <span style={{ color: colors.operator }}>=</span>
      <span style={{ color: colors.operator }}>[</span>
    </div>
  );
}
