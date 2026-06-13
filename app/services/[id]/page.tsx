"use client";

import React, { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Truck, Shuffle, Box, Layers, Zap, ShieldAlert, ArrowLeft, ShieldCheck, Clock, MapPin, Calculator, HelpCircle, ChevronDown } from "lucide-react";
import { SERVICES_DATA, ServiceDetailType } from "@/data/servicesData";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ICON_MAP = {
  Truck: Truck,
  Shuffle: Shuffle,
  Box: Box,
  Layers: Layers,
  Zap: Zap,
  ShieldAlert: ShieldAlert,
};

export default function ServiceDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const serviceId = resolvedParams.id;
  const router = useRouter();
  const [service, setService] = useState<ServiceDetailType | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  useEffect(() => {
    // Find matching service
    const found = SERVICES_DATA.find((s) => s.id === serviceId);
    if (found) {
      setService(found);
    } else {
      // Fallback first service
      setService(SERVICES_DATA[0]);
    }
    // Scroll to top on load
    window.scrollTo({ top: 0 });
    setOpenFaqIdx(null); // Reset FAQ state
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center animate-pulse font-mono text-xs text-neutral-500 uppercase tracking-widest">
          Mounting Operational Dossier...
        </div>
      </div>
    );
  }

  const SvcIcon = ICON_MAP[service.iconName] || Truck;

  // Find adjacent services for browsing
  const currentIndex = SERVICES_DATA.findIndex((s) => s.id === service.id);
  const nextService = SERVICES_DATA[(currentIndex + 1) % SERVICES_DATA.length];

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Decorative vertical blueprint lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/[0.02] pointer-events-none hidden sm:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/[0.02] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <button
            onClick={() => router.push("/services")}
            className="group inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-[#f97316]" />
            Back to All Services
          </button>

          <div className="flex items-center gap-2 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/services")}>Services</span>
            <span>/</span>
            <span className="text-orange-500">{service.title}</span>
          </div>
        </div>

        {/* Major Service Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          <div className="lg:col-span-8">
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-orange-500 font-bold block mb-3">
              Fleet Specification Dossier
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight uppercase mb-6">
              {service.title}
            </h1>
            <p className="text-sm sm:text-lg text-neutral-300 font-light leading-relaxed mb-8">
              {service.longDesc}
            </p>
            
            {/* Core Features list and details */}
            <div className="bg-neutral-900/25 border border-white/5 p-6 sm:p-8 rounded-sm mb-8">
              <h3 className="font-mono text-xs uppercase text-[#f97316] font-bold tracking-widest mb-6">
                Active Protocol Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0 animate-pulse" />
                    <span className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec Table */}
            <h3 className="font-mono text-xs uppercase text-neutral-500 tracking-widest mb-4 font-bold">
              Operational Limits Registry
            </h3>
            <div className="border border-white/5 rounded-sm overflow-hidden bg-neutral-950 font-mono text-xs mb-8">
              <div className="grid grid-cols-2 bg-neutral-900/60 border-b border-white/5 p-3 font-bold text-neutral-400">
                <span>Dossier Parameter Class</span>
                <span>Assigned Fleet Metric</span>
              </div>
              <div className="divide-y divide-white/5">
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-neutral-500">Asset Title</span>
                  <span className="text-white font-bold">{service.title} Portfolio</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-neutral-500">Gross Capacity Yield</span>
                  <span className="text-white">{service.cargoCapacity}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-neutral-500">Standard Hardware specs</span>
                  <span className="text-white">{service.equipmentStandard}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-neutral-500">Liability Bond Value</span>
                  <span className="text-white font-mono text-emerald-400 font-bold">{service.insuranceCoverage}</span>
                </div>
                <div className="grid grid-cols-2 p-3.5">
                  <span className="text-neutral-500">Route Advantage Scope</span>
                  <span className="text-white">{service.transitAdvantage}</span>
                </div>
              </div>
            </div>

            {/* Typical commodities shipped */}
            <div className="bg-neutral-900/10 border border-white/5 p-6 rounded-sm">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-3">Typical Enterprise Commodities Transported</span>
              <div className="flex flex-wrap gap-2">
                {service.typicalCommodities.map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-xs font-mono bg-neutral-950 border border-white/5 px-3 py-1.5 rounded-sm text-neutral-400"
                  >
                    • {item}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Action column */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Quick Action Book form */}
            <div className="bg-neutral-900/40 border border-white/5 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="p-3 bg-neutral-950 border border-white/5 rounded-xs w-fit mb-4">
                <SvcIcon className="w-6 h-6 text-orange-500" />
              </div>
              
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-2">Configure Service Booking</h2>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light mb-6">
                Ready to secure a transport agreement for this exact pipeline? Launch our cost estimator with specialized selectors preset.
              </p>

              <button
                onClick={() => router.push("/contact")}
                className="w-full h-11 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-xs"
              >
                <Calculator className="w-4 h-4" />
                Calculate Route Cost
              </button>
            </div>

            {/* Vetted Authority Badget */}
            <div className="border border-white/5 p-6 rounded-sm space-y-4 font-mono text-[10px] uppercase text-neutral-400 bg-neutral-950">
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>FMCSA Compliant Authority</span>
              </div>
              <p className="text-neutral-500 tracking-wide leading-relaxed lowercase text-[9px]">
                our dot #3829029 and brokerage license are held in absolute active standing. cargo locks guaranteed.
              </p>
            </div>

          </div>

        </div>

        {/* Dynamic FAQ Segment */}
        <div className="border-t border-white/5 pt-16 mb-16">
          <div className="max-w-3xl mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#f97316] font-bold block mb-2">
              Resource Library
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
              SPECIFIC ADVISORY FAQ
            </h2>
          </div>

          <div className="max-w-3xl space-y-4">
            {service.faq.map((item, idx) => (
              <div
                key={idx}
                className="border border-white/5 bg-[#0a0a0c]/50 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center text-xs sm:text-sm font-bold uppercase tracking-wide text-white hover:bg-neutral-900/30 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${
                      openFaqIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5 bg-black"
                    >
                      <div className="p-5 text-xs sm:text-sm text-neutral-450 text-neutral-400 leading-relaxed font-light">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Next Service Browse trigger */}
        <div className="border-t border-white/5 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="font-mono text-xs uppercase">
            <span className="text-neutral-500 block">Up Next, inspect service line</span>
            <span className="text-white font-bold">{nextService.title}</span>
          </div>

          <button
            onClick={() => router.push(`/services/${nextService.id}`)}
            className="px-6 py-3 border border-white/10 text-xs font-mono uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-colors cursor-pointer"
          >
            Details of {nextService.title.split(" ")[0]} →
          </button>
        </div>

      </div>
    </div>
  );
}
