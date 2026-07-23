"use client";
import React from "react";
import { motion } from "framer-motion";

const NAVY = "#001842";
const BLUE = "#0a6cff";

// Shared light hero for interior marketing pages (About, Products, News,
// Contact, Team). Matches the homepage system: white background, editorial
// line+label eyebrow, navy headline, muted subtext.
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <section className="relative bg-white pt-36 md:pt-40 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 50% at 80% 0%, rgba(0,218,242,0.10) 0%, transparent 60%), radial-gradient(45% 45% at 8% 100%, rgba(10,108,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          className="flex items-center justify-center gap-3 mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-px w-8" style={{ background: BLUE }} />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: BLUE }}>
            {eyebrow}
          </span>
          <span className="h-px w-8" style={{ background: BLUE }} />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.05]"
          style={{ color: NAVY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "#4b5563" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
