"use client";

/**
 * Personal Bio Template
 * 
 * A fun, creative personal profile template with:
 * - Pink/purple pastel aesthetic
 * - Decorative leaf/floral elements
 * - Circular profile photo with purple border
 * - "Hello! I'm" intro header
 * - About Me, My Hobby, What I Love sections
 * - Personal details (birthday, age, etc.)
 * - Playful, friendly design perfect for personal branding
 */

import { Mail, Phone, MapPin, Calendar, Heart, Star, Sparkles } from "lucide-react";
import type { 
  PersonalInfo, 
  CVSection, 
  SkillItem, 
  InterestItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function PersonalBioTemplate({ personalInfo, sections, settings }: TemplateProps) {
  const primaryColor = "var(--cv-primary, #9333ea)";
  const bgColor = "var(--cv-background, #f5d0fe)";
  const accentColor = "var(--cv-accent, #a855f7)";
  const textColor = "var(--cv-text, #1f2937)";

  // Get sections
  const aboutSection = sections.find(s => s.type === "about" && s.isVisible);
  const skillsSection = sections.find(s => s.type === "skills" && s.isVisible);
  const interestsSection = sections.find(s => s.type === "interests" && s.isVisible);

  return (
    <div 
      className="relative min-h-[1100px] overflow-hidden p-8"
      style={{ 
        fontFamily: "var(--cv-font-family, 'Georgia', serif)",
        backgroundColor: bgColor,
      }}
    >
      {/* Decorative Elements - Top Left */}
      <div className="absolute left-0 top-0 h-32 w-32 opacity-60">
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ color: primaryColor }}>
          <path 
            d="M20,80 Q10,60 20,40 Q30,20 50,20 Q40,40 45,60 Q50,80 30,90 Q20,95 20,80" 
            fill="currentColor" 
            opacity="0.4"
          />
          <path 
            d="M30,70 Q25,55 35,45 Q45,35 55,40 Q50,50 52,62 Q54,74 40,78 Q32,80 30,70" 
            fill="currentColor" 
            opacity="0.6"
          />
          <ellipse cx="60" cy="25" rx="15" ry="8" fill="currentColor" opacity="0.3" transform="rotate(-30 60 25)" />
        </svg>
      </div>

      {/* Decorative Elements - Top Right */}
      <div className="absolute right-0 top-0 h-40 w-40 opacity-50">
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ color: accentColor }}>
          <path 
            d="M80,10 Q95,30 85,50 Q75,70 60,65 Q70,50 68,35 Q66,20 80,10" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          />
          <path 
            d="M70,5 Q90,15 90,35 Q90,55 75,50 Q82,40 80,28 Q78,16 70,5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Decorative Elements - Bottom Left */}
      <div className="absolute bottom-0 left-0 h-32 w-32 opacity-40">
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ color: primaryColor }}>
          <path 
            d="M10,90 Q5,70 20,60 Q35,50 40,70 Q25,75 15,85 Q12,88 10,90" 
            fill="currentColor"
          />
          <circle cx="50" cy="85" r="8" fill={accentColor} opacity="0.4" />
        </svg>
      </div>

      {/* Decorative Elements - Bottom Right */}
      <div className="absolute bottom-0 right-0 h-36 w-36 opacity-40">
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ color: accentColor }}>
          <path 
            d="M90,100 Q85,80 70,75 Q55,70 60,85 Q75,82 85,92 Q88,96 90,100" 
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header - Hello! I'm */}
        <div className="mb-6 text-center">
          <p 
            className="mb-1 text-2xl italic"
            style={{ 
              fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
              color: textColor,
            }}
          >
            Hello! I'm
          </p>
          <h1 
            className="text-4xl font-bold tracking-wide"
            style={{ 
              fontFamily: "var(--cv-font-family, 'Georgia', serif)",
              color: textColor,
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-5">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <div 
                className="rounded-lg p-2"
                style={{ backgroundColor: primaryColor }}
              >
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName}
                    className="h-44 w-44 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div 
                    className="flex h-44 w-44 items-center justify-center rounded-full border-4 border-white text-4xl font-bold"
                    style={{ backgroundColor: bgColor, color: primaryColor }}
                  >
                    {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-2 pl-4">
              {personalInfo.headline && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" style={{ color: primaryColor }} />
                  <span style={{ color: textColor }}>{personalInfo.headline}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                  <span style={{ color: textColor }}>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                  <span style={{ color: textColor }}>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                  <span style={{ color: textColor }}>{personalInfo.phone}</span>
                </div>
              )}
            </div>

            {/* My Hobbies / Skills Section */}
            {skillsSection && (
              <div>
                <div 
                  className="mb-3 rounded-md px-4 py-2 text-center"
                  style={{ backgroundColor: textColor }}
                >
                  <h2 className="text-lg font-bold text-white">My Skills</h2>
                </div>
                <ul className="space-y-1 pl-4 text-sm" style={{ color: textColor }}>
                  {(skillsSection.items as SkillItem[])?.slice(0, 6).map((skill, idx) => (
                    <li key={skill.id || idx} className="flex items-start gap-2">
                      <span style={{ color: primaryColor }}>•</span>
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* About Me */}
            {(aboutSection || personalInfo.summary) && (
              <div>
                <div 
                  className="mb-3 rounded-md px-4 py-2 text-center"
                  style={{ backgroundColor: textColor }}
                >
                  <h2 className="text-lg font-bold text-white">About Me</h2>
                </div>
                <p 
                  className="text-sm leading-relaxed text-justify"
                  style={{ color: textColor }}
                >
                  {personalInfo.summary || "Add your personal summary here to tell people about yourself, your passions, and what makes you unique."}
                </p>
              </div>
            )}

            {/* My Hobby / Interests */}
            {interestsSection && (
              <div>
                <div 
                  className="mb-3 rounded-md px-4 py-2 text-center"
                  style={{ backgroundColor: textColor }}
                >
                  <h2 className="text-lg font-bold text-white">My Hobbies</h2>
                </div>
                <ul className="space-y-1 pl-4 text-sm" style={{ color: textColor }}>
                  {(interestsSection.items as InterestItem[])?.slice(0, 6).map((interest, idx) => (
                    <li key={interest.id || idx} className="flex items-start gap-2">
                      <span style={{ color: primaryColor }}>•</span>
                      <span>{interest.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* What I Love */}
            <div>
              <div 
                className="mb-3 rounded-md px-4 py-2 text-center"
                style={{ backgroundColor: textColor }}
              >
                <h2 className="text-lg font-bold text-white">What I Love</h2>
              </div>
              <div className="border-t-2 pt-3" style={{ borderColor: textColor }}>
                <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: textColor }}>
                  {/* Default loves or from custom section */}
                  {["Family", "Music", "Nature", "Travel", "Learning", "Creativity"].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span style={{ color: primaryColor }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 opacity-50">
            <Sparkles className="h-4 w-4" style={{ color: primaryColor }} />
            <Heart className="h-4 w-4" style={{ color: accentColor }} />
            <Star className="h-4 w-4" style={{ color: primaryColor }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalBioTemplate;
