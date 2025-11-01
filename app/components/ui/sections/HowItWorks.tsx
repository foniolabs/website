"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const words: string[] = ["Optimize", "Track", "Analyze", "Earn", "Grow"];

const HowItWorks: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 sm:mt-40 relative px-4 lg:px-20 sm:px-8">
      <div className="text-center">
        <h1 className="font-bold uppercase text-4xl sm:text-6xl lg:text-8xl">
          Your DeFi <br /> co-pilot to
        </h1>
        {words.map((word, i) => (
          <motion.h1
            key={word}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.3,
            }}
            viewport={{ once: false, amount: 0.8 }}
            className="font-bold uppercase text-4xl sm:text-6xl lg:text-8xl text-blue-700"
          >
            {word}
          </motion.h1>
        ))}
      </div>

      <div className="mt-20 sm:mt-40 flex flex-col">
        {/* Borderless Accounts */}
        <div className="py-2 w-full flex items-center justify-center">
          <Image
            src="/images/f95372c9-ca69-4e53-85fb-65b2ad89b8ec.jpeg"
            alt="borderless image"
            width={1980}
            height={800}
            className="w-full h-auto rounded-2xl object-cover"
            priority
          />
        </div>
        <div className="flex flex-col mt-6 sm:mt-10">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
            Real-time Cross-Chain Portfolio Visibility
          </h2>
          <p className="text-lg sm:text-2xl max-w-2xl text-neutral-700 mb-4">
            Track your entire DeFi portfolio across multiple networks in one place.
            Get instant insights into your assets, yields, and performance —
            all powered by AI.
          </p>
        </div>

        {/* Accept Payments */}
        <div className="flex justify-center items-center flex-col mt-8 sm:mt-12">
          <video
            src="/images/accept-payments-new-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col mt-6 sm:mt-10 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
            AI-Powered Strategy Recommendations
          </h2>
          <p className="text-lg sm:text-2xl max-w-2xl text-neutral-700 mb-4">
            Receive intelligent recommendations to optimize your portfolio.
            From yield farming to liquidity provision, Liqtra helps you
            maximize returns and minimize risks across multiple chains.
          </p>
        </div>

        {/* Global Transfers */}
        <div className="flex flex-col sm:mt-10">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-4">
            Automated Portfolio Management
          </h2>
          <p className="text-lg sm:text-2xl max-w-xl text-neutral-700 mb-4">
            Let AI handle the heavy lifting. Set your risk preferences and goals,
            and Liqtra will continuously optimize your on-chain positions to
            maximize yield while keeping your assets safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
