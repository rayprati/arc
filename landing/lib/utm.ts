export const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "creative_id",
] as const;

export type CampaignKey = (typeof campaignKeys)[number];
export type CampaignParams = Partial<Record<CampaignKey, string>>;
type SearchParamLike = URLSearchParams | { get: (key: string) => string | null };

const storageKey = "arc_campaign_params";

function hasGetter(value: SearchParamLike | CampaignParams): value is SearchParamLike {
  return "get" in value && typeof value.get === "function";
}

export function cleanCampaignParams(
  params: SearchParamLike | CampaignParams | null | undefined,
): CampaignParams {
  if (!params) return {};

  return campaignKeys.reduce<CampaignParams>((acc, key) => {
    const value = hasGetter(params) ? params.get(key) : params[key];

    if (value) acc[key] = value;
    return acc;
  }, {});
}

export function mergeCampaignParams(...sources: CampaignParams[]): CampaignParams {
  return sources.reduce<CampaignParams>((acc, source) => ({ ...acc, ...source }), {});
}

export function persistCampaignParams(params: CampaignParams) {
  if (typeof window === "undefined") return;

  const next = mergeCampaignParams(getStoredCampaignParams(), params);

  if (Object.keys(next).length > 0) {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }
}

export function persistCampaignParamsFromWindow() {
  if (typeof window === "undefined") return {};

  const params = cleanCampaignParams(new URLSearchParams(window.location.search));
  persistCampaignParams(params);
  return params;
}

export function getStoredCampaignParams(): CampaignParams {
  if (typeof window === "undefined") return {};

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as CampaignParams;
  } catch {
    return {};
  }
}

export function buildHrefWithCampaignParams(href: string, params: CampaignParams) {
  if (!href || Object.keys(params).length === 0) return href;

  try {
    const isExternal = /^https?:\/\//.test(href);
    const url = isExternal
      ? new URL(href)
      : new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

    for (const [key, value] of Object.entries(params)) {
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    return isExternal ? url.toString() : `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

export function getTrackingMetadata(extra?: Record<string, unknown>) {
  return {
    path: typeof window !== "undefined" ? window.location.pathname : "/",
    timestamp: new Date().toISOString(),
    ...getStoredCampaignParams(),
    ...extra,
  };
}
