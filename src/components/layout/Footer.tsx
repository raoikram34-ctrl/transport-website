"use client";

import React from "react";
import { ArrowUp, Mail, Shield, Award, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscription status initialized successfully for updates.");
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <footer aria-label="Enterprise Footer" className="relative border-t border-white/5 bg-black/80 backdrop-blur-md text-white py-16 px-6 sm:px-12 z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand identity */}
        <div id="footer-identity" className="flex flex-col gap-5 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white flex items-center justify-center rounded-sm">
              <div className="w-3 h-3 bg-black rotate-45" />
            </div>
            <span className="text-md font-bold tracking-tighter uppercase font-display">
              SKYHAUL<span className="text-orange-500 font-extralight opacity-80">TRANSIT</span>
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed max-w-xs">
            Architecting the future of North American haulage through integrated logistics and deep structural fleet reliability.
          </p>
          <div className="flex flex-col gap-1 mt-2 text-[10px] font-mono text-neutral-500 uppercase">
            <span>Uptime: 99.98% / HUB ACTIVE</span>
            <span>DOT #3829029 | MC #998310</span>
          </div>
        </div>

        {/* Navigation columns */}
        <div id="footer-navigation" className="grid grid-cols-2 gap-8 md:col-span-2">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-bold">Solutions</span>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400 font-sans">
              <li><a href="/services/dry-van" onClick={(e) => handleLinkClick(e, "/services/dry-van")} className="hover:text-orange-500 transition-colors uppercase">Dry Van FTL</a></li>
              <li><a href="/services/refrigerated" onClick={(e) => handleLinkClick(e, "/services/refrigerated")} className="hover:text-orange-500 transition-colors uppercase">Refrigerated Chains</a></li>
              <li><a href="/services/flatbed" onClick={(e) => handleLinkClick(e, "/services/flatbed")} className="hover:text-orange-500 transition-colors uppercase">Stepdeck & Flatbed</a></li>
              <li><a href="/services/logistics-brokerage" onClick={(e) => handleLinkClick(e, "/services/logistics-brokerage")} className="hover:text-orange-550 hover:text-orange-500 transition-colors uppercase">3PL Brokerage</a></li>
              <li><a href="/services/dedicated-fleets" onClick={(e) => handleLinkClick(e, "/services/dedicated-fleets")} className="hover:text-orange-500 transition-colors uppercase">Dedicated Fleet</a></li>
            </ul>
          </div>
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-bold">Operations</span>
            <ul className="flex flex-col gap-2.5 text-xs text-neutral-400 font-sans">
              <li><a href="/" onClick={(e) => handleLinkClick(e, "/")} className="hover:text-orange-500 transition-colors uppercase">National Routes</a></li>
              <li><a href="/about" onClick={(e) => handleLinkClick(e, "/about")} className="hover:text-orange-500 transition-colors uppercase">Corporate Profile</a></li>
              <li><a href="/careers" onClick={(e) => handleLinkClick(e, "/careers")} className="hover:text-orange-500 transition-colors uppercase">Careers Portal</a></li>
              <li><a href="/tracking" onClick={(e) => handleLinkClick(e, "/tracking")} className="hover:text-orange-500 transition-colors uppercase">Satellite Tracker</a></li>
              <li><a href="/contact" onClick={(e) => handleLinkClick(e, "/contact")} className="hover:text-orange-500 transition-colors uppercase">Shipper Gateway</a></li>
            </ul>
          </div>
        </div>

        {/* Subscribe & Live Stats */}
        <div id="footer-subscribe" className="flex flex-col gap-5">
          <div>
            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-bold">Dispatch Updates</span>
            <form onSubmit={handleSubscribe} className="flex h-10 border border-white/10 rounded-sm overflow-hidden bg-neutral-950">
              <input
                type="email"
                required
                placeholder="shipper@domain.com"
                className="flex-1 bg-transparent px-3 text-xs text-white focus:outline-none placeholder-neutral-600 focus:placeholder-transparent"
              />
              <button
                type="submit"
                className="w-10 flex items-center justify-center bg-white text-black hover:bg-orange-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
          
          {/* Security / Compliance */}
          <div className="flex items-center gap-3 border-t border-white/5 pt-4 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Secure Enterprise Node SSL Connected</span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span>&copy; {new Date().getFullYear()} Skyhaul Transit LLC. All Rights Reserved.</span>
          <span className="text-neutral-700">|</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-600" /> Chicago Command Center Active
          </span>
          <span className="text-neutral-700">|</span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-neutral-600" /> Smartway Transport Partner
          </span>
        </div>
        
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group text-neutral-400 hover:text-orange-500 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500 rounded px-2 py-1 cursor-pointer"
        >
          <span>Top-of-page</span>
          <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
