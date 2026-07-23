import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import { GoogleAnalytics } from "./components/analytics/GoogleAnalytics";
import { DraftModeBanner } from "./components/sanity/DraftModeBanner";
import { OrganizationJsonLd } from "./components/seo/JsonLd";
import "./globals.css";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://foniolabs.xyz"
).replace(/\/+$/, "");

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fonio Labs",
    template: "%s · Fonio Labs",
  },
  description:
    "A research-driven studio building user-friendly tools and platforms across Web3, AI, gaming, education, and fintech.",
  applicationName: "Fonio Labs",
  authors: [{ name: "Fonio Labs" }],
  openGraph: {
    type: "website",
    siteName: "Fonio Labs",
    url: SITE_URL,
    title: "Fonio Labs — Building the Future of Web3 & AI",
    description:
      "A research-driven studio building user-friendly tools and platforms across Web3, AI, gaming, education, and fintech.",
    images: [
      {
        url: "/api/og?title=Foniolabs&subtitle=Building+the+future+of+Web3+%26+AI",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fonio Labs",
    description:
      "A research-driven studio building user-friendly tools and platforms across Web3, AI, gaming, education, and fintech.",
    images: [
      "/api/og?title=Foniolabs&subtitle=Building+the+future+of+Web3+%26+AI",
    ],
  },
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/foniolabs-logo.svg?v=2" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/foniolabs-logo.svg?v=2"
        />
        <link rel="shortcut icon" href="/foniolabs-logo.svg?v=2" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <OrganizationJsonLd />
        {children}
        {isDraftMode && (
          <>
            <DraftModeBanner />
            <VisualEditing />
          </>
        )}
      </body>
      {/* GA4 mounts only when siteSettings.ga4MeasurementId is set. The
          server component returns null otherwise — zero script tags load
          pre-configuration. Marketing flips this on by pasting the
          Measurement ID into Studio → Site Settings. */}
      <GoogleAnalytics />
    </html>
  );
}
