"use client";

import type { PortfolioBlock } from "@/types/portfolio";
import {
  TestimonialsBlock,
  AchievementsBlock,
  TimelineBlock,
  TechStackBlock,
  GalleryBlock,
  ServicesBlock,
  ContactFormBlock,
  SocialProofBlock,
  NewsletterBlock,
  BlogBlock,
  CvSectionBlock,
  SkillsRadarBlock,
} from "../blocks";

interface BlockRendererProps {
  block: PortfolioBlock;
  accentColor?: string;
}

export function BlockRenderer({ block, accentColor = "#06b6d4" }: BlockRendererProps) {
  if (!block.isVisible) return null;

  const renderBlock = () => {
    switch (block.type) {
      case "testimonials":
        return (
          <TestimonialsBlock
            testimonials={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "achievements":
        return (
          <AchievementsBlock
            achievements={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "timeline":
        return (
          <TimelineBlock
            items={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "tech_stack":
        return (
          <TechStackBlock
            items={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "gallery":
        return (
          <GalleryBlock
            items={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "services":
        return (
          <ServicesBlock
            services={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "contact_form":
        return (
          <ContactFormBlock
            config={block.content as any}
            accentColor={accentColor}
          />
        );
      case "social_proof":
        return (
          <SocialProofBlock
            items={(block.content.items as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "newsletter":
        return (
          <NewsletterBlock
            config={block.content as any}
            accentColor={accentColor}
          />
        );
      case "blog":
        return (
          <BlogBlock
            posts={(block.content.posts as any[]) || []}
            accentColor={accentColor}
          />
        );
      case "cv_section":
        return (
          <CvSectionBlock
            config={block.content as any}
            accentColor={accentColor}
          />
        );
      case "skills_radar":
        return (
          <SkillsRadarBlock
            skills={(block.content.skills as any[]) || []}
            accentColor={accentColor}
          />
        );
      default:
        // Generic block display
        return (
          <div className="px-8 py-6">
            <h3 className="text-xl font-semibold text-white mb-2 capitalize">
              {block.title || block.type.replace(/_/g, " ")}
            </h3>
            {block.content.text && (
              <p className="text-white/60">{block.content.text as string}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="block-container">
      {block.title && block.type !== "contact_form" && block.type !== "newsletter" && (
        <div className="px-8 py-2">
          <h3 className="text-lg font-semibold text-white/80 capitalize">
            {block.title}
          </h3>
        </div>
      )}
      {renderBlock()}
    </div>
  );
}
