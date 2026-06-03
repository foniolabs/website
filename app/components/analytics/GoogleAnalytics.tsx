import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries";

type SiteSettings = {
  ga4MeasurementId?: string;
};

// Server component. Resolves the GA4 ID from siteSettings at request time so
// marketing can change it in Studio without a deploy. Returns null (and
// emits nothing) when the ID is unset, so the script tag doesn't load at all
// pre-configuration.
export async function GoogleAnalytics() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["site"],
  });
  const id = settings?.ga4MeasurementId?.trim();
  if (!id) return null;
  return <NextGoogleAnalytics gaId={id} />;
}
