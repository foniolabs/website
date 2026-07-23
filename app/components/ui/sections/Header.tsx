'use client'
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

export const HEADER_HEIGHT = 68; // px — shared with Hero for marginTop

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/products", label: "Products" },
  { href: "/news", label: "News" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-stretch bg-white"
      style={{ height: `${HEADER_HEIGHT}px` }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.svg"
            alt="Fonio Labs"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <span className="text-base font-bold text-[#001842] hidden sm:block">Fonio Labs</span>
        </Link>
      </div>

      {/* Nav — desktop only */}
      <div className="hidden lg:flex flex-1 items-center justify-center gap-8 px-10">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium transition-colors duration-200 text-[#001842]/60 hover:text-[#0a6cff]"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* CTA + mobile hamburger */}
      <div className="flex items-center flex-shrink-0 px-5 md:px-8 gap-3">
        <Link href="/contact" className="hidden lg:block">
          <button className="btn-primary text-sm px-5 py-2">Contact Us</button>
        </Link>
        <button
          className="lg:hidden text-2xl text-[#001842]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 z-50 border-t bg-white"
            style={{ borderColor: "rgba(0,24,66,0.1)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="px-6 py-5">
              <ul className="flex flex-col gap-1 mb-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#001842]/70 hover:text-[#0a6cff] transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>
                <button className="btn-primary w-full">Contact Us</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
