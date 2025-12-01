"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "../store";
import { PortfolioBuilder } from "./portfolio-builder";
import type { PortfolioData, PortfolioProfile } from "@/types/portfolio";

interface PortfolioBuilderWrapperProps {
  portfolioId: string | null;
  initialData?: PortfolioData | null;
  profile?: PortfolioProfile | null;
}

export function PortfolioBuilderWrapper({
  portfolioId,
  initialData,
  profile,
}: PortfolioBuilderWrapperProps) {
  const initializePortfolio = usePortfolioStore((s) => s.initializePortfolio);
  const resetPortfolio = usePortfolioStore((s) => s.resetPortfolio);

  useEffect(() => {
    if (initialData) {
      initializePortfolio(portfolioId, {
        meta: initialData.meta,
        hero: initialData.hero,
        projects: initialData.projects,
        blocks: initialData.blocks,
      });
    } else {
      initializePortfolio(portfolioId);
    }

    return () => {
      // Optionally reset on unmount
      // resetPortfolio();
    };
  }, [portfolioId, initialData, initializePortfolio, resetPortfolio]);

  return <PortfolioBuilder profile={profile} />;
}

