"use client";

/**
 * Import CV Dialog
 * 
 * Allows users to import CV data from:
 * - LinkedIn PDF export
 * - Existing PDF resume
 * - JSON backup
 * - Plain text paste
 */

import { useState, useRef, useCallback } from "react";
import { 
  Upload, 
  FileText, 
  Linkedin, 
  FileJson,
  ClipboardPaste,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCVStore } from "../store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type ImportSource = "linkedin" | "pdf" | "json" | "text";
type ImportStatus = "idle" | "processing" | "success" | "error";

interface ParsedData {
  fullName?: string;
  headline?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
  experience?: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description?: string;
    bullets?: string[];
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
  }>;
  skills?: string[];
}

export function ImportCVDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<ImportSource | null>(null);
  const [importStatus, setImportStatus] = useState<ImportStatus>("idle");
  const [pastedText, setPastedText] = useState("");
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { updatePersonalInfo, addSection, sections } = useCVStore();

  const resetState = () => {
    setSelectedSource(null);
    setImportStatus("idle");
    setPastedText("");
    setParsedData(null);
  };

  const parseTextContent = useCallback(async (text: string) => {
    setImportStatus("processing");
    try {
      const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
      const parsed: ParsedData = {};

      const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) parsed.email = emailMatch[0];

      const phoneMatch = text.match(/[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/);
      if (phoneMatch) parsed.phone = phoneMatch[0];

      if (lines.length > 0) {
        const firstLine = lines[0];
        if (firstLine.length < 50 && !firstLine.includes("@")) {
          parsed.fullName = firstLine;
        }
      }

      if (lines.length > 1 && lines[1].length < 100 && !lines[1].includes("@")) {
        parsed.headline = lines[1];
      }

      const skillsSection = text.match(/skills?[:\s]*([\s\S]*?)(?=\n\n|experience|education|$)/i);
      if (skillsSection) {
        const skillsText = skillsSection[1];
        const skillsList = skillsText
          .split(/[,•\n|]/)
          .map((s) => s.trim())
          .filter((s) => s.length > 1 && s.length < 50);
        parsed.skills = skillsList.slice(0, 30);
      }

      const summaryMatch = text.match(/(?:summary|about|profile)[:\s]*([\s\S]*?)(?=\n\n|experience|education|skills|$)/i);
      if (summaryMatch) {
        parsed.summary = summaryMatch[1].trim().slice(0, 500);
      }

      setParsedData(parsed);
      setImportStatus("success");
    } catch (error) {
      console.error("Parse error:", error);
      setImportStatus("error");
      toast.error("Failed to parse content");
    }
  }, []);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus("processing");

    try {
      if (file.name.endsWith('.json')) {
        // Handle JSON import
        const text = await file.text();
        const data = JSON.parse(text);
        
        if (data.personalInfo && data.sections) {
          // Full CV backup format
          const { loadCV } = useCVStore.getState();
          loadCV({
            meta: data.meta || {},
            personalInfo: data.personalInfo,
            sections: data.sections,
          });
          setImportStatus("success");
          toast.success("CV imported successfully from JSON!");
          setTimeout(() => {
            setIsOpen(false);
            resetState();
          }, 1500);
          return;
        }
      }

      // For PDF files, we'll extract text using a simple approach
      // In production, you'd want to use a proper PDF parsing library
      if (file.type === 'application/pdf') {
        toast.info("PDF parsing requires manual review. Please paste the text content.");
        setSelectedSource("text");
        setImportStatus("idle");
        return;
      }

      // Handle plain text files
      if (file.type === 'text/plain') {
        const text = await file.text();
        await parseTextContent(text);
        return;
      }

      toast.error("Unsupported file format. Please use PDF, JSON, or TXT.");
      setImportStatus("error");
    } catch (error) {
      console.error("Import error:", error);
      toast.error("Failed to parse file");
      setImportStatus("error");
    }
  }, [parseTextContent]);

  const handlePasteText = useCallback(async () => {
    if (!pastedText.trim()) {
      toast.error("Please paste some text first");
      return;
    }
    await parseTextContent(pastedText);
  }, [parseTextContent, pastedText]);

  const applyParsedData = () => {
    if (!parsedData) return;

    // Update personal info
    const personalUpdates: Partial<typeof parsedData> = {};
    if (parsedData.fullName) personalUpdates.fullName = parsedData.fullName;
    if (parsedData.headline) personalUpdates.headline = parsedData.headline;
    if (parsedData.email) personalUpdates.email = parsedData.email;
    if (parsedData.phone) personalUpdates.phone = parsedData.phone;
    if (parsedData.location) personalUpdates.location = parsedData.location;
    if (parsedData.summary) personalUpdates.summary = parsedData.summary;

    if (Object.keys(personalUpdates).length > 0) {
      updatePersonalInfo(personalUpdates as never);
    }

    // Add skills if we found any and there's no skills section
    if (parsedData.skills && parsedData.skills.length > 0) {
      const existingSkillsSection = sections.find(s => s.type === "skills");
      if (!existingSkillsSection) {
        addSection("skills");
      }
      // Note: Individual skill items would need to be added separately
      toast.info(`Found ${parsedData.skills.length} skills. Add them manually to the Skills section.`);
    }

    toast.success("Data imported! Review and complete your CV.");
    setIsOpen(false);
    resetState();
  };

  const importSources = [
    {
      id: "linkedin" as ImportSource,
      name: "LinkedIn PDF",
      description: "Export your profile from LinkedIn as PDF",
      icon: Linkedin,
      color: "text-[#0077B5]",
    },
    {
      id: "pdf" as ImportSource,
      name: "Existing Resume",
      description: "Upload a PDF or Word document",
      icon: FileText,
      color: "text-orange-400",
    },
    {
      id: "json" as ImportSource,
      name: "JSON Backup",
      description: "Restore from a NeonCV backup",
      icon: FileJson,
      color: "text-green-400",
    },
    {
      id: "text" as ImportSource,
      name: "Paste Text",
      description: "Copy and paste your resume text",
      icon: ClipboardPaste,
      color: "text-purple-400",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetState();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8" title="Import">
          <Upload className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-neon-purple" />
            Import Your CV
          </DialogTitle>
          <DialogDescription>
            Import data from an existing resume to get started quickly.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Source Selection */}
          {!selectedSource && importStatus === "idle" && (
            <div className="grid grid-cols-2 gap-3">
              {importSources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => {
                    setSelectedSource(source.id);
                    if (source.id !== "text") {
                      fileInputRef.current?.click();
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border border-white/10 p-4 text-center transition-all hover:border-white/20 hover:bg-white/5",
                  )}
                >
                  <source.icon className={cn("h-8 w-8", source.color)} />
                  <div>
                    <p className="font-medium">{source.name}</p>
                    <p className="text-xs text-muted-foreground">{source.description}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Text Paste Area */}
          {selectedSource === "text" && importStatus !== "success" && (
            <div className="space-y-3">
              <Label>Paste your resume content</Label>
              <Textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your resume text here...

Example:
John Doe
Senior Software Engineer

john@example.com | (555) 123-4567

Summary:
Experienced software engineer with 5+ years...

Skills:
JavaScript, React, Node.js, Python..."
                className="min-h-52 bg-white/5"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSource(null);
                    setPastedText("");
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handlePasteText}
                  disabled={importStatus === "processing"}
                  className="flex-1"
                >
                  {importStatus === "processing" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Parsing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Parse Content
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Processing State */}
          {importStatus === "processing" && selectedSource !== "text" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-neon-cyan" />
              <p className="text-muted-foreground">Processing your file...</p>
            </div>
          )}

          {/* Success State with Preview */}
          {importStatus === "success" && parsedData && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Content parsed successfully!</span>
              </div>
              
              <div className="rounded-lg bg-white/5 p-4 space-y-3">
                <h4 className="font-medium">Extracted Data:</h4>
                
                {parsedData.fullName && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Name:</span>{" "}
                    <span>{parsedData.fullName}</span>
                  </div>
                )}
                
                {parsedData.headline && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Title:</span>{" "}
                    <span>{parsedData.headline}</span>
                  </div>
                )}
                
                {parsedData.email && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <span>{parsedData.email}</span>
                  </div>
                )}
                
                {parsedData.phone && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    <span>{parsedData.phone}</span>
                  </div>
                )}
                
                {parsedData.skills && parsedData.skills.length > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Skills found:</span>{" "}
                    <span>{parsedData.skills.length}</span>
                  </div>
                )}
                
                {parsedData.summary && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Summary:</span>{" "}
                    <span className="line-clamp-2">{parsedData.summary}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setImportStatus("idle");
                    setParsedData(null);
                    if (selectedSource === "text") {
                      // Keep text area open
                    } else {
                      setSelectedSource(null);
                    }
                  }}
                >
                  Try Again
                </Button>
                <Button onClick={applyParsedData} className="flex-1">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Apply to CV
                </Button>
              </div>
            </div>
          )}

          {/* Error State */}
          {importStatus === "error" && (
            <div className="flex flex-col items-center gap-4 py-8">
              <AlertCircle className="h-12 w-12 text-red-400" />
              <p className="text-muted-foreground">Failed to parse the file</p>
              <Button variant="outline" onClick={resetState}>
                Try Again
              </Button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.json,.txt,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Help Text */}
        {!selectedSource && (
          <div className="rounded-lg bg-white/5 p-3 text-xs text-muted-foreground">
            <p className="font-medium mb-1">Tips for best results:</p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>LinkedIn: Go to your profile → More → Save to PDF</li>
              <li>PDF: Works best with text-based PDFs (not scanned images)</li>
              <li>Text paste: Copy all text from your existing resume</li>
            </ul>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

