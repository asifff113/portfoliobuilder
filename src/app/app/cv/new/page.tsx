"use client";

import { useEffect } from "react";
import { useCVStore } from "@/features/cv/store";
import { CVBuilder } from "@/features/cv/components/cv-builder";

export default function NewCVPage() {
  const initializeCV = useCVStore((state) => state.initializeCV);

  useEffect(() => {
    // Initialize a new CV
    initializeCV(null);
  }, [initializeCV]);

  return <CVBuilder isNew />;
}

