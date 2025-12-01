import { getTemplates } from "@/lib/admin";
import { PortfolioTemplatesManager } from "./portfolio-templates-manager";

export default async function PortfolioTemplatesPage() {
  const { portfolioTemplates } = await getTemplates();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Portfolio Templates</h1>
        <p className="mt-1 text-white/50">
          Manage portfolio templates available to users
        </p>
      </div>

      {/* Templates Manager */}
      <PortfolioTemplatesManager templates={portfolioTemplates} />
    </div>
  );
}

