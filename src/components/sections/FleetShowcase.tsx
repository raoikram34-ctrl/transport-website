import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Gauge, Shield, Milestone, Compass } from "lucide-react";
import { FleetItem } from "@/types/index";
import GSAPScrollReveal from "../widgets/GSAPScrollReveal";

const FLEET_INVENTORY: FleetItem[] = [
  {
    id: "flt-peterbilt",
    name: "PETERBILT 579 ENTERPRISE",
    capacity: "80,000 lbs GCWR Class 8",
    range: "1,200 Miles (Dual-Tanks)",
    class: "Aero Flagship Tractor",
    features: ["Epic Class-A Cabin Space", "EPIQ Aerodynamic Package", "PACCAR MX-13 Torque Motor"],
  },
  {
    id: "flt-kenworth",
    name: "KENWORTH T680 ADVANCED",
    capacity: "80,000 lbs GCWR Class 8",
    range: "1,350 Miles Range",
    class: "Continuous Run Sleeper",
    features: ["Predictive Cruise Control", "Integrated Powertrain (Bendix)", "Bendix Wingman Collision Control"],
  },
  {
    id: "flt-volvo",
    name: "VOLVO VNL 860 PREMIUM SE",
    capacity: "78,500 lbs GCWR Class 8",
    range: "1,100 Miles Range",
    class: "Expedited Double-Driver Suite",
    features: ["Volvo Dynamic Steering (VDS)", "Ultra-wide 77' Sleep Cabin", "Forward Collision Warning Radar"],
  },
  {
    id: "flt-freightliner",
    name: "CASCADIA SHORT DAYCAB",
    capacity: "80,000 lbs Max Gross",
    range: "650 Miles Dedicated Range",
    class: "Intermodal Shunt Tractor",
    features: ["Detroit Assurance 5.0 Radar", "Optimized Spot Turning Radius", "Smart lane assist alerts"],
  },
];

// Rich, high-fidelity, handpicked commercial trucking imagery to convey absolute premium branding
const FLEET_IMAGES = [
  "/images/image-1.jpg",
  "/images/image-2.jpg",
  "/images/image-3.jpg",
  "/images/image-4.jpg",
];

export default function FleetShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTruck = FLEET_INVENTORY[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % FLEET_INVENTORY.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + FLEET_INVENTORY.length) % FLEET_INVENTORY.length);
  };

  return (
    <section id="fleet" className="relative py-24 bg-[#0a0a0c] border-t border-white/5 overflow-hidden">
      
      {/* Dynamic graphic lines mimicking road lanes */}
      <div className="absolute inset-y-0 right-1/4 w-[2px] bg-white/[0.02] hidden xl:block pointer-events-none" />
      <div className="absolute inset-[15%] w-[400px] h-[400px] bg-orange-550/0 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Upper Title Segment */}
        <GSAPScrollReveal effect="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
                Corporate Fleet Logistics
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
                TITAN HEAVY TRACTORS.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-450 text-neutral-400 mt-4 max-w-lg font-light leading-relaxed">
                We operate exclusively late-model luxury Class 8 tractors (avg age of 14 months) optimized for heavy payload fuel dynamics and high-end driver ergonomics.
              </p>
            </div>

            {/* Steer controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Fleet Asset"
                className="p-3 rounded-xs border border-white/10 text-neutral-400 hover:text-white hover:border-orange-500 transition-all cursor-pointer focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-xs text-[10px] font-mono tracking-widest text-[#f97316]">
                {activeIndex + 1} / {FLEET_INVENTORY.length}
              </div>
              <button
                onClick={handleNext}
                aria-label="Next Fleet Asset"
                className="p-3 rounded-xs border border-white/10 text-neutral-400 hover:text-white hover:border-orange-500 transition-all cursor-pointer focus:outline-none"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </GSAPScrollReveal>

        {/* Core Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Detailed Specifications Left Panel */}
          <GSAPScrollReveal effect="slide-right" className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="overflow-hidden mb-1">
                <span className="text-[9px] font-mono bg-orange-950/40 text-orange-500 border border-orange-500/20 px-2.5 py-1 rounded-sm uppercase tracking-widest inline-block select-none">
                  {activeTruck.class}
                </span>
              </div>

              {/* Title with entry transitions */}
              <motion.h3
                key={`fleet-title-${activeTruck.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight"
              >
                {activeTruck.name}
              </motion.h3>

              <p className="text-xs text-neutral-450 text-neutral-450 leading-relaxed font-light mt-4">
                This unit operates with real-time satellite telemetry, smart load-scale sensors (which report directly to shipper manifests), and forward radar brakes.
              </p>

              {/* Specifications Cards list */}
              <div className="flex flex-col gap-3 font-mono text-[10px] mt-6">
                <div className="flex justify-between items-center bg-neutral-950/40 p-3 rounded-sm border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-neutral-500 uppercase flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-orange-500" />
                    Active Gross Weight Limit
                  </span>
                  <span className="text-white font-bold">{activeTruck.capacity}</span>
                </div>
                
                <div className="flex justify-between items-center bg-neutral-950/40 p-3 rounded-sm border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-neutral-500 uppercase flex items-center gap-1.5">
                    <Milestone className="w-3.5 h-3.5 text-orange-500" />
                    Maximum Range Capability
                  </span>
                  <span className="text-white font-bold">{activeTruck.range}</span>
                </div>

                <div className="flex justify-between items-center bg-neutral-950/40 p-3 rounded-sm border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-neutral-500 uppercase flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-orange-500" />
                    Safety Radar Integration
                  </span>
                  <span className="text-white font-bold uppercase">Bendix Assurance Elite</span>
                </div>
              </div>

              {/* Key Features bullet points list */}
              <div className="flex flex-col gap-2.5 pt-6 border-t border-white/5 mt-6">
                <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-mono mb-1 block">Tractor Engineering Details</span>
                {activeTruck.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-center gap-3 text-xs text-neutral-350">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    <span className="font-light">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </GSAPScrollReveal>

          {/* Large Machinery Photo Slider Right Panel */}
          <GSAPScrollReveal effect="slide-left" className="lg:col-span-7 h-80 sm:h-[420px] rounded-sm border border-white/5 relative bg-neutral-900 overflow-hidden group">
            <div>
              {/* Visual Grid overlays */}
              <div className="absolute inset-0 bg-neutral-950/30 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Photo Rendering */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={FLEET_IMAGES[activeIndex]}
                  alt={activeTruck.name}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover filter brightness-90 aspect-auto"
                />
              </AnimatePresence>

              {/* Overlay badge with locator telemetry details */}
              <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] uppercase tracking-widest bg-black/70 border border-white/10 p-3.5 rounded-sm backdrop-blur-md flex flex-col gap-1 select-none">
                <span className="text-neutral-500">ELD Telemetry Status</span>
                <span className="text-white font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Core Synchronized
                </span>
              </div>

              <div className="absolute top-6 right-6 z-20 font-mono text-[9px] uppercase tracking-widest bg-black/70 border border-white/10 p-2 px-3 rounded-xs backdrop-blur-md text-neutral-400">
                Class-8 Compliant
              </div>
            </div>
          </GSAPScrollReveal>

        </div>

      </div>
    </section>
  );
}
