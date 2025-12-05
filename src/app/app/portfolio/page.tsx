import { getSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Plus,
  Globe,
  EyeOff,
  ExternalLink,
  Calendar,
  BarChart3,
  MoreVertical,
  Trash2,
  Edit,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const dynamic = "force-dynamic";

export default async function PortfolioListPage() {
  const supabase = await getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Fetch user's portfolios
  const { data: portfolios, error } = await supabase
    .from("portfolios")
    .select(`
      id,
      title,
      slug,
      is_published,
      layout_type,
      created_at,
      updated_at,
      hero_headline
    `)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching portfolios:", error);
  }

  const portfoliosList = (portfolios || []) as Array<{
    id: string;
    title: string;
    slug: string;
    is_published: boolean;
    layout_type: string;
    created_at: string;
    updated_at: string;
    hero_headline: string | null;
  }>;

  const hasPortfolios = portfoliosList.length > 0;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Portfolios</h1>
          <p className="mt-1 text-white/60">
            Create and manage your professional portfolios
          </p>
        </div>
        <Link href="/app/portfolio/new">
          <Button className="bg-linear-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            New Portfolio
          </Button>
        </Link>
      </div>

      {/* Portfolio Grid or Empty State */}
      {hasPortfolios ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfoliosList.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

// Portfolio Card Component
function PortfolioCard({ portfolio }: { portfolio: {
  id: string;
  title: string;
  slug: string;
  is_published: boolean;
  layout_type: string;
  created_at: string;
  updated_at: string;
  hero_headline: string | null;
} }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-neon-purple/50 hover:bg-white/10">
      {/* Status Badge */}
      <div className="absolute right-4 top-4">
        {portfolio.is_published ? (
          <span className="flex items-center gap-1 rounded-full bg-neon-green/20 px-2 py-1 text-xs text-neon-green">
            <Globe className="h-3 w-3" />
            Published
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white/50">
            <EyeOff className="h-3 w-3" />
            Draft
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">
          {portfolio.title || "Untitled Portfolio"}
        </h3>
        {portfolio.hero_headline && (
          <p className="mt-1 line-clamp-2 text-sm text-white/50">
            {portfolio.hero_headline}
          </p>
        )}
      </div>

      {/* Meta Info */}
      <div className="mb-4 flex items-center gap-4 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {new Date(portfolio.updated_at).toLocaleDateString()}
        </span>
        {portfolio.slug && (
          <span className="truncate">/{portfolio.slug}</span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link href={`/app/portfolio/${portfolio.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full border-white/10 hover:border-neon-purple/50">
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Button>
        </Link>
        
        {portfolio.is_published && portfolio.slug && (
          <Link href={`/p/${portfolio.slug}`} target="_blank">
            <Button variant="outline" size="sm" className="border-white/10 hover:border-neon-cyan/50">
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-white/10 bg-gray-900">
            <DropdownMenuItem className="text-white/80 hover:bg-white/10">
              <Copy className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white/80 hover:bg-white/10">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-white/5 px-8 py-16 text-center">
      {/* Illustration */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-neon-purple/20 to-neon-cyan/20">
        <Globe className="h-12 w-12 text-neon-purple" />
      </div>

      {/* Text */}
      <h3 className="mb-2 text-xl font-semibold text-white">
        No portfolios yet
      </h3>
      <p className="mb-6 max-w-sm text-white/50">
        Create your first portfolio to showcase your work, projects, and professional experience to the world.
      </p>

      {/* CTA */}
      <Link href="/app/portfolio/new">
        <Button className="bg-linear-to-r from-neon-purple to-neon-cyan text-white hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Portfolio
        </Button>
      </Link>

      {/* Features */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Feature
          icon="🎨"
          title="Beautiful Templates"
          description="Choose from multiple professional designs"
        />
        <Feature
          icon="📊"
          title="Analytics"
          description="Track views and engagement"
        />
        <Feature
          icon="🔗"
          title="Custom URLs"
          description="Share with a memorable link"
        />
      </div>
    </div>
  );
}

// Feature Component
function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-lg bg-white/5 p-4">
      <span className="text-2xl">{icon}</span>
      <h4 className="mt-2 font-medium text-white">{title}</h4>
      <p className="text-xs text-white/50">{description}</p>
    </div>
  );
}
