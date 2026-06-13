"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact HQ", href: "/contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <>
      <motion.nav
        aria-label="Main Navigation"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 h-20 transition-all duration-300 z-50 px-6 sm:px-12 flex items-center justify-between ${
          scrolled || mobileMenuOpen
            ? "bg-[#050505]/95 border-b border-white/5 backdrop-blur-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Brand Logo - SKYHAUL TRANSIT LLC */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, "/")}
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-orange-500 rounded-sm"
        >
          <div className="w-8 h-8 bg-neutral-100 flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-180">
            <div className="w-4 h-4 bg-black rotate-45 transform origin-center" />
          </div>
          <span className="text-md sm:text-lg font-bold tracking-tighter uppercase font-display text-white">
            SKYHAUL<span className="text-orange-500 font-extralight opacity-80">TRANSIT</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
          {menuItems.map((item) => {
            const isActive = 
              pathname === item.href || 
              (item.href === "/services" && pathname.startsWith("/services/")) ||
              (item.href === "/blogs" && pathname.startsWith("/blogs/"));
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`transition-colors duration-200 relative group uppercase ${
                  isActive ? "text-[#f97316]" : "hover:text-white"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-orange-500 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            );
          })}
          
          <button
            onClick={(e) => handleLinkClick(e as any, "/tracking")}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer uppercase ${
              pathname === "/tracking" ? "text-[#f97316]" : "hover:text-orange-500"
            }`}
          >
            <Activity className="w-3 h-3 text-orange-500 animate-pulse" />
            Live Tracker
          </button>
        </div>

        {/* Action Button & Menu Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => handleLinkClick(e as any, "/contact")}
            className="hidden sm:inline-flex px-5 py-2 border border-white/10 text-[9px] font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer"
          >
            Client gateway
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none focus:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-0 right-0 bg-[#050505] border-b border-white/10 z-40 p-8 flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-xs tracking-widest uppercase text-neutral-400">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="hover:text-white transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                >
                  {item.label}
                  <ArrowRight className="w-3 h-3 text-orange-500" />
                </a>
              ))}
              <button
                onClick={(e) => handleLinkClick(e as any, "/tracking")}
                className="py-2 text-left hover:text-white border-b border-white/5 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-orange-500 animate-pulse" />
                  Live Tracker
                </span>
                <ArrowRight className="w-3 h-3 text-orange-550 text-orange-500" />
              </button>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={(e) => handleLinkClick(e as any, "/contact")}
                className="w-full text-center py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#f97316] hover:text-black transition-colors"
              >
                Get Custom Quote
              </button>
              
              <div className="flex items-center justify-center gap-2 font-mono text-[9px] text-neutral-500 py-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                FMCSA Compliant & Bonded USA
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
