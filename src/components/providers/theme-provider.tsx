"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/features/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const currentTheme = useThemeStore((s) => s.currentTheme);
  const applyThemeToDOM = useThemeStore((s) => s.applyThemeToDOM);

  // Only run after hydration to prevent mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyThemeToDOM(currentTheme);
    }
  }, [mounted, currentTheme, applyThemeToDOM]);

  return <>{children}</>;
}
