import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Award, TrendingUp, Users } from "lucide-react";
import GSAPScrollReveal from "../widgets/GSAPScrollReveal";

interface CounterProps {
  endValue: number;
  suffix?: string;
  duration?: number;
}

function AnimatedDigit({ endValue, suffix = "", duration = 1500 }: CounterProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = endValue;
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCurrent(end);
      } else {
        setCurrent(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [endValue, duration, isInView]);

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-white">
      {current.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {

  const statistics = [
    {
      id: "stat-years",
      value: 30,
      suffix: " Yrs",
      label: "Operational Experience",
      subText: "Proven enterprise reliability since 1994",
      icon: Award,
    },
    {
      id: "stat-loads",
      value: 525,
      suffix: "k +",
      label: "Secure Cargo Loads Handled",
      subText: "ZERO loss freight security incidents",
      icon: TrendingUp,
    },
    {
      id: "stat-states",
      value: 48,
      suffix: "",
      label: "Continental US States Covered",
      subText: "Total multi-regional fleet integration",
      icon: ShieldCheck,
    },
    {
      id: "stat-delivery",
      value: 99,
      suffix: ".8 %",
      label: "On-Time Dispatch Rate",
      subText: "Backed by predictive satellite routing",
      icon: Users,
    },
  ];

  return (
    <section id="analytics" className="relative py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      
      {/* Decorative ambient lines indicating scale telemetry */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.03),_transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Upper Segment title */}
        <GSAPScrollReveal effect="slide-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/5 pb-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
                Performance Indicators
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-medium text-white tracking-tight">
                Enterprise Trucking <br />
                <span className="text-neutral-500 font-light">By The Numbers.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-xs sm:text-sm text-neutral-450 leading-relaxed font-light">
                We log and report our performance parameters to federal databases daily. Fully licensed, bonded ($1M), and compliant with major US supply-chain standards.
              </p>
            </div>
          </div>
        </GSAPScrollReveal>

        {/* Counter Grid */}
        <GSAPScrollReveal effect="skew-up" stagger={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statistics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                id={stat.id}
                className="flex flex-col items-start gap-4 p-6 rounded-sm bg-neutral-900/20 border border-white/5 hover:border-orange-500/10 transition-colors duration-300 relative group"
              >
                {/* Floating graphic element */}
                <div className="absolute top-4 right-4 text-neutral-800 group-hover:text-orange-500/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 strike-1.5" />
                </div>

                {/* Simulated metric state */}
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#f97316] font-bold">
                  Telemetry 0{idx + 1}
                </span>

                {/* Large animated counter number */}
                <div>
                  <AnimatedDigit endValue={stat.value} suffix={stat.suffix} />
                </div>

                {/* Labels detailing performance */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-neutral-200">
                    {stat.label}
                  </h3>
                  <p className="text-[11px] text-neutral-520 text-neutral-500 mt-1">
                    {stat.subText}
                  </p>
                </div>

                {/* Tiny glowing bar on hover */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-transparent group-hover:bg-orange-500 transition-colors duration-500" />
              </div>
            );
          })}
        </GSAPScrollReveal>

        {/* Dispatch statement summary */}
        <div className="mt-16 bg-neutral-900/20 border border-white/5 p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-[10px] tracking-widest uppercase text-neutral-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>DISPATCH INTELLIGENCE SYSTEM STREAMING LIVE</span>
          </div>
          <span className="text-white font-bold">F.M.C.S.A Active Carrier ID: 3829029</span>
        </div>

      </div>
    </section>
  );
}
