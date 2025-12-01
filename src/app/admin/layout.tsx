import { requireAdmin } from "@/lib/admin";
import { AdminSidebar } from "./components/admin-sidebar";
import { AdminTopbar } from "./components/admin-topbar";
import { Toaster } from "@/components/ui/sonner";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-[#080810]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-72">
        {/* Top Bar */}
        <AdminTopbar admin={admin} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}

