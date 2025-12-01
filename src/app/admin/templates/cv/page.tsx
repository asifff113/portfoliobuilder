import { getTemplates } from "@/lib/admin";
import { CVTemplatesManager } from "./cv-templates-manager";

export default async function CVTemplatesPage() {
  const { cvTemplates } = await getTemplates();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">CV Templates</h1>
        <p className="mt-1 text-white/50">
          Manage CV templates available to users
        </p>
      </div>

      {/* Templates Manager */}
      <CVTemplatesManager templates={cvTemplates} />
    </div>
  );
}

