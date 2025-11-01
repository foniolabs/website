"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "DeFi Trader",
      feedback:
        "Liqtra transformed how I manage my portfolio. The AI recommendations helped me increase my yields by 40% while reducing risk exposure.",
      img: "/images/premium_photo-1689539137236-b68e436248de.avif",
    },
    {
      name: "Marcus Johnson",
      role: "Crypto Investor",
      feedback:
        "Finally, a DeFi tool that makes sense. Tracking my assets across multiple chains used to be a nightmare. Liqtra simplified everything.",
      img: "/images/download1.jpeg",
    },
    {
      name: "Elena Rodriguez",
      role: "Yield Farmer",
      feedback:
        "The automated strategy execution is a game-changer. I can deploy complex strategies with one click and let Liqtra handle the rest.",
      img: "/images/pexels-photo-2379004.jpeg",
    },
    {
      name: "James Mitchell",
      role: "Portfolio Manager",
      feedback:
        "Liqtra's real-time insights and risk alerts saved me from significant losses. The AI constantly monitors market conditions and adjusts strategies accordingly.",
      img: "/images/download2.jpeg",
    },
    {
      name: "Priya Patel",
      role: "DeFi Enthusiast",
      feedback:
        "As someone new to DeFi, Liqtra made it accessible. The AI guides me through opportunities I would have never found on my own.",
      img: "/images/images3.jpeg",
    },
    {
      name: "Alex Thompson",
      role: "Liquidity Provider",
      feedback:
        "Managing liquidity across multiple protocols was overwhelming. Liqtra consolidated everything and now I can optimize my positions effortlessly.",
      img: "/images/premium.avif",
    },
    {
      name: "Nina Kowalski",
      role: "Crypto Analyst",
      feedback:
        "The cross-chain portfolio visibility is exactly what I needed. Liqtra gives me a complete picture of my DeFi holdings in real-time.",
      img: "/images/images4.jpeg",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-12 px-4 overflow-hidden sm:px-6 -mt-20">
      <h2 className="text-2xl lg:text-lg sm:text-3xl font-bold mb-2 text-center">
        Testimonials
      </h2>
      <p className="text-gray-600 mb-8 text-center text-sm lg:text-4xl font-bold max-w-3xl sm:text-base">
        Trusted by DeFi users optimizing their portfolios worldwide
      </p>

      <div className="relative w-full">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 cursor-pointer min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] rounded-2xl p-8 shadow-sm hover:shadow-2xl flex flex-col justify-center items-center text-center"
            >
              <Image
                src={testimonial.img}
                alt={testimonial.name}
                width={100}
                height={100}
                className="object-cover rounded-full mb-4 w-20 h-20 sm:w-24 sm:h-24"
              />
              <p className="text-lg sm:text-xl font-semibold">{testimonial.name}</p>
              <p className="text-gray-500 mb-2 sm:mb-4 text-sm sm:text-base">
                {testimonial.role}
              </p>
              <p className="text-gray-700 italic text-sm sm:text-base">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
