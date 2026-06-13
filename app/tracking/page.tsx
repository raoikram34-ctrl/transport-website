"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Search, Loader2, Compass, ShieldCheck, MapPin, Truck, AlertTriangle, Snowflake, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Tracking() {
  const router = useRouter();
  const [trackingId, setTrackingId] = useState("TRK-492-990-21");
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState<any | null>({
    code: "TRK-492-990-21",
    shipper: "Skyhaul Transit Logistics",
    route: "Los Angeles Hub ➔ Dallas Terminal Logistics",
    freightClass: "Class 92 FTL Premium Freight",
    currentPosition: "Abilene Route Corridor Eastbound",
    speed: "62 MPH",
    truckId: "TRACTOR-579B (Peterbilt Aero)",
    temperature: "Reefer Ambient: 35.5°F (Normal Temp-Lock)",
    originTime: "June 10, 2026 - 08:30 MST",
    estimatedArrival: "June 12, 2026 - 15:45 CST",
    driverStatus: "Solo Driver (Hours-of-Service Validated)",
    loadWeight: "38,500 lbs Net Weight",
    percentageCompleted: 65,
    statusSteps: [
      { name: "Order Booked & Manifest Synced", status: "complete", date: "June 09 - 16:30 MST" },
      { name: "Pre-load Trailer Telematics Core Verified", status: "complete", date: "June 10 - 07:00 MST" },
      { name: "Departed West-Core Los Angeles Hub", status: "complete", date: "June 10 - 08:30 MST" },
      { name: "Active Abilene Highway Corridor", status: "active", date: "Abilene, TX // Eastbound" },
      { name: "Est. Dallas Terminal Logistics Staging", status: "pending", date: "Jun 12 - 15:45 CST" },
    ],
  });
  const [showError, setShowError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setShowError(false);
    setSearchedData(null);

    setTimeout(() => {
      setLoading(false);
      const canonical = trackingId.trim().toUpperCase();
      
      if (canonical.includes("ERR") || canonical.length < 4) {
        setShowError(true);
        return;
      }

      setSearchedData({
        code: canonical,
        shipper: "American Aerospace Corp",
        route: "Los Angeles Hub (Terminal 2) ➔ New York Port Intake",
        freightClass: "Class 85 Critical Oversized",
        currentPosition: "Near Columbus, Ohio I-70 Corridor Eastbound",
        speed: "64 MPH",
        truckId: "TRACTOR-88214 (Volvo Sleeper)",
        temperature: "Reefer Ambient: -4°F (Optimal Lock)",
        originTime: "June 09, 2026 - 14:00 MST",
        estimatedArrival: "June 12, 2026 - 18:30 EST",
        driverStatus: "Team Drivers (ELD Compliant - Active Rotational Duty)",
        loadWeight: "42,100 lbs Net Manifest",
        percentageCompleted: 78,
        statusSteps: [
          { name: "Order Booked & Manifest Synced", status: "complete", date: "June 08 - 11:24 MST" },
          { name: "Pre-load Trailer Telematics Core Verified", status: "complete", date: "June 09 - 09:12 MST" },
          { name: "Departed West-Core Los Angeles Hub", status: "complete", date: "June 09 - 14:00 MST" },
          { name: "Active Mid-State Highway Transit", status: "active", date: " Columbus, OH // Eastbound" },
          { name: "Est. New York Port Intake Terminal", status: "pending", date: "Jun 12 - 18:30 EST" },
        ],
      });
    }, 1200);
  };

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Decorative vertical blueprint lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#f97316] mb-4">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="text-white">Active Load Telemetry</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
            Satellite Dispatch Radar
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-none mb-6">
            REALTIME SHIPMENT TRACKING.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light font-sans">
            Skyhaul Transit LLC integrates GPS and transponder networks to provide continuous cargo tracing. Input your unique Tracking ID to verify current highway position coordinates, ELD driver status, and cooling temperatures.
          </p>
        </div>

        {/* Input Matrix */}
        <div ref={containerRef} className="max-w-xl mb-12">
          <form onSubmit={handleSearch} className="flex h-12 border border-white/10 rounded-sm overflow-hidden bg-neutral-900/40 p-1">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. TRK-492-990-21"
              className="flex-1 bg-transparent px-4 font-mono text-xs text-white focus:outline-none placeholder-neutral-600 focus:placeholder-transparent"
              aria-label="Tracking ID"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 bg-white text-black font-bold text-[10px] uppercase tracking-widest hover:bg-orange-500 hover:text-black transition-colors duration-300 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Locking GPS...
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  Track Load
                </>
              )}
            </button>
          </form>
          <span className="text-[9px] font-mono text-neutral-500 uppercase mt-2.5 block tracking-widest">
            Try querying standard code <span className="text-orange-500/80 font-bold font-mono">TRK-492-990-21</span>
          </span>
        </div>

        {/* Output Panel Layout */}
        <AnimatePresence mode="wait">
          
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 rounded-sm bg-red-950/20 border border-red-500/20 max-w-xl text-xs flex items-center gap-3 font-mono text-red-200 uppercase"
            >
              <AlertTriangle className="w-5 h-5 text-red-500 font-bold" />
              <div>
                <span className="block font-bold">Query Failure // MANIFEST_NOT_FOUND</span>
                <span className="text-[10px] text-neutral-500 font-light lowercase">the server could not resolve the specified parameter key. verify characters or contact chicago dispatch.</span>
              </div>
            </motion.div>
          )}

          {searchedData && !showError && (
            <motion.div
              key={searchedData.code}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-900/20 border border-white/5 p-6 sm:p-8 rounded-sm relative"
            >
              
              {/* Telemetry info left */}
              <div className="lg:col-span-4 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-8">
                <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-widest text-[#f97316] font-bold">
                  <Compass className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: "12s" }} />
                  ACTIVE GPS SATELLITE ROAD LOCK
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Registered Tracking ID</span>
                  <span className="text-xl font-bold text-white font-mono">{searchedData.code}</span>
                </div>

                <div className="flex flex-col gap-1.5 font-mono text-[10px] bg-black/50 border border-white/5 p-3.5 rounded-sm">
                  <div className="flex justify-between text-neutral-400">
                    <span>Active Chassis:</span>
                    <span className="text-white font-bold">{searchedData.truckId.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 mt-1">
                    <span>GPS Telemetry Speed:</span>
                    <span className="text-orange-500 font-bold">{searchedData.speed}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400 mt-1">
                    <span>Internal Temperature:</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Snowflake className="w-3 h-3 text-sky-400" />
                      {searchedData.temperature.split("Ambient: ")[1]}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 uppercase leading-relaxed font-light">
                  <span className="block font-bold text-neutral-400 mt-2">Cargo Manifest Parameters:</span>
                  <span className="block mt-1">Shipper: {searchedData.shipper}</span>
                  <span>Gross weight: {searchedData.loadWeight}</span>
                </div>

                <div className="font-mono text-[9px] text-neutral-500 mt-2 uppercase border-t border-white/5 pt-3">
                  regulatory: {searchedData.driverStatus}
                </div>
              </div>

              {/* Progress & Timeline right */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className="mb-6 flex flex-col gap-1 border-b border-white/5 pb-4">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Dynamic Routing Highway Corridor</span>
                  <span className="text-sm sm:text-base font-bold uppercase tracking-wide text-white">{searchedData.route}</span>
                  <span className="text-[11px] font-light text-neutral-400 leading-relaxed mt-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Latest Coordinate Log: <span className="font-bold text-neutral-100">{searchedData.currentPosition}</span>
                  </span>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase mb-2">
                    <span>Origin Port</span>
                    <span>Consignee Receiver Intake</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-orange-500 transition-all duration-1000"
                      style={{ width: `${searchedData.percentageCompleted}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono mt-2.5">
                    <span className="text-neutral-500 uppercase">Transit Corridor Span resolved:</span>
                    <span className="text-orange-500 font-bold">{searchedData.percentageCompleted}% Resolves</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4 font-mono text-[11px]">
                  {searchedData.statusSteps.map((step: any, index: number) => {
                    const isComplete = step.status === "complete";
                    const isActive = step.status === "active";

                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center mt-1">
                          <div
                            className={`w-2 h-2 rounded-full border transition-transform ${
                              isComplete
                                ? "bg-orange-500 border-orange-500"
                                : isActive
                                ? "bg-[#050505] border-orange-500 scale-125 animate-pulse"
                                : "bg-neutral-900 border-neutral-800"
                            }`}
                          />
                          {index < searchedData.statusSteps.length - 1 && (
                            <div className={`w-px h-6 mt-1 ${isComplete ? "bg-orange-500" : "bg-neutral-800"}`} />
                          )}
                        </div>

                        <div className="flex-1 flex justify-between items-center flex-wrap gap-2">
                          <span
                            className={
                              isComplete
                                ? "text-neutral-300 font-normal line-through"
                                : isActive
                                ? "text-orange-500 font-extrabold"
                                : "text-neutral-500 font-light"
                            }
                          >
                            {step.name}
                          </span>
                          <span className={`text-[10px] ${isActive ? "text-orange-500 font-bold" : "text-neutral-500"}`}>
                            {step.date}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
