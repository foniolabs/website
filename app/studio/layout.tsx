/**
 * Layout for the embedded Studio. Lives outside the marketing-site layout so
 * the Studio takes the full viewport and isn't wrapped in the public chrome.
 *
 * The `dynamic = "force-static"` export lets us pre-render the Studio shell
 * (the data still streams in client-side at runtime).
 */
export { metadata, viewport } from "next-sanity/studio";

export const dynamic = "force-static";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
