import { NextResponse } from "next/server";

/** Apple App Site Association for Universal Links (www.archabits.co). */
const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    details: [
      {
        appIDs: ["P7TXD448Z8.com.arcphone.arc"],
        components: [{ "/": "/i/*" }],
      },
    ],
  },
} as const;

export function GET() {
  return new NextResponse(JSON.stringify(APPLE_APP_SITE_ASSOCIATION), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
}
