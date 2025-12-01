/**
 * Admin Helper Functions
 *
 * Utilities for checking admin status and permissions.
 */

import { createClient, getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Profile } from "@/types/db";

export interface AdminUser {
  id: string;
  email: string;
  profile: Profile;
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  return profile?.is_admin ?? false;
}

/**
 * Check if a user has premium access (is admin or has premium subscription)
 */
export async function hasPremiumAccess(): Promise<boolean> {
  const user = await getUser();
  if (!user) return false;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  // Admins always have premium access
  if (profile?.is_admin) return true;

  // TODO: Add subscription check here when implementing payments
  return false;
}

/**
 * Require admin access - redirects to dashboard if not admin
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getUser();
  if (!user) {
    redirect("/auth");
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/app/dashboard");
  }

  return {
    id: user.id,
    email: user.email || "",
    profile: profile as Profile,
  };
}

/**
 * Get admin stats for dashboard
 */
export async function getAdminStats() {
  const supabase = await createClient();

  const [usersResult, cvsResult, portfoliosResult, bannedResult] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase.from("cvs").select("id", { count: "exact", head: true }),
    supabase.from("portfolios").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("is_banned", true),
  ]);

  return {
    totalUsers: usersResult.count || 0,
    totalCVs: cvsResult.count || 0,
    totalPortfolios: portfoliosResult.count || 0,
    bannedUsers: bannedResult.count || 0,
  };
}

/**
 * Get all users with pagination
 */
export async function getUsers(page = 1, limit = 20, search?: string) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error fetching users:", error);
    return { users: [], total: 0 };
  }

  return {
    users: data || [],
    total: count || 0,
  };
}

/**
 * Ban a user
 */
export async function banUser(userId: string, reason?: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      is_banned: true,
      banned_at: new Date().toISOString(),
      ban_reason: reason || null,
    })
    .eq("user_id", userId);

  if (error) {
    console.error("Error banning user:", error);
    throw new Error("Failed to ban user");
  }

  return true;
}

/**
 * Unban a user
 */
export async function unbanUser(userId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      is_banned: false,
      banned_at: null,
      ban_reason: null,
    })
    .eq("user_id", userId);

  if (error) {
    console.error("Error unbanning user:", error);
    throw new Error("Failed to unban user");
  }

  return true;
}

/**
 * Get all templates (CV and Portfolio)
 */
export async function getTemplates() {
  const supabase = await createClient();

  const [cvTemplates, portfolioTemplates] = await Promise.all([
    supabase.from("cv_templates").select("*").order("created_at", { ascending: false }),
    supabase.from("portfolio_templates").select("*").order("created_at", { ascending: false }),
  ]);

  return {
    cvTemplates: cvTemplates.data || [],
    portfolioTemplates: portfolioTemplates.data || [],
  };
}

/**
 * Get all themes
 */
export async function getThemes() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("themes")
    .select("*")
    .order("is_system", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching themes:", error);
    return [];
  }

  return data || [];
}

