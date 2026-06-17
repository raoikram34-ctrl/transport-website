"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ChevronRight, ArrowDownCircle, ShieldCheck, MapPin, Activity, HelpCircle, ArrowUpRight, Award, CheckSquare, Sparkles } from "lucide-react";
import { SERVICES_DATA } from "@/data/servicesData";
import CoverageMap from "@/components/sections/CoverageMap";
import Faqs from "@/components/sections/Faqs";
import Blogs from "@/components/sections/Blogs";
import Stats from "@/components/sections/Stats";
import FleetShowcase from "@/components/sections/FleetShowcase";
import { useRouter } from "next/navigation";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import OperationsGuide from "@/components/sections/OperationsGuide";
import MagneticButton from "@/components/shared/MagneticButton";
import GSAPScrollReveal from "@/components/widgets/GSAPScrollReveal";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}




const HERO_SCENES = [
  {
    id: 1,
    title: "AMERICA'S FREIGHT.",
    subtitle: "DELIVERED WITHOUT COMPROMISE.",
    description: "Propelling deep commercial fleets and enterprise supply chains through high-velocity logistics and intelligent Chicago-based national routing orchestration. Perfect asset protection.",
    image: "/images/image-1.jpg",
    tagline: "Scene 01 // Dedicated Heavy Haulage",
    stat: "14.2k Active Interstate Loads",
  },
  {
    id: 2,
    title: "MOVING ENTERPRISE",
    subtitle: "FORWARD WITH COMPLIANCE.",
    description: "Modernizing corporate distribution networks with digital dispatch systems, optimized driver shift-plans, and dynamic highway load balancing. Absolute freight control.",
    image: "/images/image-2.jpg",
    tagline: "Scene 02 // Asset & 3PL Orchestration",
    stat: "99.8% On-Time Logistical Precision",
  },
  {
    id: 3,
    title: "BUILT FOR INTENSITY.",
    subtitle: "DRIVEN BY SECURED BONDS.",
    description: "A premium network of multi-axle heavy haulers, expedited dry trailers, and refrigerated containers operating actively across all 48 continental states.",
    image: "/images/image-3.jpg",
    tagline: "Scene 03 // Precision Road Engineering",
    stat: "24/7 Redundant Dispatch Command",
  },
];

const FLEET_GALLERY = [
  {
    name: "Heavy Haul Trucks",
    description: "Long-distance freight transport fleet.",
    image: "/images/image-1.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Refrigerated Cargo",
    description: "Cold chain logistics system.",
    image: "/images/image-2.jpg",
    className: "md:col-span-1",
  },
  {
    name: "Container Fleet",
    description: "Port-to-city container delivery network.",
    image: "/images/image-3.jpg",
    className: "md:col-span-1",
  },
  {
    name: "Highway Dispatch",
    description: "Real-time interstate operations.",
    image: "/images/image-4.jpg",
    className: "md:col-span-2",
  },
 
];

const FRAME_FILES = Array.from({ length: 30 }, (_, i) => {
  const frameNum = Math.min(96, Math.floor(1 + i * (95 / 29)));
  const padded = String(frameNum).padStart(4, "0");
  return `/hero-frames/frame_${padded}.jpg`;
});

export default function Home() {
  const router = useRouter();
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isServicesInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Refs for Scroll-Driven Video Background and Syncing
  const heroTriggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef<number>(0);
  const activeSceneRef = useRef<number>(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollTriggerInstanceRef = useRef<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Canvas frame drawing function (centered object-cover behavior)
  const renderCanvas = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const expectedWidth = Math.floor(rect.width * dpr);
    const expectedHeight = Math.floor(rect.height * dpr);

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      canvas.width = expectedWidth;
      canvas.height = expectedHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Preload frames on client mount
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    FRAME_FILES.forEach((src, idx) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        images[idx] = img;
        loadedCount++;
        if (loadedCount === 30) {
          renderCanvas(0);
        }
      };
    });
    imagesRef.current = images;

    const handleResize = () => {
      renderCanvas(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // GSAP ScrollTrigger to pin Hero and scrub frames/scenes
  useEffect(() => {
    if (typeof window === "undefined" || !heroTriggerRef.current) return;

    const timer = setTimeout(() => {
      const trigger = ScrollTrigger.create({
        trigger: heroTriggerRef.current,
        start: "top top",
        end: "+=250%",
        pin: true,
        scrub: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Animate frames (0 to 29)
          const frameIndex = Math.min(29, Math.floor(progress * 30));
          currentFrameRef.current = frameIndex;
          renderCanvas(frameIndex);

          // Update active text slide scene (0, 1, 2)
          const sceneIndex = Math.min(2, Math.floor(progress * 3));
          if (sceneIndex !== activeSceneRef.current) {
            activeSceneRef.current = sceneIndex;
            setActiveScene(sceneIndex);
          }
        }
      });

      scrollTriggerInstanceRef.current = trigger;
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollTriggerInstanceRef.current) {
        scrollTriggerInstanceRef.current.kill();
      }
    };
  }, []);

  // Sync manual selector clicks to scroll position
  const scrollToScene = (idx: number) => {
    if (scrollTriggerInstanceRef.current) {
      const start = scrollTriggerInstanceRef.current.start;
      const end = scrollTriggerInstanceRef.current.end;
      const total = end - start;
      const targetProgress = (idx + 0.5) / 3;
      const targetScroll = start + total * targetProgress;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    } else {
      setActiveScene(idx);
    }
  };

  const currentScene = HERO_SCENES[activeScene];

  return (
    <div className="w-full">
      {/* 1. CINEMATIC HERO SLIDER */}
      <div ref={heroTriggerRef} className="relative w-full">
        <section aria-label="Hero Showcase" className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden py-24 sm:py-0">
          <div className="absolute inset-0 z-0">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-cover filter brightness-75 contrast-125 select-none pointer-events-none"
            />
            {/* Dark gradient masks for layout contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/90 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-neutral-950 via-transparent to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none" />
          </div>

        {/* Left Side Laser Stripe */}
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

        <div className="relative z-15 w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col items-start pt-10 sm:pt-0">
            <div className="overflow-hidden mb-6 inline-flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-[#f97316]"
                >
                  <span className="w-6 h-px bg-[#f97316]" />
                  {currentScene.tagline}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-h-[140px] sm:min-h-[190px] lg:min-h-[220px] flex flex-col justify-start w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.9]">
                    SKYHAUL TRANSIT.
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-100/40 to-neutral-100/10 font-extrabold pb-2">
                      {currentScene.subtitle}
                    </span>
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="min-h-[80px] mb-10 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentScene.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-sm sm:text-base text-neutral-350 leading-relaxed font-light"
                >
                  {currentScene.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton
  onClick={() => router.push("/contact")}
  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-orange-500 transition-all duration-300"
>
  Estimate Dispatch Cost
</MagneticButton>

              <button
                onClick={() => router.push("/about")}
                className="px-6 py-4 border border-white/10 text-xs font-bold tracking-widest uppercase text-white hover:border-white transition-all duration-200"
              >
                Corporate Profile
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center gap-6 lg:border-l lg:border-white/5 lg:pl-10">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
              Active Fleet Corridors
            </span>

            <nav aria-label="Scene Selection" className="flex flex-col gap-3">
              {HERO_SCENES.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => scrollToScene(idx)}
                  className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex items-center justify-between group cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                    activeScene === idx
                      ? "bg-white/5 border-orange-500/40"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${activeScene === idx ? "text-orange-550 text-orange-500" : "text-neutral-600"}`}>
                      0{scene.id}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                        {scene.title.split(" ")[0]} Command
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {idx === 0 ? "Strategic" : idx === 1 ? "Integrated" : "Super-priority"}
                      </span>
                    </div>
                  </div>

                  {activeScene === idx ? (
                    <div className="w-12 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, Math.max(0, ((scrollProgress - idx * 0.333) / 0.333) * 100))}%` }}
                        className="h-full bg-orange-500"
                      />
                    </div>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-600 transform group-hover:translate-x-0.5 transition-transform" />
                  )}
                </button>
              ))}
            </nav>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-3 text-[10px] font-mono text-neutral-400">
              <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-sm border border-white/5">
                <span className="uppercase tracking-wider flex items-center gap-1.5 text-neutral-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" />
                  Cargo Liability Bond
                </span>
                <span className="font-bold text-white">$1,000,000 USD Bound</span>
              </div>
              <div className="flex justify-between items-center bg-neutral-900/40 p-2.5 rounded-sm border border-white/5">
                <span className="uppercase tracking-wider flex items-center gap-1.5 text-neutral-500">
                  <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
                  Active Command Hub
                </span>
                <span className="font-bold text-white">Chicago Terminal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-12 bottom-12 flex-col items-center gap-12 hidden xl:flex text-neutral-500">
          <span className="text-[9px] font-mono tracking-[0.5em] uppercase text-white/10 rotate-90 whitespace-nowrap mb-20 select-none">
            EST. 1994 // MIDWEST ROAD TERMINAL
          </span>
          <div className="w-px h-16 bg-white/10" />
          <div className="flex flex-col gap-2 p-1">
            <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 font-mono text-[9px] tracking-widest uppercase opacity-40 select-none animate-pulse">
          <span>Explore Network</span>
          <ArrowDownCircle className="w-4 h-4 text-orange-500" />
        </div>
      </section>
    </div>


      {/* 2. CORPORATE PERFORMANCE METRICS (STATS) */}
      <Stats />


            {/* 3. MODULAR SERVICES MODULE TEASE */}
      <section className="relative py-24 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <GSAPScrollReveal effect="slide-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="max-w-3xl">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
                  Core Service Portfolios
                </span>
                <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight">
                  COMPREHENSIVE LOGISTICS.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-450 text-neutral-450 mt-3 font-light leading-relaxed">
                  From dry van routes departing daily from Chicago/Phoenix to specialized refrigerated food haulage, we provide dedicated assets for major shipper networks.
                </p>
              </div>
              <button
                onClick={() => router.push("/services")}
                className="px-6 py-3 bg-neutral-900 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-[#f97316] hover:bg-white hover:text-black hover:border-white transition-all duration-300 whitespace-nowrap rounded-xs"
              >
                View All Services →
              </button>
            </div>
          </GSAPScrollReveal>

          <GSAPScrollReveal effect="scale-up" stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.slice(0, 3).map((service, idx) => {
              return (
                <div
                  key={service.id}
                  className="relative rounded-sm border border-white/5 bg-[#0f0f12]/30 p-6 flex flex-col justify-between overflow-hidden group hover:border-[#f97316]/20 hover:bg-[#0c0c0f] transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[9px] font-mono text-neutral-600 tracking-widest uppercase">
                        Service Line 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-[#f97316] font-bold bg-[#f97316]/5 border border-[#f97316]/10 px-2.5 py-0.5 rounded-sm">
                        ACTIVE FLEET
                      </span>
                    </div>

                    <h3 className="text-base font-bold uppercase tracking-wide text-white group-hover:text-orange-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-3 leading-relaxed font-light min-h-[50px]">
                      {service.shortDesc}
                    </p>
                    
                    <div className="border-t border-white/5 pt-4 mt-6 space-y-2">
                      {service.specs.slice(0, 2).map((s, sIdx) => (
                        <div key={sIdx} className="flex justify-between text-[10px] font-mono">
                          <span className="text-neutral-500">{s.label}</span>
                          <span className="text-neutral-200 font-bold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => router.push(`/services/${service.id}`)}
                      className="text-[10px] font-mono text-orange-500 uppercase tracking-widest hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      Read Specifications 
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </GSAPScrollReveal>
        </div>
      </section>

      
       {/* 4. Fleet Showcase */}
      <FleetShowcase />

       {/* 5. Operations Guide */}
      <OperationsGuide/>

      {/* 6. SAFETY PROFILE & COMPLIANCE STRENGTH (Inspired by Tranzit Corp) */}
      <section className="relative py-20 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <GSAPScrollReveal effect="slide-right" className="lg:col-span-7">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
                Logistics Safety Standards
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-medium text-white tracking-tight mb-6">
                PRACTICING PRISTINE LOGISTICAL SAFETY.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8 max-w-xl">
                We operate one of the safest trucking fleets on American roads today. Skyhaul Transit LLC structures severe training protocols and monitors telemetry markers continually to protect high-tier commercial cargo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-[11px]">
                <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-sm">
                  <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                    <CheckSquare className="w-4 h-4" />
                    <span>0.01% Error</span>
                  </div>
                  <span className="text-neutral-500 text-[10px] uppercase block">Freight Claims Ratio</span>
                </div>
                <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-sm">
                  <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                    <Award className="w-4 h-4" />
                    <span>SMARTWAY</span>
                  </div>
                  <span className="text-neutral-500 text-[10px] uppercase block">FMCSA Green Certified</span>
                </div>
                <div className="bg-neutral-900/40 border border-white/5 p-4 rounded-sm">
                  <div className="flex items-center gap-2 text-orange-500 font-bold mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>GPS Sat</span>
                  </div>
                  <span className="text-neutral-500 text-[10px] uppercase block">Tractor Telemetry ELD</span>
                </div>
              </div>
            </div>
          </GSAPScrollReveal>

          <GSAPScrollReveal effect="slide-left" className="lg:col-span-5 bg-neutral-900/30 border border-white/5 p-6 sm:p-8 rounded-sm">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2">DOT Authority Dossier</span>
              <div className="space-y-4 font-mono text-[11px] uppercase">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Legal Carrier Name</span>
                  <span className="text-white font-bold">Skyhaul Transit LLC</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">DOT Authorization</span>
                  <span className="text-white font-bold">#3829029</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">MC License Cluster</span>
                  <span className="text-white font-bold">#998310</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-neutral-500">Fleet Coverage Tier</span>
                  <span className="text-emerald-400 font-bold">48 States Bonded</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500">Operational Uptime</span>
                  <span className="text-orange-500 font-bold">99.98% SLA Score</span>
                </div>
              </div>
            </div>
          </GSAPScrollReveal>
        </div>
      </section>

      {/* 7 FLEET IMAGE BENTO GALLERY */}
<section className="relative py-20 bg-[#050505] border-t border-white/5">
  <div className="max-w-7xl mx-auto px-6 sm:px-12">
    
    <GSAPScrollReveal effect="slide-up" className="mb-10">
      <div>
        <h2 className="text-2xl sm:text-4xl font-display text-white">
          FLEET VISUAL OPERATIONS
        </h2>
        <p className="text-sm text-neutral-400 mt-2">
          Real-world logistics assets powering nationwide delivery network.
        </p>
      </div>
    </GSAPScrollReveal>

    <GSAPScrollReveal effect="slide-up" stagger={0.12}>
      <BentoGrid>
        {FLEET_GALLERY.map((item, idx) => (
          <BentoCard
            key={idx}
            title={item.name}
            description={item.description}
            image={item.image}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </GSAPScrollReveal>

  </div>
</section>



      {/* 8. INTERACTIVE NATIONAL COVERAGE */}
      <CoverageMap />

      {/* 9. INSTANT SYSTEM TRACKING GATEWAY BAR */}
      <section className="relative py-16 bg-[#050505] border-t border-b border-white/5">
        <GSAPScrollReveal effect="zoom-in" duration={1} className="max-w-5xl mx-auto px-6 text-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
              Interstate Telemetry Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight mb-4">
              TRACK AND RECORD CARGO IN REAL TIME.
            </h2>
            <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed mb-8">
              Access active satellite driver shifts, geo-position indexes, and electronic signatures directly. Ensure high caliber precision for active route brackets.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              
              <MagneticButton
                onClick={() => router.push("/tracking")}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-orange-500 transition-all duration-300"
              >
                Access Dispatch Tracker
              </MagneticButton>

              <button
                onClick={() => router.push("/contact")}
                className="border border-white/10 text-white font-bold text-xs uppercase tracking-widest px-8 h-12 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
              >
                Open Cost Calculator
              </button>
            </div>
          </div>
        </GSAPScrollReveal>
      </section>


{/* 10. Blogs  */}
      <Blogs />

      {/* 11. Frequently Ask Questions */}
      <Faqs />

      
    </div>
  );
}
