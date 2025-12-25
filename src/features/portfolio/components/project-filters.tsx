"use client";

import { useState, useMemo } from "react";
import { Search, Filter, X, Tag } from "lucide-react";
import type { FeaturedProject } from "@/types/portfolio";

interface ProjectFiltersProps {
  projects: FeaturedProject[];
  onFilteredProjectsChange: (projects: FeaturedProject[]) => void;
}

export function ProjectFilters({ projects, onFilteredProjectsChange }: ProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract all unique tags and categories
  const { allTags, allCategories } = useMemo(() => {
    const tags = new Set<string>();
    const categories = new Set<string>();
    
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tags.add(tag));
      if (project.category) categories.add(project.category);
    });

    return {
      allTags: Array.from(tags).sort(),
      allCategories: Array.from(categories).sort(),
    };
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((p) =>
        selectedTags.every((tag) => p.tags?.includes(tag))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    return result;
  }, [projects, searchQuery, selectedTags, selectedCategory]);

  // Update parent when filters change
  useMemo(() => {
    onFilteredProjectsChange(filteredProjects);
  }, [filteredProjects, onFilteredProjectsChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedCategory;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded"
          >
            <X className="h-4 w-4 text-white/40" />
          </button>
        )}
      </div>

      {/* Categories */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
            }`}
          >
            All
          </button>
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Tag className="h-4 w-4 text-white/30" />
          {allTags.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/50">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
          <button
            onClick={clearFilters}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
