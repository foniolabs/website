import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// Disables Next.js draft mode. Editors hit this from the Presentation tool's
// "Exit preview" affordance, or by navigating to /api/draft-mode/disable
// while logged into the Studio.
export async function GET(request: Request) {
  const dm = await draftMode();
  dm.disable();

  // Send the visitor back where they came from (a Sanity-driven page),
  // falling back to home.
  const referrer = request.headers.get("referer");
  const target = referrer ?? "/";
  return NextResponse.redirect(new URL(target, request.url));
}
