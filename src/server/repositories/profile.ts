/**
 * Profile Repository
 *
 * CRUD operations for user profiles
 */

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/db";

type ProfileInsert = Omit<Profile, "id" | "created_at" | "updated_at">;
type ProfileUpdate = Partial<Omit<Profile, "id" | "user_id" | "created_at">>;

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data as Profile;
}

export async function createProfile(profile: ProfileInsert): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .insert(profile as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating profile:", error);
    return null;
  }

  return data as Profile;
}

export async function updateProfile(
  userId: string,
  updates: ProfileUpdate
): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .update(updates as never)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }

  return data as Profile;
}

export async function deleteProfile(userId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("profiles").delete().eq("user_id", userId);

  if (error) {
    console.error("Error deleting profile:", error);
    return false;
  }

  return true;
}
