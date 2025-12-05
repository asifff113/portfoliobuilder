"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

// Creates a CV with sections/items, enforcing a max of 3 CVs for non-admins (oldest trimmed).
export async function createCVAction(data: {
  title: string;
  language: string;
  themeId?: string;
  isPublic: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    const { data: cvs, error: fetchError } = await supabase
      .from("cvs")
      .select("id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      throw new Error("Failed to check CV limit");
    }

    if (cvs && cvs.length >= 3) {
      const cvsToDelete = cvs.slice(2) as { id: string }[];
      const idsToDelete = cvsToDelete.map((cv) => cv.id);

      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from("cvs")
          .delete()
          .in("id", idsToDelete);

        if (deleteError) {
          console.error("Error deleting old CVs:", deleteError);
        }
      }
    }
  }

  const baseSlug =
    data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `cv-${Date.now()}`;

  let slug = baseSlug;
  let counter = 1;
  let isUnique = false;
  const maxAttempts = 100;

  while (!isUnique && counter <= maxAttempts) {
    const { data: existingCV } = await supabase
      .from("cvs")
      .select("id")
      .eq("user_id", user.id)
      .eq("slug", slug)
      .single();

    if (!existingCV) {
      isUnique = true;
    } else {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }
  }

  if (!isUnique) {
    slug = `cv-${Date.now()}`;
  }

  const { data: newCV, error: cvError } = await supabase
    .from("cvs")
    .insert({
      user_id: user.id,
      title: data.title || "Untitled CV",
      slug,
      language: data.language,
      template_id: null,
      theme_id: data.themeId || null,
      is_public: data.isPublic,
    } as never)
    .select()
    .single();

  if (cvError) {
    throw new Error(`Failed to create CV: ${cvError.message}`);
  }

  const typedNewCV = newCV as { id: string };

  for (const section of data.sections) {
    const { data: newSection, error: sectionError } = await supabase
      .from("cv_sections")
      .insert({
        cv_id: typedNewCV.id,
        type: section.type,
        title: section.title,
        order: section.order,
        is_visible: section.isVisible,
      } as never)
      .select()
      .single();

    if (sectionError) {
      console.error("Error creating section:", sectionError);
      continue;
    }

    const typedNewSection = newSection as { id: string };

    if (section.items && section.items.length > 0) {
      const itemsToInsert = section.items.map(
        (item: Record<string, unknown> & { id?: string }, index: number) => {
          const itemData = { ...item };
          delete itemData.id;
          return {
            section_id: typedNewSection.id,
            order: index,
            data: itemData,
          };
        }
      );

      const { error: itemsError } = await supabase
        .from("cv_items")
        .insert(itemsToInsert as never);

      if (itemsError) {
        console.error("Error creating items:", itemsError);
      }
    }
  }

  revalidatePath("/app/cv");
  return typedNewCV;
}

// Deletes a CV after ownership/admin check, then revalidates caches.
export async function deleteCVAction(cvId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const isUserAdmin = await isAdmin();

  if (!isUserAdmin) {
    const { data: cv } = await supabase
      .from("cvs")
      .select("user_id")
      .eq("id", cvId)
      .single();

    const typedCV = cv as { user_id: string } | null;

    if (!typedCV || typedCV.user_id !== user.id) {
      throw new Error("Unauthorized");
    }
  }

  const { error } = await supabase.from("cvs").delete().eq("id", cvId);

  if (error) {
    throw new Error("Failed to delete CV");
  }

  revalidatePath("/app/cv");
  revalidatePath("/admin/cvs");
}
