"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface ExportOptions {
  filename?: string;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
  scale?: number;
  quality?: number;
}

const defaultOptions: ExportOptions = {
  filename: "cv",
  format: "a4",
  orientation: "portrait",
  scale: 2,
  quality: 0.95,
};

/**
 * Export an HTML element to PDF
 */
export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<Blob> {
  const opts = { ...defaultOptions, ...options };

  // Capture the element as a canvas
  const canvas = await html2canvas(element, {
    scale: opts.scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  // Get page dimensions
  const pageWidth = opts.format === "a4" ? 210 : 215.9; // mm
  const pageHeight = opts.format === "a4" ? 297 : 279.4; // mm

  // Create PDF
  const pdf = new jsPDF({
    orientation: opts.orientation,
    unit: "mm",
    format: opts.format,
  });

  // Calculate image dimensions to fit the page
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Handle multi-page PDFs if content is longer than one page
  let heightLeft = imgHeight;
  let position = 0;
  const pageHeightMm = pageHeight;

  // Add first page
  pdf.addImage(
    canvas.toDataURL("image/jpeg", opts.quality),
    "JPEG",
    0,
    position,
    imgWidth,
    imgHeight
  );
  heightLeft -= pageHeightMm;

  // Add additional pages if needed
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(
      canvas.toDataURL("image/jpeg", opts.quality),
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeightMm;
  }

  // Return as blob
  return pdf.output("blob");
}

/**
 * Download PDF directly
 */
export async function downloadPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const opts = { ...defaultOptions, ...options };
  const blob = await exportToPDF(element, opts);

  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${opts.filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export element as PNG image
 */
export async function exportToPNG(
  element: HTMLElement,
  options: { filename?: string; scale?: number } = {}
): Promise<void> {
  const { filename = "cv", scale = 2 } = options;

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  // Create download link
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

