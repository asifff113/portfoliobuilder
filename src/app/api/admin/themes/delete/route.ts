import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

export async function POST(request: NextRequest) {
  try {
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Theme ID is required" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from("themes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting theme:", error);
      return NextResponse.json({ error: "Failed to delete theme" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete theme error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

