"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePortfolioStore } from "../store";
import { 
  TestimonialsEditor, AchievementsEditor, TimelineEditor, TechStackEditor,
  GalleryEditor, ServicesEditor, ContactFormEditor, SocialProofEditor,
  NewsletterEditor, BlogEditor, CvSectionEditor, SkillsRadarEditor
} from "./block-editors";
import type { PortfolioBlock, TestimonialItem, AchievementItem, TimelineItem, TechStackItem, GalleryItem, ServiceItem, SocialProofItem } from "@/types/portfolio";

const blockIcons: Record<string, string> = {
  testimonials: "💬",
  achievements: "🏆",
  timeline: "📅",
  tech_stack: "⚡",
  about: "📝",
  experience: "💼",
  skills: "🎯",
  contact: "📧",
  custom: "✨",
  services: "🛠️",
  social_proof: "🏅",
  gallery: "🖼️",
  contact_form: "📬",
  newsletter: "📰",
  blog: "📝",
  cv_section: "📄",
  skills_radar: "📊",
  video_hero: "🎬",
  case_study: "📋",
  press_talks: "🎤",
  playground: "🎮",
};

interface BlockCardProps {
  block: PortfolioBlock;
}

export function BlockCard({ block }: BlockCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const updateBlock = usePortfolioStore((s) => s.updateBlock);
  const deleteBlock = usePortfolioStore((s) => s.deleteBlock);

  const toggleVisibility = () => {
    updateBlock(block.id, { isVisible: !block.isVisible });
  };

  const handleContentChange = (content: Record<string, unknown>) => {
    updateBlock(block.id, { content });
  };

  const renderEditor = () => {
    switch (block.type) {
      case "testimonials":
        return (
          <TestimonialsEditor
            testimonials={(block.content.items as TestimonialItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "achievements":
        return (
          <AchievementsEditor
            achievements={(block.content.items as AchievementItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "timeline":
        return (
          <TimelineEditor
            items={(block.content.items as TimelineItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "tech_stack":
        return (
          <TechStackEditor
            items={(block.content.items as TechStackItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "gallery":
        return (
          <GalleryEditor
            items={(block.content.items as GalleryItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "services":
        return (
          <ServicesEditor
            services={(block.content.items as ServiceItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "contact_form":
        return (
          <ContactFormEditor
            config={(block.content as { title?: string; subtitle?: string; buttonText?: string; successMessage?: string }) || {}}
            onChange={(config) => handleContentChange(config)}
          />
        );
      case "social_proof":
        return (
          <SocialProofEditor
            items={(block.content.items as SocialProofItem[]) || []}
            onChange={(items) => handleContentChange({ items })}
          />
        );
      case "newsletter":
        return (
          <NewsletterEditor
            config={(block.content as { title?: string; subtitle?: string; buttonText?: string; successMessage?: string; style?: string }) || {}}
            onChange={(config) => handleContentChange(config)}
          />
        );
      case "blog":
        return (
          <BlogEditor
            posts={(block.content.posts as any[]) || []}
            onChange={(posts) => handleContentChange({ posts })}
          />
        );
      case "cv_section":
        return (
          <CvSectionEditor
            config={(block.content as { title?: string; buttonText?: string; cvUrl?: string; summary?: string; highlights?: string[]; showQr?: boolean; showDownloadCount?: boolean }) || {}}
            onChange={(config) => handleContentChange(config)}
          />
        );
      case "skills_radar":
        return (
          <SkillsRadarEditor
            skills={(block.content.skills as { name: string; value: number }[]) || []}
            onChange={(skills) => handleContentChange({ skills })}
          />
        );
      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">Title</label>
              <input
                type="text"
                value={block.title || ""}
                onChange={(e) => updateBlock(block.id, { title: e.target.value })}
                placeholder="Section Title"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Content</label>
              <textarea
                value={(block.content.text as string) || ""}
                onChange={(e) => handleContentChange({ text: e.target.value })}
                placeholder="Add your content here..."
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none resize-none"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={`border-white/10 bg-white/5 overflow-hidden transition-all ${!block.isVisible ? "opacity-50" : ""}`}>
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-white/30 cursor-grab" />
          <span className="text-xl">{blockIcons[block.type] || "📄"}</span>
          <div>
            <p className="font-medium text-white capitalize">{block.type.replace("_", " ")}</p>
            <p className="text-sm text-white/50">{block.title || "Untitled"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); toggleVisibility(); }}
            className="text-white/50 hover:text-white"
          >
            {block.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); deleteBlock(block.id); }}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-white/50" />
          ) : (
            <ChevronDown className="h-5 w-5 text-white/50" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 p-4">
          {renderEditor()}
        </div>
      )}
    </Card>
  );
}
