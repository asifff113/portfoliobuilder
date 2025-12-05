/**
 * Google Gemini AI Service
 * 
 * Provides AI-powered content generation for CV sections.
 * Fast, reliable, and high-quality suggestions.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDN4TgY3dX5NxgFf0iX-tf8cofF3y-57Wo";
const genAI = new GoogleGenerativeAI(API_KEY);

// Use gemini-2.0-flash model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Check if API is configured
 */
export function isGeminiConfigured(): boolean {
  return Boolean(API_KEY);
}

/**
 * Generic text generation
 */
async function generateContent(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
}

// ============================================
// PERSONAL INFO / SUMMARY
// ============================================

/**
 * Generate a professional headline
 */
export async function generateHeadline(
  role: string,
  specialization?: string
): Promise<string> {
  const prompt = `Generate a professional headline/tagline for a ${role}${specialization ? ` specializing in ${specialization}` : ""}. 
Keep it under 10 words, impactful, and suitable for a resume header.
Return ONLY the headline, nothing else.`;

  return generateContent(prompt);
}

/**
 * Generate a professional summary
 */
export async function generateSummary(
  role: string,
  yearsExperience: number,
  skills: string[],
  achievements?: string
): Promise<string> {
  const prompt = `Write a professional resume summary for a ${role} with ${yearsExperience} years of experience.
Key skills: ${skills.join(", ")}
${achievements ? `Notable achievements: ${achievements}` : ""}

Requirements:
- 3-4 sentences maximum
- Start with a strong descriptor (e.g., "Results-driven", "Innovative")
- Highlight key strengths and value proposition
- Professional tone, no first person

Return ONLY the summary text, no labels or formatting.`;

  return generateContent(prompt);
}

// ============================================
// EXPERIENCE SECTION
// ============================================

/**
 * Generate bullet points for a job role
 */
export async function generateExperienceBullets(
  role: string,
  company: string,
  industry?: string,
  existingBullets?: string[]
): Promise<string[]> {
  const prompt = `Generate 4 impactful resume bullet points for a ${role} at ${company}${industry ? ` in the ${industry} industry` : ""}.
${existingBullets?.length ? `\nExisting bullets to complement (don't repeat): ${existingBullets.join("; ")}` : ""}

Requirements:
- Start each with a strong action verb (Led, Developed, Implemented, Achieved, etc.)
- Include quantifiable results where realistic (%, $, numbers)
- Focus on achievements, not just responsibilities
- Each bullet should be 1-2 lines maximum

Return ONLY the bullet points, one per line, without numbers or bullet symbols.`;

  const result = await generateContent(prompt);
  return result.split("\n").filter(line => line.trim().length > 0);
}

/**
 * Improve a single bullet point
 */
export async function improveBullet(
  bullet: string,
  context?: { role?: string; company?: string }
): Promise<string> {
  const prompt = `Improve this resume bullet point to be more impactful:
"${bullet}"
${context?.role ? `Role: ${context.role}` : ""}
${context?.company ? `Company: ${context.company}` : ""}

Requirements:
- Start with a strong action verb
- Add quantifiable results if possible
- Make it concise but impactful
- Keep it under 2 lines

Return ONLY the improved bullet point, nothing else.`;

  return generateContent(prompt);
}

// ============================================
// SKILLS SECTION
// ============================================

/**
 * Suggest skills based on job title
 */
export async function suggestSkills(
  jobTitle: string,
  existingSkills?: string[]
): Promise<string[]> {
  const prompt = `Suggest 10 relevant skills for a ${jobTitle}.
${existingSkills?.length ? `\nAlready have: ${existingSkills.join(", ")}. Suggest different ones.` : ""}

Include a mix of:
- Technical/hard skills
- Soft skills
- Tools/technologies
- Industry-specific skills

Return ONLY the skills, one per line, no numbers or bullets.`;

  const result = await generateContent(prompt);
  return result.split("\n").filter(line => line.trim().length > 0).map(s => s.trim());
}

// ============================================
// PROJECTS SECTION
// ============================================

/**
 * Generate project description
 */
export async function generateProjectDescription(
  projectName: string,
  techStack?: string[],
  projectType?: string
): Promise<string> {
  const prompt = `Write a compelling project description for a resume:
Project: ${projectName}
${techStack?.length ? `Technologies: ${techStack.join(", ")}` : ""}
${projectType ? `Type: ${projectType}` : ""}

Requirements:
- 2-3 sentences maximum
- Highlight the problem solved or value created
- Mention key technologies naturally
- Professional and concise

Return ONLY the description, nothing else.`;

  return generateContent(prompt);
}

/**
 * Suggest tech stack for a project type
 */
export async function suggestTechStack(
  projectType: string,
  existingStack?: string[]
): Promise<string[]> {
  const prompt = `Suggest relevant technologies for a ${projectType} project.
${existingStack?.length ? `Already using: ${existingStack.join(", ")}. Suggest complementary technologies.` : ""}

Return 6-8 technologies, one per line, no explanation.`;

  const result = await generateContent(prompt);
  return result.split("\n").filter(line => line.trim().length > 0).map(s => s.trim());
}

// ============================================
// EDUCATION SECTION
// ============================================

/**
 * Generate education highlights
 */
export async function generateEducationHighlights(
  degree: string,
  field: string,
  institution: string
): Promise<string[]> {
  const prompt = `Generate 3 highlight bullet points for education section:
Degree: ${degree} in ${field}
Institution: ${institution}

Include things like:
- Relevant coursework
- Academic achievements
- Projects or thesis
- Leadership/extracurriculars

Return ONLY the highlights, one per line, no bullets or numbers.`;

  const result = await generateContent(prompt);
  return result.split("\n").filter(line => line.trim().length > 0);
}

// ============================================
// CERTIFICATIONS
// ============================================

/**
 * Suggest relevant certifications
 */
export async function suggestCertifications(
  jobTitle: string,
  industry?: string,
  existingCerts?: string[]
): Promise<Array<{ name: string; issuer: string }>> {
  const prompt = `Suggest 5 valuable certifications for a ${jobTitle}${industry ? ` in ${industry}` : ""}.
${existingCerts?.length ? `Already has: ${existingCerts.join(", ")}` : ""}

Return in format: "Certification Name | Issuing Organization"
One per line, no numbers.`;

  const result = await generateContent(prompt);
  return result
    .split("\n")
    .filter(line => line.includes("|"))
    .map(line => {
      const [name, issuer] = line.split("|").map(s => s.trim());
      return { name, issuer };
    });
}

// ============================================
// ATS OPTIMIZATION
// ============================================

/**
 * Extract keywords from job description
 */
export async function extractKeywords(jobDescription: string): Promise<string[]> {
  const prompt = `Extract the most important keywords and skills from this job description for ATS optimization:

"${jobDescription.substring(0, 1500)}"

Return 15-20 keywords, one per line, most important first.
Include: job titles, skills, technologies, certifications, soft skills.`;

  const result = await generateContent(prompt);
  return result.split("\n").filter(line => line.trim().length > 0).map(s => s.trim());
}

/**
 * Tailor content for a job description
 */
export async function tailorContent(
  content: string,
  jobDescription: string,
  contentType: "summary" | "bullet" | "skill"
): Promise<string> {
  const prompt = `Optimize this resume ${contentType} to better match the job description:

Job Description (key parts): "${jobDescription.substring(0, 500)}"

Current ${contentType}: "${content}"

Requirements:
- Incorporate relevant keywords naturally
- Keep the same general meaning
- Make it ATS-friendly
- Keep similar length

Return ONLY the optimized ${contentType}, nothing else.`;

  return generateContent(prompt);
}

/**
 * Calculate ATS score and suggestions
 */
export async function analyzeATSCompatibility(
  cvContent: string,
  jobDescription: string
): Promise<{
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}> {
  const prompt = `Analyze this resume against the job description for ATS compatibility.

JOB DESCRIPTION:
"${jobDescription.substring(0, 1000)}"

RESUME CONTENT:
"${cvContent.substring(0, 2000)}"

Respond in this exact JSON format:
{
  "score": <number 0-100>,
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword3", "keyword4"],
  "suggestions": ["suggestion1", "suggestion2"]
}`;

  const result = await generateContent(prompt);
  
  try {
    // Extract JSON from response
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // Fallback if JSON parsing fails
  }
  
  return {
    score: 0,
    matchedKeywords: [],
    missingKeywords: [],
    suggestions: ["Unable to analyze. Please try again."]
  };
}

// ============================================
// GENERAL IMPROVEMENTS
// ============================================

/**
 * Make text more professional
 */
export async function makeProfessional(text: string): Promise<string> {
  const prompt = `Rewrite this text to be more professional and suitable for a resume:
"${text}"

Keep the same meaning, make it concise and professional.
Return ONLY the rewritten text.`;

  return generateContent(prompt);
}

/**
 * Fix grammar and improve clarity
 */
export async function improveWriting(text: string): Promise<string> {
  const prompt = `Improve this text - fix any grammar issues and make it clearer:
"${text}"

Return ONLY the improved text.`;

  return generateContent(prompt);
}

/**
 * Make text more concise
 */
export async function makeConcise(text: string): Promise<string> {
  const prompt = `Make this text more concise while keeping key information:
"${text}"

Return ONLY the concise version.`;

  return generateContent(prompt);
}

