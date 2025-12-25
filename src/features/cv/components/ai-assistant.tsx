"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  ChevronDown,
  Lightbulb,
  Target,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCVStore } from "../store";

export function AIAssistant() {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Dialog states
  const [showATSDialog, setShowATSDialog] = useState(false);
  const [showSuggestSkillsDialog, setShowSuggestSkillsDialog] = useState(false);
  const [showGenerateSummaryDialog, setShowGenerateSummaryDialog] = useState(false);
  
  // Form states
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [skills, setSkills] = useState("");
  
  // Results
  const [atsResult, setAtsResult] = useState<{
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    suggestions: string[];
  } | null>(null);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [generatedSummary, setGeneratedSummary] = useState("");

  const { personalInfo, sections, updatePersonalInfo } = useCVStore();

  // Get all CV content as text for ATS analysis
  const getCVContent = (): string => {
    const parts: string[] = [];
    
    // Personal info
    parts.push(personalInfo.fullName);
    parts.push(personalInfo.headline);
    parts.push(personalInfo.summary);
    
    // Sections
    sections.forEach(section => {
      parts.push(section.title);
      section.items.forEach(item => {
        Object.values(item).forEach(value => {
          if (typeof value === "string") {
            parts.push(value);
          } else if (Array.isArray(value)) {
            parts.push(value.join(" "));
          }
        });
      });
    });
    
    return parts.filter(Boolean).join(" ");
  };

  const handleATSCheck = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsProcessing(true);
    try {
      const gemini = await import("@/lib/ai/gemini");
      const cvContent = getCVContent();
      const result = await gemini.analyzeATSCompatibility(cvContent, jobDescription);
      setAtsResult(result);
      toast.success("ATS analysis complete!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to analyze CV");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuggestSkills = async () => {
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title");
      return;
    }

    setIsProcessing(true);
    try {
      const gemini = await import("@/lib/ai/gemini");
      const skills = await gemini.suggestSkills(jobTitle);
      setSuggestedSkills(skills);
      toast.success("Skills suggested!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to suggest skills");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title");
      return;
    }

    setIsProcessing(true);
    try {
      const gemini = await import("@/lib/ai/gemini");
      const skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean);
      const summary = await gemini.generateSummary(
        jobTitle,
        parseInt(yearsExp) || 3,
        skillsArray.length > 0 ? skillsArray : ["problem-solving", "communication"]
      );
      setGeneratedSummary(summary);
      toast.success("Summary generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate summary");
    } finally {
      setIsProcessing(false);
    }
  };

  const applySummary = () => {
    if (generatedSummary) {
      updatePersonalInfo({ summary: generatedSummary });
      setShowGenerateSummaryDialog(false);
      setGeneratedSummary("");
      toast.success("Summary applied!");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-neon-purple/50 bg-neon-purple/10 px-2 text-neon-purple hover:bg-neon-purple/20"
          >
            <Sparkles className="h-4 w-4" />
            <span className="ml-1 hidden sm:inline">AI Assistant</span>
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 border-white/10 bg-gray-900">
          <DropdownMenuLabel className="text-white/50">AI Tools</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          
          <DropdownMenuItem
            onClick={() => setShowATSDialog(true)}
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Target className="mr-2 h-4 w-4 text-neon-cyan" />
            ATS Score Check
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => setShowSuggestSkillsDialog(true)}
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Lightbulb className="mr-2 h-4 w-4 text-neon-orange" />
            Suggest Skills
          </DropdownMenuItem>
          
          <DropdownMenuItem
            onClick={() => setShowGenerateSummaryDialog(true)}
            className="text-white/80 hover:bg-white/10 hover:text-white"
          >
            <FileText className="mr-2 h-4 w-4 text-neon-green" />
            Generate Summary
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ATS Check Dialog */}
      <Dialog open={showATSDialog} onOpenChange={setShowATSDialog}>
        <DialogContent className="max-w-lg border-white/10 bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-neon-cyan" />
              ATS Score Check
            </DialogTitle>
            <DialogDescription className="text-white/50">
              Paste a job description to see how well your CV matches
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/70">Job Description</Label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30"
              />
            </div>

            {atsResult && (
              <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">ATS Score</span>
                  <span className={`text-2xl font-bold ${
                    atsResult.score >= 70 ? "text-neon-green" :
                    atsResult.score >= 50 ? "text-neon-orange" :
                    "text-red-400"
                  }`}>
                    {atsResult.score}%
                  </span>
                </div>
                
                {atsResult.matchedKeywords.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1 text-sm text-neon-green">
                      <CheckCircle className="h-4 w-4" />
                      Matched Keywords
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {atsResult.matchedKeywords.map((kw, i) => (
                        <span key={i} className="rounded bg-neon-green/20 px-2 py-0.5 text-xs text-neon-green">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {atsResult.missingKeywords.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      Missing Keywords
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {atsResult.missingKeywords.map((kw, i) => (
                        <span key={i} className="rounded bg-red-400/20 px-2 py-0.5 text-xs text-red-400">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {atsResult.suggestions && atsResult.suggestions.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1 text-sm text-neon-purple">
                      <Lightbulb className="h-4 w-4" />
                      Suggestions
                    </p>
                    <ul className="list-inside list-disc space-y-1">
                      {atsResult.suggestions.map((suggestion, i) => (
                        <li key={i} className="text-xs text-white/70">{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowATSDialog(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Close
            </Button>
            <Button
              onClick={handleATSCheck}
              disabled={isProcessing}
              className="bg-neon-cyan text-black hover:bg-neon-cyan/80"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suggest Skills Dialog */}
      <Dialog open={showSuggestSkillsDialog} onOpenChange={setShowSuggestSkillsDialog}>
        <DialogContent className="max-w-md border-white/10 bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <Lightbulb className="h-5 w-5 text-neon-orange" />
              Suggest Skills
            </DialogTitle>
            <DialogDescription className="text-white/50">
              Get AI-powered skill suggestions for your role
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/70">Job Title</Label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Frontend Developer"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            {suggestedSkills.length > 0 && (
              <div className="space-y-2">
                <Label className="text-white/70">Suggested Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-neon-orange/20 px-3 py-1.5 text-sm text-neon-orange"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowSuggestSkillsDialog(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Close
            </Button>
            <Button
              onClick={handleSuggestSkills}
              disabled={isProcessing}
              className="bg-neon-orange text-black hover:bg-neon-orange/80"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Suggest Skills"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Summary Dialog */}
      <Dialog open={showGenerateSummaryDialog} onOpenChange={setShowGenerateSummaryDialog}>
        <DialogContent className="max-w-md border-white/10 bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <FileText className="h-5 w-5 text-neon-green" />
              Generate Summary
            </DialogTitle>
            <DialogDescription className="text-white/50">
              Create a professional summary for your CV
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/70">Job Title</Label>
              <Input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/70">Years of Experience</Label>
              <Input
                type="number"
                value={yearsExp}
                onChange={(e) => setYearsExp(e.target.value)}
                placeholder="e.g., 5"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white/70">Key Skills (comma-separated)</Label>
              <Input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., React, TypeScript, Node.js"
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>

            {generatedSummary && (
              <div className="space-y-2">
                <Label className="text-white/70">Generated Summary</Label>
                <div className="rounded-lg border border-neon-green/30 bg-neon-green/10 p-3">
                  <p className="text-sm text-white">{generatedSummary}</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGenerateSummaryDialog(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Close
            </Button>
            {generatedSummary ? (
              <Button
                onClick={applySummary}
                className="bg-neon-green text-black hover:bg-neon-green/80"
              >
                <Download className="mr-2 h-4 w-4" />
                Apply to CV
              </Button>
            ) : (
              <Button
                onClick={handleGenerateSummary}
                disabled={isProcessing}
                className="bg-neon-green text-black hover:bg-neon-green/80"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
