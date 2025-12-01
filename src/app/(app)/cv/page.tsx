import Link from "next/link";
import { Plus, FileText, Clock, MoreHorizontal, Trash2, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser, createClient } from "@/lib/supabase/server";

interface CVItem {
  id: string;
  title: string;
  slug: string;
  last_edited_at: string;
  is_public: boolean;
}

async function getCVs(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cvs")
    .select("id, title, slug, last_edited_at, is_public")
    .eq("user_id", userId)
    .order("last_edited_at", { ascending: false });

  return (data || []) as CVItem[];
}

export default async function CVListPage() {
  const user = await getUser();
  if (!user) return null;

  const cvs = await getCVs(user.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My CVs</h1>
          <p className="mt-1 text-muted-foreground">Create and manage your CVs</p>
        </div>
        <Link href="/app/cv/new">
          <Button className="glow-sm bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan text-white">
            <Plus className="mr-2 h-4 w-4" />
            Create New CV
          </Button>
        </Link>
      </div>

      {/* CV List */}
      {cvs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cvs.map((cv) => (
            <Card key={cv.id} className="glass group transition-all hover:border-white/20">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-purple/20">
                    <FileText className="h-5 w-5 text-neon-purple" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/app/cv/${cv.id}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link href={`/app/cv/${cv.id}`} className="mt-3 block">
                  <CardTitle className="text-lg hover:text-primary">{cv.title}</CardTitle>
                </Link>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {new Date(cv.last_edited_at).toLocaleDateString()}
                  {cv.is_public && (
                    <span className="rounded-full bg-neon-green/20 px-2 py-0.5 text-xs text-neon-green">
                      Public
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/app/cv/${cv.id}`}>
                  <Button variant="outline" className="w-full">
                    Edit CV
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-pink/20">
              <FileText className="h-10 w-10 text-neon-purple" />
            </div>
            <h2 className="text-xl font-semibold">No CVs yet</h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Create your first CV to showcase your experience, skills, and achievements.
            </p>
            <Link href="/app/cv/new">
              <Button className="glow-sm mt-6 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan text-white">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First CV
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

