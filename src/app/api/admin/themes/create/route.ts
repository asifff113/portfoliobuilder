import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("themes")
      .insert({
        name: body.name,
        is_system: body.is_system ?? true,
        primary_color: body.primary_color || "#8B5CF6",
        secondary_color: body.secondary_color || "#06B6D4",
        accent_color: body.accent_color || "#EC4899",
        background_style: body.background_style || "solid",
        background_color: body.background_color || "#0f0d15",
        background_gradient: body.background_gradient || null,
        heading_font: body.heading_font || "Space Grotesk",
        body_font: body.body_font || "Inter",
        border_radius: body.border_radius || "lg",
        shadow_intensity: body.shadow_intensity || "md",
        user_id: null, // System themes don't have a user
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating theme:", error);
      return NextResponse.json({ error: "Failed to create theme" }, { status: 500 });
    }

    return NextResponse.json({ success: true, theme: data });
  } catch (error) {
    console.error("Create theme error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

