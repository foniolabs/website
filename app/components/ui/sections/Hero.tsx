"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const HEADER_HEIGHT = 68; // must match Header.tsx

// ---- Brand palette (from logo.svg) ------------------------------------
const CYAN = "#00daf2";
const BLUE = "#0a6cff";
const NAVY = "#001842";

// Editable hero content. Kept here so copy changes stay in one place; ready
// to be lifted into Sanity (siteSettings / a homepage singleton) later.
const HERO = {
  headlineLead: "We build products that",
  headlineAccent: "change",
  headlineTail: "industries",
  subheadline:
    "Fonio Labs is a Nigerian technology studio on a mission to build products that change industries — starting with Skoolbox, our offline-first AI learning platform for African students.",
  stats: [
    { value: "1", label: "Flagship product in development" },
    { value: "EdTech", label: "Where we're starting" },
    { value: "Offline", label: "AI copilot, no internet needed" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Isometric line-art illustration — strokes use the brand palette.   */
/*  Cards share one oblique matrix so they read as parallel 3D panels. */
/* ------------------------------------------------------------------ */

// matrix(a,b,c,d,tx,ty): horizontals recede up-right (b<0), verticals stay
// vertical (c=0,d=1) — an oblique projection that reads as tilted panels.
const plane = (tx: number, ty: number) =>
  `matrix(0.94, -0.34, 0, 1, ${tx}, ${ty})`;

const BrandIsometric = () => {
  const reduce = useReducedMotion();
  const float = reduce
    ? {}
    : {
        animate: { y: [0, -12, 0] },
        transition: { duration: 7, repeat: Infinity, ease: "easeInOut" as const },
      };

  return (
    <motion.svg
      viewBox="0 0 600 560"
      className="w-full h-auto max-w-[560px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Isometric illustration of connected app interfaces built by Fonio Labs"
      {...float}
    >
      {/* soft ground shadow */}
      <ellipse cx="315" cy="470" rx="180" ry="34" fill={NAVY} opacity="0.06" />

      {/* faint panel behind the phone (depth) */}
      <g transform={plane(205, 120)}>
        <rect
          x="0"
          y="0"
          width="150"
          height="220"
          rx="16"
          stroke={NAVY}
          strokeWidth="2"
          opacity="0.18"
          fill="none"
        />
      </g>

      {/* ---- Phone (primary) ---- */}
      <g transform={plane(250, 150)}>
        <rect x="0" y="0" width="150" height="290" rx="24" fill="#ffffff" stroke={NAVY} strokeWidth="2.5" />
        {/* notch */}
        <rect x="55" y="12" width="40" height="8" rx="4" fill={NAVY} />
        {/* highlighted metric pill */}
        <rect x="16" y="34" width="118" height="40" rx="10" fill={CYAN} opacity="0.14" />
        <rect x="16" y="34" width="118" height="40" rx="10" stroke={CYAN} strokeWidth="2" fill="none" />
        <circle cx="34" cy="54" r="9" stroke={BLUE} strokeWidth="2" fill="none" />
        <line x1="52" y1="49" x2="118" y2="49" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="60" x2="96" y2="60" stroke={BLUE} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        {/* list rows */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="26" cy={104 + i * 34} r="7" stroke={NAVY} strokeWidth="2" fill="none" />
            <line x1="42" y1={100 + i * 34} x2="132" y2={100 + i * 34} stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1={110 + i * 34} x2="104" y2={110 + i * 34} stroke={NAVY} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </g>
        ))}
        {/* bottom nav dots */}
        <circle cx="45" cy="262" r="5" fill={CYAN} />
        <circle cx="75" cy="262" r="5" stroke={NAVY} strokeWidth="2" fill="none" />
        <circle cx="105" cy="262" r="5" stroke={NAVY} strokeWidth="2" fill="none" />
      </g>

      {/* ---- Chat card (floating, upper-left) ---- */}
      <g transform={plane(66, 250)}>
        <rect x="0" y="0" width="180" height="64" rx="14" fill="#ffffff" stroke={BLUE} strokeWidth="2.5" />
        <circle cx="32" cy="32" r="16" stroke={CYAN} strokeWidth="2.5" fill="none" />
        <line x1="58" y1="24" x2="156" y2="24" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="58" y1="40" x2="124" y2="40" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
      </g>

      {/* ---- Stats card (floating, right) ---- */}
      <g transform={plane(372, 208)}>
        <rect x="0" y="0" width="150" height="96" rx="14" fill="#ffffff" stroke={CYAN} strokeWidth="2.5" />
        {/* bars */}
        {[
          { x: 22, h: 34, c: NAVY },
          { x: 52, h: 54, c: BLUE },
          { x: 82, h: 28, c: NAVY },
          { x: 112, h: 62, c: CYAN },
        ].map((b) => (
          <rect key={b.x} x={b.x} y={78 - b.h} width="16" height={b.h} rx="4" stroke={b.c} strokeWidth="2.5" fill="none" />
        ))}
        {/* trend line across the bar tops */}
        <polyline points="30,44 60,24 90,50 120,16" stroke={CYAN} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="120" cy="16" r="4" fill={CYAN} />
      </g>

      {/* ---- Todo card (floating, lower) ---- */}
      <g transform={plane(150, 378)}>
        <rect x="0" y="0" width="184" height="68" rx="14" fill="#ffffff" stroke={BLUE} strokeWidth="2.5" />
        <circle cx="32" cy="34" r="14" fill={CYAN} opacity="0.15" />
        <circle cx="32" cy="34" r="14" stroke={CYAN} strokeWidth="2.5" fill="none" />
        <path d="M25 34 l5 5 l9 -11" stroke={CYAN} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="56" y1="27" x2="162" y2="27" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="56" y1="43" x2="130" y2="43" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* ---- Connectors + accent nodes (cyan) ---- */}
      <g stroke={CYAN} strokeWidth="1.75" strokeDasharray="2 7" strokeLinecap="round" opacity="0.7">
        <path d="M215 262 C 250 250, 250 230, 268 216" fill="none" />
        <path d="M405 232 C 380 250, 350 250, 322 232" fill="none" />
        <path d="M300 400 C 300 380, 300 360, 300 340" fill="none" />
      </g>
      <g fill={CYAN}>
        <circle cx="466" cy="150" r="4" />
        <circle cx="120" cy="200" r="3" />
        <circle cx="150" cy="430" r="3.5" />
        <circle cx="470" cy="330" r="3" opacity="0.6" />
      </g>
    </motion.svg>
  );
};

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const Hero = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const reduce = useReducedMotion();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = email.trim() ? `?email=${encodeURIComponent(email.trim())}` : "";
    router.push(`/contact${q}`);
  };

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      className="relative overflow-hidden bg-white"
      style={{ marginTop: `${HEADER_HEIGHT}px` }}
    >
      {/* subtle brand wash + dotted texture (light) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 55% at 82% 8%, rgba(0,218,242,0.10) 0%, transparent 60%), radial-gradient(50% 50% at 6% 90%, rgba(10,108,255,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(0,24,66,0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-14 pb-20 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center" style={{ minHeight: "80vh" }}>
          {/* ---- Left ---- */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <motion.h1
              className="font-bold tracking-tight leading-[1.04] mb-6"
              style={{ color: NAVY, fontSize: "clamp(2.5rem, 5.4vw, 4.4rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {HERO.headlineLead}{" "}
              <span className="relative inline-block whitespace-nowrap">
                {HERO.headlineAccent}
                {/* hand-drawn brand underline */}
                <svg
                  className="absolute left-0 -bottom-2 w-full"
                  height="14"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M3 8 C 45 3, 90 3, 130 7 C 160 10, 185 6, 197 5"
                    stroke={CYAN}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={reduce ? undefined : { pathLength: 0 }}
                    animate={reduce ? undefined : { pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.7, ease }}
                  />
                </svg>
              </span>{" "}
              {HERO.headlineTail}
            </motion.h1>

            <motion.p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "#4b5563", maxWidth: "520px" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
            >
              {HERO.subheadline}
            </motion.p>

            {/* ---- Inline email → contact ---- */}
            <motion.form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl sm:rounded-full w-full max-w-md mb-9"
              style={{ border: `1px solid ${NAVY}1f`, background: "#ffffff", boxShadow: "0 10px 30px rgba(0,24,66,0.06)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease }}
            >
              <label htmlFor="hero-email" className="sr-only">
                Work email
              </label>
              <input
                id="hero-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 bg-transparent px-4 py-2.5 text-base outline-none min-h-[44px]"
                style={{ color: NAVY }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white text-base min-h-[44px] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ background: BLUE, outlineColor: BLUE }}
              >
                Start a project
              </button>
            </motion.form>

            {/* ---- Stats ---- */}
            <motion.div
              className="flex flex-wrap items-center gap-x-10 gap-y-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              {HERO.stats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && (
                    <div className="h-10 w-px hidden sm:block" style={{ background: `${NAVY}1a` }} />
                  )}
                  <div>
                    <div className="text-3xl md:text-4xl font-bold tabular-nums" style={{ color: NAVY }}>
                      {s.value}
                    </div>
                    <div className="text-sm" style={{ color: "#6b7280", maxWidth: "150px" }}>
                      {s.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ---- Right: illustration ---- */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            <BrandIsometric />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
