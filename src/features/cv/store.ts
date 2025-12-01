"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CVData,
  CVMeta,
  PersonalInfo,
  CVSection,
  CVSectionType,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  SkillItem,
  SectionItem,
} from "@/types/cv";
import {
  defaultPersonalInfo,
  defaultCVMeta,
  createDefaultSection,
  createDefaultExperienceItem,
  createDefaultEducationItem,
  createDefaultProjectItem,
  createDefaultSkillItem,
} from "@/types/cv";

interface CVStore {
  // State
  cvId: string | null;
  meta: CVMeta;
  personalInfo: PersonalInfo;
  sections: CVSection[];
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  selectedTemplateId: string;

  // Actions
  initializeCV: (cvId: string | null, data?: Partial<CVData>) => void;
  resetCV: () => void;
  
  // Meta actions
  updateMeta: (updates: Partial<CVMeta>) => void;
  
  // Personal info actions
  updatePersonalInfo: (updates: Partial<PersonalInfo>) => void;
  
  // Section actions
  addSection: (type: CVSectionType) => void;
  updateSection: (sectionId: string, updates: Partial<CVSection>) => void;
  deleteSection: (sectionId: string) => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  
  // Item actions
  addItem: (sectionId: string) => void;
  updateItem: (sectionId: string, itemId: string, updates: Partial<SectionItem>) => void;
  deleteItem: (sectionId: string, itemId: string) => void;
  reorderItems: (sectionId: string, startIndex: number, endIndex: number) => void;
  
  // Template actions
  setTemplate: (templateId: string) => void;
  
  // Save actions
  markAsSaved: () => void;
  setIsSaving: (isSaving: boolean) => void;
}

const initialMeta: CVMeta = {
  ...defaultCVMeta,
  id: "",
  createdAt: new Date().toISOString(),
  lastEditedAt: new Date().toISOString(),
};

export const useCVStore = create<CVStore>()(
  persist(
    (set, get) => ({
      // Initial state
      cvId: null,
      meta: initialMeta,
      personalInfo: defaultPersonalInfo,
      sections: [
        createDefaultSection("experience", 0),
        createDefaultSection("education", 1),
        createDefaultSection("skills", 2),
        createDefaultSection("projects", 3),
      ],
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,
      selectedTemplateId: "neon-minimal",

      // Initialize CV
      initializeCV: (cvId, data) => {
        if (data) {
          set({
            cvId,
            meta: data.meta || initialMeta,
            personalInfo: data.personalInfo || defaultPersonalInfo,
            sections: data.sections || [],
            isDirty: false,
            lastSavedAt: new Date(),
          });
        } else {
          set({
            cvId,
            meta: { ...initialMeta, id: cvId || "" },
            personalInfo: defaultPersonalInfo,
            sections: [
              createDefaultSection("experience", 0),
              createDefaultSection("education", 1),
              createDefaultSection("skills", 2),
              createDefaultSection("projects", 3),
            ],
            isDirty: false,
            lastSavedAt: null,
          });
        }
      },

      resetCV: () => {
        set({
          cvId: null,
          meta: initialMeta,
          personalInfo: defaultPersonalInfo,
          sections: [
            createDefaultSection("experience", 0),
            createDefaultSection("education", 1),
            createDefaultSection("skills", 2),
            createDefaultSection("projects", 3),
          ],
          isDirty: false,
          isSaving: false,
          lastSavedAt: null,
        });
      },

      // Meta actions
      updateMeta: (updates) => {
        set((state) => ({
          meta: { ...state.meta, ...updates, lastEditedAt: new Date().toISOString() },
          isDirty: true,
        }));
      },

      // Personal info actions
      updatePersonalInfo: (updates) => {
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...updates },
          isDirty: true,
        }));
      },

      // Section actions
      addSection: (type) => {
        const { sections } = get();
        const newSection = createDefaultSection(type, sections.length);
        set({
          sections: [...sections, newSection],
          isDirty: true,
        });
      },

      updateSection: (sectionId, updates) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId ? { ...section, ...updates } : section
          ),
          isDirty: true,
        }));
      },

      deleteSection: (sectionId) => {
        set((state) => ({
          sections: state.sections
            .filter((section) => section.id !== sectionId)
            .map((section, index) => ({ ...section, order: index })),
          isDirty: true,
        }));
      },

      reorderSections: (startIndex, endIndex) => {
        const { sections } = get();
        const result = Array.from(sections);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        
        set({
          sections: result.map((section, index) => ({ ...section, order: index })),
          isDirty: true,
        });
      },

      toggleSectionVisibility: (sectionId) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId ? { ...section, isVisible: !section.isVisible } : section
          ),
          isDirty: true,
        }));
      },

      // Item actions
      addItem: (sectionId) => {
        const { sections } = get();
        const section = sections.find((s) => s.id === sectionId);
        if (!section) return;

        let newItem: SectionItem;
        switch (section.type) {
          case "experience":
            newItem = createDefaultExperienceItem();
            break;
          case "education":
            newItem = createDefaultEducationItem();
            break;
          case "projects":
            newItem = createDefaultProjectItem();
            break;
          case "skills":
            newItem = createDefaultSkillItem();
            break;
          default:
            newItem = {
              id: crypto.randomUUID(),
              title: "",
              subtitle: "",
              date: null,
              description: "",
              bullets: [],
            };
        }

        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
          ),
          isDirty: true,
        }));
      },

      updateItem: (sectionId, itemId, updates) => {
        set((state) => {
          const newSections = state.sections.map((section) => {
            if (section.id !== sectionId) return section;
            return {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? ({ ...item, ...updates } as SectionItem) : item
              ),
            };
          });
          return { sections: newSections, isDirty: true };
        });
      },

      deleteItem: (sectionId, itemId) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId
              ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
              : section
          ),
          isDirty: true,
        }));
      },

      reorderItems: (sectionId, startIndex, endIndex) => {
        set((state) => {
          const section = state.sections.find((s) => s.id === sectionId);
          if (!section) return state;

          const items = [...section.items];
          const [removed] = items.splice(startIndex, 1);
          items.splice(endIndex, 0, removed);

          return {
            sections: state.sections.map((s) =>
              s.id === sectionId ? { ...s, items } : s
            ) as CVSection[],
            isDirty: true,
          };
        });
      },

      // Template actions
      setTemplate: (templateId) => {
        set({
          selectedTemplateId: templateId,
          meta: { ...get().meta, templateId },
          isDirty: true,
        });
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
      name: "neoncv-draft",
      partialize: (state) => ({
        cvId: state.cvId,
        meta: state.meta,
        personalInfo: state.personalInfo,
        sections: state.sections,
        selectedTemplateId: state.selectedTemplateId,
      }),
    }
  )
);

// Selectors
export const selectCVData = (state: CVStore): CVData => ({
  meta: state.meta,
  personalInfo: state.personalInfo,
  sections: state.sections,
});

export const selectSection = (sectionId: string) => (state: CVStore) =>
  state.sections.find((s) => s.id === sectionId);

export const selectExperienceItems = (state: CVStore) =>
  state.sections
    .find((s) => s.type === "experience")
    ?.items as ExperienceItem[] | undefined;

export const selectEducationItems = (state: CVStore) =>
  state.sections
    .find((s) => s.type === "education")
    ?.items as EducationItem[] | undefined;

export const selectProjectItems = (state: CVStore) =>
  state.sections
    .find((s) => s.type === "projects")
    ?.items as ProjectItem[] | undefined;

export const selectSkillItems = (state: CVStore) =>
  state.sections
    .find((s) => s.type === "skills")
    ?.items as SkillItem[] | undefined;

