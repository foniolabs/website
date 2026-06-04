import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

// auto('format') asks Sanity's CDN to negotiate the best image format with
// the browser: AVIF if supported, then WebP, then JPEG/PNG. Big LCP win on
// modern browsers without us having to maintain format fallbacks.
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
