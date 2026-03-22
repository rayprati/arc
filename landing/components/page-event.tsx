"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function PageEvent({
  eventName,
  payload,
}: {
  eventName: string;
  payload?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(eventName, payload);
  }, [eventName, payload]);

  return null;
}
