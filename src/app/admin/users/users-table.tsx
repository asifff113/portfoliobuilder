"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MoreHorizontal,
  Ban,
  CheckCircle,
  Shield,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import type { Profile } from "@/types/db";

interface UsersTableProps {
  users: Profile[];
  total: number;
  currentPage: number;
  currentSearch?: string;
  currentFilter?: string;
}

export function UsersTable({
  users,
  total,
  currentPage,
  currentSearch,
  currentFilter,
}: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch || "");
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [banReason, setBanReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(total / 20);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`/admin/users?${params.toString()}`);
  };

  const handleFilter = (filter: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    params.set("page", "1");
    router.push(`/admin/users?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/admin/users?${params.toString()}`);
  };

  const handleBanUser = async () => {
    if (!selectedUser) return;
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/users/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.user_id,
          reason: banReason,
        }),
      });

      if (!response.ok) throw new Error("Failed to ban user");

      toast.success(`User ${selectedUser.email} has been banned`);
      setBanDialogOpen(false);
      setSelectedUser(null);
      setBanReason("");
      router.refresh();
    } catch (error) {
      toast.error("Failed to ban user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnbanUser = async (user: Profile) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/users/unban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user_id }),
      });

      if (!response.ok) throw new Error("Failed to unban user");

      toast.success(`User ${user.email} has been unbanned`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to unban user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="border-white/5 bg-white/[0.02]">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input
                placeholder="Search by email or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/30"
              />
            </div>
            <Button type="submit" variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
              Search
            </Button>
          </form>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  <Filter className="mr-2 h-4 w-4" />
                  {currentFilter === "banned" ? "Banned" : currentFilter === "admin" ? "Admins" : "All Users"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-white/10 bg-[#0a0a12]">
                <DropdownMenuItem
                  onClick={() => handleFilter(null)}
                  className="text-white/70 focus:bg-white/5 focus:text-white"
                >
                  All Users
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilter("admin")}
                  className="text-white/70 focus:bg-white/5 focus:text-white"
                >
                  Admins Only
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleFilter("banned")}
                  className="text-white/70 focus:bg-white/5 focus:text-white"
                >
                  Banned Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {currentFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilter(null)}
                className="text-white/50 hover:text-white"
              >
                <X className="mr-1 h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left text-sm text-white/50">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Joined</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-white/40">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-medium text-white">
                          {user.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {user.full_name || "Unnamed User"}
                          </p>
                          <p className="flex items-center gap-1 text-sm text-white/40">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {user.is_banned ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-medium text-red-400">
                          <Ban className="h-3 w-3" />
                          Banned
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {user.is_admin ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 px-2.5 py-1 text-xs font-medium text-orange-400">
                          <Shield className="h-3 w-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/50">
                          <User className="h-3 w-3" />
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-sm text-white/50">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-white/50 hover:bg-white/5 hover:text-white"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-white/10 bg-[#0a0a12]">
                          <DropdownMenuItem className="text-white/70 focus:bg-white/5 focus:text-white">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 focus:bg-white/5 focus:text-white">
                            View CVs
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white/70 focus:bg-white/5 focus:text-white">
                            View Portfolios
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/10" />
                          {user.is_banned ? (
                            <DropdownMenuItem
                              onClick={() => handleUnbanUser(user)}
                              className="text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Unban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setBanDialogOpen(true);
                              }}
                              className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                              disabled={user.is_admin}
                            >
                              <Ban className="mr-2 h-4 w-4" />
                              Ban User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
            <p className="text-sm text-white/50">
              Showing {(currentPage - 1) * 20 + 1} to {Math.min(currentPage * 20, total)} of {total} users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-white/50">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Ban Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent className="border-white/10 bg-[#0a0a12]">
          <DialogHeader>
            <DialogTitle className="text-white">Ban User</DialogTitle>
            <DialogDescription className="text-white/50">
              Are you sure you want to ban {selectedUser?.email}? They will not be able to create new content.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-white/70">Reason (optional)</Label>
              <Input
                placeholder="Enter ban reason..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-white/30"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBanDialogOpen(false)}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBanUser}
              disabled={isLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isLoading ? "Banning..." : "Ban User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

