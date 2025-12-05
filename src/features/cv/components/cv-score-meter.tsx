"use client";

/**
 * CV Score Meter
 * 
 * A real-time completion score and strength analyzer for CVs.
 * Provides visual feedback and actionable suggestions.
 */

import { useMemo } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";
import { useCVStore } from "../store";
import { cn } from "@/lib/utils";

interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  suggestions: string[];
  status: "excellent" | "good" | "needs-work" | "missing";
}

export function CVScoreMeter() {
  const { personalInfo, sections } = useCVStore();

  const analysis = useMemo(() => {
    const categories: ScoreCategory[] = [];
    let totalScore = 0;
    let maxTotalScore = 0;

    // 1. Personal Info Score (25 points max)
    const personalInfoScore = (() => {
      let score = 0;
      const suggestions: string[] = [];
      
      if (personalInfo.fullName) score += 5;
      else suggestions.push("Add your full name");
      
      if (personalInfo.email) score += 4;
      else suggestions.push("Add your email address");
      
      if (personalInfo.phone) score += 3;
      else suggestions.push("Add your phone number");
      
      if (personalInfo.headline) score += 4;
      else suggestions.push("Add a professional headline");
      
      if (personalInfo.summary && personalInfo.summary.length > 50) score += 5;
      else if (personalInfo.summary) {
        score += 2;
        suggestions.push("Expand your summary to at least 50 characters");
      } else {
        suggestions.push("Add a professional summary");
      }
      
      if (personalInfo.location) score += 2;
      if (personalInfo.linkedinUrl) score += 2;

      const status: ScoreCategory["status"] = score >= 20 ? "excellent" : score >= 15 ? "good" : score >= 10 ? "needs-work" : "missing";
      return {
        name: "Contact Info",
        score,
        maxScore: 25,
        suggestions,
        status,
      };
    })();
    categories.push(personalInfoScore);
    totalScore += personalInfoScore.score;
    maxTotalScore += personalInfoScore.maxScore;

    // 2. Experience Score (30 points max)
    const experienceSection = sections.find(s => s.type === "experience" && s.isVisible);
    const experienceScore = (() => {
      let score = 0;
      const suggestions: string[] = [];
      
      if (!experienceSection || experienceSection.items.length === 0) {
        suggestions.push("Add at least one work experience");
        return {
          name: "Work Experience",
          score: 0,
          maxScore: 30,
          suggestions,
          status: "missing" as const,
        };
      }

      // Base points for having experience
      score += 5;
      
      // Points per experience (up to 3)
      const expCount = Math.min(experienceSection.items.length, 3);
      score += expCount * 3;

      // Check quality of experience entries
      let hasBullets = false;
      let hasMetrics = false;
      
      experienceSection.items.forEach((item: unknown) => {
        const exp = item as { bullets?: string[]; description?: string };
        if (exp.bullets && exp.bullets.length > 0) {
          hasBullets = true;
          // Check for metrics/numbers in bullets
          exp.bullets.forEach((bullet: string) => {
            if (/\d+%|\$[\d,]+|\d+ (years?|months?|people|users|customers)/i.test(bullet)) {
              hasMetrics = true;
            }
          });
        }
      });

      if (hasBullets) {
        score += 6;
      } else {
        suggestions.push("Add bullet points to describe your achievements");
      }

      if (hasMetrics) {
        score += 10;
      } else {
        suggestions.push("Add quantifiable metrics (%, $, numbers) to your achievements");
      }

      const status: ScoreCategory["status"] = score >= 25 ? "excellent" : score >= 18 ? "good" : score >= 10 ? "needs-work" : "missing";
      return {
        name: "Work Experience",
        score,
        maxScore: 30,
        suggestions,
        status,
      };
    })();
    categories.push(experienceScore);
    totalScore += experienceScore.score;
    maxTotalScore += experienceScore.maxScore;

    // 3. Education Score (15 points max)
    const educationSection = sections.find(s => s.type === "education" && s.isVisible);
    const educationScore = (() => {
      let score = 0;
      const suggestions: string[] = [];
      
      if (!educationSection || educationSection.items.length === 0) {
        suggestions.push("Add your educational background");
        return {
          name: "Education",
          score: 0,
          maxScore: 15,
          suggestions,
          status: "missing" as const,
        };
      }

      score += 10;
      
      // Check for GPA or achievements
      let hasDetails = false;
      educationSection.items.forEach((item: unknown) => {
        const edu = item as { gpa?: string; achievements?: string[] };
        if (edu.gpa || (edu.achievements && edu.achievements.length > 0)) {
          hasDetails = true;
        }
      });

      if (hasDetails) {
        score += 5;
      } else {
        suggestions.push("Add GPA or academic achievements");
      }

      const status: ScoreCategory["status"] = score >= 12 ? "excellent" : score >= 8 ? "good" : score >= 5 ? "needs-work" : "missing";
      return {
        name: "Education",
        score,
        maxScore: 15,
        suggestions,
        status,
      };
    })();
    categories.push(educationScore);
    totalScore += educationScore.score;
    maxTotalScore += educationScore.maxScore;

    // 4. Skills Score (20 points max)
    const skillsSection = sections.find(s => s.type === "skills" && s.isVisible);
    const skillsScore = (() => {
      let score = 0;
      const suggestions: string[] = [];
      
      if (!skillsSection || skillsSection.items.length === 0) {
        suggestions.push("Add your technical and soft skills");
        return {
          name: "Skills",
          score: 0,
          maxScore: 20,
          suggestions,
          status: "missing" as const,
        };
      }

      const skillCount = skillsSection.items.length;
      
      if (skillCount >= 10) {
        score += 15;
      } else if (skillCount >= 5) {
        score += 10;
        suggestions.push("Add more skills (aim for 10+)");
      } else {
        score += 5;
        suggestions.push("Add more skills to showcase your expertise");
      }

      // Check for skill categories
      const hasCategories = skillsSection.items.some((item: unknown) => {
        const skill = item as { category?: string };
        return skill.category && skill.category !== "Technical";
      });
      
      if (hasCategories) {
        score += 5;
      } else {
        suggestions.push("Organize skills into categories (Technical, Soft Skills, Tools)");
      }

      const status: ScoreCategory["status"] = score >= 16 ? "excellent" : score >= 12 ? "good" : score >= 6 ? "needs-work" : "missing";
      return {
        name: "Skills",
        score,
        maxScore: 20,
        suggestions,
        status,
      };
    })();
    categories.push(skillsScore);
    totalScore += skillsScore.score;
    maxTotalScore += skillsScore.maxScore;

    // 5. Additional Sections Score (10 points max)
    const additionalScore = (() => {
      let score = 0;
      const suggestions: string[] = [];
      
      const additionalSections = sections.filter(s => 
        s.isVisible && 
        !["experience", "education", "skills"].includes(s.type) &&
        s.items.length > 0
      );

      if (additionalSections.length >= 3) {
        score += 10;
      } else if (additionalSections.length >= 2) {
        score += 7;
        suggestions.push("Consider adding more sections (Projects, Certifications, Languages)");
      } else if (additionalSections.length >= 1) {
        score += 4;
        suggestions.push("Add projects or certifications to stand out");
      } else {
        suggestions.push("Add projects, certifications, or other relevant sections");
      }

      const status: ScoreCategory["status"] = score >= 8 ? "excellent" : score >= 5 ? "good" : score >= 3 ? "needs-work" : "missing";
      return {
        name: "Additional Sections",
        score,
        maxScore: 10,
        suggestions,
        status,
      };
    })();
    categories.push(additionalScore);
    totalScore += additionalScore.score;
    maxTotalScore += additionalScore.maxScore;

    const percentage = Math.round((totalScore / maxTotalScore) * 100);
    const allSuggestions = categories.flatMap(c => c.suggestions);
    
    let overallStatus: "excellent" | "good" | "needs-work" | "missing";
    if (percentage >= 85) overallStatus = "excellent";
    else if (percentage >= 65) overallStatus = "good";
    else if (percentage >= 40) overallStatus = "needs-work";
    else overallStatus = "missing";

    return {
      totalScore,
      maxTotalScore,
      percentage,
      categories,
      suggestions: allSuggestions.slice(0, 5), // Top 5 suggestions
      overallStatus,
    };
  }, [personalInfo, sections]);

  const statusColors = {
    excellent: "text-green-400",
    good: "text-yellow-400",
    "needs-work": "text-orange-400",
    missing: "text-red-400",
  };

  const statusBgColors = {
    excellent: "bg-green-500/20",
    good: "bg-yellow-500/20",
    "needs-work": "bg-orange-500/20",
    missing: "bg-red-500/20",
  };

  const statusLabels = {
    excellent: "Excellent",
    good: "Good",
    "needs-work": "Needs Work",
    missing: "Incomplete",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-card/50 p-4">
      {/* Overall Score */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-neon-cyan" />
          <h3 className="font-semibold">CV Strength</h3>
        </div>
        <div className={cn(
          "flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
          statusBgColors[analysis.overallStatus],
          statusColors[analysis.overallStatus]
        )}>
          {analysis.overallStatus === "excellent" && <Sparkles className="h-4 w-4" />}
          {statusLabels[analysis.overallStatus]}
        </div>
      </div>

      {/* Score Circle */}
      <div className="mb-4 flex items-center justify-center">
        <div className="relative h-32 w-32">
          {/* Background circle */}
          <svg className="h-32 w-32 -rotate-90 transform">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-white/10"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${analysis.percentage * 3.52} 352`}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{analysis.percentage}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-4 space-y-2">
        {analysis.categories.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{category.name}</span>
                <span className={statusColors[category.status]}>
                  {category.score}/{category.maxScore}
                </span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    category.status === "excellent" && "bg-linear-to-r from-green-400 to-emerald-400",
                    category.status === "good" && "bg-linear-to-r from-yellow-400 to-amber-400",
                    category.status === "needs-work" && "bg-linear-to-r from-orange-400 to-red-400",
                    category.status === "missing" && "bg-red-500/50"
                  )}
                  style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                />
              </div>
            </div>
            {category.status === "excellent" ? (
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            ) : category.status === "good" ? (
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-orange-400" />
            )}
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div className="rounded-lg bg-white/5 p-3">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Lightbulb className="h-4 w-4 text-yellow-400" />
            <span>Suggestions to Improve</span>
          </div>
          <ul className="space-y-1.5">
            {analysis.suggestions.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                <TrendingUp className="mt-0.5 h-3 w-3 flex-shrink-0 text-neon-cyan" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

