"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 lg:px-20 overflow-hidden" style={{ background: "#0b0f1a" }}>
        <div className="absolute top-20 right-20 ascii-art text-white/10 hidden lg:block">
          {`AAAAAAAAAA
AAAAAAAAAAAA
AAAAAAAAAAAAAA
AAAAAAAAAAAA
AAAAAAAAAA`}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600/20 backdrop-blur-sm rounded-full mb-8 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-sm font-semibold tracking-wider text-blue-300">
              // ABOUT //
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building the future, one{" "}
            <span className="text-gradient">tool</span> at a time
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fonio Labs is a Nigerian technology product studio building apps and platforms
            across gaming, education, fintech, and beyond — powered by AI and Web3.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Fonio Labs was founded with a clear mission: to build technology products
                that solve real problems across multiple industries. From gaming to
                education to fintech, we saw opportunities to create meaningful impact
                through thoughtful product development.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're a product studio — not an agency. We conceive, design, build,
                and launch our own products. Each one is crafted to serve a specific
                market need, combining cutting-edge technology with user-centered
                design to deliver real value.
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-primary rounded-3xl p-12 relative overflow-hidden">
                <div className="ascii-art text-white/20 text-center">
                  {`FFFFFFFFFF
FFFFFFFFFFI
FFFFFFFFIII
FFFFFFFIII
FFFFFFIII
FFFFFIII
FFFFIII
FFFIII
FFIII
FIII`}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 md:order-1 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 relative overflow-hidden">
                <div className="ascii-art text-white/20 text-center">
                  {`VVVVVVVVVV
VVVVVVVVVVI
VVVVVVVVII
VVVVVVVIII
VVVVVVIIII
VVVVVIIII
VVVVIIII
VVVIII
VVIII
VIII`}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We envision a future where technology products built in Africa
                compete on the global stage. Where innovation isn't limited by
                geography, and where Nigerian-built platforms serve millions of
                users worldwide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through products like Futbol Fusion and Skoolbox, we're
                proving that world-class technology can come from anywhere. Each product
                we launch is a step toward a more connected, empowered, and
                innovative world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Research-First",
                description: "Every decision we make is backed by thorough research and data. We don't build on assumptions—we build on evidence.",
              },
              {
                title: "User-Centric",
                description: "The user experience is at the heart of everything we create. Complex technology should feel simple and intuitive.",
              },
              {
                title: "Transparent",
                description: "We believe in building in public, sharing our learnings, and being open about our processes and decisions.",
              },
              {
                title: "Collaborative",
                description: "Great innovation happens when diverse minds come together. We actively seek partnerships and community input.",
              },
              {
                title: "Quality-Driven",
                description: "We never compromise on quality. Every line of code, every design decision is made with excellence in mind.",
              },
              {
                title: "Future-Focused",
                description: "We're not just solving today's problems—we're anticipating tomorrow's challenges and building solutions today.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 lg:px-20" style={{ background: "#0b0f1a" }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Want to join us on this journey?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're always looking for talented individuals who share our vision
            and values.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="btn-primary text-lg">View Open Positions</button>
            <button className="btn-outline text-lg">Meet the Team</button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
