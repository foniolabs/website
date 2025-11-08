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
    icon: "/foniolabs-logo.svg",
    shortcut: "/foniolabs-logo.svg",
    apple: "/foniolabs-logo.svg",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
