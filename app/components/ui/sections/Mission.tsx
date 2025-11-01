"use client";
import React from "react";
import { motion } from "framer-motion";

const Mission = () => {
  return (
    <section className="relative section-blue py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* ASCII Art Decorations */}
      <div className="absolute top-32 right-20 ascii-art text-white/20 hidden xl:block">
        {`::::::::::
:::::::::::
:::::::::::::
:::::::::::
:::::::::`}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Section Label */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <span className="font-mono text-sm font-semibold tracking-wider">
              OUR MISSION
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building accessible technology for everyone
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fonio Labs is dedicated to bridging the gap between cutting-edge
            Web3 and AI technologies and everyday users. We conduct deep research,
            build user-friendly tools, and make complex systems simple and accessible.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="btn-outline text-lg">
              Learn About Our Approach
            </button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-5xl md:text-6xl font-bold mb-4">
              100%
            </div>
            <div className="text-lg text-white/70">
              Research-Driven Development
            </div>
          </div>

          <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-5xl md:text-6xl font-bold mb-4">
              Open
            </div>
            <div className="text-lg text-white/70">
              Transparent & Collaborative
            </div>
          </div>

          <div className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-5xl md:text-6xl font-bold mb-4">
              Global
            </div>
            <div className="text-lg text-white/70">
              Building for the World
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;
