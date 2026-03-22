"use client";

import posthog from "posthog-js";

import {
  getStoredCampaignParams,
  getTrackingMetadata,
  persistCampaignParamsFromWindow,
} from "@/lib/utm";

declare global {
  interface Window {
    arcMetaPixel?: {
      pageView: () => void;
      track: (event: string, data?: Record<string, unknown>) => void;
      trackCustom: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

let initialized = false;

export async function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;

  initialized = true;
  persistCampaignParamsFromWindow();

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;

  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: false,
      capture_pageleave: false,
      persistence: "localStorage+cookie",
      autocapture: false,
      person_profiles: "identified_only",
    });
  }

  if (pixelId) {
    try {
      const pixelModule = await import("react-facebook-pixel");
      const pixel = pixelModule.default;
      pixel.init(pixelId);
      pixel.pageView();
      window.arcMetaPixel = pixel;
    } catch {
      window.arcMetaPixel = undefined;
    }
  }
}

export function trackEvent(name: string, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = getTrackingMetadata(properties);

  if (process.env.NODE_ENV !== "production") {
    window.dispatchEvent(new CustomEvent("arc:analytics", { detail: { name, payload } }));
  }

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(name, payload);
  }

  if (window.arcMetaPixel) {
    if (name === "email_submit_success") {
      window.arcMetaPixel.track("Lead", payload);
    } else if (name === "page_view" || name === "page_view_start" || name === "learn_page_view") {
      window.arcMetaPixel.pageView();
      window.arcMetaPixel.trackCustom(name, payload);
    } else {
      window.arcMetaPixel.trackCustom(name, payload);
    }
  }
}

export function identifyLead(email: string) {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.identify(email, {
    email,
    ...getStoredCampaignParams(),
  });
}
