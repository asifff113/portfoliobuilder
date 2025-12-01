import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, name, description, category, is_premium } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (is_premium !== undefined) updateData.is_premium = is_premium;

    const { data, error } = await supabase
      .from("cv_templates")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating template:", error);
      return NextResponse.json({ error: "Failed to update template" }, { status: 500 });
    }

    return NextResponse.json({ success: true, template: data });
  } catch (error) {
    console.error("Update template error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

