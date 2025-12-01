import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, description, category, is_premium } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("cv_templates")
      .insert({
        name,
        description: description || null,
        category: category || "modern",
        is_premium: is_premium || false,
        config: {},
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating template:", error);
      return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
    }

    return NextResponse.json({ success: true, template: data });
  } catch (error) {
    console.error("Create template error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

