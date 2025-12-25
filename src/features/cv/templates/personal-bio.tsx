"use client";

/**
 * Personal Bio Template
 * 
 * A fun, creative personal profile template with:
 * - Pink/lavender pastel background with purple/blue blob decorations
 * - Decorative dark purple leaf/vine SVG elements in corners
 * - "Hello! I'm" cursive intro header
 * - Square purple-bordered photo frame with circular photo
 * - Personal details (Birthday, Age, Height)
 * - My Pets section
 * - About Me, My Hobby, What I Love sections with black header bars
 * - Playful, friendly design perfect for personal branding
 */

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

export function PersonalBioTemplate({ personalInfo, sections }: TemplateProps) {
  // Get sections
  const aboutSection = sections.find(s => s.type === "about" && s.isVisible);
  const skillsSection = sections.find(s => s.type === "skills" && s.isVisible);
  const interestsSection = sections.find(s => s.type === "interests" && s.isVisible);

  return (
    <div 
      className="relative min-h-[1100px] overflow-hidden"
      style={{ 
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#f0b8d8",
        backgroundImage: `
          radial-gradient(ellipse 120px 80px at 5% 15%, rgba(167, 139, 250, 0.6) 0%, transparent 70%),
          radial-gradient(ellipse 100px 100px at 95% 10%, rgba(147, 197, 253, 0.5) 0%, transparent 70%),
          radial-gradient(ellipse 80px 60px at 8% 85%, rgba(147, 197, 253, 0.4) 0%, transparent 70%),
          radial-gradient(ellipse 100px 80px at 92% 90%, rgba(167, 139, 250, 0.4) 0%, transparent 70%),
          radial-gradient(ellipse 60px 80px at 50% 95%, rgba(147, 197, 253, 0.3) 0%, transparent 70%)
        `,
      }}
    >
      {/* Decorative Vine/Leaf Elements - Top Left */}
      <svg 
        className="absolute left-0 top-0 h-40 w-32" 
        viewBox="0 0 120 160" 
        fill="none"
      >
        {/* Main branch */}
        <path 
          d="M60 160 Q50 130 55 100 Q60 70 45 50 Q30 30 40 10" 
          stroke="#581c87" 
          strokeWidth="3" 
          fill="none"
        />
        {/* Leaves */}
        <ellipse cx="35" cy="30" rx="18" ry="10" fill="#581c87" transform="rotate(-45 35 30)" />
        <ellipse cx="25" cy="50" rx="15" ry="8" fill="#581c87" transform="rotate(-30 25 50)" />
        <ellipse cx="30" cy="75" rx="14" ry="7" fill="#581c87" transform="rotate(-50 30 75)" />
        <ellipse cx="45" cy="95" rx="12" ry="6" fill="#581c87" transform="rotate(-40 45 95)" />
        <ellipse cx="50" cy="120" rx="10" ry="5" fill="#581c87" transform="rotate(-35 50 120)" />
        {/* Small decorative dots */}
        <circle cx="20" cy="65" r="3" fill="#581c87" />
        <circle cx="15" cy="85" r="2" fill="#581c87" />
      </svg>

      {/* Decorative Elements - Top Right */}
      <svg 
        className="absolute right-0 top-0 h-36 w-36" 
        viewBox="0 0 140 140" 
        fill="none"
      >
        {/* Curved branches */}
        <path 
          d="M140 30 Q110 35 90 50 Q70 65 75 90" 
          stroke="#3b82f6" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M120 0 Q100 20 95 45 Q90 70 100 90" 
          stroke="#3b82f6" 
          strokeWidth="1.5" 
          fill="none"
        />
        {/* Leaf sprigs */}
        <ellipse cx="100" cy="35" rx="12" ry="5" fill="#3b82f6" transform="rotate(30 100 35)" opacity="0.7" />
        <ellipse cx="85" cy="55" rx="10" ry="4" fill="#3b82f6" transform="rotate(45 85 55)" opacity="0.7" />
        {/* Decorative berry cluster */}
        <circle cx="110" cy="60" r="2" fill="#581c87" />
        <circle cx="115" cy="55" r="2" fill="#581c87" />
        <circle cx="105" cy="55" r="2" fill="#581c87" />
        <circle cx="110" cy="50" r="2" fill="#581c87" />
        <path d="M110 65 L110 80 M105 68 L100 78 M115 68 L120 78" stroke="#581c87" strokeWidth="1" />
      </svg>

      {/* Decorative Elements - Bottom Left */}
      <svg 
        className="absolute bottom-0 left-0 h-32 w-32" 
        viewBox="0 0 120 120" 
        fill="none"
      >
        <path 
          d="M0 80 Q20 70 35 85 Q50 100 40 120" 
          stroke="#581c87" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M10 120 Q25 100 45 105 Q65 110 60 120" 
          stroke="#581c87" 
          strokeWidth="1.5" 
          fill="none"
        />
        {/* Curly decorative element */}
        <path 
          d="M5 100 Q15 95 20 105 Q25 115 15 120" 
          stroke="#581c87" 
          strokeWidth="1.5" 
          fill="none"
        />
      </svg>

      {/* Decorative Elements - Bottom Right */}
      <svg 
        className="absolute bottom-0 right-0 h-36 w-36" 
        viewBox="0 0 140 140" 
        fill="none"
      >
        <path 
          d="M140 100 Q120 95 105 105 Q90 115 95 140" 
          stroke="#581c87" 
          strokeWidth="2" 
          fill="none"
        />
        {/* Curly flourish */}
        <path 
          d="M120 140 Q115 120 130 115 Q145 110 140 95" 
          stroke="#581c87" 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M100 140 Q105 125 95 120 Q85 115 90 105" 
          stroke="#581c87" 
          strokeWidth="1" 
          fill="none"
        />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 p-8">
        {/* Header - Hello! I'm */}
        <div className="mb-4 text-center">
          <p 
            className="mb-0 text-3xl"
            style={{ 
              fontFamily: "'Brush Script MT', 'Segoe Script', 'Bradley Hand', cursive",
              color: "#1f2937",
              fontStyle: "italic",
            }}
          >
            Hello! I'm
          </p>
          <h1 
            className="text-4xl font-bold tracking-wide"
            style={{ 
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: "#1f2937",
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Profile Photo with Square Purple Border */}
            <div className="flex justify-center">
              <div 
                className="p-2"
                style={{ 
                  backgroundColor: "#a855f7",
                  border: "3px solid #7c3aed",
                }}
              >
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName}
                    className="h-40 w-40 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div 
                    className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white text-4xl font-bold"
                    style={{ backgroundColor: "#f5d0fe", color: "#7c3aed" }}
                  >
                    {personalInfo.fullName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details - Bullet Points */}
            <div className="space-y-1 text-sm" style={{ color: "#1f2937" }}>
              {personalInfo.headline && (
                <p className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>{personalInfo.headline}</span>
                </p>
              )}
              {personalInfo.location && (
                <p className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>{personalInfo.location}</span>
                </p>
              )}
              {personalInfo.email && (
                <p className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>{personalInfo.email}</span>
                </p>
              )}
              {personalInfo.phone && (
                <p className="flex items-start">
                  <span className="mr-2 font-bold">•</span>
                  <span>{personalInfo.phone}</span>
                </p>
              )}
            </div>

            {/* My Pets Section */}
            <div>
              <div 
                className="mb-3 rounded-full px-6 py-2 text-center inline-block"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  My Pets
                </h2>
              </div>
              {/* Pet Illustrations Placeholder */}
              <div className="flex justify-center gap-6 mt-2">
                {/* Dog silhouette */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="#1f2937">
                  <ellipse cx="30" cy="45" rx="15" ry="12" />
                  <circle cx="30" cy="25" r="12" />
                  <ellipse cx="20" cy="18" rx="5" ry="8" />
                  <ellipse cx="40" cy="18" rx="5" ry="8" />
                  <circle cx="26" cy="23" r="2" fill="white" />
                  <circle cx="34" cy="23" r="2" fill="white" />
                  <ellipse cx="30" cy="28" rx="3" ry="2" fill="#ec4899" />
                </svg>
                {/* Cat silhouette */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#1f2937" strokeWidth="2">
                  <ellipse cx="30" cy="42" rx="12" ry="15" fill="none" />
                  <circle cx="30" cy="22" r="10" fill="none" />
                  <path d="M22 15 L18 5 L24 12" fill="none" />
                  <path d="M38 15 L42 5 L36 12" fill="none" />
                  <circle cx="26" cy="20" r="1.5" fill="#1f2937" />
                  <circle cx="34" cy="20" r="1.5" fill="#1f2937" />
                  <path d="M28 25 Q30 27 32 25" fill="none" />
                  <path d="M20 24 L10 22 M20 26 L10 28 M40 24 L50 22 M40 26 L50 28" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* About Me */}
            <div>
              <div 
                className="mb-2 px-4 py-2 text-center"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  About Me
                </h2>
              </div>
              <p 
                className="text-sm leading-relaxed text-justify"
                style={{ color: "#1f2937" }}
              >
                {personalInfo.summary || "I am a positive and creative person who enjoys learning new things and expressing myself through design and technology. I like exploring new ideas, improving my skills, and taking on new challenges. In my free time, I enjoy listening to music, spending time with my pets."}
              </p>
            </div>

            {/* My Hobby */}
            <div>
              <div 
                className="mb-2 px-4 py-2 text-center"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  My Hobby
                </h2>
              </div>
              <ul className="space-y-1 text-sm" style={{ color: "#1f2937" }}>
                {interestsSection && (interestsSection.items as InterestItem[])?.length > 0 ? (
                  (interestsSection.items as InterestItem[])?.slice(0, 5).map((interest, idx) => (
                    <li key={interest.id || idx} className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <span>{interest.name}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Reading books and articles</span></li>
                    <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Listening to music</span></li>
                    <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Exploring new technologies</span></li>
                    <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Spending time with pets</span></li>
                    <li className="flex items-start"><span className="mr-2 font-bold">•</span><span>Browsing social media and creating content</span></li>
                  </>
                )}
              </ul>
            </div>

            {/* What I Love */}
            <div>
              <div 
                className="mb-2 px-4 py-2 text-center"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  What I Love
                </h2>
              </div>
              <div className="border-t-2 border-gray-800 pt-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm" style={{ color: "#1f2937" }}>
                  {skillsSection && (skillsSection.items as SkillItem[])?.length > 0 ? (
                    (skillsSection.items as SkillItem[])?.slice(0, 6).map((skill, idx) => (
                      <div key={skill.id || idx} className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <span>{skill.name}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start"><span className="mr-2 font-bold">•</span><span>Family</span></div>
                      <div className="flex items-start"><span className="mr-2 font-bold">•</span><span>Music</span></div>
                      <div className="flex items-start"><span className="mr-2 font-bold">•</span><span>Flowers</span></div>
                      <div className="flex items-start"><span className="mr-2 font-bold">•</span><span>Plants</span></div>
                      <div className="flex items-start"><span className="mr-2 font-bold">•</span><span>My Partner</span></div>
                      <div className="flex items-start"><span className="mr-2 font-bold">•</span><span>Pets</span></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalBioTemplate;
