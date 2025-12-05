import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PortfolioBuilderWrapper } from "@/features/portfolio";
import type { PortfolioProfile } from "@/types/portfolio";

export const dynamic = "force-dynamic";

export default async function NewPortfolioPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Get user profile for default values
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const profileRow = profileData as {
    full_name: string | null;
    headline: string | null;
    phone: string | null;
    location: string | null;
    website_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    bio: string | null;
    avatar_url: string | null;
  } | null;

  const profile: PortfolioProfile | null = profileRow
    ? {
        fullName: profileRow.full_name || "",
        headline: profileRow.headline || "",
        email: user.email || "",
        phone: profileRow.phone || "",
        location: profileRow.location || "",
        website: profileRow.website_url || "",
        linkedinUrl: profileRow.linkedin_url || "",
        githubUrl: profileRow.github_url || "",
        bio: profileRow.bio || "",
        avatarUrl: profileRow.avatar_url || null,
      }
    : null;

  return <PortfolioBuilderWrapper portfolioId={null} profile={profile} />;
}

