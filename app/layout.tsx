import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/sections/Header";
import Footer from "./components/ui/sections/Footer";

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
  title: "Fonio Labs - Building the Future of Web3 & AI",
  description:
    "A research-driven company focusing on building user-friendly tools and technology around Web3 and AI",
  icons: {
    icon: "/images/foniolabs-logo.png",
    apple: "/images/foniolabs-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Explicit favicon links to ensure browsers pick up the logo correctly */}
        <link rel="icon" href="/images/foniolabs-logo.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/foniolabs-logo.png"
        />
        <link rel="shortcut icon" href="/images/foniolabs-logo.png" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
