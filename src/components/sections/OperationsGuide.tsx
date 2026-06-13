import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ShieldAlert, CheckSquare, Sparkles, Building, Briefcase, FileCheck2, UserCheck, CheckCircle2 } from "lucide-react";
import GSAPScrollReveal from "../widgets/GSAPScrollReveal";

const TRAITS = [
  {
    title: "AUTOMATED TELEMETRY ELD",
    desc: "Every truck connects with standard GPS electronic logging devices (ELDs), tracking driver hours automatically over satellite routes.",
    icon: Award,
  },
  {
    title: "$1M SECURED FREIGHT BOND",
    desc: "Shipper peace of mind. We hold comprehensive $1,000,000 cargo transport bonds, backed by top-rated American underwriters.",
    icon: ShieldAlert,
  },
  {
    title: "0.01% CLAIMS RATIO",
    desc: "Pristine distribution security. Over 99% of our shipments are delivered completely free of scratches, loads shifting, or damages.",
    icon: CheckSquare,
  },
  {
    title: "PREDICTIVE WEATHER ROUTING",
    desc: "Custom AI-grade dispatch routing analyzes continuous storm grids, construction detours, and scale closures instantly.",
    icon: Sparkles,
  },
];

const STEPS = [
  {
    id: "01",
    phase: "Configure Terminal Specs",
    detail: "Shippers input Origin city, Destination terminal, load weight, and trailer type to calculate a certified estimate.",
  },
  {
    id: "02",
    phase: "Assigned Tractor Allocation",
    detail: "Our central Phoenix HQ designates a late-model Class 8 tractor, assigned drivers, and coordinates pre-cooling schedules.",
  },
  {
    id: "03",
    phase: "Interactive Transit Manifest",
    detail: "The truck is loaded. Shippers receive live GPS access, telemetry logs, speed updates, and electronic bills of lading (eBOL).",
  },
  {
    id: "04",
    phase: "Consignee Cargo Intake",
    detail: "Tractor arrives at the receiver dock. Staff sign off digital receipts, and manifest logs are archived securely inside the cloud database.",
  },
];

export default function OperationsGuide() {
  const [driverApplied, setDriverApplied] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [driverLicense, setDriverLicense] = useState("class-a");

  const handleApplyDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverName) {
      alert("Please provide your name.");
      return;
    }
    setDriverApplied(true);
  };

  return (
    <section id="why-choose-us" className="relative py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      
      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-1/3 w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute inset-y-0 right-1/3 w-px bg-white/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* UPPER GRID: WHY CHOOSE US */}
        <div id="choose-us-section" className="mb-24">
          <GSAPScrollReveal effect="slide-up" className="max-w-3xl mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
                Competitive Advantage
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
                SAFEGUARDED ROAD LOGISTICS.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-450 text-neutral-400 mt-4 leading-relaxed font-light">
                We eliminate cargo volatility. Through high-caliber driver screening, structural tracking, and smart telemetry integration, we offer perfect enterprise accountability.
              </p>
            </div>
          </GSAPScrollReveal>

          <GSAPScrollReveal effect="skew-up" stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRAITS.map((trait, idx) => {
              const TraitIcon = trait.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-4 p-6 bg-neutral-900/10 border border-white/5 rounded-sm hover:border-[#f97316]/20 transition-all duration-300 relative group"
                >
                  <div className="p-2.5 bg-neutral-950 border border-white/5 rounded-xs w-fit group-hover:border-[#f97316]/10 group-hover:bg-[#f97316]/5 transition-all">
                    <TraitIcon className="w-5 h-5 text-neutral-400 group-hover:text-orange-555 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white group-hover:text-orange-500 transition-colors font-mono">
                    {trait.title}
                  </h3>
                  <p className="text-[11px] text-neutral-455 text-neutral-400 leading-relaxed font-light">
                    {trait.desc}
                  </p>
                </div>
              );
            })}
          </GSAPScrollReveal>
        </div>

        {/* WORK PROCESS TIMELINE */}
        <div id="process" className="py-16 border-t border-white/5 mb-24">
          <GSAPScrollReveal effect="slide-up" className="max-w-3xl mb-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-505 text-orange-500 font-bold block mb-2">
                Distribution Workflow
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-medium text-white tracking-tight leading-none">
                THE TRANSPORT TIMELINE.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-455 text-neutral-400 mt-3 font-light leading-relaxed">
                Our 4-Stage standard transport cycle verifies safety parameter limits are logged at every checkpoint.
              </p>
            </div>
          </GSAPScrollReveal>

          <GSAPScrollReveal effect="slide-up" stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col gap-4 relative">
                {/* Horizontal line divider on desktop */}
                {idx < 3 && (
                  <div className="absolute top-4 left-1/2 right-[-50%] h-px bg-gradient-to-r from-white/10 to-transparent hidden lg:block" />
                )}
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-neutral-900/60 border border-white/10 flex items-center justify-center font-mono text-xs text-[#f97316] font-bold">
                    {step.id}
                  </div>
                  <div className="h-px flex-1 bg-white/5 lg:hidden" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase text-white tracking-wide">
                    {step.phase}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed font-light">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </GSAPScrollReveal>
        </div>

        {/* DRIVER RECRUITING CAREER GATEWAY */}
        <GSAPScrollReveal effect="scale-up" duration={1} id="careers" className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-neutral-900/15 border border-white/5 p-8 rounded-sm relative overflow-hidden">
          
          <div className="absolute top-[-10%] right-[-10%] w-[250px] h-[250px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Recruit content (Left) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-505 text-orange-500 font-bold block mb-3">
              Careers & Opportunities
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-white tracking-tight leading-none mb-6">
              DRIVE FOR TITAN.
            </h2>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8 max-w-xl">
              We value Class-A operators. Our network respects your hours and safety logs. Drive late-model premium sleepers equipped with air-ride massage cabins and smart collision radars.
            </p>

            {/* Benefits checks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-neutral-350 uppercase">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-orange-500" />
                <span>Up to $0.78 CPM Solo / $0.94 CPM Team</span>
              </div>
              <div className="flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-orange-500" />
                <span>Modern Sleep Tractors Assigned</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-orange-500" />
                <span>Premium Standard Medical / 401k Match</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-orange-500" />
                <span>Guaranteed Weekly Home Time</span>
              </div>
            </div>
          </div>

          {/* Quick Apply form (Right) */}
          <div className="lg:col-span-5 bg-black p-6 rounded-sm border border-white/5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!driverApplied ? (
                <motion.div key="driver-form">
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4 font-bold">
                    Operator Gateway Apply
                  </span>
                  <form onSubmit={handleApplyDriver} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-neutral-500 uppercase">Applicant Name</label>
                      <input
                        type="text"
                        required
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="John Doe"
                        className="h-9 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none placeholder-neutral-700 rounded-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] font-mono text-neutral-500 uppercase">CDL License Class</label>
                      <select
                        value={driverLicense}
                        onChange={(e) => setDriverLicense(e.target.value)}
                        className="h-9 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none rounded-sm font-sans"
                      >
                        <option value="class-a">CDL Class-A (Standard Heavy)</option>
                        <option value="class-b">CDL Class-B (Local Shunt)</option>
                        <option value="team">Team Drivers (Class-A Pool)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors duration-300 rounded-sm cursor-pointer mt-1"
                    >
                      Submit Prelim Application
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="driver-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-900/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="w-5 h-5 animate-bounce" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    Prelim Application Logged
                  </h3>
                  <p className="text-[11px] text-neutral-455 text-neutral-400 mt-2 font-light leading-relaxed">
                    Hello <span className="font-bold text-white uppercase">{driverName}</span>! Our Driver Recruiting Center has logged your request. We will review your MVR records and call you within 24 hours. Safe travels!
                  </p>
                  <button
                    onClick={() => {
                      setDriverApplied(false);
                      setDriverName("");
                    }}
                    className="mt-4 text-[9px] font-mono text-orange-500 uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    Apply on another profile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </GSAPScrollReveal>

      </div>
    </section>
  );
}
