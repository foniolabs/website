'use client'
import { useState, useEffect } from 'react';
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
  { href: "/blog", label: "Blog" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll while the mobile sidebar is open so the overlaid page
  // behind the panel doesn't scroll under it.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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

      {/* CTA + mobile hamburger — ml-auto keeps the hamburger pinned right on
          mobile, where the desktop nav (which normally fills the middle) is hidden. */}
      <div className="flex items-center flex-shrink-0 px-5 md:px-8 gap-3 ml-auto lg:ml-0">
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

      {/* Mobile sidebar panel + page overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Dimmed backdrop over the page body */}
            <motion.div
              className="lg:hidden fixed inset-0 z-40 bg-[#001842]/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Right-hand sidebar panel */}
            <motion.aside
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80vw] bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div
                className="flex items-center justify-between px-5 border-b"
                style={{ height: `${HEADER_HEIGHT}px`, borderColor: "rgba(0,24,66,0.1)" }}
              >
                <span className="text-base font-bold text-[#001842]">Menu</span>
                <button
                  className="text-2xl text-[#001842]"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <HiX />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-3 px-3 rounded-lg text-base font-medium text-[#001842]/70 hover:text-[#0a6cff] hover:bg-[#0a6cff]/5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t" style={{ borderColor: "rgba(0,24,66,0.1)" }}>
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <button className="btn-primary w-full">Contact Us</button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
