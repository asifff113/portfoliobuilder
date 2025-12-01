/**
 * Theme Repository
 *
 * CRUD operations for themes
 */

import { createClient } from "@/lib/supabase/server";
import type { Theme } from "@/types/db";

type ThemeInsert = Omit<Theme, "id" | "created_at" | "updated_at">;
type ThemeUpdate = Partial<Omit<Theme, "id" | "created_at">>;

export async function getSystemThemes(): Promise<Theme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .eq("is_system", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching system themes:", error);
    return [];
  }

  return data as Theme[];
}

export async function getUserThemes(userId: string): Promise<Theme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching user themes:", error);
    return [];
  }

  return data as Theme[];
}

export async function getAllThemes(userId: string): Promise<Theme[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .or(`user_id.eq.${userId},is_system.eq.true`)
    .order("is_system", { ascending: false })
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching themes:", error);
    return [];
  }

  return data as Theme[];
}

export async function getThemeById(themeId: string): Promise<Theme | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("themes").select("*").eq("id", themeId).single();

  if (error) {
    console.error("Error fetching theme:", error);
    return null;
  }

  return data as Theme;
}

export async function createTheme(theme: ThemeInsert): Promise<Theme | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .insert(theme as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating theme:", error);
    return null;
  }

  return data as Theme;
}

export async function updateTheme(themeId: string, updates: ThemeUpdate): Promise<Theme | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .update(updates as never)
    .eq("id", themeId)
    .select()
    .single();

  if (error) {
    console.error("Error updating theme:", error);
    return null;
  }

  return data as Theme;
}

export async function deleteTheme(themeId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("themes").delete().eq("id", themeId);

  if (error) {
    console.error("Error deleting theme:", error);
    return false;
  }

  return true;
}

export async function duplicateTheme(themeId: string, userId: string): Promise<Theme | null> {
  const theme = await getThemeById(themeId);
  if (!theme) return null;

  const newTheme: ThemeInsert = {
    user_id: userId,
    name: `${theme.name} (Copy)`,
    is_system: false,
    primary_color: theme.primary_color,
    secondary_color: theme.secondary_color,
    accent_color: theme.accent_color,
    background_style: theme.background_style,
    background_color: theme.background_color,
    background_gradient: theme.background_gradient,
    heading_font: theme.heading_font,
    body_font: theme.body_font,
    border_radius: theme.border_radius,
    shadow_intensity: theme.shadow_intensity,
  };

  return createTheme(newTheme);
}
