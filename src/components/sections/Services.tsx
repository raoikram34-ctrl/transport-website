import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Truck, Shuffle, Snowflake, Box, Zap, Users, ArrowUpRight, HelpCircle } from "lucide-react";

const SERVICES_DATA = [
  {
    id: "serv-ftl",
    title: "Full-Truckload (FTL)",
    description: "Multi-regional dedicated point-to-point transit. Absolute security for high-value commodity shipments on standard 53ft dry vans.",
    icon: Truck,
    specs: [
      { label: "Max Payload", value: "45,000 lbs" },
      { label: "Trailer Type", value: "53' Air Ride Dry Van" },
      { label: "Dispatch Priority", value: "Enterprise Dedicated" },
    ],
    features: ["Solo or Team Drivers", "Real-Time GPS Manifests", "Geofenced Lockdowns"],
  },
  {
    id: "serv-ltl",
    title: "Less-Than-Truckload (LTL)",
    description: "Proactive cost optimization leveraging regional distribution partners and smart staging terminals to bypass high-rate bottlenecks.",
    icon: Shuffle,
    specs: [
      { label: "Pricing Index", value: "NMC Class Based" },
      { label: "Asset Network", value: "Hub-and-Spoke" },
      { label: "Est. Transit", value: "2 - 5 Business Days" },
    ],
    features: ["Liftgate Dispatch Available", "Cross-dock Optimization", "Cargo Consolidation"],
  },
  {
    id: "serv-temp",
    title: "Cold Chain / Refrigerated",
    description: "Precision temperature-controlled transport of high-value perishables, pharmaceuticals, and organic chemical components.",
    icon: Snowflake,
    specs: [
      { label: "Temp Ranges", value: "-20°F to +70°F" },
      { label: "Telemetry", value: "Continuous Smart Probe" },
      { label: "Compliance", value: "FDA Food Safety Act" },
    ],
    features: ["Remote Setpoint Toggling", "Pre-cooling Checks", "Reefer Telematics Stream"],
  },
  {
    id: "serv-flat",
    title: "Flatbed / Heavy Haul",
    description: "Heavy machinery, industrial steel coils, and structural oversized assets managed by heavy hauling engineers.",
    icon: Box,
    specs: [
      { label: "Max Trailer Class", value: "Step-Deck / RGN" },
      { label: "Permitting", value: "Full State Level Escort" },
      { label: "Overweight Specs", value: "Up to 80,000+ lbs" },
    ],
    features: ["Chain & Strap Certifications", "Tarping Specialists", "Loading Ramp Logistics"],
  },
  {
    id: "serv-exp",
    title: "Expedited Hot-Shot",
    description: "Priority dual-driver dispatch for manufacturing assembly lines, critical parts supply, or emergency high-priority freights.",
    icon: Zap,
    specs: [
      { label: "First Unit Out", value: "Within 60 Minutes" },
      { label: "Transit Strategy", value: "Non-Stop Dual-Driver" },
      { label: "Monitoring", value: "Milestone Dispatch" },
    ],
    features: ["Premium Dedicated Sprinters", "Constant Live Status Sync", "Direct Direct routing"],
  },
  {
    id: "serv-ded",
    title: "Dedicated Fleets",
    description: "Establish dedicated drivers, tractors, and trailer fleets assigned purely to your high-frequency distribution lanes.",
    icon: Users,
    specs: [
      { label: "Contract Basis", value: "1 - 3 Year Custom SLAS" },
      { label: "Fleet Branding", value: "Available Option" },
      { label: "Driver Pool", value: "Assigned Backups" },
    ],
    features: ["Lane Rate Security Locks", "Surge Fleet Access", "Corporate Account Advisor"],
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section id="services" className="relative py-24 bg-[#0a0a0c] border-t border-white/5 overflow-hidden">
      
      {/* Cinematic subtle grid backdrop */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Title Block */}
        <div ref={containerRef} className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
            Core Service Modules
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight leading-none">
            HIGH-FIDELITY FREIGHT SOLUTIONS.
          </h2>
          <p className="text-sm text-neutral-450 text-neutral-400 mt-4 leading-relaxed font-light">
            Every freight movement complies with top safety guidelines, backed by elite driver training and state-of-the-art telemetry integration. 
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 35 }}
                animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-sm border bg-[#0f0f12]/40 p-6 flex flex-col justify-between overflow-hidden group transition-all duration-350 select-none pb-8 cursor-default hover:bg-[#0c0c0f]"
                style={{
                  borderColor: isHovered ? "rgba(249, 115, 22, 0.25)" : "rgba(255, 255, 255, 0.05)",
                  boxShadow: isHovered ? "0 4px 30px rgba(249, 115, 22, 0.02)" : "none",
                }}
              >
                {/* Decorative Laser Border Overlay */}
                <span className="absolute top-0 left-0 w-8 h-px bg-transparent group-hover:bg-orange-500 transition-all duration-300" />
                <span className="absolute top-0 left-0 w-px h-8 bg-transparent group-hover:bg-orange-500 transition-all duration-300" />

                {/* Top Row: Service Icon & Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-neutral-900 border border-white/5 group-hover:border-orange-500/10 group-hover:bg-orange-500/5 transition-all duration-350 rounded-sm">
                    <IconComponent className="w-5 h-5 text-neutral-300 group-hover:text-orange-500 transition-colors" />
                  </div>
                  
                  <span className="text-[10px] font-mono text-neutral-600 tracking-widest uppercase group-hover:text-orange-500/60 transition-colors">
                    Svc ID // 0{idx + 1}
                  </span>
                </div>

                {/* Service Heading & Desc */}
                <div className="mb-6">
                  <h3 className="text-md font-bold uppercase tracking-wide text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 text-neutral-650 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:text-orange-500" />
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed font-light min-h-[50px]">
                    {service.description}
                  </p>
                </div>

                {/* Specs Section - layout designed dynamically */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-2 mt-2">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-mono mb-1">Carrier Spec Metrics</span>
                  {service.specs.map((spec, specIdx) => (
                    <div key={specIdx} className="flex justify-between items-center text-[10px] font-mono bg-neutral-950/40 p-1.5 px-2 rounded-sm border border-white/5">
                      <span className="text-neutral-500">{spec.label}</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Features Bullet List */}
                <div className="mt-4 pt-3 flex flex-wrap gap-1.5">
                  {service.features.map((feature, featIdx) => (
                    <span key={featIdx} className="text-[9px] font-mono bg-neutral-900/60 text-neutral-400 border border-white/5 px-2 py-0.5 rounded-full">
                      ✓ {feature}
                    </span>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Live Support Notice */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-[10px] text-neutral-500 uppercase">
          <HelpCircle className="w-4 h-4 text-orange-500" />
          <span>Need custom dimensions, specialized chassis, or state escort permits? Direct line 24/7 support:</span>
          <a href="tel:8005550190" className="text-white hover:text-orange-500 font-bold transition-colors">
            1-800-TITAN-LIVE
          </a>
        </div>

      </div>
    </section>
  );
}
