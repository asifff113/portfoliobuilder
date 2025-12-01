import { getThemes } from "@/lib/admin";
import { ThemesManager } from "./themes-manager";

export default async function ThemesPage() {
  const themes = await getThemes();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Theme Management</h1>
        <p className="mt-1 text-white/50">
          Manage system themes and view user-created themes
        </p>
      </div>

      {/* Themes Manager */}
      <ThemesManager themes={themes} />
    </div>
  );
}

