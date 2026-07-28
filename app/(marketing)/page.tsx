import type { Metadata } from "next";

import Hero from "../components/ui/sections/Hero";
import Mission from "../components/ui/sections/Mission";
import Solutions from "../components/ui/sections/Solutions";
import WhyFonioLabs from "../components/ui/sections/WhyFonioLabs";

// Title/description/OG already match the root layout defaults — only the
// canonical needs pinning here so "/" doesn't get treated as a duplicate of
// any query-stringed variant.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
   <>
      <Hero />
      <Mission />
      <Solutions />
      <WhyFonioLabs />
   </>
  );
}
