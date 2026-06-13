"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Truck, Shuffle, Box, Layers, Zap, ShieldAlert, ArrowUpRight } from "lucide-react";
import { SERVICES_DATA } from "@/data/servicesData";
import { useRouter } from "next/navigation";

// Map strings to Lucide components safely
const ICON_MAP = {
  Truck: Truck,
  Shuffle: Shuffle,
  Box: Box,
  Layers: Layers,
  Zap: Zap,
  ShieldAlert: ShieldAlert,
};

export default function ServicesParent() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.1 });

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen">
      {/* Background ambient light */}
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-12 w-[350px] h-[350px] bg-neutral-900/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Title / Breadcrumbs */}
        <div ref={headingRef} className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#f97316] mb-4">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="text-white">Our Logistics Portfolios</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-505 text-orange-500 font-bold block mb-3">
            Service Command Core
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-none">
            INTEGRATED SHIPPING PORTFOLIONS.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            Skyhaul Transit LLC serves premium enterprise networks with safe, asset-backed logistics across the 48 contiguous states. Choose a shipping module below to inspect full operational specs, equipment guidelines, and lane parameters.
          </p>
        </div>

        {/* Services Grid (All 6 Services) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = ICON_MAP[service.iconName] || Truck;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-sm border bg-[#0a0a0c]/80 p-6 flex flex-col justify-between overflow-hidden group hover:bg-[#0f0f12] cursor-pointer transition-all duration-350 pb-8"
                style={{
                  borderColor: isHovered ? "rgba(249, 115, 22, 0.3)" : "rgba(255, 255, 255, 0.05)",
                  boxShadow: isHovered ? "0 4px 30px rgba(249, 115, 22, 0.03)" : "none",
                }}
                onClick={() => router.push(`/services/${service.id}`)}
              >
                {/* Visual Accent Corner lines */}
                <span className="absolute top-0 left-0 w-8 h-px bg-transparent group-hover:bg-orange-500 transition-all duration-300" />
                <span className="absolute top-0 left-0 w-px h-8 bg-transparent group-hover:bg-orange-500 transition-all duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-neutral-900 border border-white/5 group-hover:border-orange-500/20 group-hover:bg-orange-500/5 transition-all rounded-sm">
                      <IconComponent className="w-5 h-5 text-neutral-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-600 tracking-wider uppercase group-hover:text-orange-500/70">
                      SVC // 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-base sm:text-md font-bold uppercase tracking-wide text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-orange-500 transition-colors" />
                  </h2>
                  <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light min-h-[55px]">
                    {service.shortDesc}
                  </p>

                  {/* High level metrics preview */}
                  <div className="border-t border-white/5 pt-4 mt-6 space-y-2">
                    {service.specs.slice(0, 2).map((item, specIdx) => (
                      <div key={specIdx} className="flex justify-between items-center text-[10px] font-mono bg-neutral-950 p-1.5 px-2 rounded-sm border border-white/5">
                        <span className="text-neutral-500 uppercase">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Micro Interaction Indicator */}
                <div className="mt-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-neutral-600 group-hover:text-[#f97316] transition-colors border-t border-white/5 pt-4">
                  <span>View Full Logistics Specs</span>
                  <span className="font-bold">→</span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* 24/7 Corporate Shipper Advisory Information */}
        <div className="mt-16 bg-neutral-900/20 border border-white/5 p-8 rounded-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <h3 className="text-white font-bold uppercase tracking-wide text-xs mb-2">Need a custom logistical framework designed?</h3>
            <p className="text-neutral-400 text-xs font-light max-w-2xl leading-relaxed">
              We frequently architect customized drop-trailer networks, dedicated carrier lanes, and permit-sensitive step-deck systems that require state approvals. Safe commercial security guaranteed.
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => router.push("/contact")}
              className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors rounded-xs w-full sm:w-auto text-center"
            >
              Consult Brokerage Staff
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
