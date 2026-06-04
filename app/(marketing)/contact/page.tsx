import { sanityFetch } from "@/lib/sanity/fetch";
import { siteSettingsQuery } from "@/lib/sanity/queries";

import { ContactPageContent } from "./ContactPageContent";

type SiteSettings = {
  hubspotPortalId?: string;
  hubspotContactFormId?: string;
  hubspotRegion?: string;
};

// Async server: pulls the HubSpot connection details from siteSettings so
// marketing controls which form /contact embeds via Studio. The hero +
// left-column info + right-column container stay exactly as designed;
// only the inner <form> is now a HubSpot embed.
export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["site"],
  });

  return (
    <ContactPageContent
      portalId={settings?.hubspotPortalId}
      formId={settings?.hubspotContactFormId}
      region={settings?.hubspotRegion}
    />
  );
}
