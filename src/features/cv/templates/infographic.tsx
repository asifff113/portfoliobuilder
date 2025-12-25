"use client";

/**
 * Infographic Template
 * 
 * Visual data-driven layout with:
 * - Circular progress rings for skills
 * - Horizontal career timeline bar
 * - Icon-based skill categories
 * - Visual language proficiency bars
 * - Large metric numbers for achievements
 */

import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Code, Languages as LanguagesIcon } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  LanguageItem,
  CertificationItem,
  ProjectItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function InfographicTemplate({ personalInfo, sections }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #6366f1)";
  const secondaryColor = "var(--cv-secondary, #8b5cf6)";
  const accentColor = "var(--cv-accent, #ec4899)";
  
  // Circular progress ring for skills
  const CircularProgress = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const percentage = (value / 5) * 100;
    const circumference = 2 * Math.PI * 36;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="flex flex-col items-center">
        <svg width="90" height="90" className="transform -rotate-90">
          <circle cx="45" cy="45" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
          <circle
            cx="45" cy="45" r="36"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute mt-6 text-center">
          <span className="text-lg font-bold" style={{ color }}>{Math.round(percentage)}%</span>
        </div>
        <span className="mt-2 text-xs font-medium text-gray-700 text-center max-w-[80px]">{label}</span>
      </div>
    );
  };

  // Horizontal progress bar for languages
  const ProgressBar = ({ value, label, color }: { value: number; label: string; color: string }) => {
    const percentage = value * 20; // 5 levels = 20% each
    return (
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-xs text-gray-500">{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  const languageProficiencyToNumber = (prof: string): number => {
    const map: Record<string, number> = { native: 5, fluent: 4, advanced: 3, intermediate: 2, beginner: 1 };
    return map[prof] || 1;
  };

  const colors = [primaryColor, secondaryColor, accentColor, "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div 
      className="min-h-[1000px] bg-white p-8"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Inter', sans-serif)",
        color: "var(--cv-text, #1f2937)",
      }}
    >
      {/* Header with Photo and Info */}
      <header className="mb-8 flex items-center gap-8 pb-6 border-b-4" style={{ borderColor: primaryColor }}>
        {personalInfo.avatarUrl ? (
          <img
            src={personalInfo.avatarUrl}
            alt={personalInfo.fullName}
            className="h-28 w-28 rounded-full object-cover border-4"
            style={{ borderColor: primaryColor }}
          />
        ) : (
          <div 
            className="h-28 w-28 rounded-full flex items-center justify-center text-4xl font-bold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1" style={{ color: primaryColor }}>
            {personalInfo.fullName || "Your Name"}
          </h1>
          <p className="text-lg text-gray-600 mb-3">{personalInfo.headline || "Professional Title"}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                {personalInfo.location}
              </span>
            )}
          </div>
        </div>

        {/* Stats Box */}
        <div className="flex gap-4">
          {sections.filter(s => s.type === "experience" && s.isVisible).slice(0, 1).map(section => (
            <div key={section.id} className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: `${primaryColor}15` }}>
              <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                {(section.items as ExperienceItem[]).length}+
              </div>
              <div className="text-xs text-gray-600">Years Exp</div>
            </div>
          ))}
          {sections.filter(s => s.type === "projects" && s.isVisible).slice(0, 1).map(section => (
            <div key={section.id} className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: `${secondaryColor}15` }}>
              <div className="text-2xl font-bold" style={{ color: secondaryColor }}>
                {(section.items as ProjectItem[]).length}+
              </div>
              <div className="text-xs text-gray-600">Projects</div>
            </div>
          ))}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}08` }}>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Skills with Circular Progress */}
        <div className="col-span-1">
          {sections.filter(s => s.type === "skills" && s.isVisible).map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Code className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(section.items as SkillItem[]).slice(0, 6).map((skill, idx) => (
                  <div key={skill.id} className="relative flex flex-col items-center">
                    <CircularProgress 
                      value={skill.proficiency} 
                      label={skill.name} 
                      color={colors[idx % colors.length]} 
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Languages */}
          {sections.filter(s => s.type === "languages" && s.isVisible).map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <LanguagesIcon className="h-5 w-5" />
                {section.title}
              </h2>
              {(section.items as LanguageItem[]).map((lang, idx) => (
                <ProgressBar 
                  key={lang.id}
                  value={languageProficiencyToNumber(lang.proficiency)}
                  label={lang.name}
                  color={colors[idx % colors.length]}
                />
              ))}
            </section>
          ))}
        </div>

        {/* Right Column - Experience & Education */}
        <div className="col-span-2">
          {/* Experience Timeline */}
          {sections.filter(s => s.type === "experience" && s.isVisible).map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Briefcase className="h-5 w-5" />
                {section.title}
              </h2>
              
              {/* Horizontal Timeline Bar */}
              <div className="relative mb-6">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: "100%",
                      background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  {(section.items as ExperienceItem[]).slice(0, 4).map((item, idx) => (
                    <div key={item.id} className="text-xs text-gray-500">{item.startDate}</div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {(section.items as ExperienceItem[]).map((item, idx) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-lg border-l-4" style={{ borderColor: colors[idx % colors.length], backgroundColor: `${colors[idx % colors.length]}08` }}>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900">{item.role}</h3>
                        <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: colors[idx % colors.length], color: "white" }}>
                          {item.startDate} - {item.isCurrent ? "Present" : item.endDate}
                        </span>
                      </div>
                      <p className="text-sm font-medium mb-2" style={{ color: colors[idx % colors.length] }}>{item.company}</p>
                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="text-sm text-gray-600 space-y-1">
                          {item.bullets.slice(0, 3).map((bullet, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors[idx % colors.length] }} />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Education */}
          {sections.filter(s => s.type === "education" && s.isVisible).map((section) => (
            <section key={section.id} className="mb-8">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <GraduationCap className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {(section.items as EducationItem[]).map((item, idx) => (
                  <div key={item.id} className="p-4 rounded-lg" style={{ backgroundColor: `${colors[idx % colors.length]}10` }}>
                    <h3 className="font-bold text-gray-900 mb-1">{item.degree}</h3>
                    <p className="text-sm" style={{ color: colors[idx % colors.length] }}>{item.institution}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.startDate} - {item.isCurrent ? "Present" : item.endDate}</p>
                    {item.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {item.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Certifications */}
          {sections.filter(s => s.type === "certifications" && s.isVisible).map((section) => (
            <section key={section.id}>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                <Award className="h-5 w-5" />
                {section.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {(section.items as CertificationItem[]).map((item, idx) => (
                  <span key={item.id} className="px-3 py-1 rounded-full text-sm text-white" style={{ backgroundColor: colors[idx % colors.length] }}>
                    {item.name}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
