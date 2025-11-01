"use client";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-white pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background ASCII Art Decorations */}
      <div className="absolute top-20 right-10 ascii-art text-blue-500 hidden lg:block">
        {`VVVVVVVVVV
VVVVVVVVVVI
VVVVVVVVII
VVVVVVVIII
VVVVVVIIII`}
      </div>

      <div className="absolute bottom-40 left-10 ascii-art text-gray-300 hidden lg:block">
        {`*******III
****++LLLL
****LLLLLL
****++LLLL`}
      </div>

      <div className="absolute top-1/3 right-1/4 ascii-art text-blue-300 hidden xl:block">
        {`IIIIIIIIII
IIIIIISSI
IIIIISSSSI
IIIISSSSSI
IIISSSSSS
IISSSSSSS
IISSSSSSS
IISSSSSSSS
IISSSSSSSS`}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Top Stats Bar */}
        <motion.div
          className="flex flex-wrap gap-8 mb-16 text-sm font-mono"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <span className="text-gray-600">Research-Driven</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
            <span className="text-gray-600">User-Friendly Tools</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            <span className="text-gray-600">Web3 & AI Innovation</span>
          </div>
        </motion.div>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Building{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-primary text-white px-4 py-2 rounded-lg">
                  user-friendly
                </span>
              </span>{" "}
              tools for the{" "}
              <span className="text-gradient">future</span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fonio Labs is a research-driven company focusing on building accessible technology solutions around Web3 and AI. We transform complex technologies into intuitive tools that anyone can use.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button className="btn-primary text-lg">
                Explore Our Tools
              </button>
              <button className="px-8 py-3 border-2 border-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </motion.div>

            <motion.p
              className="mt-8 text-sm text-gray-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Not available for US persons
            </motion.p>
          </div>

          {/* Right Side - Stats Display */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-dark rounded-3xl p-12 text-white relative overflow-hidden">
              {/* Decorative ASCII in background */}
              <div className="absolute top-5 right-5 ascii-art text-blue-400 opacity-30">
                {`████████████
██████████████
████████████████
██████████████
████████████`}
              </div>

              <div className="relative z-10">
                <div className="mb-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Building the Future
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    Empowering innovation through research & development
                  </h3>
                  <p className="text-gray-300">
                    Our mission is to bridge the gap between cutting-edge technology and everyday users through intuitive design and robust engineering.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-4xl font-bold mb-2 text-gradient">Web3</div>
                    <div className="text-sm text-gray-300">Decentralized Tools</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-4xl font-bold mb-2 text-gradient">AI</div>
                    <div className="text-sm text-gray-300">Smart Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Building With */}
        <motion.div
          className="mt-24 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm text-gray-500 mb-6 font-semibold tracking-wider uppercase">
            Technologies we leverage
          </p>
          <div className="relative w-full overflow-hidden mask-gradient">
            <div
              className="flex"
              style={{
                animation: 'infiniteScroll 30s linear infinite',
                willChange: 'transform'
              }}
              onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
              onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
            >
              <div className="flex gap-12 items-center whitespace-nowrap pr-12">
                <span className="text-2xl font-bold text-gray-400">Ethereum</span>
                <span className="text-2xl font-bold text-gray-400">Solana</span>
                <span className="text-2xl font-bold text-gray-400">OpenAI</span>
                <span className="text-2xl font-bold text-gray-400">Anthropic</span>
                <span className="text-2xl font-bold text-gray-400">IPFS</span>
                <span className="text-2xl font-bold text-gray-400">Polygon</span>
                <span className="text-2xl font-bold text-gray-400">Base</span>
                <span className="text-2xl font-bold text-gray-400">TypeScript</span>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex gap-12 items-center whitespace-nowrap pr-12">
                <span className="text-2xl font-bold text-gray-400">Ethereum</span>
                <span className="text-2xl font-bold text-gray-400">Solana</span>
                <span className="text-2xl font-bold text-gray-400">OpenAI</span>
                <span className="text-2xl font-bold text-gray-400">Anthropic</span>
                <span className="text-2xl font-bold text-gray-400">IPFS</span>
                <span className="text-2xl font-bold text-gray-400">Polygon</span>
                <span className="text-2xl font-bold text-gray-400">Base</span>
                <span className="text-2xl font-bold text-gray-400">TypeScript</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
