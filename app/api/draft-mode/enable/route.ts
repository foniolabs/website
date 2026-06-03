import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { client } from "@/lib/sanity/client";
import { readToken } from "@/sanity/env";

// Sets the Next.js draft-mode cookie after validating the request against
// Sanity's preview-URL signing flow. Paired with `previewMode.enable` in
// sanity.config.ts presentationTool. Without SANITY_API_READ_TOKEN the
// validation will fail — set it in .env.local.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: readToken }),
});
