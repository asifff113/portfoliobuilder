/**
 * Portfolio Repository
 *
 * CRUD operations for portfolios, blocks, and featured projects
 */

import { createClient } from "@/lib/supabase/server";
import type { Portfolio, PortfolioBlock, FeaturedProject } from "@/types/db";

type PortfolioInsert = Omit<Portfolio, "id" | "created_at" | "updated_at">;
type PortfolioUpdate = Partial<Omit<Portfolio, "id" | "user_id" | "created_at">>;
type BlockInsert = Omit<PortfolioBlock, "id" | "created_at" | "updated_at">;
type BlockUpdate = Partial<Omit<PortfolioBlock, "id" | "portfolio_id" | "created_at">>;
type ProjectInsert = Omit<FeaturedProject, "id" | "created_at" | "updated_at">;
type ProjectUpdate = Partial<Omit<FeaturedProject, "id" | "portfolio_id" | "created_at">>;

// ============================================
// PORTFOLIO OPERATIONS
// ============================================

export async function getPortfoliosByUser(userId: string): Promise<Portfolio[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching portfolios:", error);
    return [];
  }

  return data as Portfolio[];
}

export async function getPortfolioById(portfolioId: string): Promise<Portfolio | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", portfolioId)
    .single();

  if (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }

  return data as Portfolio;
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("Error fetching portfolio by slug:", error);
    return null;
  }

  return data as Portfolio;
}

export async function createPortfolio(portfolio: PortfolioInsert): Promise<Portfolio | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .insert(portfolio as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating portfolio:", error);
    return null;
  }

  return data as Portfolio;
}

export async function updatePortfolio(
  portfolioId: string,
  updates: PortfolioUpdate
): Promise<Portfolio | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .update(updates as never)
    .eq("id", portfolioId)
    .select()
    .single();

  if (error) {
    console.error("Error updating portfolio:", error);
    return null;
  }

  return data as Portfolio;
}

export async function deletePortfolio(portfolioId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("portfolios").delete().eq("id", portfolioId);

  if (error) {
    console.error("Error deleting portfolio:", error);
    return false;
  }

  return true;
}

export async function publishPortfolio(
  portfolioId: string,
  isPublished: boolean
): Promise<Portfolio | null> {
  return updatePortfolio(portfolioId, { is_published: isPublished });
}

// ============================================
// PORTFOLIO BLOCK OPERATIONS
// ============================================

export async function getBlocksByPortfolio(portfolioId: string): Promise<PortfolioBlock[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolio_blocks")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching blocks:", error);
    return [];
  }

  return data as PortfolioBlock[];
}

export async function createBlock(block: BlockInsert): Promise<PortfolioBlock | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolio_blocks")
    .insert(block as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating block:", error);
    return null;
  }

  return data as PortfolioBlock;
}

export async function updateBlock(
  blockId: string,
  updates: BlockUpdate
): Promise<PortfolioBlock | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolio_blocks")
    .update(updates as never)
    .eq("id", blockId)
    .select()
    .single();

  if (error) {
    console.error("Error updating block:", error);
    return null;
  }

  return data as PortfolioBlock;
}

export async function deleteBlock(blockId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("portfolio_blocks").delete().eq("id", blockId);

  if (error) {
    console.error("Error deleting block:", error);
    return false;
  }

  return true;
}

// ============================================
// FEATURED PROJECT OPERATIONS
// ============================================

export async function getProjectsByPortfolio(portfolioId: string): Promise<FeaturedProject[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("featured_projects")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data as FeaturedProject[];
}

export async function createProject(project: ProjectInsert): Promise<FeaturedProject | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("featured_projects")
    .insert(project as never)
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return null;
  }

  return data as FeaturedProject;
}

export async function updateProject(
  projectId: string,
  updates: ProjectUpdate
): Promise<FeaturedProject | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("featured_projects")
    .update(updates as never)
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    return null;
  }

  return data as FeaturedProject;
}

export async function deleteProject(projectId: string): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("featured_projects").delete().eq("id", projectId);

  if (error) {
    console.error("Error deleting project:", error);
    return false;
  }

  return true;
}

// ============================================
// FULL PORTFOLIO WITH BLOCKS AND PROJECTS
// ============================================

export interface FullPortfolio extends Portfolio {
  blocks: PortfolioBlock[];
  projects: FeaturedProject[];
}

export async function getFullPortfolio(portfolioId: string): Promise<FullPortfolio | null> {
  const portfolio = await getPortfolioById(portfolioId);
  if (!portfolio) return null;

  const [blocks, projects] = await Promise.all([
    getBlocksByPortfolio(portfolioId),
    getProjectsByPortfolio(portfolioId),
  ]);

  return { ...portfolio, blocks, projects };
}

export async function getPublicPortfolio(slug: string): Promise<FullPortfolio | null> {
  const portfolio = await getPortfolioBySlug(slug);
  if (!portfolio) return null;

  const [blocks, projects] = await Promise.all([
    getBlocksByPortfolio(portfolio.id),
    getProjectsByPortfolio(portfolio.id),
  ]);

  return { ...portfolio, blocks, projects };
}
