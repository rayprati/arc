"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

const milestones = [25, 50, 75, 100];

export function ScrollTracker() {
  useEffect(() => {
    const fired = new Set<number>();

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.round((scrollTop / total) * 100) : 100;

      for (const milestone of milestones) {
        if (progress >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          trackEvent("scroll_depth", { depth: milestone });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
