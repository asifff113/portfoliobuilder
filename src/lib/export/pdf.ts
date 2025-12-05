"use client";

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
 * Get all stylesheets content from the current document
 */
function getAllStyles(): string {
  const styles: string[] = [];
  
  // Get all stylesheet rules
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      if (sheet.cssRules) {
        Array.from(sheet.cssRules).forEach((rule) => {
          styles.push(rule.cssText);
        });
      }
    } catch (e) {
      // Cross-origin stylesheets might throw errors
      // Try to get the href and include as link
      if (sheet.href) {
        styles.push(`@import url("${sheet.href}");`);
      }
    }
  });
  
  // Also get inline styles from <style> elements
  document.querySelectorAll("style").forEach((styleEl) => {
    if (styleEl.textContent) {
      styles.push(styleEl.textContent);
    }
  });
  
  return styles.join("\n");
}

/**
 * Create a print-ready iframe with the CV content
 */
function createPrintFrame(element: HTMLElement, format: "a4" | "letter"): HTMLIFrameElement {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  
  document.body.appendChild(iframe);
  
  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) {
    throw new Error("Could not access iframe document");
  }
  
  // Get page dimensions
  const pageWidth = format === "a4" ? "210mm" : "8.5in";
  const pageHeight = format === "a4" ? "297mm" : "11in";
  
  // Clone the element
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Write the document
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>CV Export</title>
        <style>
          ${getAllStyles()}
          
          @media print {
            @page {
              size: ${pageWidth} ${pageHeight};
              margin: 0;
            }
            
            html, body {
              width: ${pageWidth};
              min-height: ${pageHeight};
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            .cv-container {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 20mm !important;
              box-sizing: border-box !important;
              background: white !important;
            }
          }
          
          html, body {
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .cv-container {
            width: 100%;
            background: white;
            padding: 20mm;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body>
        <div class="cv-container">
          ${clonedElement.outerHTML}
        </div>
      </body>
    </html>
  `);
  doc.close();
  
  return iframe;
}

/**
 * Download PDF using browser's print dialog
 * This fully supports modern CSS colors (oklch, lab, etc.)
 */
export async function downloadPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<void> {
  const opts = { ...defaultOptions, ...options };
  
  // Create print frame
  const iframe = createPrintFrame(element, opts.format || "a4");
  
  // Wait for iframe to load
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Trigger print dialog
  const iframeWindow = iframe.contentWindow;
  if (iframeWindow) {
    // Show a message about saving as PDF
    const printPromise = new Promise<void>((resolve) => {
      // Focus the iframe window
      iframeWindow.focus();
      
      // Print
      iframeWindow.print();
      
      // Clean up after a delay (print dialog is blocking on some browsers)
      setTimeout(() => {
        document.body.removeChild(iframe);
        resolve();
      }, 1000);
    });
    
    await printPromise;
  } else {
    document.body.removeChild(iframe);
    throw new Error("Could not access iframe window");
  }
}

/**
 * Export an HTML element to PDF blob
 * Note: This opens the print dialog for the user to save as PDF
 */
export async function exportToPDF(
  element: HTMLElement,
  options: ExportOptions = {}
): Promise<Blob> {
  // For blob export, we'll need to use a different approach
  // For now, trigger print dialog and return an empty blob
  await downloadPDF(element, options);
  
  // Return a placeholder blob - the actual PDF is saved via print dialog
  return new Blob([], { type: "application/pdf" });
}

/**
 * Export element as PNG image using canvas API
 * This converts oklch/lab colors to RGB by reading computed styles
 */
export async function exportToPNG(
  element: HTMLElement,
  options: { filename?: string; scale?: number } = {}
): Promise<void> {
  const { filename = "cv", scale = 2 } = options;
  
  // Get element dimensions
  const rect = element.getBoundingClientRect();
  const width = rect.width * scale;
  const height = rect.height * scale;
  
  // Create a canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }
  
  // Fill with white background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  
  // Create an SVG foreignObject to render the HTML
  const svgData = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${await getElementWithInlineStyles(element)}
        </div>
      </foreignObject>
    </svg>
  `;
  
  // Convert SVG to data URL
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svgBlob);
  
  // Load SVG as image
  const img = new Image();
  img.crossOrigin = "anonymous";
  
  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      // Scale context
      ctx.scale(scale, scale);
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      
      URL.revokeObjectURL(svgUrl);
      resolve();
    };
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      reject(new Error("Failed to load SVG"));
    };
    img.src = svgUrl;
  });
  
  // Download the canvas as PNG
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Clone element with all computed styles as inline styles
 * This converts oklch/lab to RGB since computed styles are always RGB
 */
async function getElementWithInlineStyles(element: HTMLElement): Promise<string> {
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Apply computed styles recursively
  applyComputedStyles(element, clone);
  
  return clone.outerHTML;
}

/**
 * Apply computed styles from original element to cloned element
 */
function applyComputedStyles(original: Element, clone: Element): void {
  if (!(original instanceof HTMLElement) || !(clone instanceof HTMLElement)) {
    return;
  }
  
  const computed = window.getComputedStyle(original);
  
  // Apply all important style properties
  const importantProps = [
    "color", "background-color", "background",
    "border", "border-color", "border-radius",
    "font-family", "font-size", "font-weight", "line-height",
    "padding", "margin", "width", "height",
    "display", "flex-direction", "justify-content", "align-items", "gap",
    "text-align", "text-decoration",
    "box-shadow", "opacity",
  ];
  
  importantProps.forEach((prop) => {
    const value = computed.getPropertyValue(prop);
    if (value && value !== "none" && value !== "auto") {
      clone.style.setProperty(prop, value);
    }
  });
  
  // Process children
  const originalChildren = original.children;
  const cloneChildren = clone.children;
  
  for (let i = 0; i < originalChildren.length && i < cloneChildren.length; i++) {
    applyComputedStyles(originalChildren[i], cloneChildren[i]);
  }
}
