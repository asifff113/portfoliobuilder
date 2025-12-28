"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  PortfolioMeta,
  PortfolioHero,
  FeaturedProject,
  PortfolioBlock,
  PortfolioLayoutType,
} from "@/types/portfolio";
import {
  defaultPortfolioHero,
  defaultPortfolioMeta,
  createDefaultProject,
} from "@/types/portfolio";

interface PortfolioStore {
  // State
  portfolioId: string | null;
  meta: PortfolioMeta;
  hero: PortfolioHero;
  projects: FeaturedProject[];
  blocks: PortfolioBlock[];
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Actions
  initializePortfolio: (portfolioId: string | null, data?: Partial<{
    meta: PortfolioMeta;
    hero: PortfolioHero;
    projects: FeaturedProject[];
    blocks: PortfolioBlock[];
  }>) => void;
  resetPortfolio: () => void;

  // Meta actions
  updateMeta: (updates: Partial<PortfolioMeta>) => void;
  setLayout: (layoutType: PortfolioLayoutType) => void;

  // Hero actions
  updateHero: (updates: Partial<PortfolioHero>) => void;

  // Project actions
  addProject: () => void;
  updateProject: (projectId: string, updates: Partial<FeaturedProject>) => void;
  deleteProject: (projectId: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;

  // Block actions
  addBlock: (type: PortfolioBlock["type"]) => void;
  updateBlock: (blockId: string, updates: Partial<PortfolioBlock>) => void;
  deleteBlock: (blockId: string) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;

  // Publishing
  togglePublish: () => void;

  // Save actions
  markAsSaved: () => void;
  setIsSaving: (isSaving: boolean) => void;
}

const initialMeta: PortfolioMeta = {
  ...defaultPortfolioMeta,
  id: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      // Initial state
      portfolioId: null,
      meta: initialMeta,
      hero: defaultPortfolioHero,
      projects: [],
      blocks: [],
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,

      // Initialize
      initializePortfolio: (portfolioId, data) => {
        if (data) {
          set({
            portfolioId,
            meta: data.meta || initialMeta,
            hero: data.hero || defaultPortfolioHero,
            projects: data.projects || [],
            blocks: data.blocks || [],
            isDirty: false,
            lastSavedAt: new Date(),
          });
        } else {
          set({
            portfolioId,
            meta: { ...initialMeta, id: portfolioId || "" },
            hero: defaultPortfolioHero,
            projects: [],
            blocks: [],
            isDirty: false,
            lastSavedAt: null,
          });
        }
      },

      resetPortfolio: () => {
        set({
          portfolioId: null,
          meta: initialMeta,
          hero: defaultPortfolioHero,
          projects: [],
          blocks: [],
          isDirty: false,
          isSaving: false,
          lastSavedAt: null,
        });
      },

      // Meta actions
      updateMeta: (updates) => {
        set((state) => ({
          meta: { ...state.meta, ...updates, updatedAt: new Date().toISOString() },
          isDirty: true,
        }));
      },

      setLayout: (layoutType) => {
        console.log("[Store] setLayout called with:", layoutType);
        set((state) => {
          console.log("[Store] Previous layoutType:", state.meta.layoutType, "-> New:", layoutType);
          return {
            meta: { ...state.meta, layoutType },
            isDirty: true,
          };
        });
      },

      // Hero actions
      updateHero: (updates) => {
        set((state) => ({
          hero: { ...state.hero, ...updates },
          isDirty: true,
        }));
      },

      // Project actions
      addProject: () => {
        const { projects } = get();
        const newProject = createDefaultProject();
        newProject.order = projects.length;
        set({
          projects: [...projects, newProject],
          isDirty: true,
        });
      },

      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === projectId ? { ...p, ...updates } : p
          ),
          isDirty: true,
        }));
      },

      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects
            .filter((p) => p.id !== projectId)
            .map((p, index) => ({ ...p, order: index })),
          isDirty: true,
        }));
      },

      reorderProjects: (startIndex, endIndex) => {
        const { projects } = get();
        const result = Array.from(projects);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        set({
          projects: result.map((p, index) => ({ ...p, order: index })),
          isDirty: true,
        });
      },

      // Block actions
      addBlock: (type) => {
        const { blocks } = get();
        const newBlock: PortfolioBlock = {
          id: crypto.randomUUID(),
          type,
          title: type.charAt(0).toUpperCase() + type.slice(1),
          content: {},
          order: blocks.length,
          isVisible: true,
        };
        set({
          blocks: [...blocks, newBlock],
          isDirty: true,
        });
      },

      updateBlock: (blockId, updates) => {
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === blockId ? { ...b, ...updates } : b
          ),
          isDirty: true,
        }));
      },

      deleteBlock: (blockId) => {
        set((state) => ({
          blocks: state.blocks
            .filter((b) => b.id !== blockId)
            .map((b, index) => ({ ...b, order: index })),
          isDirty: true,
        }));
      },

      reorderBlocks: (startIndex, endIndex) => {
        const { blocks } = get();
        const result = Array.from(blocks);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        set({
          blocks: result.map((b, index) => ({ ...b, order: index })),
          isDirty: true,
        });
      },

      // Publishing
      togglePublish: () => {
        set((state) => ({
          meta: { ...state.meta, isPublished: !state.meta.isPublished },
          isDirty: true,
        }));
      },

      // Save actions
      markAsSaved: () => {
        set({
          isDirty: false,
          lastSavedAt: new Date(),
          isSaving: false,
        });
      },

      setIsSaving: (isSaving) => {
        set({ isSaving });
      },
    }),
    {
      name: "neoncv-portfolio-draft",
      partialize: (state) => ({
        portfolioId: state.portfolioId,
        meta: state.meta,
        hero: state.hero,
        projects: state.projects,
        blocks: state.blocks,
      }),
    }
  )
);

