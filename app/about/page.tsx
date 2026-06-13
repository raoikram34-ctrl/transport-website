"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Calendar, MapPin, Building, Flag, Award, Eye, Compass, HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";

const HISTORY_TIMELINE = [
  {
    year: "1994",
    title: "Vanguard Inception",
    detail: "Established in Chicago, Illinois with three Class 8 heavy trucks hauling retail commodities to regional Midwest terminals.",
  },
  {
    year: "2005",
    title: "Reefer division rollout",
    detail: "Commissioned thirty custom climate-controlled Thermo King trailers, securing FDA safety credentials and biopharma clients.",
  },
  {
    year: "2013",
    title: "Western terminal launch",
    detail: "Opened our Southwest Command Center in Phoenix, Arizona, creating dedicated shipping routes traversing Seattle, LA, and Dallas.",
  },
  {
    year: "2024",
    title: "Skyhaul Transit LLC Rebrand",
    detail: "Transitioned to a fully unified logistics framework integrated with satellite telemetry logs and custom EDI databases.",
  },
];

export default function About() {
  const router = useRouter();
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.1 });

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Decorative vector background lines */}
      <div className="absolute inset-y-0 left-1/3 w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute inset-y-0 right-1/3 w-px bg-white/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#f97316] mb-4">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="text-white">Corporate Profile</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
            Company Profile & History
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-none mb-6">
            DELIVERING SAFETY ON THE INTERSTATE.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Founded with a commitment to driver wellness and cargo protection, Skyhaul Transit LLC has grown into a premiere full-service carrier. We optimize freight logistics with late-model assets and a central operations database.
          </p>
        </div>

        {/* Corporate Core Values Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24">
          <div className="p-6 sm:p-8 bg-neutral-900/20 border border-white/5 rounded-sm relative group hover:border-orange-500/20 transition-all">
            <div className="p-3 bg-neutral-950 border border-white/5 rounded-sm w-fit mb-6 text-orange-500">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-3">Professional Leadership</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Under guidance from veteran road transport professionals, we sustain high standard operating protocols across state borders.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-neutral-900/20 border border-white/5 rounded-sm relative group hover:border-orange-500/20 transition-all">
            <div className="p-3 bg-neutral-950 border border-white/5 rounded-sm w-fit mb-6 text-orange-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-3">FMCSA & EPA Compliance</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Full Smartway partnerships. Regular preventive fleet inspections verify that our greenhouse goals and cargo standards exceed national bars.
            </p>
          </div>

          <div className="p-6 sm:p-8 bg-neutral-900/20 border border-white/5 rounded-sm relative group hover:border-orange-500/20 transition-all">
            <div className="p-3 bg-neutral-950 border border-white/5 rounded-sm w-fit mb-6 text-orange-500">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white mb-3">Shipper-First Relations</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Transparent, upfront tariff calculations. No hidden fuel dock broker fees or sudden detention surcharges. Integrity is our foundation.
            </p>
          </div>
        </div>

        {/* Story Section & Leadership block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center border-t border-white/5 pt-16">
          <div className="lg:col-span- così lg:col-span-6">
            <span className="text-[10px] font-mono text-orange-550 text-orange-500 tracking-widest uppercase block mb-3 font-bold">The Corporate Mission</span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-white mb-6">
              THE POWER TO RE-ROUTE ROAD TRAFFIC.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light space-y-4">
              Our central operations office, located in Chicago, Illinois, directs interstate cargo with continuous road-intelligence. By checking weather developments and combining shipments proactively, we prevent logistics delays before drivers even mount the interstate.
            </p>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mt-4">
              Every late-model sleeper in our fleet is equipped with state-of-the-art automatic air-ride, collision avoidance radars, and satellite electronic logs. This prevents driver stress, supporting our commitment to safe and timely distribution.
            </p>
          </div>

          <div className="lg:col-span- così lg:col-span-6 bg-neutral-900/30 border border-white/5 p-6 sm:p-8 rounded-sm grid grid-cols-2 gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="bg-neutral-950/60 p-4 border border-white/5 rounded-sm font-mono text-[10px]">
              <span className="text-neutral-500 uppercase block">Active Fleet Power</span>
              <span className="text-white text-lg font-bold block mt-1">450+ Tractors</span>
              <span className="text-neutral-500 text-[9px] block mt-1">Class-8 Heavy Spec</span>
            </div>

            <div className="bg-neutral-950/60 p-4 border border-white/5 rounded-sm font-mono text-[10px]">
              <span className="text-neutral-500 uppercase block">Terminal Hubs</span>
              <span className="text-[#f97316] text-lg font-bold block mt-1">7 Locations</span>
              <span className="text-neutral-500 text-[9px] block mt-1">Secure Load Yards</span>
            </div>

            <div className="bg-neutral-950/60 p-4 border border-white/5 rounded-sm font-mono text-[10px]">
              <span className="text-neutral-500 uppercase block">Annual Logged Miles</span>
              <span className="text-white text-lg font-bold block mt-1">32,450,000+</span>
              <span className="text-neutral-500 text-[9px] block mt-1">Active GPS Tracks</span>
            </div>

            <div className="bg-neutral-950/60 p-4 border border-white/5 rounded-sm font-mono text-[10px]">
              <span className="text-neutral-500 uppercase block">Average Asset Age</span>
              <span className="text-white text-lg font-bold block mt-1">1.8 Years</span>
              <span className="text-neutral-500 text-[9px] block mt-1">Late-Model Kenworths</span>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="border-t border-white/5 pt-16">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-mono text-[#f97316] tracking-widest uppercase block mb-2 font-bold">Growth Map</span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white">THE CORPORATE CHRONICLER</h2>
          </div>

          <div ref={timelineRef} className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HISTORY_TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col gap-3 relative"
              >
                <div className="text-lg font-bold font-mono text-[#f97316] flex items-center justify-between border-b border-white/5 pb-2">
                  <span>{item.year}</span>
                  <span className="text-[9px] font-mono font-normal uppercase text-neutral-500">Stage 0{idx + 1}</span>
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-1">{item.title}</h3>
                  <p className="text-[11px] text-neutral-400 font-light leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to contact & quote estimation */}
        <div className="mt-20 border-t border-white/5 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6 font-mono text-xs uppercase">
          <div>
            <span className="text-neutral-500 block">Sustain your supply chain predictability</span>
            <span className="text-white font-bold">Request a contract freight quotation</span>
          </div>

          <button
            onClick={() => router.push("/contact")}
            className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors rounded-xs cursor-pointer"
          >
            Open Quote Estimator →
          </button>
        </div>

      </div>
    </div>
  );
}
