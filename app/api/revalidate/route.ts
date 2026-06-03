import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

// Sanity webhook target. Configure in Studio → Webhooks (Day 12) with:
//   URL:       https://<deploy>/api/revalidate
//   Trigger:   Create / Update / Delete
//   Filter:    _type in ["page","post","product","teamMember","author",
//              "siteSettings","navigation","redirect"]
//   Projection: { _id, _type, "slug": slug.current }
//   Secret:    same value as SANITY_REVALIDATE_SECRET in this app's env
//
// The handler validates the signature, computes the tags this change should
// invalidate, and asks Next.js to re-fetch those tags on the next request.
// sanityFetch() in lib/sanity/fetch.ts is already tagging its requests.

type WebhookBody = {
  _id?: string;
  _type?: string;
  slug?: string;
};

const tagsFor = (body: WebhookBody): string[] => {
  if (!body._type) return [];
  const tags = new Set<string>();
  // Coarse-grained: invalidate the listing for this type.
  tags.add(`type:${body._type}`);
  // Fine-grained: invalidate this specific document's queries.
  if (body.slug) tags.add(`${body._type}:${body.slug}`);
  // Special-case singletons: revalidate everything that reads them.
  if (body._type === "siteSettings" || body._type === "navigation") {
    tags.add("site");
  }
  return [...tags];
};

export async function POST(req: NextRequest) {
  if (!revalidateSecret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set on this deployment." },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookBody>(
      req,
      revalidateSecret,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }
    if (!body?._type) {
      return NextResponse.json(
        { message: "Body missing _type — check the webhook projection." },
        { status: 400 },
      );
    }

    const tags = tagsFor(body);
    // Next 16's revalidateTag takes a second `profile` arg controlling when
    // the cached read is recomputed. { expire: 0 } means "invalidate now —
    // next request goes through to Sanity". This is the right shape for a
    // CMS webhook; named profiles are for app-controlled cache windows.
    for (const tag of tags) revalidateTag(tag, { expire: 0 });

    return NextResponse.json({
      revalidated: true,
      _type: body._type,
      slug: body.slug,
      tags,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: (err as Error).message ?? "Revalidation failed" },
      { status: 500 },
    );
  }
}
