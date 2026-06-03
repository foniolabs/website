"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

// Loads HubSpot's official forms embed script once per page and mounts a
// form into a per-instance container. Multiple <HubspotForm /> on a page
// share the same script load but each create their own form instance.
//
// Used in two places:
//   - app/(marketing)/contact/page.tsx for the dedicated contact form
//   - SectionRenderer's contactFormBlock branch so marketing can drop a
//     HubSpot form into any page from Studio

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create(opts: {
          portalId: string;
          formId: string;
          region?: string;
          target?: string;
          redirectUrl?: string;
        }): void;
      };
    };
  }
}

type Props = {
  portalId: string;
  formId: string;
  region?: string;
  redirectUrl?: string;
  // Optional intro rendered above the form — useful inside Sanity sections
  // where the headline/body live next to the embed.
  headline?: string;
  body?: string;
};

// HubSpot ships region-specific versions of the embed script. EU portals
// won't load via the default //js.hsforms.net/... domain — the form will
// silently fail to render. Map region → CDN host.
//   na1 → js.hsforms.net (default, also valid for "global")
//   eu1 → js-eu1.hsforms.net
//   ap1 → js-ap1.hsforms.net
//   au1 → js-au1.hsforms.net
//   ca1 → js-ca1.hsforms.net
//   jp1 → js-jp1.hsforms.net
const scriptSrcFor = (region: string) =>
  region && region !== "na1"
    ? `//js-${region}.hsforms.net/forms/embed/v2.js`
    : "//js.hsforms.net/forms/embed/v2.js";

export function HubspotForm({
  portalId,
  formId,
  region = "na1",
  redirectUrl,
  headline,
  body,
}: Props) {
  const scriptSrc = scriptSrcFor(region);
  const targetId = useId();
  const sanitisedTargetId = `hbspt-${targetId.replace(/:/g, "")}`;
  const [scriptReady, setScriptReady] = useState(false);
  const createdRef = useRef(false);

  useEffect(() => {
    if (!scriptReady || createdRef.current) return;
    if (!window.hbspt) return;
    try {
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${sanitisedTargetId}`,
        ...(redirectUrl ? { redirectUrl } : {}),
      });
      createdRef.current = true;
    } catch (err) {
      console.error("HubspotForm create failed:", err);
    }
  }, [scriptReady, portalId, formId, region, redirectUrl, sanitisedTargetId]);

  if (!portalId || !formId) {
    return (
      <div className="rounded-lg border border-dashed border-neutral-700 p-6 text-sm text-neutral-500">
        HubSpot form unavailable — siteSettings.hubspotPortalId or the block's
        form ID is missing.
      </div>
    );
  }

  return (
    <div className="w-full">
      {headline && (
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{headline}</h2>
      )}
      {body && <p className="text-neutral-300 mb-6">{body}</p>}
      <Script
        src={scriptSrc}
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
        onReady={() => setScriptReady(true)}
      />
      <div id={sanitisedTargetId} className="hubspot-form-container" />
    </div>
  );
}
