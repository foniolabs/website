"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HiHome, HiArrowLeft, HiMail } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 pt-32 pb-20 relative overflow-hidden" style={{ background: "#0b0f1a" }}>
      {/* Background ASCII Art */}
      <div className="absolute top-20 right-20 ascii-art text-white/5 hidden lg:block">
        {`444444444
4444444444
44444444444
4444444444
444444444`}
      </div>

      <div className="absolute bottom-20 left-20 ascii-art text-white/5 hidden lg:block">
        {`000000000
0000000000
00000000000
0000000000
000000000`}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* 404 Number */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="text-9xl md:text-[200px] font-bold text-white/20 leading-none">
            404
          </h1>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 backdrop-blur-sm rounded-full mb-6 border border-red-500/30">
            <span className="font-mono text-sm font-semibold tracking-wider text-red-300">
              // ERROR 404 //
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Page Not Found
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted, or perhaps you mistyped the URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/">
              <motion.button
                className="btn-primary text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiHome className="w-5 h-5" />
                Go Home
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                className="btn-outline text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiMail className="w-5 h-5" />
                Contact Support
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="mt-16 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/about">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                About Us
              </h3>
              <p className="text-gray-400 text-sm">
                Learn more about Fonio Labs and our mission
              </p>
            </div>
          </Link>

          <Link href="/products">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                Our Products
              </h3>
              <p className="text-gray-400 text-sm">
                Explore what we're building
              </p>
            </div>
          </Link>

          <Link href="/team">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group">
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors">
                Our Team
              </h3>
              <p className="text-gray-400 text-sm">
                Meet the people building the future
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Back Link */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={() => window.history.back()}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <HiArrowLeft className="w-5 h-5" />
            Go back to previous page
          </button>
        </motion.div>
      </div>
    </div>
  );
}
