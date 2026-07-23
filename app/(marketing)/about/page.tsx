import { AboutPageContent } from "./AboutPageContent";

// /about renders the studio-authored narrative directly. (Previously this was
// Sanity-page-builder-first; we render the hardcoded, brand-themed content so
// the page stays fast and fully on-theme without depending on CMS composition.)
export default function AboutPage() {
  return <AboutPageContent />;
}
