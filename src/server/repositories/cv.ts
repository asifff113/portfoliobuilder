/**
 * CV Repository
 *
 * CRUD operations for CVs, sections, and items
 */

import { createClient } from "@/lib/supabase/server";
import type { CV, CVSection } from "@/types/db";

type CVInsert = Omit<CV, "id" | "created_at" | "updated_at" | "last_edited_at">;
type CVUpdate = Partial<Omit<CV, "id" | "user_id" | "created_at">>;
type SectionInsert = Omit<CVSection, "id" | "created_at" | "updated_at">;
type SectionUpdate = Partial<Omit<CVSection, "id" | "cv_id" | "created_at">>;

// ============================================
// CV OPERATIONS
// ============================================

export async function getCVsByUser(userId: string): Promise<CV[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", userId)
    .order("last_edited_at", { ascending: false });

  if (error) {
    console.error("Error fetching CVs:", error);
    return [];
  }

  return data as CV[];
}

export async function getCVById(cvId: string): Promise<CV | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("cvs").select("*").eq("id", cvId).single();

  if (error) {
    console.error("Error fetching CV:", error);
    return null;
  }

  return data as CV;
}

export async function getCVBySlug(userId: string, slug: string): Promise<CV | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", userId)
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching CV by slug:", error);
    return null;
  }

  return data as CV;
}

export async function createCV(cv: CVInsert): Promise<CV | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cvs")
    .insert(cv as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating CV:", error);
    return null;
  }

  return data as CV;
}

export async function updateCV(cvId: string, updates: CVUpdate): Promise<CV | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cvs")
    .update({ ...updates, last_edited_at: new Date().toISOString() } as never)
    .eq("id", cvId)
    .select()
    .single();

  if (error) {
    console.error("Error updating CV:", error);
    return null;
  }

  return data as CV;
}

export async function deleteCV(cvId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("cvs").delete().eq("id", cvId);

  if (error) {
    console.error("Error deleting CV:", error);
    return false;
  }

  return true;
}

// ============================================
// CV SECTION OPERATIONS
// ============================================

export async function getSectionsByCV(cvId: string): Promise<CVSection[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cv_sections")
    .select("*")
    .eq("cv_id", cvId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching sections:", error);
    return [];
  }

  return data as CVSection[];
}

export async function createSection(section: SectionInsert): Promise<CVSection | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cv_sections")
    .insert(section as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating section:", error);
    return null;
  }

  return data as CVSection;
}

export async function updateSection(
  sectionId: string,
  updates: SectionUpdate
): Promise<CVSection | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cv_sections")
    .update(updates as never)
    .eq("id", sectionId)
    .select()
    .single();

  if (error) {
    console.error("Error updating section:", error);
    return null;
  }

  return data as CVSection;
}

export async function deleteSection(sectionId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("cv_sections").delete().eq("id", sectionId);

  if (error) {
    console.error("Error deleting section:", error);
    return false;
  }

  return true;
}

export async function reorderSections(sections: { id: string; order: number }[]): Promise<boolean> {
  const supabase = await createClient();

  // Update each section's order
  const updates = sections.map(({ id, order }) =>
    supabase
      .from("cv_sections")
      .update({ order } as never)
      .eq("id", id)
  );

  const results = await Promise.all(updates);
  const hasError = results.some((result) => result.error);

  if (hasError) {
    console.error("Error reordering sections");
    return false;
  }

  return true;
}

// ============================================
// CV ITEM OPERATIONS
// ============================================

interface CVItemRow {
  id: string;
  section_id: string;
  order: number;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export async function getItemsBySection(sectionId: string): Promise<Record<string, unknown>[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cv_items")
    .select("*")
    .eq("section_id", sectionId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching items:", error);
    return [];
  }

  // Extract data from JSONB field
  return (data as CVItemRow[]).map((item) => ({
    id: item.id,
    section_id: item.section_id,
    order: item.order,
    created_at: item.created_at,
    updated_at: item.updated_at,
    ...item.data,
  }));
}

export async function createItem(
  sectionId: string,
  data: Record<string, unknown>,
  order: number = 0
): Promise<Record<string, unknown> | null> {
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from("cv_items")
    .insert({ section_id: sectionId, data, order } as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating item:", error);
    return null;
  }

  const typedItem = item as CVItemRow;
  return {
    id: typedItem.id,
    section_id: typedItem.section_id,
    order: typedItem.order,
    created_at: typedItem.created_at,
    updated_at: typedItem.updated_at,
    ...typedItem.data,
  };
}

export async function updateItem(
  itemId: string,
  data: Record<string, unknown>
): Promise<Record<string, unknown> | null> {
  const supabase = await createClient();

  const { data: item, error } = await supabase
    .from("cv_items")
    .update({ data } as never)
    .eq("id", itemId)
    .select()
    .single();

  if (error) {
    console.error("Error updating item:", error);
    return null;
  }

  const typedItem = item as CVItemRow;
  return {
    id: typedItem.id,
    section_id: typedItem.section_id,
    order: typedItem.order,
    created_at: typedItem.created_at,
    updated_at: typedItem.updated_at,
    ...typedItem.data,
  };
}

export async function deleteItem(itemId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("cv_items").delete().eq("id", itemId);

  if (error) {
    console.error("Error deleting item:", error);
    return false;
  }

  return true;
}

export async function reorderItems(items: { id: string; order: number }[]): Promise<boolean> {
  const supabase = await createClient();

  const updates = items.map(({ id, order }) =>
    supabase
      .from("cv_items")
      .update({ order } as never)
      .eq("id", id)
  );

  const results = await Promise.all(updates);
  const hasError = results.some((result) => result.error);

  if (hasError) {
    console.error("Error reordering items");
    return false;
  }

  return true;
}

// ============================================
// FULL CV WITH SECTIONS AND ITEMS
// ============================================

export interface FullCV extends CV {
  sections: (CVSection & { items: Record<string, unknown>[] })[];
}

export async function getFullCV(cvId: string): Promise<FullCV | null> {
  const cv = await getCVById(cvId);
  if (!cv) return null;

  const sections = await getSectionsByCV(cvId);
  const sectionsWithItems = await Promise.all(
    sections.map(async (section) => {
      const items = await getItemsBySection(section.id);
      return { ...section, items };
    })
  );

  return { ...cv, sections: sectionsWithItems };
}
