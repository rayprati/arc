import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;
    const email = body.email?.trim();
    const company = body.company?.trim();

    if (company) {
      return NextResponse.json({ ok: true, spamBlocked: true });
    }

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const payload = {
      email,
      timestamp: new Date().toISOString(),
      pagePath: body.pagePath || "/start",
      utm_source: body.utm_source || "",
      utm_medium: body.utm_medium || "",
      utm_campaign: body.utm_campaign || "",
      utm_content: body.utm_content || "",
      creative_id: body.creative_id || "",
      precommit_click: false,
    };

    const formEndpoint = process.env.FORM_ENDPOINT;

    if (formEndpoint) {
      const airtableToken = process.env.AIRTABLE_TOKEN;

      // Airtable expects records wrapped; plain endpoints receive payload directly.
      const body = airtableToken
        ? JSON.stringify({ records: [{ fields: payload }] })
        : JSON.stringify(payload);

      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (airtableToken) headers["Authorization"] = `Bearer ${airtableToken}`;

      const response = await fetch(formEndpoint, {
        method: "POST",
        headers,
        body,
        cache: "no-store",
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: "Unable to capture your email right now." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      forwarded: Boolean(formEndpoint),
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while submitting your email." },
      { status: 500 },
    );
  }
}
