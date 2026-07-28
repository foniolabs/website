import type { Metadata } from "next";

import { ContactPageContent } from "./ContactPageContent";

const TITLE = "Contact";
const DESCRIPTION =
  "Get in touch with Fonio Labs — reach out about our products, partnerships, or working with our team.";
const OG_IMAGE = `/api/og?title=${encodeURIComponent(TITLE)}&subtitle=${encodeURIComponent(DESCRIPTION)}&eyebrow=${encodeURIComponent("foniolabs.xyz")}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${TITLE} · Fonio Labs`,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · Fonio Labs`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// The contact form is now a custom form (app/components/ui/ContactForm.tsx)
// that POSTs to /api/contact, which emails the team via Resend. No Sanity /
// HubSpot lookup is needed here anymore.
export default function ContactPage() {
  return <ContactPageContent />;
}
