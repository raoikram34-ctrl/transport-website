import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Search, Loader2, Compass, ShieldCheck, MapPin, Truck, AlertTriangle, Snowflake } from "lucide-react";

export default function TrackingWidget() {
  const [trackingId, setTrackingId] = useState("TRK-492-990-21");
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState<any | null>(null);
  const [showError, setShowError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setLoading(true);
    setShowError(false);
    setSearchedData(null);

    setTimeout(() => {
      setLoading(false);
      // Let's create realistic tracking options
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
    }, 1200); // 1.2s realistic network animation
  };

  // Perform initial search on mount so there is ready content
  useState(() => {
    // Populate default payload
    setSearchedData({
      code: "TRK-492-990-21",
      shipper: "Vanguard TitanFreight Logistics",
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
  });

  return (
    <section id="tracking-widget" className="relative py-20 bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[#0c0c0e]/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Title Grid */}
        <div className="max-w-2xl mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
            Asset Tracking Terminal
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight leading-none">
            REALTIME SHIPMENT TELEMETRY.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-450 text-neutral-450 text-neutral-450 text-neutral-400 mt-3 font-light">
            Shippers can query live telemetry logs directly. Input your tracking code to read active GPS positions, truck speeds, temperature lock, and driver compliance parameters.
          </p>
        </div>

        {/* Search Field Controls */}
        <div ref={containerRef} className="max-w-xl mb-10">
          <form onSubmit={handleSearch} className="flex h-12 border border-white/10 rounded-sm overflow-hidden bg-neutral-900/60 p-1">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="e.g. TRK-492-990-21"
              className="flex-1 bg-transparent px-4 font-mono text-xs text-white focus:outline-none placeholder-neutral-600 focus:placeholder-transparent"
              aria-label="Tracking ID input"
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

        {/* Tracking readout panel */}
        <AnimatePresence mode="wait">
          
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-5 rounded-sm bg-red-950/20 border border-red-500/20 max-w-xl text-xs flex items-center gap-3 font-mono text-red-200 uppercase"
            >
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <span className="block font-bold">Trace Failure Code // NOT_FOUND</span>
                <span className="text-[10px] text-neutral-500">The server could not match the specified parameter key. Confirm characters or try the default.</span>
              </div>
            </motion.div>
          )}

          {searchedData && !showError && (
            <motion.div
              key={searchedData.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-900/30 border border-white/5 p-6 sm:p-8 rounded-sm rounded-ee-sm relative hover:border-white/10 transition-colors"
            >
              
              {/* Active Radar telemetry graphic (Left Panel) */}
              <div id="tracking-stats" className="lg:col-span-4 flex flex-col gap-5 border-b lg:border-b-0 lg:border-r border-white/5 pb-6 lg:pb-0 lg:pr-8">
                
                <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-widest text-[#f97316]">
                  <Compass className="w-4 h-4 text-orange-500 animate-spin" style={{ animationDuration: "12s" }} />
                  ACTIVE GPS BROADCAST LOCK
                </div>

                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Load Reference ID</span>
                  <span className="text-xl font-bold text-white font-mono">{searchedData.code}</span>
                </div>

                <div className="flex flex-col gap-1.5 font-mono text-[10px] bg-black/40 border border-white/5 p-3 rounded-sm">
                  <div className="flex justify-between text-neutral-450 text-neutral-400">
                    <span>Assigned Tractor:</span>
                    <span className="text-white font-bold">{searchedData.truckId.split(" ")[0]}</span>
                  </div>
                  <div className="flex justify-between text-neutral-455 text-neutral-400 mt-1">
                    <span>Estimated Speed:</span>
                    <span className="text-[#f97316] font-bold">{searchedData.speed}</span>
                  </div>
                  <div className="flex justify-between text-neutral-455 text-neutral-400 mt-1">
                    <span>Ambient Temp:</span>
                    <span className="text-white font-bold flex items-center gap-1">
                      <Snowflake className="w-3 h-3 text-sky-400" />
                      {searchedData.temperature.split("Ambient: ")[1]}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 uppercase leading-relaxed font-light">
                  <span className="block font-bold text-neutral-350">Operational Manifest:</span>
                  <span className="block mt-1">Shipper name: {searchedData.shipper}</span>
                  <span>Payload index: {searchedData.loadWeight}</span>
                </div>

                <div className="font-mono text-[9px] text-neutral-500 mt-2 uppercase border-t border-white/5 pt-3">
                  ELD Log: {searchedData.driverStatus}
                </div>

              </div>

              {/* Status Path Progress (Right Panel) */}
              <div id="tracking-timeline" className="lg:col-span-8 flex flex-col justify-between">
                
                {/* Route Header */}
                <div className="mb-6 flex flex-col gap-1.5 border-b border-white/5 pb-4">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Dynamic Freight Lane Corridor</span>
                  <span className="text-sm font-bold uppercase tracking-wide text-white">{searchedData.route}</span>
                  <span className="text-[11px] font-light text-neutral-400 leading-relaxed mt-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Current Position: <span className="font-bold text-neutral-100">{searchedData.currentPosition}</span>
                  </span>
                </div>

                {/* Progress Bar slider */}
                <div className="mb-8 select-none">
                  <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase mb-2">
                    <span>Outbound Port</span>
                    <span>Intake Destination Terminal</span>
                  </div>
                  <div className="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-orange-500 transition-all duration-1000"
                      style={{ width: `${searchedData.percentageCompleted}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono mt-2.5">
                    <span className="text-neutral-500 uppercase">Transit Completion Rate:</span>
                    <span className="text-orange-500 font-bold">{searchedData.percentageCompleted}% Dist. Resolved</span>
                  </div>
                </div>

                {/* Vertical interactive timeline steps */}
                <div className="flex flex-col gap-4 font-mono text-[11px]">
                  {searchedData.statusSteps.map((step: any, index: number) => {
                    const isComplete = step.status === "complete";
                    const isActive = step.status === "active";

                    return (
                      <div key={index} className="flex items-start gap-4">
                        {/* Timeline node */}
                        <div className="flex flex-col items-center mt-1">
                          <div
                            className={`w-2.5 h-2.5 rounded-full border transition-transform ${
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

                        {/* Step Details */}
                        <div className="flex-1 flex justify-between items-center flex-wrap gap-2">
                          <span
                            className={
                              isComplete
                                ? "text-neutral-300 font-normal line-through"
                                : isActive
                                ? "text-orange-500 font-extrabold"
                                : "text-neutral-600 font-light"
                            }
                          >
                            {step.name}
                          </span>
                          <span className={`text-[10px] ${isActive ? "text-orange-555 text-orange-500 font-bold" : "text-neutral-500"}`}>
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
    </section>
  );
}
