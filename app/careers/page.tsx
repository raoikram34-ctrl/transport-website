"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Briefcase, FileCheck2, UserCheck, Shield, CheckCircle2, ChevronRight, Truck, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const CDL_SPECS = [
  {
    title: "Class-A Solo Driver",
    rate: "$0.72 - $0.78 CPM Base",
    mileage: "Avg. 2,800 - 3,200 miles / week",
    hometime: "Guaranteed Weekly Reset at Home",
  },
  {
    title: "Class-A Team Drivers",
    rate: "$0.88 - $0.94 CPM Combined",
    mileage: "Avg. 5,500 - 6,200 miles / week",
    hometime: "Custom Schedule Bi-Weekly Home Run",
  },
  {
    title: "Regional Short-Haul Shunt",
    rate: "$28.50 - $34.00 / Hour Base",
    mileage: "Local Dedicated Lane (Midwest / Southwest)",
    hometime: "Home Daily / Local Yard Shift Logs",
  },
];

export default function Careers() {
  const router = useRouter();
  const [driverApplied, setDriverApplied] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [driverLicense, setDriverLicense] = useState("class-a");
  const [driverExperience, setDriverExperience] = useState("3-5");

  const handleApplyDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName || !driverMobile) {
      alert("Please provide required contact name and mobile number.");
      return;
    }
    setDriverApplied(true);
  };

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Decorative vertical blueprint grids */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#f97316] mb-4">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="text-white">Careers</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
            Driver Recruiting Core
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-none mb-6">
            DRIVE WITH SKYHAUL TRANSIT.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            We value professional Class-A truck drivers. Our corporate dispatch respects your drive logs, prioritizing highway safety and consistent weekly home resets. Drive premium, late-model sleepers.
          </p>
        </div>

        {/* Benefits Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-sm relative group">
            <div className="p-3 bg-neutral-950 border border-white/5 text-[#f97316] w-fit rounded-sm mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-2">High CPM Industry Pay</h3>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Earn up to $0.78 CPM solo, with comprehensive layover and detention fees compensated at 100% standard logs.
            </p>
          </div>

          <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-sm relative group">
            <div className="p-3 bg-neutral-950 border border-white/5 text-[#f97316] w-fit rounded-sm mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-2">Late Model Sleepers</h3>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Assigned late-model Kenworth structures, equipped with automatic cruise control and collision avoidance systems.
            </p>
          </div>

          <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-sm relative group">
            <div className="p-3 bg-neutral-950 border border-white/5 text-[#f97316] w-fit rounded-sm mb-4">
              <Star className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-2">PPO Health / 401k MATCH</h3>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Premium Blue Cross medical coverage, comprehensive dental care, and a 4% standard dollar-for-dollar 401k retirement match.
            </p>
          </div>

          <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-sm relative group">
            <div className="p-3 bg-neutral-950 border border-white/5 text-[#f97316] w-fit rounded-sm mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xs font-mono uppercase tracking-widest font-bold text-white mb-2">Steady Hometime Reset</h3>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Your calendar matters. Our route dispatchers schedule guaranteed 34-hour home restarts every single week.
            </p>
          </div>
        </div>

        {/* Dynamic CDL Pay Structure cards */}
        <h2 className="text-mono text-xs uppercase text-neutral-500 font-bold tracking-widest mb-6">
          OPERATOR LICENSE DIVISION CLUSTERS
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">
          
          <div className="lg:col-span- così lg:col-span-7 space-y-4">
            {CDL_SPECS.map((item, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/40 border border-white/5 p-5 sm:p-6 rounded-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-orange-500/25 transition-all"
              >
                <div>
                  <h3 className="font-bold text-sm uppercase text-white tracking-wide mb-1">{item.title}</h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">{item.mileage}</p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-1 uppercase">✓ {item.hometime}</p>
                </div>
                <div className="bg-neutral-950 border border-white/5 px-4 py-2 rounded-sm text-center font-mono self-start sm:self-auto">
                  <span className="text-orange-500 font-bold text-xs uppercase block">Tariff Rate</span>
                  <span className="text-white font-black text-xs">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Core Interactive Portal Apply form (Right) */}
          <div className="lg:col-span- così lg:col-span-5 bg-[#0a0a0c] border border-white/5 p-6 sm:p-8 rounded-sm relative">
            <AnimatePresence mode="wait">
              {!driverApplied ? (
                <motion.div key="prelim-apply-form">
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-6 font-bold">
                    PRELIMINARY APPLICATION GATEWAY
                  </span>

                  <form onSubmit={handleApplyDriver} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Applicant Name</label>
                      <input
                        type="text"
                        required
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="John Doe"
                        className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-700 rounded-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Mobile Phone / Tel</label>
                      <input
                        type="tel"
                        required
                        value={driverMobile}
                        onChange={(e) => setDriverMobile(e.target.value)}
                        placeholder="(555) 019-2831"
                        className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-neutral-700 rounded-sm font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">CDL Class</label>
                        <select
                          value={driverLicense}
                          onChange={(e) => setDriverLicense(e.target.value)}
                          className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none rounded-sm font-sans"
                        >
                          <option value="class-a">CDL Class-A </option>
                          <option value="class-b">CDL Class-B </option>
                          <option value="team">Team Drivers</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Road Exp (Years)</label>
                        <select
                          value={driverExperience}
                          onChange={(e) => setDriverExperience(e.target.value)}
                          className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none rounded-sm font-sans"
                        >
                          <option value="1-2">1 - 2 Years</option>
                          <option value="3-5">3 - 5 Years</option>
                          <option value="5+">5+ Years</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors rounded-xs cursor-pointer mt-2"
                    >
                      Transmit Prelim Dossier
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="recruiter-complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-white uppercase tracking-wider text-base">
                    Prelim Record Lodged
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light mt-4">
                    Applicant <span className="font-bold text-white uppercase">{driverName}</span> logged successfully. Our driver recruiter officer at Chicago HQ will pull your current MVR, verify experience metrics, and contact you at <span className="font-bold text-white">{driverMobile}</span> within 24 hours. Safe operations!
                  </p>

                  <button
                    onClick={() => {
                      setDriverApplied(false);
                      setDriverName("");
                      setDriverMobile("");
                    }}
                    className="mt-6 text-[10px] font-mono text-orange-500 uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    Open another application
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
