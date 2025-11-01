"use client";
import React from "react";
import { motion } from "framer-motion";

const Solutions = () => {
  const tools = [
    {
      name: "Stacka",
      description: "A next-generation investment platform bridging crypto and traditional finance. Built for crypto-native users in Nigeria and emerging markets, providing unified access to stocks, crypto, and DeFi protocols using USDC.",
      gradient: "from-blue-500 to-cyan-500",
      ascii: `SSSSSSSSS
SSSSSSSSSS
SSSSSSSSSSS
SSSSSSSSSS
SSSSSSSSS`
    },
    {
      name: "AI Research Tools",
      description: "Cutting-edge AI-powered research and analysis tools designed to accelerate insights and drive innovation in the Web3 ecosystem.",
      gradient: "from-purple-500 to-pink-500",
      ascii: `AAAAAAA
AAAAAAAAA
AAAAAAAAAAA
AAAAAAAAA
AAAAAAA`
    },
    {
      name: "Web3 Infrastructure",
      description: "Building robust infrastructure and developer tools that make Web3 technologies accessible and easy to integrate for developers worldwide.",
      gradient: "from-green-500 to-emerald-500",
      ascii: `WWWWWWW
WWWWWWWWW
WWWWWWWWWWW
WWWWWWWWW
WWWWWWW`
    }
  ];

  return (
    <section className="relative section-dark py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* ASCII Background Pattern */}
      <div className="absolute top-40 left-10 ascii-art text-blue-500/20 hidden lg:block">
        {`****++LLLL
****LLLLLL
****++LLLL
****LLLLLL`}
      </div>

      <div className="absolute bottom-40 right-10 ascii-art text-purple-500/20 hidden lg:block">
        {`VVVVVVIIII
VIIIIIIII
VIIIIIIII
IIIIIIIII`}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              // OUR SOLUTIONS //
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tools built for{" "}
            <span className="text-gradient">the future</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our suite of innovative tools designed to make Web3 and AI accessible to everyone
          </motion.p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="card-hover bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Background ASCII */}
              <div className="absolute bottom-5 right-5 ascii-art text-white/5 group-hover:text-white/10 transition-all duration-300">
                {tool.ascii}
              </div>

              {/* Gradient Orb */}
              <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${tool.gradient} opacity-20 blur-3xl group-hover:opacity-30 transition-all duration-300`}></div>

              <div className="relative z-10">
                {/* Icon/Logo Placeholder */}
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center`}>
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{tool.name}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {tool.description}
                </p>

                <button className="text-blue-400 font-semibold flex items-center gap-2 hover:gap-4 transition-all duration-300 group/btn">
                  Learn More
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
