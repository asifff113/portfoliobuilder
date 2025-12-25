"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Copy, Check, Loader2, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIContentAssistantProps {
  type: "bio" | "project" | "headline" | "skills" | "testimonial";
  context?: {
    name?: string;
    role?: string;
    industry?: string;
    skills?: string[];
    projectTitle?: string;
  };
  onGenerate?: (content: string) => void;
}

// Simulated AI responses (in production, would call actual AI API)
const generateContent = async (type: string, context: any): Promise<string> => {
  await new Promise((r) => setTimeout(r, 1500)); // Simulate API delay

  const templates: Record<string, string[]> = {
    bio: [
      `Passionate ${context?.role || "developer"} with expertise in building innovative solutions. I transform complex problems into elegant, user-friendly experiences that make a real impact.`,
      `Creative technologist dedicated to crafting digital experiences that matter. With a focus on ${context?.industry || "technology"}, I bring ideas to life through clean code and thoughtful design.`,
      `Results-driven professional specializing in modern web development. I believe in the power of technology to solve real-world problems and create meaningful connections.`,
    ],
    headline: [
      `${context?.role || "Developer"} | Building the Future of Digital Experiences`,
      `Crafting Exceptional ${context?.industry || "Tech"} Solutions | ${context?.role || "Full Stack Developer"}`,
      `Turning Ideas into Reality | ${context?.role || "Creative Developer"} & Problem Solver`,
    ],
    project: [
      `A comprehensive ${context?.projectTitle || "application"} designed to streamline workflows and enhance productivity. Built with modern technologies for optimal performance and user experience.`,
      `An innovative solution that reimagines how users interact with ${context?.industry || "digital products"}. Features include real-time updates, intuitive interfaces, and seamless integrations.`,
      `This project tackles real challenges with elegant solutions. From concept to deployment, every decision was made with the user in mind.`,
    ],
    skills: [
      "React, Next.js, TypeScript, Node.js, PostgreSQL, GraphQL, AWS, Docker, Tailwind CSS, Framer Motion",
      "Full Stack Development, UI/UX Design, System Architecture, API Design, Cloud Infrastructure, Agile/Scrum",
      "JavaScript, Python, Go, REST APIs, MongoDB, Redis, Kubernetes, CI/CD, Testing, Performance Optimization",
    ],
    testimonial: [
      `"Working with ${context?.name || "this developer"} was an absolute pleasure. They delivered exceptional results that exceeded our expectations."`,
      `"Incredible attention to detail and a true understanding of user needs. The project was completed on time and within budget."`,
      `"A rare combination of technical excellence and creative vision. Highly recommended for any complex web development project."`,
    ],
  };

  const options = templates[type] || templates.bio;
  return options[Math.floor(Math.random() * options.length)];
};

export function AIContentAssistant({ type, context, onGenerate }: AIContentAssistantProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const typeLabels: Record<string, string> = {
    bio: "Professional Bio",
    project: "Project Description",
    headline: "Headline/Tagline",
    skills: "Skills List",
    testimonial: "Testimonial Quote",
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const content = await generateContent(type, context);
      setGeneratedContent(content);
      onGenerate?.(content);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">AI Assistant</h4>
          <p className="text-xs text-white/50">Generate {typeLabels[type]}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {generatedContent ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/80 text-sm leading-relaxed">{generatedContent}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="flex-1 border-white/20"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 border-white/20"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                Regenerate
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Quick AI suggestions component
export function AIQuickSuggestions({
  suggestions,
  onSelect,
}: {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onSelect(suggestion)}
          className="px-3 py-1.5 rounded-full text-xs bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-colors flex items-center gap-1"
        >
          <Zap className="w-3 h-3" />
          {suggestion}
        </motion.button>
      ))}
    </div>
  );
}
