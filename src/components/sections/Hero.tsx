import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import MotionReveal from "../widgets/MotionReveal";
import { ChevronRight, ArrowDownCircle, ShieldCheck, MapPin } from "lucide-react";

interface HeroProps {
  onQuoteClick: () => void;
}

const HERO_SCENES = [
  {
    id: 1,
    title: "AMERICA'S FREIGHT.",
    subtitle: "DELIVERED WITHOUT DELAYS.",
    description: "Propelling deep commercial fleets and enterprise supply chains through high-velocity logistics and intelligent national routing orchestration. Total asset protection.",
    image: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&q=80&w=2000",
    tagline: "Scene 01 // Deep Haul Solutions",
    stat: "14.2k Daily Active Loads",
  },
  {
    id: 2,
    title: "MOVING BUSINESS",
    subtitle: "FORWARD WITH INTELLIGENCE.",
    description: "Modernizing corporate distribution networks with digital dispatch systems, optimized driver pathways, and dynamic container load balancing. Absolute control.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=2000",
    tagline: "Scene 02 // Asset Orchestration",
    stat: "99.8% Certified Match Precision",
  },
  {
    id: 3,
    title: "BUILT FOR SPEED.",
    subtitle: "DRIVEN BY RELIABILITY.",
    description: "A professional network of multi-axle heavy haulers, expedited trailers, and temperature-controlled dry vans operating across all 48 continental states.",
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=2000",
    tagline: "Scene 03 // Precision Engineering",
    stat: "24/7 Redundant Dispatch Hubs",
  },
];

export default function Hero({ onQuoteClick }: HeroProps) {
  const [activeScene, setActiveScene] = useState(0);

  // Auto-rotating scenes like a premium high-end presentation screen
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % HERO_SCENES.length);
    }, 9000); // 9 seconds per cinematic slide
    return () => clearInterval(timer);
  }, []);

  const current = HERO_SCENES[activeScene];

  return (
    <section aria-label="Hero Showcase" className="relative min-h-screen w-full flex items-center justify-center bg-black overflow-hidden py-24 sm:py-0">
      
      {/* Background Image Layer with smooth Transition crossfades */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={current.image}
              alt="TitanFreight fleet background"
              className="w-full h-full object-cover filter brightness-75 contrast-125 select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Real shadow masks to prevent flat looks */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/90" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-neutral-950 via-transparent to-transparent hidden lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-950 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Left Laser Vertical Line (Titan-theme) */}
      <div className="absolute left-6 sm:left-12 top-28 bottom-12 w-px bg-white/5 hidden sm:block">
        <motion.div
          animate={{
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-full h-32 bg-gradient-to-b from-orange-500 via-orange-500/20 to-transparent"
        />
      </div>

      {/* Main Container */}
      <div className="relative z-15 w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Text details */}
        <div id="hero-left-content" className="lg:col-span-8 flex flex-col items-start pt-10 sm:pt-0">
          
          {/* Animated Slide Tagline */}
          <div className="overflow-hidden mb-6 inline-flex">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-orange-505 text-[#f97316]"
              >
                <span className="w-6 h-px bg-[#f97316]" />
                {current.tagline}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Storytelling Heading */}
          <div className="min-h-[140px] sm:min-h-[190px] lg:min-h-[220px] flex flex-col justify-start w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
                  {current.title}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-100/40 to-neutral-100/10 font-extrabold pb-2">
                    {current.subtitle}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Core Description Text */}
          <div className="min-h-[80px] mb-10 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-sm sm:text-base text-neutral-350 leading-relaxed font-light"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Interactive Actions CTA */}
          <div id="hero-actions" className="flex flex-wrap items-center gap-6">
            <button
              onClick={onQuoteClick}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-orange-500 hover:text-black transition-all duration-300 relative overflow-hidden cursor-pointer active:scale-95"
            >
              Dispatch Freight
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>

            <div className="flex flex-col border-l border-white/15 pl-6 font-mono">
              <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Network Status
              </span>
              <span className="text-xs text-white uppercase font-bold">{current.stat}</span>
            </div>
          </div>
        </div>

        {/* Right column: Scene Switching Selectors & Status Bar */}
        <div id="hero-right-selectors" className="lg:col-span-4 flex flex-col justify-center gap-6 lg:border-l lg:border-white/5 lg:pl-10">
          
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
            Select Operation Scene
          </span>

          {/* Dynamic selectors for interactive cinematic feel */}
          <nav aria-label="Scene Selection" className="flex flex-col gap-3">
            {HERO_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(idx)}
                className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex items-center justify-between group cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                  activeScene === idx
                    ? "bg-white/5 border-orange-500/40"
                    : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs ${activeScene === idx ? "text-orange-500" : "text-neutral-600"}`}>
                    0{scene.id}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                      {scene.title.split(" ")[0]} Network
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {idx === 0 ? "Strategic" : idx === 1 ? "Integrated" : "Super-priority"}
                    </span>
                  </div>
                </div>

                {/* Progress bar shown on active scene item */}
                {activeScene === idx ? (
                  <div className="w-12 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 9, ease: "linear" }}
                      className="h-full bg-orange-500"
                    />
                  </div>
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-600 transform group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
            ))}
          </nav>

          {/* Smart System indicators */}
          <div className="border-t border-white/5 pt-6 flex flex-col gap-3 text-[10px] font-mono text-neutral-400">
            <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-sm border border-white/5">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-550" />
                Cargo Security Bond
              </span>
              <span className="font-bold text-white">$1,000,000 U.S.D.</span>
            </div>
            <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-sm border border-white/5">
              <span className="uppercase tracking-wider flex items-center gap-1.5 text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-orange-550" />
                Origin Transit Points
              </span>
              <span className="font-bold text-white">48 Contiguous States</span>
            </div>
          </div>

        </div>

      </div>

      {/* Decorative Bottom Side Rail: establishing authentic design theme */}
      <div className="absolute right-12 bottom-12 flex-col items-center gap-12 hidden xl:flex text-neutral-500">
        <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/10 rotate-90 whitespace-nowrap mb-20 select-none">
          EST. 1994 // USA FREIGHTWAY NETWORK
        </span>
        <div className="w-px h-16 bg-white/10" />
        <div className="flex flex-col gap-2 p-1">
          <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
        </div>
      </div>

      {/* Scroll indicator pointing visitors downward */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 font-mono text-[9px] tracking-widest uppercase opacity-40 select-none animate-pulse">
        <span>Scroll Down</span>
        <ArrowDownCircle className="w-4 h-4 text-orange-500" />
      </div>

    </section>
  );
}
