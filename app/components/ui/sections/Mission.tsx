"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const NAVY = "#001842";

const pillars = [
  {
    stat: "Multi",
    title: "Industry Focus",
    body: "Gaming, EdTech, Fintech, and beyond",
  },
  {
    stat: "Africa",
    title: "First, Global Always",
    body: "Built from Nigeria for the world",
  },
  {
    stat: "Ship",
    title: "Real Products, Real Impact",
    body: "We build and launch — not just research",
  },
];

const Mission = () => {
  return (
    <section className="relative bg-white py-28 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* subtle brand wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(55% 45% at 15% 10%, rgba(0,218,242,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-8" style={{ background: "#0a6cff" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0a6cff" }}>
              Our Mission
            </span>
            <span className="h-px w-8" style={{ background: "#0a6cff" }} />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            style={{ color: NAVY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building technology that solves{" "}
            <span className="text-gradient">real problems</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-12 leading-relaxed max-w-3xl mx-auto"
            style={{ color: "#4b5563" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fonio Labs is a Nigerian technology studio. We build apps and platforms across industries — identifying high-impact problems and engineering products powered by AI, Web3, and modern software to solve them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/about">
              <button
                className="px-8 py-3.5 rounded-lg font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: `1.5px solid ${NAVY}`, color: NAVY }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = NAVY;
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = NAVY;
                }}
              >
                Our Story
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Pillars */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              className="text-center p-10 rounded-2xl bg-white transition-shadow duration-300 hover:shadow-xl"
              style={{ border: `1px solid ${NAVY}12`, boxShadow: "0 8px 24px rgba(0,24,66,0.05)" }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-3 text-gradient">{p.stat}</div>
              <div className="text-lg font-semibold" style={{ color: NAVY }}>{p.title}</div>
              <p className="text-sm mt-2" style={{ color: "#6b7280" }}>{p.body}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
