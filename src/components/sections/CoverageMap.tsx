"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Map, Landmark, Clock, Route, Compass, CalendarCheck, Globe } from "lucide-react";
import InteractiveGlobe from "../widgets/InteractiveGlobe";


interface Corridor {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  transitHours: number;
  frequency: string;
  activeTrucks: number;
  points: { originCoords: { x: number; y: number }; destCoords: { x: number; y: number } };
}

const CORRIDORS: Corridor[] = [
  {
    id: "cor-1",
    name: "Pacific Corridor (West Coast)",
    origin: "Seattle Hub",
    destination: "Los Angeles Terminal",
    distance: "1,140 Miles",
    transitHours: 22,
    frequency: "Daily Outbound",
    activeTrucks: 14,
    points: { originCoords: { x: 10, y: 15 }, destCoords: { x: 12, y: 65 } },
  },
  {
    id: "cor-2",
    name: "Sunbelt Expressway",
    origin: "Los Angeles Hub",
    destination: "Phoenix / Dallas Terminal",
    distance: "1,400 Miles",
    transitHours: 26,
    frequency: "Continuous Scheduling",
    activeTrucks: 29,
    points: { originCoords: { x: 12, y: 65 }, destCoords: { x: 50, y: 80 } },
  },
  {
    id: "cor-3",
    name: "Heartland Route",
    origin: "Dallas Logistics Hub",
    destination: "Chicago Intermodal",
    distance: "925 Miles",
    transitHours: 18,
    frequency: "Twice Daily Express",
    activeTrucks: 19,
    points: { originCoords: { x: 50, y: 80 }, destCoords: { x: 65, y: 40 } },
  },
  {
    id: "cor-4",
    name: "Eastern Enterprise Belt",
    origin: "Chicago Intermodal",
    destination: "New York Port Terminal",
    distance: "800 Miles",
    transitHours: 15,
    frequency: "Constant Rotation",
    activeTrucks: 34,
    points: { originCoords: { x: 65, y: 40 }, destCoords: { x: 88, y: 35 } },
  },
  {
    id: "cor-5",
    name: "Southern Gateway",
    origin: "Dallas Logistics Hub",
    destination: "Miami SeaPort Terminal",
    distance: "1,310 Miles",
    transitHours: 25,
    frequency: "Alternate Day Heavy Load",
    activeTrucks: 8,
    points: { originCoords: { x: 50, y: 80 }, destCoords: { x: 82, y: 90 } },
  },
];

const HUBS = [
  { name: "Seattle", state: "WA", x: 10, y: 15 },
  { name: "Los Angeles", state: "CA", x: 12, y: 65 },
  { name: "Phoenix", state: "AZ", x: 23, y: 72 },
  { name: "Dallas", state: "TX", x: 50, y: 80 },
  { name: "Chicago", state: "IL", x: 65, y: 40 },
  { name: "New York", state: "NY", x: 88, y: 35 },
  { name: "Miami", state: "FL", x: 82, y: 90 },
];

export default function CoverageMap() {
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>("cor-2");
  const [mapMode, setMapMode] = useState<"3d" | "2d">("3d");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  const activeCorridor = CORRIDORS.find((c) => c.id === selectedCorridorId) || CORRIDORS[1];

  return (
    <section id="coverage" aria-label="Coverage Map Section" className="relative py-24 bg-[#050505] border-t border-white/5 overflow-hidden">
      
      {/* Absolute positioning background element */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Title details */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
              National Infrastructure
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none">
              USA FREIGHT CORRIDORS.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-4 max-w-xl font-light">
              We operate continuous priority distribution pathways connecting main domestic sea ports, manufacturing hubs, and interstate border crossings.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* View selection tabs */}
            <div className="flex p-1 bg-neutral-950 border border-white/5 rounded-sm relative">
              <button
                onClick={() => setMapMode("3d")}
                className={`px-4 py-2 font-mono text-[9px] uppercase tracking-wider rounded-xs cursor-pointer transition-all flex items-center gap-1.5 focus:outline-none ${
                  mapMode === "3d"
                    ? "bg-[#f97316]/10 text-white border border-[#f97316]/20 font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                3D Satellite Core
              </button>
              <button
                onClick={() => setMapMode("2d")}
                className={`px-4 py-2 font-mono text-[9px] uppercase tracking-wider rounded-xs cursor-pointer transition-all flex items-center gap-1.5 focus:outline-none ${
                  mapMode === "2d"
                    ? "bg-[#f97316]/10 text-white border border-[#f97316]/20 font-bold"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                2D Interstate Lanes
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] bg-neutral-900 border border-white/5 p-3 rounded-sm">
              <Compass className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: "15s" }} />
              <div>
                <span className="block text-white font-bold uppercase">Dynamic Routing Online</span>
                <span className="text-neutral-500">Live Traffic Dispatch Checked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Layout Rendering */}
        <AnimatePresence mode="wait">
          {mapMode === "3d" ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <InteractiveGlobe />
            </motion.div>
          ) : (
            <motion.div
              key="2d"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              ref={containerRef} 
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
          
          {/* Interactive Corridors list control (Left Panel) */}
          <div id="corridors-menu" className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-neutral-500 block">
              Active Corporate Lanes
            </span>

            <nav aria-label="Freight Lanes" className="flex flex-col gap-2">
              {CORRIDORS.map((corridor) => (
                <button
                  key={corridor.id}
                  onClick={() => setSelectedCorridorId(corridor.id)}
                  className={`w-full text-left p-4 rounded-sm border transition-all duration-300 flex flex-col gap-1 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer ${
                    selectedCorridorId === corridor.id
                      ? "bg-white/5 border-orange-500/40"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className={`text-[10px] font-mono ${selectedCorridorId === corridor.id ? "text-orange-550 text-orange-500" : "text-neutral-500"}`}>
                      {corridor.id.toUpperCase()} // LANE INDEX
                    </span>
                    <span className="text-[10px] font-mono text-neutral-450 text-neutral-400">
                      {corridor.distance}
                    </span>
                  </div>
                  <span className="text-xs font-bold uppercase text-white tracking-wide">
                    {corridor.origin} ➔ {corridor.destination.split(" ")[0]}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Interactive Map Visualizer (Right Panel) */}
          <div id="coverage-svg-wrapper" className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Visualizer Grid container and interactive map plot */}
            <div className="h-96 w-full rounded-sm border border-white/5 bg-neutral-900/10 relative p-4 flex flex-col justify-end overflow-hidden group">
              
              {/* Internal decorative matrix background grids */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              
              {/* Map Canvas viewport */}
              <div className="absolute inset-4 top-10 pointer-events-none">
                
                {/* Simulated Geographic US border lines (Minimal background shape lines) */}
                <svg className="w-full h-full opacity-30 text-neutral-850" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {/* Conceptual United States layout boundary line */}
                  <path
                    d="M 10,20 L 25,18 L 40,22 L 60,18 L 85,25 L 90,35 L 87,45 L 84,70 L 80,92 L 65,85 L 53,82 L 40,84 L 28,75 L 14,70 L 8,50 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Draw all inactive dispatch connection paths */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {CORRIDORS.map((c) => {
                    const isSelected = c.id === selectedCorridorId;
                    return (
                      <g key={`path-${c.id}`}>
                        <line
                          x1={`${c.points.originCoords.x}%`}
                          y1={`${c.points.originCoords.y}%`}
                          x2={`${c.points.destCoords.x}%`}
                          y2={`${c.points.destCoords.y}%`}
                          stroke={isSelected ? "#f97316" : "rgba(255, 255, 255, 0.08)"}
                          strokeWidth={isSelected ? "1.5" : "0.5"}
                          strokeDasharray={isSelected ? "none" : "3 3"}
                          className="transition-all duration-500"
                        />
                        
                        {/* Dynamic glow pulses moving along route */}
                        {isSelected && (
                          <line
                            x1={`${c.points.originCoords.x}%`}
                            y1={`${c.points.originCoords.y}%`}
                            x2={`${c.points.destCoords.x}%`}
                            y2={`${c.points.destCoords.y}%`}
                            stroke="#f97316"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-40"
                            style={{
                              strokeDasharray: "20, 100",
                              animation: "dash 4s linear infinite",
                            }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Hub plots on map with custom coords and labels */}
                {HUBS.map((hub) => {
                  const isActiveInRoute = 
                    activeCorridor.origin.includes(hub.name) || 
                    activeCorridor.destination.includes(hub.name);

                  return (
                    <div
                      key={hub.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                      style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    >
                      <div className="relative group/dot flex flex-col items-center">
                        {/* Hub Outer ping pulse */}
                        {isActiveInRoute && (
                          <div className="absolute inset-0 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-60" />
                        )}
                        {/* Core Dot point */}
                        <div
                          className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                            isActiveInRoute
                              ? "bg-[#050505] border-orange-500 scale-125"
                              : "bg-neutral-800 border-neutral-700"
                          }`}
                        />
                        
                        {/* Hub Name card tooltip */}
                        <span className={`text-[8px] font-mono px-1 py-0.5 rounded-xs mt-1 pointer-events-none uppercase tracking-wide whitespace-nowrap transition-colors ${
                          isActiveInRoute 
                            ? "bg-orange-950/40 text-white border border-orange-500/20" 
                            : "bg-neutral-900/60 text-neutral-500"
                        }`}>
                          {hub.name} ({hub.state})
                        </span>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Corridor statistics dashboard readout panel (Embedded in right-bottom corner) */}
              <div aria-label="Route Stats" className="relative z-10 w-full xs:w-80 bg-neutral-950/80 border border-white/5 p-4 rounded-sm backdrop-blur-md flex flex-col gap-3 font-mono text-[10px] self-end hover:border-white/10 transition-colors">
                
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-neutral-500 uppercase font-bold text-[9px] tracking-widest">Active Dispatch Telemetry</span>
                  <span className="text-orange-500 font-bold uppercase tracking-wider bg-orange-950/30 px-2 py-0.5 border border-orange-500/10 rounded-sm">In Transit</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-1">
                  <div>
                    <span className="block text-neutral-520 text-neutral-550 text-neutral-500 font-normal uppercase">Lanes Route Span</span>
                    <span className="text-white font-bold block mt-0.5 truncate">{activeCorridor.distance}</span>
                  </div>
                  <div>
                    <span className="block text-neutral-520 text-neutral-550 text-neutral-500 font-normal uppercase">Est. Drive Time</span>
                    <span className="text-white font-bold block mt-0.5">{activeCorridor.transitHours} Hours</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/5">
                  <div>
                    <span className="block text-neutral-520 text-neutral-550 text-neutral-500 font-normal uppercase">Lanes Rotation</span>
                    <span className="text-white font-bold block mt-0.5">{activeCorridor.frequency}</span>
                  </div>
                  <div>
                    <span className="block text-neutral-520 text-neutral-550 text-neutral-500 font-normal uppercase">Active Tractors</span>
                    <span className="text-white font-bold block mt-0.5">{activeCorridor.activeTrucks} Active GPS</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Extra visual indicators */}
            <div className="flex flex-wrap gap-6 items-center justify-between font-mono text-[9px] text-[#8c8c8c] border-t border-white/5 pt-4 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Route className="w-3.5 h-3.5 text-orange-500" /> Continuous Interstate 10, 80, & 35 Core Patrolled</span>
              <span className="flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5 text-orange-500" /> ELD Compliant Hours of Service (HOS) Strictly Logged</span>
            </div>

          </div>

        </motion.div>
        )}
        </AnimatePresence>

      </div>

      {/* Style block dedicated to map stroke dash animation */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -120;
          }
        }
      `}</style>

    </section>
  );
}
