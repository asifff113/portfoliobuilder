"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Search, 
  Trash2, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { deleteCVAction } from "@/features/cv/actions";
import { toast } from "sonner";
import Link from "next/link";

interface CVsTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cvs: any[];
  total: number;
  currentPage: number;
  currentSearch?: string;
}

export function CVsTable({ cvs, total, currentPage, currentSearch }: CVsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch || "");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const totalPages = Math.ceil(total / 20);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/admin/cvs?search=${search}&page=1`);
  };

  const handleDelete = async (cvId: string) => {
    if (!confirm("Are you sure you want to delete this CV?")) return;

    setIsDeleting(cvId);
    try {
      await deleteCVAction(cvId);
      toast.success("CV deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete CV");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search CVs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/5 border-white/10"
          />
        </div>
        <Button type="submit" variant="secondary">Search</Button>
      </form>

      {/* Table */}
      <div className="rounded-md border border-white/10 bg-white/5 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-white/50">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv) => (
              <tr key={cv.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="px-4 py-4 font-medium text-white">
                  {cv.title}
                  <div className="text-xs text-white/50">{cv.slug}</div>
                </td>
                <td className="px-4 py-4 text-white/70">
                  {cv.profiles?.email || "Unknown"}
                  <div className="text-xs text-white/50">{cv.profiles?.full_name}</div>
                </td>
                <td className="px-4 py-4 text-white/70">
                  {new Date(cv.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-4">
                  {cv.is_public ? (
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                      Public
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-500/10 px-2 py-1 text-xs font-medium text-gray-400 ring-1 ring-inset ring-gray-500/20">
                      Private
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/app/cv/${cv.id}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-500 focus:text-red-500"
                        onClick={() => handleDelete(cv.id)}
                        disabled={isDeleting === cv.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">
          Showing {cvs.length} of {total} CVs
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/cvs?page=${currentPage - 1}&search=${search}`)}
            disabled={currentPage <= 1}
            className="border-white/10 bg-white/5 hover:bg-white/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/cvs?page=${currentPage + 1}&search=${search}`)}
            disabled={currentPage >= totalPages}
            className="border-white/10 bg-white/5 hover:bg-white/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
