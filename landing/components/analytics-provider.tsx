"use client";

import { useEffect } from "react";

import { initAnalytics } from "@/lib/analytics";
import { persistCampaignParamsFromWindow } from "@/lib/utm";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    persistCampaignParamsFromWindow();
    void initAnalytics();
  }, []);

  return <>{children}</>;
}
