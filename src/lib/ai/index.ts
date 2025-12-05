/**
 * AI Service using Transformers.js
 * 
 * Provides client-side AI features using Hugging Face models.
 * All processing happens in the browser - no API keys needed.
 */

type Text2TextPipeline = (
  input: string,
  options?: {
    max_new_tokens?: number;
    do_sample?: boolean;
    temperature?: number;
  }
) => Promise<Array<{ generated_text?: string }>>;

// Model loading state
let textGenerationPipeline: Text2TextPipeline | null = null;
let isModelLoading = false;
let modelLoadError: string | null = null;

// Model configuration
const TEXT_MODEL = "Xenova/LaMini-Flan-T5-248M";

/**
 * Initialize the text generation model
 */
export async function initializeAI(onProgress?: (progress: number) => void): Promise<boolean> {
  if (textGenerationPipeline) return true;
  if (isModelLoading) return false;
  
  isModelLoading = true;
  modelLoadError = null;

  try {
    // Dynamic import to avoid SSR issues
    const { pipeline } = await import("@huggingface/transformers");
    
    textGenerationPipeline = await pipeline("text2text-generation", TEXT_MODEL, {
      progress_callback: (progress: unknown) => {
        const progressInfo = progress as { progress?: number };
        if (onProgress && progressInfo.progress) {
          onProgress(Math.round(progressInfo.progress));
        }
      },
    });
    
    isModelLoading = false;
    return true;
  } catch (error) {
    console.error("Failed to load AI model:", error);
    modelLoadError = error instanceof Error ? error.message : "Failed to load AI model";
    isModelLoading = false;
    return false;
  }
}

/**
 * Check if the AI model is ready
 */
export function isAIReady(): boolean {
  return textGenerationPipeline !== null;
}

/**
 * Check if the AI model is currently loading
 */
export function isAILoading(): boolean {
  return isModelLoading;
}

/**
 * Get any error that occurred during model loading
 */
export function getAIError(): string | null {
  return modelLoadError;
}

/**
 * Generate text using the AI model
 */
async function generateText(prompt: string, maxLength = 150): Promise<string> {
  if (!textGenerationPipeline) {
    throw new Error("AI model not initialized. Call initializeAI() first.");
  }

  try {
    const result = await textGenerationPipeline(prompt, {
      max_new_tokens: maxLength,
      do_sample: true,
      temperature: 0.7,
    });
    
    return result[0]?.generated_text || "";
  } catch (error) {
    console.error("Text generation error:", error);
    throw error;
  }
}

// ============================================
// CV CONTENT GENERATION FUNCTIONS
// ============================================

/**
 * Improve a bullet point to be more impactful
 */
export async function improveBulletPoint(bullet: string): Promise<string> {
  const prompt = `Improve this resume bullet point to be more impactful and action-oriented. Use strong action verbs and quantify achievements where possible:

Original: ${bullet}

Improved bullet point:`;

  return generateText(prompt, 100);
}

/**
 * Generate a professional summary based on experience
 */
export async function generateSummary(
  role: string,
  yearsExperience: number,
  skills: string[]
): Promise<string> {
  const prompt = `Write a professional resume summary for a ${role} with ${yearsExperience} years of experience. Key skills: ${skills.join(", ")}.

Professional summary:`;

  return generateText(prompt, 150);
}

/**
 * Generate bullet points for a job role
 */
export async function generateBulletPoints(
  role: string,
  company: string,
  industry?: string
): Promise<string[]> {
  const prompt = `Generate 3 impactful resume bullet points for a ${role} at ${company}${industry ? ` in the ${industry} industry` : ""}. Use action verbs and quantify achievements.

Bullet points:
1.`;

  const result = await generateText(prompt, 200);
  
  // Parse the result into individual bullet points
  const lines = result.split("\n").filter(line => line.trim());
  return lines.map(line => line.replace(/^\d+\.\s*/, "").trim()).filter(Boolean);
}

/**
 * Suggest skills based on job title
 */
export async function suggestSkills(jobTitle: string): Promise<string[]> {
  const prompt = `List 8 relevant technical and soft skills for a ${jobTitle}. Separate with commas:`;

  const result = await generateText(prompt, 100);
  
  // Parse comma-separated skills
  return result
    .split(",")
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0 && skill.length < 30);
}

/**
 * Make text more professional
 */
export async function makeProfessional(text: string): Promise<string> {
  const prompt = `Rewrite this text to be more professional and suitable for a resume:

Original: ${text}

Professional version:`;

  return generateText(prompt, 150);
}

/**
 * Make text more concise
 */
export async function makeConcise(text: string): Promise<string> {
  const prompt = `Make this text more concise while keeping the key information:

Original: ${text}

Concise version:`;

  return generateText(prompt, 100);
}

/**
 * Fix grammar and spelling
 */
export async function fixGrammar(text: string): Promise<string> {
  const prompt = `Fix any grammar and spelling errors in this text:

Original: ${text}

Corrected:`;

  return generateText(prompt, 150);
}

/**
 * Generate a headline/tagline
 */
export async function generateHeadline(
  role: string,
  specialization?: string
): Promise<string> {
  const prompt = `Generate a professional headline for a ${role}${specialization ? ` specializing in ${specialization}` : ""}. Keep it under 10 words.

Headline:`;

  return generateText(prompt, 30);
}

/**
 * Tailor content for a specific job description
 */
export async function tailorForJob(
  content: string,
  jobDescription: string
): Promise<string> {
  const prompt = `Rewrite this resume content to better match the following job description:

Job Description: ${jobDescription.substring(0, 200)}

Original Content: ${content}

Tailored content:`;

  return generateText(prompt, 200);
}

// ============================================
// ATS OPTIMIZATION
// ============================================

/**
 * Extract keywords from a job description
 */
export async function extractKeywords(jobDescription: string): Promise<string[]> {
  const prompt = `Extract the most important keywords and skills from this job description. List them separated by commas:

${jobDescription.substring(0, 300)}

Keywords:`;

  const result = await generateText(prompt, 100);
  
  return result
    .split(",")
    .map(keyword => keyword.trim())
    .filter(keyword => keyword.length > 0 && keyword.length < 30);
}

/**
 * Check ATS compatibility score
 */
export function calculateATSScore(cvContent: string, keywords: string[]): {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
} {
  const contentLower = cvContent.toLowerCase();
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  keywords.forEach(keyword => {
    if (contentLower.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  const score = keywords.length > 0 
    ? Math.round((matchedKeywords.length / keywords.length) * 100)
    : 0;

  return { score, matchedKeywords, missingKeywords };
}

