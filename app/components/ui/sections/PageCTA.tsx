"use client";
import React from "react";
import { motion } from "framer-motion";

// Shared brand CTA band (navy → blue) used at the foot of interior pages.
// Mirrors the homepage WhyFonioLabs closing band so every page ends on-brand.
export function PageCTA({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 md:px-12 lg:px-20 pb-24 pt-8 bg-white">
      <motion.div
        className="max-w-6xl mx-auto rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001842 0%, #0a6cff 100%)" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(0,218,242,0.25)" }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl" style={{ background: "rgba(10,108,255,0.25)" }} />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">{subtitle}</p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">{children}</div>
        </div>
      </motion.div>
    </section>
  );
}

// Button helpers so pages don't re-declare inline styles.
export function CTAPrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-8 py-3.5 rounded-lg font-semibold text-base bg-white transition-transform duration-200 hover:-translate-y-0.5"
      style={{ color: "#001842" }}
    >
      {children}
    </button>
  );
}

export function CTASecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-8 py-3.5 rounded-lg font-semibold text-base text-white border border-white/40 hover:bg-white/10 transition-colors duration-200">
      {children}
    </button>
  );
}
