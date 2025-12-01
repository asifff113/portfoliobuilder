"use client";

import { useEffect } from "react";
import { useCVStore } from "../store";
import { CVBuilder } from "./cv-builder";
import type { CVData } from "@/types/cv";

interface CVBuilderWrapperProps {
  cvId: string;
  initialData: CVData;
}

export function CVBuilderWrapper({ cvId, initialData }: CVBuilderWrapperProps) {
  const initializeCV = useCVStore((state) => state.initializeCV);

  useEffect(() => {
    initializeCV(cvId, initialData);
  }, [cvId, initialData, initializeCV]);

  return <CVBuilder />;
}

