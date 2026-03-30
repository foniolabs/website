"use client";
import React from "react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Futbol Fusion",
    tag: "Web3 Gaming",
    tagColor: "text-emerald-400",
    tagBg: "bg-emerald-400/10 border-emerald-400/20",
    description:
      "PvP fantasy football where players truly own the game. Pick your squad, challenge opponents, and earn real rewards — all on-chain. Built for Solana dApp Store with an Android APK available.",
    gradient: "from-emerald-500 to-teal-500",
    highlights: ["Player-Owned Assets", "PvP Matchmaking", "Solana Network", "Android APK"],
    status: "Live",
    statusColor: "bg-emerald-500",
  },
  {
    name: "Skoolbox",
    tag: "EdTech",
    tagColor: "text-orange-400",
    tagBg: "bg-orange-400/10 border-orange-400/20",
    description:
      "An offline-first learning platform with an integrated AI tutor built for secondary school students in underserved Nigerian communities. Prep for WAEC, NECO, and JAMB — no internet required.",
    gradient: "from-orange-500 to-amber-500",
    highlights: ["Offline-First AI Tutor", "WAEC / NECO / JAMB Prep", "Vocational Skills", "Runs on Low-Cost Android"],
    status: "In Development",
    statusColor: "bg-orange-500",
  },
  {
    name: "Stacka",
    tag: "Fintech",
    tagColor: "text-blue-400",
    tagBg: "bg-blue-400/10 border-blue-400/20",
    description:
      "A next-generation investment platform bridging crypto and traditional finance. Built for crypto-native users in Nigeria and emerging markets, with unified access to stocks, crypto, and DeFi using USDC.",
    gradient: "from-blue-500 to-cyan-500",
    highlights: ["Stocks + Crypto + DeFi", "USDC-Powered", "Emerging Markets", "Unified Portfolio"],
    status: "In Development",
    statusColor: "bg-blue-500",
  },
];

const Solutions = () => {
  return (
    <section className="relative section-dark py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.3), transparent)" }} />
      <div className="absolute top-40 left-10 ascii-art text-blue-500/10 hidden lg:block">
        {`****++LLLL
****LLLLLL
****++LLLL
****LLLLLL`}
      </div>
      <div className="absolute bottom-40 right-10 ascii-art text-purple-500/10 hidden lg:block">
        {`VVVVVVIIII
VIIIIIIII
VIIIIIIII
IIIIIIIII`}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-indigo-300">
              // OUR PRODUCTS //
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Products built for{" "}
            <span className="text-gradient">real impact</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From Web3 gaming to offline education — we build across industries, using AI and blockchain to solve problems that matter.
          </motion.p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="card-hover bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Gradient orb */}
              <div
                className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${product.gradient} opacity-15 blur-3xl group-hover:opacity-25 transition-all duration-500`}
              />

              <div className="relative z-10 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold font-mono ${product.tagColor} ${product.tagBg}`}
                  >
                    {product.tag}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${product.statusColor}`} />
                    <span className="text-xs text-gray-500">{product.status}</span>
                  </div>
                </div>

                {/* Icon placeholder */}
                <div
                  className={`w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
                >
                  <div className="w-7 h-7 bg-white/20 rounded-lg" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">{product.name}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-1">
                  {product.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs px-2.5 py-1 rounded-md font-mono"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <button className={`text-sm font-semibold flex items-center gap-2 hover:gap-3.5 transition-all duration-300 ${product.tagColor}`}>
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
