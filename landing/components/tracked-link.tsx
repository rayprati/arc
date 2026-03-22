"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import {
  buildHrefWithCampaignParams,
  cleanCampaignParams,
  getStoredCampaignParams,
  mergeCampaignParams,
} from "@/lib/utm";

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  eventName?: string;
  eventPayload?: Record<string, unknown>;
  preserveCampaignParams?: boolean;
};

export function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventPayload,
  preserveCampaignParams = true,
}: TrackedLinkProps) {
  const [resolvedHref, setResolvedHref] = useState(href);

  useEffect(() => {
    if (!preserveCampaignParams || typeof window === "undefined") {
      setResolvedHref(href);
      return;
    }

    const nextParams = mergeCampaignParams(
      getStoredCampaignParams(),
      cleanCampaignParams(new URLSearchParams(window.location.search)),
    );

    setResolvedHref(buildHrefWithCampaignParams(href, nextParams));
  }, [href, preserveCampaignParams]);

  return (
    <Link
      className={className}
      href={resolvedHref}
      onClick={() => {
        if (eventName) trackEvent(eventName, eventPayload);
      }}
    >
      {children}
    </Link>
  );
}
