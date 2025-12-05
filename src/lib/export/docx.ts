/**
 * DOCX Export Utility
 * 
 * Generates Word documents from CV data using the docx library.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
} from "docx";
import { saveAs } from "file-saver";
import type { PersonalInfo, CVSection, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/types/cv";

interface ExportOptions {
  filename?: string;
  includePhoto?: boolean;
}

/**
 * Export CV data to DOCX format
 */
export async function exportToDOCX(
  personalInfo: PersonalInfo,
  sections: CVSection[],
  options: ExportOptions = {}
): Promise<void> {
  const { filename = "cv" } = options;

  const children: Paragraph[] = [];

  // Header - Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalInfo.fullName || "Your Name",
          bold: true,
          size: 48, // 24pt
          color: "2E3440",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  // Headline
  if (personalInfo.headline) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.headline,
            size: 24, // 12pt
            color: "5E81AC",
            italics: true,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
  }

  // Contact Info
  const contactParts: string[] = [];
  if (personalInfo.email) contactParts.push(personalInfo.email);
  if (personalInfo.phone) contactParts.push(personalInfo.phone);
  if (personalInfo.location) contactParts.push(personalInfo.location);
  if (personalInfo.website) contactParts.push(personalInfo.website);
  if (personalInfo.linkedinUrl) contactParts.push(personalInfo.linkedinUrl);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join(" | "),
            size: 20, // 10pt
            color: "4C566A",
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      })
    );
  }

  // Summary
  if (personalInfo.summary) {
    children.push(createSectionHeading("Professional Summary"));
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalInfo.summary,
            size: 22,
            color: "3B4252",
          }),
        ],
        spacing: { after: 300 },
      })
    );
  }

  // Process each section
  for (const section of sections) {
    if (!section.isVisible) continue;

    children.push(createSectionHeading(section.title));

    switch (section.type) {
      case "experience":
        children.push(...renderExperienceSection(section.items as ExperienceItem[]));
        break;
      case "education":
        children.push(...renderEducationSection(section.items as EducationItem[]));
        break;
      case "skills":
        children.push(...renderSkillsSection(section.items as SkillItem[]));
        break;
      case "projects":
        children.push(...renderProjectsSection(section.items as ProjectItem[]));
        break;
      default:
        children.push(...renderGenericSection(section.items));
    }
  }

  // Create document
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(0.75),
              left: convertInchesToTwip(0.75),
            },
          },
        },
        children,
      },
    ],
  });

  // Generate and download
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
}

function createSectionHeading(title: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: title.toUpperCase(),
        bold: true,
        size: 24,
        color: "2E3440",
      }),
    ],
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    border: {
      bottom: {
        color: "5E81AC",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
  });
}

function renderExperienceSection(items: ExperienceItem[]): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  for (const item of items) {
    // Company and Role
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: item.role || "Role",
            bold: true,
            size: 24,
            color: "2E3440",
          }),
          new TextRun({
            text: ` at ${item.company || "Company"}`,
            size: 24,
            color: "3B4252",
          }),
        ],
        spacing: { before: 200, after: 50 },
      })
    );

    // Date and Location
    const dateParts: string[] = [];
    if (item.startDate) {
      dateParts.push(item.startDate);
      dateParts.push(" - ");
      dateParts.push(item.isCurrent ? "Present" : (item.endDate || "Present"));
    }
    if (item.location) {
      dateParts.push(` | ${item.location}`);
    }

    if (dateParts.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: dateParts.join(""),
              size: 20,
              color: "5E81AC",
              italics: true,
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }

    // Description
    if (item.description) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: item.description,
              size: 22,
              color: "3B4252",
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }

    // Bullets
    if (item.bullets && item.bullets.length > 0) {
      for (const bullet of item.bullets) {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${bullet}`,
                size: 22,
                color: "3B4252",
              }),
            ],
            indent: { left: 360 },
            spacing: { after: 50 },
          })
        );
      }
    }

    // Tech Stack
    if (item.techStack && item.techStack.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Technologies: ",
              bold: true,
              size: 20,
              color: "4C566A",
            }),
            new TextRun({
              text: item.techStack.join(", "),
              size: 20,
              color: "5E81AC",
            }),
          ],
          spacing: { after: 150 },
        })
      );
    }
  }

  return paragraphs;
}

function renderEducationSection(items: EducationItem[]): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  for (const item of items) {
    // Degree and Institution
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: item.degree || "Degree",
            bold: true,
            size: 24,
            color: "2E3440",
          }),
          new TextRun({
            text: item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : "",
            size: 24,
            color: "3B4252",
          }),
        ],
        spacing: { before: 200, after: 50 },
      })
    );

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: item.institution || "Institution",
            size: 22,
            color: "3B4252",
          }),
        ],
        spacing: { after: 50 },
      })
    );

    // Date and GPA
    const infoParts: string[] = [];
    if (item.startDate) {
      infoParts.push(`${item.startDate} - ${item.endDate || "Present"}`);
    }
    if (item.gpa) {
      infoParts.push(`GPA: ${item.gpa}`);
    }

    if (infoParts.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: infoParts.join(" | "),
              size: 20,
              color: "5E81AC",
              italics: true,
            }),
          ],
          spacing: { after: 150 },
        })
      );
    }
  }

  return paragraphs;
}

function renderSkillsSection(items: SkillItem[]): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  // Group skills by category
  const categories: Record<string, SkillItem[]> = {};
  for (const item of items) {
    const cat = item.category || "Other";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  }

  for (const [category, skills] of Object.entries(categories)) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${category}: `,
            bold: true,
            size: 22,
            color: "2E3440",
          }),
          new TextRun({
            text: skills.map(s => s.name).join(", "),
            size: 22,
            color: "3B4252",
          }),
        ],
        spacing: { after: 100 },
      })
    );
  }

  return paragraphs;
}

function renderProjectsSection(items: ProjectItem[]): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  for (const item of items) {
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: item.title || "Project",
            bold: true,
            size: 24,
            color: "2E3440",
          }),
        ],
        spacing: { before: 200, after: 50 },
      })
    );

    if (item.description) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: item.description,
              size: 22,
              color: "3B4252",
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }

    // Links
    const links: string[] = [];
    if (item.liveUrl) links.push(`Live: ${item.liveUrl}`);
    if (item.githubUrl) links.push(`GitHub: ${item.githubUrl}`);

    if (links.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: links.join(" | "),
              size: 20,
              color: "5E81AC",
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }

    // Tech Stack
    if (item.techStack && item.techStack.length > 0) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Technologies: ",
              bold: true,
              size: 20,
              color: "4C566A",
            }),
            new TextRun({
              text: item.techStack.join(", "),
              size: 20,
              color: "5E81AC",
            }),
          ],
          spacing: { after: 150 },
        })
      );
    }
  }

  return paragraphs;
}

function renderGenericSection(items: unknown[]): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  for (const item of items) {
    const obj = item as Record<string, unknown>;
    
    // Try to find a title-like field
    const title = obj.title || obj.name || obj.organization || "";
    if (title) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: String(title),
              bold: true,
              size: 24,
              color: "2E3440",
            }),
          ],
          spacing: { before: 200, after: 50 },
        })
      );
    }

    // Try to find a description-like field
    const description = obj.description || obj.content || "";
    if (description) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: String(description),
              size: 22,
              color: "3B4252",
            }),
          ],
          spacing: { after: 100 },
        })
      );
    }
  }

  return paragraphs;
}

