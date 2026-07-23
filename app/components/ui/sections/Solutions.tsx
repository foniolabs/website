"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const NAVY = "#001842";

const products = [
  {
    name: "Skoolbox",
    tag: "EdTech",
    tagColor: "text-orange-600",
    tagBg: "bg-orange-50 border-orange-100",
    logo: "/projects/skoolbox_logo.svg",
    url: "https://skoolbox.xyz",
    description:
      "An offline-first learning platform with a built-in AI copilot tutor for junior and senior secondary students in underserved Nigerian communities. From JSS coursework to WAEC, NECO, and JAMB prep — no internet required.",
    highlights: ["Offline-First Copilot Tutor", "JSS + WAEC / NECO / JAMB", "Runs on Low-Cost Laptops"],
    status: "In Development",
    statusColor: "bg-orange-500",
  },
];

const Solutions = () => {
  return (
    <section className="relative py-28 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#f6f8fc" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(50% 40% at 85% 5%, rgba(10,108,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center justify-center gap-3 mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-8" style={{ background: "#0a6cff" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#0a6cff" }}>
              Our Products
            </span>
            <span className="h-px w-8" style={{ background: "#0a6cff" }} />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: NAVY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Products built for{" "}
            <span className="text-gradient">real impact</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "#4b5563" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From Web3 gaming to offline education — we build across industries, using AI and blockchain to solve problems that matter.
          </motion.p>
        </div>

        {/* Products */}
        <div className="flex justify-center">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="bg-white rounded-2xl p-8 md:p-10 relative overflow-hidden group flex flex-col w-full max-w-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ border: `1px solid ${NAVY}12`, boxShadow: "0 8px 24px rgba(0,24,66,0.05)" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative z-10 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold font-mono ${product.tagColor} ${product.tagBg}`}>
                    {product.tag}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${product.statusColor}`} />
                    <span className="text-xs text-gray-500">{product.status}</span>
                  </div>
                </div>

                {/* Product logo */}
                <div
                  className="w-16 h-16 mb-5 rounded-xl flex items-center justify-center p-2.5 bg-white"
                  style={{ border: `1px solid ${NAVY}12` }}
                >
                  <Image
                    src={product.logo}
                    alt={`${product.name} logo`}
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-3" style={{ color: NAVY }}>{product.name}</h3>
                <p className="mb-6 leading-relaxed text-sm flex-1" style={{ color: "#4b5563" }}>
                  {product.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 rounded-md font-mono"
                      style={{ background: `${NAVY}0a`, color: "#4b5563", border: `1px solid ${NAVY}12` }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold inline-flex items-center gap-2 hover:gap-3.5 transition-all duration-300 w-fit"
                  style={{ color: "#0a6cff" }}
                >
                  Visit Skoolbox
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
