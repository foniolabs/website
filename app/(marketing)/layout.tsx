/**
 * Layout for the public marketing site. Wraps every route in `(marketing)/`
 * (which is a Next.js route group — the `(marketing)` segment doesn't appear
 * in URLs, so `/about`, `/contact`, etc. keep their existing paths).
 *
 * The Studio (under /studio) deliberately renders outside this group so it
 * doesn't get the site Header/Footer.
 */
import Header from "../components/ui/sections/Header";
import Footer from "../components/ui/sections/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
