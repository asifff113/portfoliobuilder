import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { userId, reason } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    // Check if target user is not an admin
    const { data: targetProfile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", userId)
      .single();

    const profile = targetProfile as { is_admin: boolean } | null;
    if (profile?.is_admin) {
      return NextResponse.json({ error: "Cannot ban an admin" }, { status: 400 });
    }

    // Ban the user
    const { error } = await supabase
      .from("profiles")
      .update({
        is_banned: true,
        banned_at: new Date().toISOString(),
        ban_reason: reason || null,
      } as never)
      .eq("user_id", userId);

    if (error) {
      console.error("Error banning user:", error);
      return NextResponse.json({ error: "Failed to ban user" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ban user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

