/**
 * JSON Import/Export Utility
 * 
 * Allows users to backup and restore their CV data.
 */

import type { PersonalInfo, CVSection, CVMeta } from "@/types/cv";

export interface CVExportData {
  version: string;
  exportedAt: string;
  meta: Partial<CVMeta>;
  personalInfo: PersonalInfo;
  sections: CVSection[];
}

/**
 * Export CV data to JSON format
 */
export function exportCVToJSON(
  meta: Partial<CVMeta>,
  personalInfo: PersonalInfo,
  sections: CVSection[]
): string {
  const exportData: CVExportData = {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    meta: {
      title: meta.title,
      language: meta.language,
      templateId: meta.templateId,
    },
    personalInfo,
    sections,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Download CV as JSON file
 */
export function downloadCVAsJSON(
  meta: Partial<CVMeta>,
  personalInfo: PersonalInfo,
  sections: CVSection[],
  filename?: string
): void {
  const json = exportCVToJSON(meta, personalInfo, sections);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename || meta.title || "cv"}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validate imported CV data
 */
export function validateCVImport(data: unknown): { valid: boolean; error?: string } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid data format" };
  }

  const cvData = data as Record<string, unknown>;

  if (!cvData.version) {
    return { valid: false, error: "Missing version field" };
  }

  if (!cvData.personalInfo || typeof cvData.personalInfo !== "object") {
    return { valid: false, error: "Missing or invalid personalInfo" };
  }

  if (!Array.isArray(cvData.sections)) {
    return { valid: false, error: "Missing or invalid sections array" };
  }

  return { valid: true };
}

/**
 * Parse imported JSON and return CV data
 */
export function parseCVImport(jsonString: string): {
  success: boolean;
  data?: CVExportData;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonString);
    const validation = validateCVImport(parsed);

    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    return { success: true, data: parsed as CVExportData };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to parse JSON",
    };
  }
}

/**
 * Read file and parse CV data
 */
export function readCVFromFile(file: File): Promise<{
  success: boolean;
  data?: CVExportData;
  error?: string;
}> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const content = event.target?.result as string;
      resolve(parseCVImport(content));
    };

    reader.onerror = () => {
      resolve({ success: false, error: "Failed to read file" });
    };

    reader.readAsText(file);
  });
}

