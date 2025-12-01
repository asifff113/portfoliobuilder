import Link from "next/link";
import {
  FileText,
  Briefcase,
  Plus,
  ArrowRight,
  Eye,
  Download,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

interface DashboardCV {
  id: string;
  title: string;
  slug: string;
  last_edited_at: string;
}

interface DashboardPortfolio {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  updated_at: string;
}

async function getDashboardData(userId: string) {
  const supabase = await createClient();

  // Get CVs
  const { data: cvs } = await supabase
    .from("cvs")
    .select("id, title, slug, last_edited_at")
    .eq("user_id", userId)
    .order("last_edited_at", { ascending: false })
    .limit(3);

  // Get Portfolios
  const { data: portfolios } = await supabase
    .from("portfolios")
    .select("id, title, slug, is_published, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(3);

  // Get counts
  const { count: cvCount } = await supabase
    .from("cvs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  const { count: portfolioCount } = await supabase
    .from("portfolios")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);

  return {
    cvs: (cvs || []) as DashboardCV[],
    portfolios: (portfolios || []) as DashboardPortfolio[],
    stats: {
      cvCount: cvCount || 0,
      portfolioCount: portfolioCount || 0,
    },
  };
}

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) return null;

  const { cvs, portfolios, stats } = await getDashboardData(user.id);
  const userName = user.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-gradient">{userName}</span>! 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here&apos;s an overview of your CVs and portfolios
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/app/cv/new">
          <Card className="glass group cursor-pointer transition-all hover:border-neon-purple/50 hover:glow-sm">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-pink">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Create New CV</h3>
                <p className="text-sm text-muted-foreground">
                  Start from scratch or use a template
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </CardContent>
          </Card>
        </Link>

        <Link href="/app/portfolio/new">
          <Card className="glass group cursor-pointer transition-all hover:border-neon-cyan/50 hover:glow-cyan">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-neon-cyan to-neon-blue">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Create Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase your work online
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total CVs</p>
                <p className="text-3xl font-bold">{stats.cvCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-purple/20">
                <FileText className="h-6 w-6 text-neon-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Portfolios</p>
                <p className="text-3xl font-bold">{stats.portfolioCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-cyan/20">
                <Briefcase className="h-6 w-6 text-neon-cyan" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Profile Views</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-pink/20">
                <Eye className="h-6 w-6 text-neon-pink" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/20">
                <Download className="h-6 w-6 text-neon-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent CVs */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent CVs</h2>
          <Link href="/app/cv">
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {cvs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cvs.map((cv) => (
              <Link key={cv.id} href={`/app/cv/${cv.id}`}>
                <Card className="glass group cursor-pointer transition-all hover:border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-purple/20">
                        <FileText className="h-5 w-5 text-neon-purple" />
                      </div>
                    </div>
                    <CardTitle className="mt-3 text-lg">{cv.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(cv.last_edited_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="glass">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No CVs yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first CV to get started
              </p>
              <Link href="/app/cv/new">
                <Button className="mt-4 glow-sm bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create CV
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Portfolios */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Portfolios</h2>
          <Link href="/app/portfolio">
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {portfolios.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <Link key={portfolio.id} href={`/app/portfolio/${portfolio.id}`}>
                <Card className="glass group cursor-pointer transition-all hover:border-white/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/20">
                        <Briefcase className="h-5 w-5 text-neon-cyan" />
                      </div>
                      {portfolio.is_published && (
                        <span className="rounded-full bg-neon-green/20 px-2 py-0.5 text-xs font-medium text-neon-green">
                          Published
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-3 text-lg">{portfolio.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(portfolio.updated_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="glass">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No portfolios yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first portfolio to showcase your work
              </p>
              <Link href="/app/portfolio/new">
                <Button className="mt-4 glow-cyan bg-gradient-to-r from-neon-cyan to-neon-blue text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Portfolio
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="border-gradient bg-gradient-to-r from-neon-purple/5 via-neon-pink/5 to-neon-cyan/5">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold">Pro Tip</h3>
            <p className="text-sm text-muted-foreground">
              Use our AI-powered suggestions to improve your CV descriptions and make them stand
              out to recruiters.
            </p>
          </div>
          <Button variant="outline" className="shrink-0">
            Learn more
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

