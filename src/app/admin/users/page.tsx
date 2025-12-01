import { getUsers } from "@/lib/admin";
import { UsersTable } from "./users-table";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string; filter?: string }>;
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search;
  const filter = params.filter;

  const { users, total } = await getUsers(page, 20, search);

  // Filter users if needed
  const filteredUsers = filter === "banned" 
    ? users.filter(u => u.is_banned)
    : filter === "admin"
    ? users.filter(u => u.is_admin)
    : users;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <p className="mt-1 text-white/50">
          View and manage all users on the platform
        </p>
      </div>

      {/* Users Table */}
      <UsersTable 
        users={filteredUsers} 
        total={total} 
        currentPage={page}
        currentSearch={search}
        currentFilter={filter}
      />
    </div>
  );
}

