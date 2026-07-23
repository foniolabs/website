import { ContactPageContent } from "./ContactPageContent";

// The contact form is now a custom form (app/components/ui/ContactForm.tsx)
// that POSTs to /api/contact, which emails the team via Resend. No Sanity /
// HubSpot lookup is needed here anymore.
export default function ContactPage() {
  return <ContactPageContent />;
}
