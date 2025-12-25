"use client";

/**
 * Personal Bio Template
 * 
 * Exact replica of the reference design with:
 * - Pink/lavender background with purple/blue blob decorations
 * - Dark purple decorative leaves in top-left
 * - Blue decorative leaves/branches in top-right
 * - "Hello! I'm" cursive intro at top center
 * - LEFT: Square purple-bordered frame with circular photo, personal details, My Pets
 * - RIGHT: About Me, My Hobby, What I Love sections with black headers
 * - Curly decorative flourishes at bottom
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
  const skillsSection = sections.find(s => s.type === "skills" && s.isVisible);
  const interestsSection = sections.find(s => s.type === "interests" && s.isVisible);

  return (
    <div 
      className="relative min-h-[1100px] overflow-hidden"
      style={{ 
        fontFamily: "'Georgia', 'Times New Roman', serif",
        backgroundColor: "#e9b8d8",
      }}
    >
      {/* Purple blob - top left */}
      <div 
        className="absolute left-0 top-0 h-32 w-40"
        style={{
          background: "radial-gradient(ellipse 80% 100% at 0% 0%, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
        }}
      />
      
      {/* Blue blob - top right */}
      <div 
        className="absolute right-0 top-8 h-28 w-32"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 100% 0%, rgba(147, 197, 253, 0.6) 0%, transparent 70%)",
        }}
      />
      
      {/* Blue blob - bottom left */}
      <div 
        className="absolute bottom-16 left-0 h-24 w-28"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 0% 100%, rgba(147, 197, 253, 0.5) 0%, transparent 70%)",
        }}
      />
      
      {/* Purple blob - bottom right */}
      <div 
        className="absolute bottom-0 right-0 h-32 w-36"
        style={{
          background: "radial-gradient(ellipse 100% 80% at 100% 100%, rgba(167, 139, 250, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Decorative Leaves - Top Left (Dark Purple) */}
      <svg className="absolute left-2 top-2 h-36 w-28" viewBox="0 0 100 140" fill="none">
        {/* Main stem */}
        <path d="M50 140 Q45 110 50 80 Q55 50 40 25" stroke="#581c87" strokeWidth="2.5" fill="none" />
        {/* Leaves */}
        <ellipse cx="30" cy="35" rx="20" ry="9" fill="#581c87" transform="rotate(-50 30 35)" />
        <ellipse cx="25" cy="55" rx="16" ry="7" fill="#581c87" transform="rotate(-40 25 55)" />
        <ellipse cx="30" cy="80" rx="14" ry="6" fill="#581c87" transform="rotate(-55 30 80)" />
        <ellipse cx="40" cy="100" rx="12" ry="5" fill="#581c87" transform="rotate(-45 40 100)" />
        <ellipse cx="48" cy="120" rx="10" ry="4" fill="#581c87" transform="rotate(-40 48 120)" />
        {/* Small accent leaves on right of stem */}
        <ellipse cx="55" cy="45" rx="10" ry="5" fill="#581c87" transform="rotate(40 55 45)" />
        <ellipse cx="58" cy="70" rx="8" ry="4" fill="#581c87" transform="rotate(35 58 70)" />
      </svg>

      {/* Decorative Branch - Top Right (Blue/Teal) */}
      <svg className="absolute right-0 top-0 h-32 w-32" viewBox="0 0 120 120" fill="none">
        {/* Main curved branches */}
        <path d="M120 25 Q90 30 70 50 Q50 70 55 95" stroke="#3b82f6" strokeWidth="2" fill="none" />
        <path d="M100 0 Q85 25 80 50 Q75 75 85 100" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
        {/* Leaf shapes */}
        <ellipse cx="85" cy="40" rx="15" ry="5" fill="#3b82f6" transform="rotate(25 85 40)" opacity="0.8" />
        <ellipse cx="70" cy="60" rx="12" ry="4" fill="#3b82f6" transform="rotate(40 70 60)" opacity="0.8" />
        <ellipse cx="65" cy="80" rx="10" ry="4" fill="#3b82f6" transform="rotate(50 65 80)" opacity="0.8" />
        {/* Berry cluster */}
        <g fill="#581c87">
          <circle cx="95" cy="55" r="2.5" />
          <circle cx="100" cy="50" r="2.5" />
          <circle cx="90" cy="50" r="2.5" />
          <circle cx="95" cy="45" r="2.5" />
          <circle cx="100" cy="60" r="2" />
          <circle cx="88" cy="58" r="2" />
        </g>
        {/* Berry stems */}
        <path d="M95 62 L95 75 M100 65 L105 78 M88 63 L82 75" stroke="#581c87" strokeWidth="1" />
      </svg>

      {/* Curly flourish - Bottom Left */}
      <svg className="absolute bottom-4 left-4 h-20 w-24" viewBox="0 0 100 80" fill="none">
        <path d="M10 60 Q20 40 40 50 Q60 60 50 40 Q40 20 60 30" stroke="#581c87" strokeWidth="1.5" fill="none" />
        <path d="M5 70 Q15 55 30 65 Q45 75 40 55" stroke="#581c87" strokeWidth="1.5" fill="none" />
        {/* Small dots */}
        <circle cx="65" cy="35" r="2" fill="#581c87" />
        <circle cx="70" cy="45" r="1.5" fill="#581c87" />
      </svg>

      {/* Curly flourish - Bottom Right */}
      <svg className="absolute bottom-4 right-4 h-20 w-24" viewBox="0 0 100 80" fill="none">
        <path d="M90 60 Q80 40 60 50 Q40 60 50 40 Q60 20 40 30" stroke="#581c87" strokeWidth="1.5" fill="none" />
        <path d="M95 70 Q85 55 70 65 Q55 75 60 55" stroke="#581c87" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 px-6 py-6">
        {/* Header - Hello! I'm */}
        <div className="mb-3 text-center">
          <p 
            className="mb-0 text-2xl"
            style={{ 
              fontFamily: "'Brush Script MT', 'Segoe Script', 'Lucida Handwriting', cursive",
              color: "#1f2937",
              fontStyle: "italic",
            }}
          >
            Hello! I'm
          </p>
          <h1 
            className="text-3xl font-bold"
            style={{ 
              fontFamily: "'Georgia', 'Times New Roman', serif",
              color: "#1f2937",
              letterSpacing: "0.02em",
            }}
          >
            {personalInfo.fullName || "Olivia Rodriguez"}
          </h1>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* LEFT COLUMN */}
          <div className="space-y-3">
            {/* Profile Photo with Square Purple Border */}
            <div className="flex justify-start pl-4">
              <div 
                className="p-1.5"
                style={{ 
                  backgroundColor: "#a855f7",
                  border: "2px solid #7c3aed",
                }}
              >
                {personalInfo.avatarUrl ? (
                  <img
                    src={personalInfo.avatarUrl}
                    alt={personalInfo.fullName}
                    className="h-36 w-36 rounded-full border-4 border-white object-cover"
                  />
                ) : (
                  <div 
                    className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white text-3xl font-bold"
                    style={{ backgroundColor: "#fce7f3", color: "#7c3aed" }}
                  >
                    {personalInfo.fullName?.charAt(0)?.toUpperCase() || "O"}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Details - Bullet Points */}
            <div className="space-y-0.5 pl-2 text-sm" style={{ color: "#1f2937" }}>
              <p className="flex items-start font-medium">
                <span className="mr-2">•</span>
                <span>{personalInfo.headline || "10 February, 2004"}</span>
              </p>
              <p className="flex items-start font-medium">
                <span className="mr-2">•</span>
                <span>{personalInfo.location || "Age: 21 Years Old"}</span>
              </p>
              <p className="flex items-start font-medium">
                <span className="mr-2">•</span>
                <span>{personalInfo.phone || "Height: 164 Cm"}</span>
              </p>
            </div>

            {/* My Pets Section */}
            <div className="pt-2">
              <div 
                className="mb-2 inline-block rounded-full px-8 py-1.5"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  My Pets
                </h2>
              </div>
              
              {/* Pet Illustrations */}
              <div className="flex items-end gap-4 pl-2 pt-2">
                {/* Dog - Black and white spotted */}
                <svg width="65" height="70" viewBox="0 0 65 70" fill="none">
                  {/* Body */}
                  <ellipse cx="32" cy="52" rx="22" ry="16" fill="#1f2937" />
                  {/* White belly spot */}
                  <ellipse cx="32" cy="55" rx="12" ry="10" fill="white" />
                  {/* Head */}
                  <circle cx="32" cy="28" r="16" fill="#1f2937" />
                  {/* White face */}
                  <ellipse cx="32" cy="32" rx="10" ry="12" fill="white" />
                  {/* Ears */}
                  <ellipse cx="18" cy="18" rx="7" ry="10" fill="#1f2937" />
                  <ellipse cx="46" cy="18" rx="7" ry="10" fill="#1f2937" />
                  {/* Eyes */}
                  <circle cx="27" cy="26" r="3" fill="#1f2937" />
                  <circle cx="37" cy="26" r="3" fill="#1f2937" />
                  <circle cx="28" cy="25" r="1" fill="white" />
                  <circle cx="38" cy="25" r="1" fill="white" />
                  {/* Nose */}
                  <ellipse cx="32" cy="33" rx="4" ry="3" fill="#1f2937" />
                  {/* Tongue */}
                  <ellipse cx="32" cy="40" rx="3" ry="4" fill="#ec4899" />
                  {/* Spots on body */}
                  <circle cx="22" cy="48" r="4" fill="#1f2937" />
                  <circle cx="42" cy="50" r="3" fill="#1f2937" />
                  {/* Front legs */}
                  <rect x="22" y="60" width="6" height="10" rx="3" fill="#1f2937" />
                  <rect x="36" y="60" width="6" height="10" rx="3" fill="#1f2937" />
                </svg>

                {/* Cat - Line drawing style */}
                <svg width="55" height="70" viewBox="0 0 55 70" fill="none" stroke="#1f2937" strokeWidth="1.5">
                  {/* Body */}
                  <ellipse cx="28" cy="48" rx="16" ry="18" fill="none" />
                  {/* Head */}
                  <circle cx="28" cy="22" r="12" fill="none" />
                  {/* Ears */}
                  <path d="M18 14 L14 2 L22 10" fill="none" />
                  <path d="M38 14 L42 2 L34 10" fill="none" />
                  {/* Eyes */}
                  <circle cx="23" cy="20" r="2" fill="#1f2937" stroke="none" />
                  <circle cx="33" cy="20" r="2" fill="#1f2937" stroke="none" />
                  {/* Nose */}
                  <path d="M26 25 L28 27 L30 25" fill="none" />
                  {/* Mouth */}
                  <path d="M28 27 Q28 30 26 32 M28 27 Q28 30 30 32" fill="none" />
                  {/* Whiskers */}
                  <path d="M18 24 L8 22 M18 26 L8 26 M18 28 L8 30" strokeWidth="1" />
                  <path d="M38 24 L48 22 M38 26 L48 26 M38 28 L48 30" strokeWidth="1" />
                  {/* Tail */}
                  <path d="M40 55 Q55 50 50 35 Q48 28 52 25" fill="none" />
                  {/* Front legs */}
                  <path d="M20 62 L20 68 M24 62 L24 68" />
                  <path d="M32 62 L32 68 M36 62 L36 68" />
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">
            {/* About Me */}
            <div>
              <div 
                className="mb-1.5 px-3 py-1.5 text-center"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  About Me
                </h2>
              </div>
              <p 
                className="text-xs leading-relaxed"
                style={{ color: "#1f2937", textAlign: "justify" }}
              >
                {personalInfo.summary || "I am a positive and creative person who enjoys learning new things and expressing myself through design and technology. I like exploring new ideas, improving my skills, and taking on new challenges. In my free time, I enjoy listening to music, spending time with my pets."}
              </p>
            </div>

            {/* My Hobby */}
            <div>
              <div 
                className="mb-1.5 px-3 py-1.5 text-center"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  My Hobby
                </h2>
              </div>
              <ul className="space-y-0.5 text-xs" style={{ color: "#1f2937" }}>
                {interestsSection && (interestsSection.items as InterestItem[])?.length > 0 ? (
                  (interestsSection.items as InterestItem[])?.slice(0, 5).map((interest, idx) => (
                    <li key={interest.id || idx} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{interest.name}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start"><span className="mr-2">•</span><span>Reading books and articles</span></li>
                    <li className="flex items-start"><span className="mr-2">•</span><span>Listening to music</span></li>
                    <li className="flex items-start"><span className="mr-2">•</span><span>Exploring new technologies</span></li>
                    <li className="flex items-start"><span className="mr-2">•</span><span>Spending time with pets</span></li>
                    <li className="flex items-start"><span className="mr-2">•</span><span>Browsing social media and creating content</span></li>
                  </>
                )}
              </ul>
            </div>

            {/* What I Love */}
            <div>
              <div 
                className="mb-1.5 px-3 py-1.5 text-center"
                style={{ backgroundColor: "#1f2937" }}
              >
                <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Georgia', serif" }}>
                  What I Love
                </h2>
              </div>
              <div className="border-t border-gray-800 pt-2">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs" style={{ color: "#1f2937" }}>
                  {skillsSection && (skillsSection.items as SkillItem[])?.length > 0 ? (
                    (skillsSection.items as SkillItem[])?.slice(0, 6).map((skill, idx) => (
                      <div key={skill.id || idx} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{skill.name}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-start"><span className="mr-2">•</span><span>Family</span></div>
                      <div className="flex items-start"><span className="mr-2">•</span><span>Music</span></div>
                      <div className="flex items-start"><span className="mr-2">•</span><span>Flowers</span></div>
                      <div className="flex items-start"><span className="mr-2">•</span><span>Plants</span></div>
                      <div className="flex items-start"><span className="mr-2">•</span><span>My Partner</span></div>
                      <div className="flex items-start"><span className="mr-2">•</span><span>Pets</span></div>
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
