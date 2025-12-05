import { getAllCVs } from "@/lib/admin";
import { CVsTable } from "./cvs-table";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminCVsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search;

  const { cvs, total } = await getAllCVs(page, 20, search);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">CV Management</h1>
        <p className="mt-1 text-white/50">
          View and manage all CVs on the platform
        </p>
      </div>

      <CVsTable 
        cvs={cvs} 
        total={total} 
        currentPage={page}
        currentSearch={search}
      />
    </div>
  );
}
