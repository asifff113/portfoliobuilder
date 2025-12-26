"use client";

/**
 * Creative Red Template
 * 
 * Exact replica of the reference design with:
 * - Dark charcoal/gray background
 * - Party bunting flags at top (green, red, white triangles)
 * - "resume" text in playful mixed fonts/colors
 * - Name: First name in gray outline, Last name in bold dark red
 * - Torn paper circular photo frame with pink ribbon
 * - Palestinian flag-shaped "About Me" section
 * - Education with timeline dots
 * - Expertise as rounded pill tags
 * - Contact with dark circular icons
 * - Experience on torn notebook paper
 * - Mosque silhouette bottom-left
 * - Factory/industrial silhouette on right
 * - Purple/pink mountain range at bottom
 * - Watermelon slice decorations
 */

import type { 
  PersonalInfo, 
  CVSection, 
  ExperienceItem,
  EducationItem,
  SkillItem,
} from "@/types/cv";
import type { TemplateSettings } from "../stores/template-settings";
import { MapPin, Mail, Phone } from "lucide-react";

interface TemplateProps {
  personalInfo: PersonalInfo;
  sections: CVSection[];
  settings?: TemplateSettings;
}

export function CreativeRedTemplate({ personalInfo, sections }: TemplateProps) {
  const experienceSection = sections.find(s => s.type === "experience" && s.isVisible);
  const educationSection = sections.find(s => s.type === "education" && s.isVisible);
  const skillsSection = sections.find(s => s.type === "skills" && s.isVisible);

  const firstName = personalInfo.fullName.split(' ')[0] || "YOUR";
  const lastName = personalInfo.fullName.split(' ').slice(1).join(' ') || "NAME";

  return (
    <div 
      className="relative min-h-[1100px] w-full overflow-hidden"
      style={{ 
        backgroundColor: "#5a5a5a",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      {/* Party Bunting Flags at Top */}
      <svg className="absolute top-0 left-0 w-full h-14" viewBox="0 0 800 50" preserveAspectRatio="none">
        {/* String - wavy line */}
        <path d="M-10,6 Q100,18 200,8 Q300,0 400,10 Q500,18 600,8 Q700,2 810,12" stroke="#2a2a2a" strokeWidth="1.5" fill="none" />
        {/* Flags - alternating green, red, white with slight angles */}
        <polygon points="60,6 75,38 45,38" fill="#1a5f1a" transform="rotate(-5 60 22)" />
        <polygon points="110,8 125,40 95,40" fill="#c41e3a" transform="rotate(3 110 24)" />
        <polygon points="160,6 175,38 145,38" fill="#f0f0f0" transform="rotate(-2 160 22)" />
        <polygon points="210,9 225,41 195,41" fill="#1a5f1a" transform="rotate(4 210 25)" />
        <polygon points="260,7 275,39 245,39" fill="#c41e3a" transform="rotate(-3 260 23)" />
        <polygon points="310,10 325,42 295,42" fill="#f0f0f0" transform="rotate(2 310 26)" />
        {/* Right side flags */}
        <polygon points="640,8 655,40 625,40" fill="#1a5f1a" transform="rotate(-4 640 24)" />
        <polygon points="690,6 705,38 675,38" fill="#c41e3a" transform="rotate(5 690 22)" />
        <polygon points="740,9 755,41 725,41" fill="#f0f0f0" transform="rotate(-2 740 25)" />
      </svg>

      {/* Header Section */}
      <div className="relative px-8 pt-14 pb-2">
        {/* "resume" playful text - handwritten cursive style like reference */}
        <div className="flex items-baseline gap-0 mb-1">
          <span className="text-5xl text-[#c41e3a]" style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", transform: "rotate(-8deg)", display: "inline-block" }}>r</span>
          <span className="text-4xl font-bold text-white bg-[#c41e3a] px-2 py-1 -ml-1" style={{ fontFamily: "Georgia, serif" }}>e</span>
          <span className="text-5xl text-[#2d8a2d]" style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", transform: "rotate(5deg)", display: "inline-block" }}>S</span>
          <span className="text-4xl text-[#c41e3a]" style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", transform: "rotate(-3deg)", display: "inline-block" }}>u</span>
          <span className="text-5xl text-white" style={{ fontFamily: "'Brush Script MT', 'Segoe Script', cursive", transform: "rotate(6deg)", display: "inline-block" }}>m</span>
          <span className="text-4xl font-bold text-[#2d8a2d] bg-white px-2 py-1" style={{ fontFamily: "Georgia, serif" }}>e</span>
        </div>
        
        {/* Name - SAMIRA with gray 3D embossed/outline effect - larger */}
        <h1 
          className="text-6xl font-black tracking-widest uppercase leading-none"
          style={{ 
            color: "transparent",
            WebkitTextStroke: "2.5px #999",
            textShadow: "3px 3px 0px rgba(50,50,50,0.6)",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          {firstName}
        </h1>
        {/* HADID in bold dark red/maroon - larger */}
        <h1 
          className="text-6xl font-black tracking-widest uppercase leading-none -mt-1"
          style={{ 
            color: "#4a1212",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          {lastName}
        </h1>
      </div>

      {/* Photo with Torn Paper Effect - Top Right */}
      <div className="absolute right-8 top-10 z-20">
        <div className="relative w-44 h-44">
          {/* Pencil/stick going through the torn paper - diagonal like reference */}
          <div 
            className="absolute -left-12 top-1/2 w-60 h-4 z-30"
            style={{ transform: "rotate(-20deg) translateY(-50%)" }}
          >
            {/* Pencil body - beige/tan color */}
            <div className="w-full h-full bg-gradient-to-b from-[#f5deb3] via-[#deb887] to-[#d2b48c] rounded-sm shadow-md relative">
              {/* Pencil tip */}
              <div className="absolute right-0 top-0 h-full w-4">
                <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[16px] border-transparent border-l-[#f5deb3]" style={{ position: "absolute", right: "-12px", top: "0" }}></div>
                <div className="absolute right-[-8px] top-1 w-2 h-2 bg-[#2a2a2a]" style={{ transform: "rotate(45deg)" }}></div>
              </div>
              {/* Pencil eraser - pink */}
              <div className="absolute left-0 top-0 w-5 h-full bg-[#ffb6c1] rounded-l-sm"></div>
              <div className="absolute left-5 top-0 w-1 h-full bg-[#c0c0c0]"></div>
            </div>
          </div>
          
          {/* Torn paper white border - organic torn edges like reference */}
          <svg className="absolute inset-0 w-full h-full drop-shadow-lg" viewBox="0 0 180 180">
            <path d="M90,5 L100,8 L108,4 L118,10 L126,6 L136,14 L144,8 L152,16 L160,12 L166,22 L172,18 L176,32 L178,46 L174,60 L180,74 L174,88 L178,102 L172,116 L176,130 L168,142 L158,152 L146,160 L132,166 L118,162 L104,168 L90,164 L76,168 L62,162 L48,166 L34,158 L22,148 L14,136 L8,122 L12,108 L4,94 L10,80 L4,66 L10,52 L6,38 L14,26 L8,16 L18,10 L28,6 L40,12 L52,4 L64,10 L76,4 L88,8 Z" fill="white" />
            <circle cx="90" cy="90" r="60" fill="#5a5a5a" />
          </svg>
          
          {/* Photo */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-30 h-30 rounded-full overflow-hidden" style={{ width: "120px", height: "120px" }}>
              {personalInfo.avatarUrl ? (
                <img 
                  src={personalInfo.avatarUrl} 
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#d4a574] flex items-center justify-center">
                  {/* Placeholder illustration - hijabi woman waving - like reference */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Red hijab - main shape */}
                    <path d="M20,35 Q15,55 30,85 L70,85 Q85,55 80,35 Q70,20 50,25 Q30,20 20,35" fill="#c41e3a" />
                    {/* Hijab inner shadow */}
                    <path d="M25,40 Q30,55 35,70" stroke="#a01830" strokeWidth="3" fill="none" opacity="0.5" />
                    {/* Face - oval */}
                    <ellipse cx="50" cy="45" rx="18" ry="20" fill="#f5deb3" />
                    {/* Eyes - large and expressive */}
                    <ellipse cx="43" cy="42" rx="4" ry="4.5" fill="#2a2a2a" />
                    <ellipse cx="57" cy="42" rx="4" ry="4.5" fill="#2a2a2a" />
                    {/* Eye highlights */}
                    <circle cx="42" cy="40" r="1.5" fill="white" />
                    <circle cx="56" cy="40" r="1.5" fill="white" />
                    {/* Eyebrows */}
                    <path d="M38,36 Q43,33 48,36" stroke="#3a2a2a" strokeWidth="1.2" fill="none" />
                    <path d="M52,36 Q57,33 62,36" stroke="#3a2a2a" strokeWidth="1.2" fill="none" />
                    {/* Nose hint */}
                    <path d="M50,46 L50,50" stroke="#d4a574" strokeWidth="1" />
                    {/* Smile */}
                    <path d="M44,55 Q50,60 56,55" stroke="#c96" strokeWidth="1.5" fill="none" />
                    {/* Rosy cheeks */}
                    <ellipse cx="36" cy="50" rx="4" ry="3" fill="#ffb6c1" opacity="0.4" />
                    <ellipse cx="64" cy="50" rx="4" ry="3" fill="#ffb6c1" opacity="0.4" />
                    {/* Green clothing/dress */}
                    <path d="M30,80 Q40,70 50,72 Q60,70 70,80 L70,100 L30,100 Z" fill="#228b22" />
                    {/* Waving hand - right side */}
                    <ellipse cx="78" cy="60" rx="7" ry="5" fill="#f5deb3" transform="rotate(35 78 60)" />
                    {/* Arm */}
                    <path d="M70,75 Q75,68 78,60" stroke="#f5deb3" strokeWidth="6" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Pink Ribbon Bow - positioned at top right like reference */}
          <svg className="absolute -right-4 top-0 w-14 h-16 z-40" viewBox="0 0 50 60">
            {/* Ribbon tails hanging down */}
            <path d="M22,28 Q18,45 24,55" stroke="#ffb6c1" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M28,28 Q32,45 26,55" stroke="#ffb6c1" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* Left loop */}
            <ellipse cx="16" cy="16" rx="12" ry="8" fill="#ffb6c1" transform="rotate(-30 16 16)" />
            {/* Right loop */}
            <ellipse cx="34" cy="14" rx="10" ry="6" fill="#ffb6c1" transform="rotate(30 34 14)" />
            {/* Center knot */}
            <ellipse cx="25" cy="22" rx="5" ry="4" fill="#ff8fab" />
            {/* Highlight */}
            <ellipse cx="23" cy="20" rx="2" ry="1" fill="#ffc0cb" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-12 gap-6 px-8 mt-4">
        
        {/* LEFT COLUMN */}
        <div className="col-span-5 flex flex-col gap-6">
          
          {/* About Me - Flag Shape (Black, White, Green with Red triangle) - like reference */}
          <div className="relative" style={{ maxWidth: "260px" }}>
            <svg className="w-full h-auto" viewBox="0 0 260 180" preserveAspectRatio="xMidYMid meet">
              {/* Flag stripes */}
              <polygon points="10,10 250,10 250,55 10,55" fill="#1a1a1a" />
              <polygon points="10,55 250,55 250,100 10,100" fill="#f5f5f5" />
              <polygon points="10,100 250,100 250,145 10,145" fill="#1a6b1a" />
              {/* Red triangle on left - pointing right */}
              <polygon points="10,10 10,145 100,77.5" fill="#c41e3a" />
              {/* Pennant tail at bottom */}
              <polygon points="10,145 250,145 130,175" fill="#1a6b1a" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center pt-3 pr-4" style={{ paddingLeft: "100px" }}>
              <h2 
                className="text-sm font-bold text-white tracking-[0.25em] uppercase mb-2"
                style={{ fontFamily: "'Arial Black', sans-serif", textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
              >
                ABOUT ME
              </h2>
              <p 
                className="text-[9px] leading-relaxed text-gray-800 italic text-center px-2"
                style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
              >
                {personalInfo.summary || "A Graphic Designer with six years of experience working as the lead designer of Studio Shodwe and overseeing the individual project for brand development. Expert in video and layout creation, which is proved to be a valuable addition to developing the company's design project."}
              </p>
            </div>
          </div>

          {/* Education - like reference with red date badge */}
          <div className="mt-4">
            <h2 className="text-xl font-black text-[#c41e3a] uppercase tracking-wide mb-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>Education</h2>
            <div className="flex flex-col gap-2">
              {educationSection ? (
                (educationSection.items as EducationItem[]).map((edu, i) => (
                  <div key={i} className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white leading-tight">{edu.degree}</span>
                      <span className="text-xs text-gray-400 mt-0.5">{edu.institution}</span>
                    </div>
                    <span className="bg-[#c41e3a] text-white text-xs font-bold px-2 py-1 rounded-sm whitespace-nowrap">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white leading-tight">Bachelor of Arts in<br/>Communication Visual Design</span>
                    <span className="text-xs text-gray-400 mt-0.5">Connor Hamilton University</span>
                  </div>
                  <span className="bg-[#c41e3a] text-white text-xs font-bold px-2 py-1 rounded-sm whitespace-nowrap">
                    2010 - 2014
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Expertise - pill badges like reference */}
          <div className="mt-4">
            <h2 className="text-xl font-black text-[#c41e3a] uppercase tracking-wide mb-3" style={{ fontFamily: "'Arial Black', sans-serif" }}>Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {skillsSection ? (
                (skillsSection.items as SkillItem[]).map((skill, i) => (
                  <span 
                    key={i}
                    className="border border-gray-400 rounded-full px-4 py-1.5 text-xs text-gray-300 bg-transparent"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <>
                  <span className="border border-gray-400 rounded-full px-4 py-1.5 text-xs text-gray-300">Photography</span>
                  <span className="border border-gray-400 rounded-full px-4 py-1.5 text-xs text-gray-300">Digital drawing</span>
                  <span className="border border-gray-400 rounded-full px-4 py-1.5 text-xs text-gray-300">Photo editing</span>
                  <span className="border border-gray-400 rounded-full px-4 py-1.5 text-xs text-gray-300">Eye of detail</span>
                </>
              )}
            </div>
          </div>

          {/* Mosque Silhouette - Bottom Left - more detailed */}
          <div className="mt-auto relative">
            {/* Decorative mandala pattern circle */}
            <div className="absolute -bottom-4 -left-2 w-28 h-28 opacity-25">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outer circles */}
                <circle cx="50" cy="50" r="48" fill="none" stroke="#a08080" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#a08080" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="#a08080" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="#a08080" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="#a08080" strokeWidth="0.5" />
                {/* Radial lines */}
                {[...Array(16)].map((_, i) => (
                  <line key={i} x1="50" y1="5" x2="50" y2="20" stroke="#a08080" strokeWidth="0.5" transform={`rotate(${i * 22.5} 50 50)`} />
                ))}
                {/* Inner decorative elements */}
                {[...Array(8)].map((_, i) => (
                  <circle key={i} cx="50" cy="20" r="3" fill="none" stroke="#a08080" strokeWidth="0.5" transform={`rotate(${i * 45} 50 50)`} />
                ))}
              </svg>
            </div>
            
            <svg viewBox="0 0 180 100" className="w-44 h-auto">
              {/* Mosque silhouette - detailed */}
              <g fill="#1a1a1a">
                {/* Ground/base */}
                <rect x="0" y="95" width="180" height="5" />
                
                {/* Left minaret */}
                <rect x="10" y="45" width="12" height="50" />
                <path d="M8,45 L16,20 L24,45 Z" />
                {/* Crescent on minaret */}
                <circle cx="16" cy="15" r="4" />
                <rect x="15" y="5" width="2" height="8" />
                
                {/* Main dome building */}
                <rect x="35" y="60" width="70" height="35" />
                <path d="M35,60 Q70,15 105,60" fill="#1a1a1a" />
                {/* Main dome crescent */}
                <circle cx="70" cy="22" r="5" />
                <rect x="69" y="8" width="2" height="10" />
                
                {/* Small side domes */}
                <ellipse cx="45" cy="60" rx="12" ry="8" />
                <ellipse cx="95" cy="60" rx="12" ry="8" />
                
                {/* Door arch */}
                <path d="M60,95 L60,75 Q70,65 80,75 L80,95 Z" fill="#5a5a5a" />
                
                {/* Right minaret */}
                <rect x="115" y="50" width="10" height="45" />
                <path d="M113,50 L120,30 L127,50 Z" />
                
                {/* Small tower on right */}
                <rect x="140" y="55" width="15" height="40" />
                <path d="M140,55 L147.5,35 L155,55 Z" />
              </g>
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-7 flex flex-col gap-4 relative">
          
          {/* Contact - dark icons with green borders like reference */}
          <div className="mb-4">
            <h2 className="text-xl font-black text-[#c41e3a] uppercase tracking-wide mb-4" style={{ fontFamily: "'Arial Black', sans-serif" }}>Contact</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#1a6b1a] flex items-center justify-center">
                  <Phone size={14} className="text-[#1a6b1a]" />
                </div>
                <span className="text-sm text-gray-300">{personalInfo.phone || "+123-456-7890"}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#1a6b1a] flex items-center justify-center">
                  <Mail size={14} className="text-[#1a6b1a]" />
                </div>
                <span className="text-sm text-gray-300">{personalInfo.email || "Ajera@gmail.com"}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#1a6b1a] flex items-center justify-center">
                  <MapPin size={14} className="text-[#1a6b1a]" />
                </div>
                <span className="text-sm text-gray-300">{personalInfo.location || "123 Anywhere St., Any City"}</span>
              </div>
            </div>
          </div>

          {/* Factory/Industrial Silhouette - positioned to right of experience like reference */}
          <svg className="absolute top-0 -right-4 w-32 h-44 opacity-40" viewBox="0 0 100 140">
            <g fill="#3a3a3a">
              {/* Left tall chimney */}
              <rect x="15" y="50" width="12" height="90" />
              <rect x="18" y="30" width="6" height="20" />
              {/* Smoke */}
              <ellipse cx="21" cy="22" rx="8" ry="6" opacity="0.6" />
              <ellipse cx="25" cy="14" rx="6" ry="5" opacity="0.5" />
              
              {/* Middle building with saw-tooth roof */}
              <rect x="32" y="70" width="25" height="70" />
              <polygon points="32,70 44,50 57,70" />
              
              {/* Right section */}
              <rect x="60" y="60" width="20" height="80" />
              <rect x="65" y="40" width="8" height="20" />
              {/* Smoke */}
              <ellipse cx="69" cy="32" rx="7" ry="5" opacity="0.6" />
              
              {/* Far right chimney */}
              <rect x="82" y="55" width="10" height="85" />
              <rect x="84" y="35" width="6" height="20" />
              {/* Smoke */}
              <ellipse cx="87" cy="28" rx="6" ry="4" opacity="0.5" />
            </g>
          </svg>

          {/* Experience - Torn Notebook Paper - like reference */}
          <div className="relative mt-8 ml-0" style={{ transform: "rotate(1deg)" }}>
            {/* Paper shadow */}
            <div className="absolute inset-0 bg-black/15 translate-x-1 translate-y-1 blur-[2px]" style={{ clipPath: "polygon(0% 3%, 2% 0%, 5% 3%, 8% 0%, 11% 2%, 14% 0%, 17% 3%, 20% 0%, 23% 2%, 26% 0%, 29% 3%, 32% 0%, 35% 2%, 38% 0%, 41% 3%, 44% 0%, 47% 2%, 50% 0%, 53% 3%, 56% 0%, 59% 2%, 62% 0%, 65% 3%, 68% 0%, 71% 2%, 74% 0%, 77% 3%, 80% 0%, 83% 2%, 86% 0%, 89% 3%, 92% 0%, 95% 2%, 98% 0%, 100% 3%, 100% 100%, 0% 100%)" }}></div>
            
            {/* Paper background with lines - cream/off-white like real notebook */}
            <div 
              className="relative bg-[#f8f6f0] p-5 pt-8 pb-6"
              style={{
                clipPath: "polygon(0% 3%, 2% 0%, 5% 3%, 8% 0%, 11% 2%, 14% 0%, 17% 3%, 20% 0%, 23% 2%, 26% 0%, 29% 3%, 32% 0%, 35% 2%, 38% 0%, 41% 3%, 44% 0%, 47% 2%, 50% 0%, 53% 3%, 56% 0%, 59% 2%, 62% 0%, 65% 3%, 68% 0%, 71% 2%, 74% 0%, 77% 3%, 80% 0%, 83% 2%, 86% 0%, 89% 3%, 92% 0%, 95% 2%, 98% 0%, 100% 3%, 100% 100%, 0% 100%)",
              }}
            >
              {/* Notebook lines - light blue */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(transparent, transparent 20px, #d5e5f0 20px, #d5e5f0 21px)", backgroundPosition: "0 16px" }}></div>
              
              {/* Red margin line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-[#e8aaaa]"></div>
              
              {/* Spiral binding holes on left - like real notebook */}
              <div className="absolute left-1.5 top-4 flex flex-col gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#e0e0e0] border border-[#c0c0c0]"></div>
                ))}
              </div>

              {/* Experience Header - Stamp style like reference */}
              <div className="absolute -top-2 right-4 transform rotate-3">
                <span 
                  className="inline-block text-base font-black text-[#c41e3a] uppercase tracking-[0.15em] px-2 py-1 border-[3px] border-[#c41e3a] bg-white"
                  style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
                >
                  Experience
                </span>
              </div>

              {/* Experience Items */}
              <div className="relative z-10 mt-4 ml-6 flex flex-col gap-4">
                {experienceSection ? (
                  (experienceSection.items as ExperienceItem[]).map((exp, i) => (
                    <div key={i}>
                      <div className="text-[11px] text-gray-500 mb-0.5" style={{ fontFamily: "Arial, sans-serif" }}>
                        {exp.company} | {exp.startDate} - {exp.endDate}
                      </div>
                      <h3 className="text-sm font-black text-[#c41e3a] mb-1">{exp.role}</h3>
                      <ul className="text-[11px] text-gray-600 leading-relaxed list-disc list-inside">
                        <li dangerouslySetInnerHTML={{ __html: exp.description }} />
                      </ul>
                    </div>
                  ))
                ) : (
                  <>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-0.5" style={{ fontFamily: "Arial, sans-serif" }}>Studio Shodwe | 2016 - 2017</div>
                      <h3 className="text-sm font-black text-[#c41e3a] mb-1">Graphic Designer Intern</h3>
                      <ul className="text-[11px] text-gray-600 leading-relaxed list-disc list-inside">
                        <li>Partnered with other interns to create a new layout for the recipe book by Aaron Loeb. It receives a satisfactory response from the author of the book. He said it represents his cooking purpose and style perfectly.</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-500 mb-0.5" style={{ fontFamily: "Arial, sans-serif" }}>Studio Shodwe | 2017 - Present</div>
                      <h3 className="text-sm font-black text-[#c41e3a] mb-1">Professional Graphic Designer</h3>
                      <ul className="text-[11px] text-gray-600 leading-relaxed list-disc list-inside">
                        <li>Collaborated with the sales team to create the sales content for the promotion campaign of the Ingoude Company&apos;s 10th Anniversary.</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Watermelon Slices - Bottom Right - larger like reference */}
          <div className="absolute -bottom-4 -right-4 flex items-end gap-0">
            {/* Large watermelon slice */}
            <svg viewBox="0 0 120 80" className="w-36 h-auto transform -rotate-12">
              {/* Dark green rind */}
              <path d="M5,55 Q60,90 115,55" fill="none" stroke="#1a5f1a" strokeWidth="10" strokeLinecap="round" />
              {/* Light green inner rind */}
              <path d="M12,55 Q60,82 108,55" fill="none" stroke="#7ccd7c" strokeWidth="5" strokeLinecap="round" />
              {/* Red flesh */}
              <path d="M15,55 Q60,78 105,55 L60,10 Z" fill="#e63946" />
              {/* Seeds - teardrop shapes */}
              <ellipse cx="35" cy="35" rx="3" ry="6" fill="#1a1a1a" transform="rotate(25 35 35)" />
              <ellipse cx="60" cy="28" rx="3" ry="6" fill="#1a1a1a" />
              <ellipse cx="85" cy="35" rx="3" ry="6" fill="#1a1a1a" transform="rotate(-25 85 35)" />
              <ellipse cx="45" cy="48" rx="2.5" ry="5" fill="#1a1a1a" transform="rotate(15 45 48)" />
              <ellipse cx="75" cy="48" rx="2.5" ry="5" fill="#1a1a1a" transform="rotate(-15 75 48)" />
              <ellipse cx="60" cy="45" rx="2.5" ry="5" fill="#1a1a1a" />
            </svg>
            {/* Smaller watermelon slice - overlapping */}
            <svg viewBox="0 0 90 65" className="w-24 h-auto transform rotate-20 -ml-10 mb-2">
              {/* Dark green rind */}
              <path d="M5,45 Q45,70 85,45" fill="none" stroke="#1a5f1a" strokeWidth="8" strokeLinecap="round" />
              {/* Light green inner rind */}
              <path d="M10,45 Q45,62 80,45" fill="none" stroke="#7ccd7c" strokeWidth="4" strokeLinecap="round" />
              {/* Red flesh */}
              <path d="M12,45 Q45,58 78,45 L45,12 Z" fill="#e63946" />
              {/* Seeds */}
              <ellipse cx="32" cy="32" rx="2.5" ry="5" fill="#1a1a1a" transform="rotate(20 32 32)" />
              <ellipse cx="58" cy="32" rx="2.5" ry="5" fill="#1a1a1a" transform="rotate(-20 58 32)" />
              <ellipse cx="45" cy="38" rx="2" ry="4" fill="#1a1a1a" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Mountain Range - Purple/Maroon like reference */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 800 100" className="w-full h-24" preserveAspectRatio="none">
          {/* Back layer - darker purple */}
          <path 
            d="M0,100 L0,55 L50,65 L100,40 L150,55 L200,30 L250,50 L300,25 L350,45 L400,30 L450,50 L500,25 L550,40 L600,50 L650,35 L700,55 L750,45 L800,60 L800,100 Z" 
            fill="#5a2d4a"
          />
          {/* Front layer - lighter purple/mauve */}
          <path 
            d="M0,100 L0,75 L80,80 L160,65 L240,78 L320,62 L400,72 L480,65 L560,75 L640,68 L720,78 L800,85 L800,100 Z" 
            fill="#7a4a6a"
          />
        </svg>
      </div>

      {/* Hand-drawn scribble marks - red ink - positioned like reference */}
      <svg className="absolute bottom-32 right-32 w-16 h-16 opacity-40" viewBox="0 0 50 50">
        <path d="M10,25 Q20,15 30,25 Q40,35 45,25" stroke="#6b1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M15,35 Q25,25 40,38" stroke="#6b1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
