/**
 * Premium Feature Access (Client-side only)
 *
 * Utilities for checking premium feature access from client components.
 * Admins always have access to all premium features.
 * 
 * NOTE: For server-side checks, use the functions in @/lib/admin
 */

import { getSupabaseBrowserClient } from "@/lib/supabase";

/**
 * Check if current user can access premium features (client-side)
 */
export async function canAccessPremiumClient(): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  const profileData = profile as { is_admin: boolean } | null;
  // Admins always have premium access
  if (profileData?.is_admin) return true;

  // TODO: Add subscription check
  return false;
}

/**
 * Check if user is admin (client-side)
 */
export async function isUserAdminClient(): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  const profileData = profile as { is_admin: boolean } | null;
  return profileData?.is_admin ?? false;
}

