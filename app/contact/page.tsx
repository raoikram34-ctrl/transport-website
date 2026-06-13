"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, ArrowRight, ShieldCheck, Map, Phone, Mail, Building, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { City } from "@/types/index";
import { useRouter } from "next/navigation";

// Core cities with coordinates for mathematical distance/transit/price calculations
const CITIES: City[] = [
  { name: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321 },
  { name: "Los Angeles", state: "CA", lat: 34.0522, lng: -118.2437 },
  { name: "Phoenix", state: "AZ", lat: 33.4484, lng: -112.0740 },
  { name: "Dallas", state: "TX", lat: 32.7767, lng: -96.7970 },
  { name: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298 },
  { name: "New York", state: "NY", lat: 40.7128, lng: -74.0060 },
  { name: "Miami", state: "FL", lat: 25.7617, lng: -80.1918 },
];

const OFFICE_TERMINALS = [
  {
    name: "Chicago Corporate Terminal HQ",
    address: "2400 Interstate Corridor Way, Chicago, IL 60601",
    tel: "+1 (800) 555-0190",
    hours: "24/7 Dispatch Desk Active",
  },
  {
    name: "Phoenix Southwest Hub",
    address: "4820 S. Desert Highway, Phoenix, AZ 85001",
    tel: "+1 (800) 555-0192",
    hours: "06:00 - 22:00 MST",
  },
  {
    name: "Seattle Northwest Port",
    address: "112 Sound Terminal Overlook, Seattle, WA 98101",
    tel: "+1 (800) 555-0195",
    hours: "07:00 - 19:00 PST",
  },
];

export default function Contact() {
  const router = useRouter();
  // Estimator States
  const [origin, setOrigin] = useState("Los Angeles, CA");
  const [destination, setDestination] = useState("Chicago, IL");
  const [freightType, setFreightType] = useState("ftl");
  const [weight, setWeight] = useState(36000);
  const [calculatedQuote, setCalculatedQuote] = useState<any | null>(null);
  
  // Booking status state
  const [shipperEmail, setShipperEmail] = useState("");
  const [shipperCompany, setShipperCompany] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Simple lat/long road distance approximations
  const calculateDistance = (oName: string, dName: string): number => {
    const oCity = CITIES.find(c => `${c.name}, ${c.state}` === oName);
    const dCity = CITIES.find(c => `${c.name}, ${c.state}` === dName);
    if (!oCity || !dCity) return 980; // fallback standard 

    const dy = (oCity.lat - dCity.lat) * 69;
    const dx = (oCity.lng - dCity.lng) * 53;
    const straightLine = Math.sqrt(dx * dx + dy * dy);
    return Math.round(straightLine * 1.25);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin === destination) {
      alert("Origin and destination terminals must be unique.");
      return;
    }

    const miles = calculateDistance(origin, destination);
    
    // Core transport market rates formulas
    let ratePerMile = 2.45; // standard dry van FTL
    let baseSurcharge = 350;
    
    if (freightType === "reefer") {
      ratePerMile = 3.10;
      baseSurcharge = 500;
    } else if (freightType === "ltl") {
      ratePerMile = 0.95;
      baseSurcharge = 150;
    }

    const weightFactor = weight / 45000;
    const cost = Math.round((miles * ratePerMile) + baseSurcharge + (weightFactor * 250));
    const transitDays = Math.max(1, Math.ceil((miles / 55) / 11));

    setCalculatedQuote({
      miles,
      cost,
      transitDays,
      ratePerMile,
      fuelSurcharge: Math.round(miles * 0.42),
    });
  };

  const handleBookDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipperEmail || !shipperCompany) {
      alert("Please enter both Company name and Enterprise email.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Decorative vertical blueprint lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/[0.01] pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/[0.01] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#f97316] mb-4">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="text-white">Contact & Quoting Terminal</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-3">
            Interstate Dispatch Terminal
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-medium text-white tracking-tight leading-none mb-6">
            CONNECT WITH DISPATCH HQ.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Have cargo that needs hauling? Submit your road parameters to calculate an instant cost estimate bracket below, or call our 24/7 central Chicago command line.
          </p>
        </div>

        {/* Two Columns Grid: Estimator form vs Terminal HQ lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Instant Estimator Portal */}
          <div className="lg:col-span- così lg:col-span-7 bg-neutral-900/10 border border-white/5 p-6 sm:p-8 rounded-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-orange-500 font-bold block mb-6">
              Pricing Estimation Engine
            </span>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div key="contact-quote-matrix">
                  <form onSubmit={handleCalculate} className="flex flex-col gap-5">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Origin */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Origin Terminal</label>
                        <select
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-orange-500 rounded-sm font-sans"
                        >
                          {CITIES.map((c) => (
                            <option key={`orig-${c.name}`} value={`${c.name}, ${c.state}`}>{c.name}, {c.state}</option>
                          ))}
                        </select>
                      </div>

                      {/* Destination */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Destination Terminal</label>
                        <select
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white uppercase focus:outline-none focus:border-orange-500 rounded-sm font-sans"
                        >
                          {CITIES.map((c) => (
                            <option key={`dest-${c.name}`} value={`${c.name}, ${c.state}`}>{c.name}, {c.state}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Class */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Trailer Type</label>
                        <select
                          value={freightType}
                          onChange={(e) => setFreightType(e.target.value)}
                          className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-[#F5F5F5] focus:outline-none focus:border-orange-500 rounded-sm font-sans"
                        >
                          <option value="ftl">Dry Van (53ft Air Ride)</option>
                          <option value="reefer">Refrigerated (Thermo)</option>
                          <option value="ltl">Staged Cargo (LTL)</option>
                        </select>
                      </div>

                      {/* Weight */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-mono text-neutral-500 uppercase font-bold">Est. Payload (lbs)</label>
                        <input
                          type="number"
                          min="1"
                          max="48000"
                          value={weight}
                          onChange={(e) => setWeight(parseInt(e.target.value) || 0)}
                          className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-orange-500 rounded-sm font-sans"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full h-11 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-colors mt-2"
                    >
                      Calculate Instant Route Bracket
                    </button>
                  </form>

                  {calculatedQuote && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-6 border-t border-white/5 space-y-6"
                    >
                      <div className="bg-neutral-950 p-5 rounded-sm border border-white/10 flex flex-col gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 uppercase">
                          <span>Calculated Cost bracket</span>
                          <span className="text-emerald-400">Market index locked</span>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-display font-bold text-white flex items-center">
                            <DollarSign className="w-5 h-5 text-orange-500 self-center" />
                            {calculatedQuote.cost.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500 uppercase">Est. Gross U.S.D</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase">
                          <div className="bg-neutral-900/60 p-2 border border-white/5">
                            <span className="text-neutral-500 block">Span Highway Miles</span>
                            <span className="text-white font-bold block">{calculatedQuote.miles} road miles</span>
                          </div>
                          <div className="bg-neutral-900/60 p-2 border border-white/5">
                            <span className="text-neutral-500 block">Est Drive duration</span>
                            <span className="text-orange-500 font-bold block">{calculatedQuote.transitDays} drive days</span>
                          </div>
                        </div>
                      </div>

                      {/* Lock the rate sub-form */}
                      <form onSubmit={handleBookDispatch} className="space-y-3">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase font-bold">Lock this dispatch lane with Chicago Dispatch</span>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Corporate Shipper Name"
                            value={shipperCompany}
                            onChange={(e) => setShipperCompany(e.target.value)}
                            className="h-9 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none placeholder-neutral-700 rounded-sm font-sans"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Enterprise Email address"
                            value={shipperEmail}
                            onChange={(e) => setShipperEmail(e.target.value)}
                            className="h-9 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none placeholder-neutral-700 rounded-sm font-sans"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2.5 bg-orange-500 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors cursor-pointer rounded-xs"
                        >
                          Submit Manifest for Booking Review
                        </button>
                      </form>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase">
                    Route Manifest Staged
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mt-3 font-light">
                    Our regional routes coordinator at Chicago Core Terminal has received your dispatch bounds. We will verify weather indexes and dispatch driver availability, sending a clean locked agreement contract to <span className="text-white font-bold">{shipperEmail}</span> under 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setCalculatedQuote(null);
                      setShipperEmail("");
                      setShipperCompany("");
                    }}
                    className="mt-6 text-[10px] font-mono text-orange-500 uppercase tracking-widest hover:underline cursor-pointer"
                  >
                    Estimate another transit lane
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Terminal HQ Addresses & support details */}
          <div className="lg:col-span-così lg:col-span-5 space-y-6">
            
            <div className="bg-neutral-900/10 border border-white/5 p-6 rounded-sm">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-4">Central Dispatch Lines</span>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-neutral-950 border border-white/5 text-orange-550 rounded-sm text-[#f97316]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">24/7 Command Call Line</span>
                    <a href="tel:18005550190" className="text-xs font-bold text-white hover:text-orange-500 transition-colors uppercase">
                      +1 (800) 555-0190 (Skyhaul Line)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-neutral-950 border border-white/5 text-orange-550 rounded-sm text-[#f97316]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase">Brokerage Operations Email</span>
                    <a href="mailto:dispatch@skyhaultransit.com" className="text-xs font-bold text-white hover:text-orange-500 transition-colors">
                      dispatch@skyhaultransit.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* list of Office Terminals */}
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold tracking-widest">Authorized Logistics Terminals</span>
            <div className="space-y-4">
              {OFFICE_TERMINALS.map((t, idx) => (
                <div key={idx} className="bg-neutral-950 border border-white/5 p-4 rounded-sm font-mono text-[11px] uppercase">
                  <div className="flex items-center gap-2 text-white font-bold mb-1">
                    <Building className="w-3.5 h-3.5 text-orange-500" />
                    <span>{t.name}</span>
                  </div>
                  <span className="text-neutral-500 block text-[10px] normal-case mt-0.5">{t.address}</span>
                  <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-white/5 text-[10px] text-neutral-400">
                    <span>{t.tel}</span>
                    <span className="text-orange-500 text-[9px] font-bold">{t.hours}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
