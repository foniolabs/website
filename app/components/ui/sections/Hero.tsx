"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
const HEADER_HEIGHT = 68; // must match Header.tsx

const TechNetworkFlow = dynamic(
  () => import("./TechNetworkFlow"),
  { ssr: false }
);

// PCB-style circuit board trace background
const CircuitBg = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none select-none"
    viewBox="0 0 1200 750"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M -30 170 H 110 L 155 125 H 310 L 355 170 H 520 L 560 130 H 700" stroke="rgba(59,130,246,0.22)" strokeWidth="1.5" />
    <circle cx="110" cy="170" r="3.5" fill="rgba(59,130,246,0.45)" />
    <circle cx="310" cy="125" r="3.5" fill="rgba(59,130,246,0.45)" />
    <circle cx="520" cy="170" r="3.5" fill="rgba(59,130,246,0.45)" />
    <path d="M 155 125 V 55 H 290 L 330 15 H 500" stroke="rgba(99,102,241,0.16)" strokeWidth="1.5" />
    <circle cx="290" cy="55" r="3" fill="rgba(99,102,241,0.35)" />
    <path d="M 355 170 V 240 H 220 L 180 280 H 30" stroke="rgba(59,130,246,0.14)" strokeWidth="1.5" />
    <circle cx="220" cy="240" r="3" fill="rgba(59,130,246,0.3)" />
    <path d="M -30 330 H 75 L 115 290 H 240 L 280 330 H 410 L 450 370 H 580" stroke="rgba(59,130,246,0.14)" strokeWidth="1.5" />
    <circle cx="75" cy="330" r="2.5" fill="rgba(59,130,246,0.28)" />
    <circle cx="240" cy="290" r="2.5" fill="rgba(59,130,246,0.28)" />
    <circle cx="410" cy="330" r="2.5" fill="rgba(59,130,246,0.28)" />
    <path d="M 280 330 V 420 H 160 L 120 460 H 30" stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
    <path d="M -30 490 H 90 L 130 450 H 270 L 310 490 H 460 L 500 530 H 600" stroke="rgba(59,130,246,0.1)" strokeWidth="1.5" />
    <circle cx="130" cy="450" r="2.5" fill="rgba(59,130,246,0.22)" />
    <path d="M -30 620 H 120 L 160 660 H 320 L 360 620 H 510" stroke="rgba(59,130,246,0.09)" strokeWidth="1.5" />
    <path d="M 560 130 V 80 H 640 L 680 40 H 800" stroke="rgba(59,130,246,0.12)" strokeWidth="1" />
    <circle cx="640" cy="80" r="2" fill="rgba(59,130,246,0.25)" />
    <path d="M 1250 80 H 1120 L 1080 120 H 980 L 940 80 H 860" stroke="rgba(59,130,246,0.07)" strokeWidth="1" />
    <path d="M 1250 680 H 1100 L 1060 640 H 920 L 880 680 H 780" stroke="rgba(59,130,246,0.06)" strokeWidth="1" />
    <rect x="293" y="116" width="8" height="8" rx="1" fill="rgba(99,102,241,0.2)" />
    <rect x="513" y="161" width="8" height="8" rx="1" fill="rgba(59,130,246,0.2)" />
    <rect x="213" y="231" width="8" height="8" rx="1" fill="rgba(59,130,246,0.18)" />
  </svg>
);


const Hero = () => {
  const products = [
    { name: "Futbol Fusion", tag: "Web3 Gaming", color: "bg-emerald-400" },
    { name: "Skoolbox",       tag: "EdTech",      color: "bg-orange-400"  },
    { name: "Stacka",          tag: "Fintech",     color: "bg-blue-400"    },
  ];

  const builtProducts = [
    "Futbol Fusion", "Skoolbox", "Stacka", "Futbol Fusion", "Skoolbox", "Stacka",
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#0b0f1a",
        marginTop: `${HEADER_HEIGHT}px`,
      }}
    >
      <CircuitBg />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 40%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center" style={{ minHeight: "82vh" }}>

          {/* Left */}
          <div className="flex flex-col justify-center">
            <motion.div
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full w-fit mb-9"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-widest uppercase" style={{ color: "#93c5fd" }}>
                Technology Product Studio
              </span>
            </motion.div>

            <motion.h1
              className="font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.2 }}
            >
              We Build Products<br />
              <span className="text-gradient">That Change</span><br />
              Industries
            </motion.h1>

            <motion.p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "#9ca3af", maxWidth: "520px" }}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.38 }}
            >
              Fonio Labs is a Nigerian technology studio building apps and platforms across gaming, education, fintech, and beyond — powered by AI and Web3.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2.5 mb-9"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.52 }}
            >
              {products.map((p) => (
                <div key={p.name} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className={`w-2 h-2 rounded-full ${p.color}`} />
                  <span className="text-sm font-semibold text-white">{p.name}</span>
                  <span className="text-xs" style={{ color: "#6b7280" }}>{p.tag}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.66 }}
            >
              <button className="btn-primary text-base px-8 py-3.5">Explore Our Products</button>
              <button
                className="px-8 py-3.5 rounded-lg font-semibold text-white text-base transition-all duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Partner With Us
              </button>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3 }}
          >
            <TechNetworkFlow />
          </motion.div>
        </div>
      </div>

      {/* Tech ticker */}
      <motion.div className="relative z-10 pb-12 pt-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
        <p className="text-center font-mono text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "#374151" }}>
          Products we have built
        </p>
        <div className="relative w-full overflow-hidden mask-gradient">
          <div className="flex"
            style={{ animation: "infiniteScroll 32s linear infinite", willChange: "transform" }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
          >
            {[0, 1].map((d) => (
              <div key={d} className="flex gap-12 items-center whitespace-nowrap pr-12">
                {builtProducts.map((name, i) => (
                  <span key={`${name}-${i}`} className="text-lg font-bold" style={{ color: "#374151" }}>{name}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
