"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiBeaker, HiUsers, HiLightBulb } from "react-icons/hi";

const WhyFonioLabs = () => {
  const features = [
    {
      title: "Problem-First Thinking",
      description: "We start with real problems — not trends. Every product we build targets a gap that matters, validated by on-the-ground research before a line of code is written.",
      Icon: HiBeaker,
      gradient: "from-blue-500 to-cyan-500",
      image: `::::::::::::::::
::::::::::::::::::
::::::::::::::::::::
::::::::::::::::::
::::::::::::::::`
    },
    {
      title: "Built for Real Users",
      description: "Our products are designed for the people who need them most — from rural students with no internet access to crypto-native users in emerging markets.",
      Icon: HiUsers,
      gradient: "from-purple-500 to-pink-500",
      image: `UUUUUUUUUUU
UUUUUUUUUUUU
UUUUUUUUUUUUU
UUUUUUUUUUUU
UUUUUUUUUUU`
    },
    {
      title: "Ship Fast, Iterate Bold",
      description: "We move quickly from idea to product. We build, launch, and improve in the open — using user feedback and data to shape every iteration.",
      Icon: HiLightBulb,
      gradient: "from-green-500 to-emerald-500",
      image: `LLLLLLLLLL
LLLLLLLLLLLL
LLLLLLLLLLLLLL
LLLLLLLLLLLL
LLLLLLLLLL`
    }
  ];

  return (
    <section className="relative section-light py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full mb-8 border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-600">
              // WHY FONIO LABS //
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How we build at{" "}
            <span className="text-gradient">Fonio Labs</span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A product studio is only as good as its principles. Here&apos;s what drives every product we build.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* ASCII Background */}
              <div className="absolute bottom-5 right-5 ascii-art text-blue-500/10 group-hover:text-blue-500/20 transition-all duration-300">
                {feature.image}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white`}>
                  <feature.Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className="bg-gradient-dark rounded-3xl p-12 md:p-16 text-white text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Background ASCII */}
          <div className="absolute top-10 left-10 ascii-art text-white/10 hidden lg:block">
            {`FFFFFFFFFF
FFFFFFFFFFI
FFFFFFFFIII
FFFFFFFIII
FFFFFFIII`}
          </div>

          <div className="absolute bottom-10 right-10 ascii-art text-white/10 hidden lg:block">
            {`LLLLLLLLLL
LLLLLLLLLLL
LLLLLLLLLLLL
LLLLLLLLLLL
LLLLLLLLLL`}
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in what we&apos;re building?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you&apos;re a potential user, investor, or partner — we&apos;d love to connect and share what&apos;s coming next.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-primary text-lg">
                Explore Our Products
              </button>
              <button className="btn-outline text-lg">
                Get In Touch
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyFonioLabs;
