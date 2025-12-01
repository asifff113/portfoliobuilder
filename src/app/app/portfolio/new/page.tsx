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

  const profile: PortfolioProfile | null = profileData
    ? {
        fullName: profileData.full_name || "",
        headline: profileData.headline || "",
        email: user.email || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        website: profileData.website_url || "",
        linkedinUrl: profileData.linkedin_url || "",
        githubUrl: profileData.github_url || "",
        bio: profileData.bio || "",
        avatarUrl: profileData.avatar_url || null,
      }
    : null;

  return <PortfolioBuilderWrapper portfolioId={null} profile={profile} />;
}

