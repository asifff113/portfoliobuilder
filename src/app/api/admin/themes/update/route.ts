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

    if (!body.id) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const updateData: Record<string, unknown> = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.is_system !== undefined) updateData.is_system = body.is_system;
    if (body.primary_color !== undefined) updateData.primary_color = body.primary_color;
    if (body.secondary_color !== undefined) updateData.secondary_color = body.secondary_color;
    if (body.accent_color !== undefined) updateData.accent_color = body.accent_color;
    if (body.background_style !== undefined) updateData.background_style = body.background_style;
    if (body.background_color !== undefined) updateData.background_color = body.background_color;
    if (body.background_gradient !== undefined) updateData.background_gradient = body.background_gradient;
    if (body.heading_font !== undefined) updateData.heading_font = body.heading_font;
    if (body.body_font !== undefined) updateData.body_font = body.body_font;
    if (body.border_radius !== undefined) updateData.border_radius = body.border_radius;
    if (body.shadow_intensity !== undefined) updateData.shadow_intensity = body.shadow_intensity;

    const { data, error } = await supabase
      .from("themes")
      .update(updateData as never)
      .eq("id", body.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating theme:", error);
      return NextResponse.json({ error: "Failed to update theme" }, { status: 500 });
    }

    return NextResponse.json({ success: true, theme: data });
  } catch (error) {
    console.error("Update theme error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

