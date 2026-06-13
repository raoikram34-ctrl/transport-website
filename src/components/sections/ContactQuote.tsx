import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, ArrowRight, ShieldCheck, Mail, Map, FileText, CheckCircle2, DollarSign } from "lucide-react";
import { City } from "../../types";

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

export default function ContactQuote() {
  const [origin, setOrigin] = useState("Los Angeles, CA");
  const [destination, setDestination] = useState("Chicago, IL");
  const [freightType, setFreightType] = useState("ftl");
  const [weight, setWeight] = useState(36000);
  const [calculatedQuote, setCalculatedQuote] = useState<any | null>(null);
  
  // Dispatch Status State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [shipperEmail, setShipperEmail] = useState("");
  const [shipperCompany, setShipperCompany] = useState("");

  const calculateDistance = (oName: string, dName: string): number => {
    const oCity = CITIES.find(c => `${c.name}, ${c.state}` === oName);
    const dCity = CITIES.find(c => `${c.name}, ${c.state}` === dName);
    if (!oCity || !dCity) return 980; // fallback standard miles

    // Simple lat/long Euclidean approximations multiplied to make realistic road mileage
    const dy = (oCity.lat - dCity.lat) * 69; // 1 degree latitude ~= 69 miles
    const dx = (oCity.lng - dCity.lng) * 53; // 1 degree longitude at US levels ~= 53 miles
    const straightLine = Math.sqrt(dx * dx + dy * dy);
    
    // Road mileage is roughly 1.25x straight-line distance
    return Math.round(straightLine * 1.25);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin === destination) {
      alert("Origin and destination terminals must be unique.");
      return;
    }

    const miles = calculateDistance(origin, destination);
    
    // Realistic logistics cost calculation formula
    // Base rate per mile based on equipment type
    let ratePerMile = 2.45; // standard FTL
    let baseSurcharge = 350; // Terminal loading surcharge
    
    if (freightType === "reefer") {
      ratePerMile = 3.10; // reefers use high fuel/operational budgets
      baseSurcharge = 500;
    } else if (freightType === "ltl") {
      ratePerMile = 0.95; // shared loads are cheaper per individual shipper
      baseSurcharge = 150;
    }

    // Weight multiplier surcharge (heavier loads reduce truck fuel efficiencies)
    const weightFactor = weight / 45000;
    const freightCost = (miles * ratePerMile) + baseSurcharge + (weightFactor * 250);
    const cleanCost = Math.round(freightCost);

    // Calculate realistic transit duration
    // Standard driver can operate max 11 hours (approx 550 - 600 miles) daily
    const hoursNeeded = miles / 55; // avg hwy speed 55mph accounting for log checks
    const transitDays = Math.max(1, Math.ceil(hoursNeeded / 11));

    setCalculatedQuote({
      miles,
      cost: cleanCost,
      transitDays,
      ratePerMile,
      fuelSurcharge: Math.round(miles * 0.42), // approximate fuel surcharges
    });
  };

  const handleBookDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipperEmail) {
      alert("A valid enterprise email is required.");
      return;
    }
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0c] border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[#050505]/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Grid: Explanations + calculated outcomes readout */}
        <div className="lg:col-span- così lg:col-span-6 flex flex-col justify-center">
          
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-500 font-bold block mb-2">
            Pricing Calculation
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-white tracking-tight leading-none mb-6">
            INSTANT COST ESTIMATOR.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-8">
            TitanFreight uses transparent market index pricing parameters. Specify origin, cargo weight, and trailer variables below to generate a reliable freight transport bracket instantly.
          </p>

          <AnimatePresence mode="wait">
            {!calculatedQuote ? (
              <motion.div
                key="quote-guide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 rounded-sm bg-neutral-900/40 border border-white/5 flex flex-col gap-4 font-mono text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed select-none"
              >
                <div className="flex items-center gap-3">
                  <Calculator className="w-5 h-5 text-orange-550 text-orange-400" />
                  <span>Interactive Pricing Terminal Standby</span>
                </div>
                <span>Specify shipping details in the selector core to forecast costs, regional road mileage, estimated transit schedules, and fuel indexes.</span>
              </motion.div>
            ) : (
              <motion.div
                key="quote-result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6 p-6 rounded-sm bg-neutral-900 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Calculated Rate Bracket</span>
                  <span className="text-[9px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm uppercase tracking-widest font-bold">
                    Index Secured
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight flex items-center">
                    <DollarSign className="w-6 h-6 text-orange-500 self-center" />
                    {calculatedQuote.cost.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono uppercase tracking-wider">U.S.D Gross Est.</span>
                </div>

                {/* Sub specs breakdown */}
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase">
                  <div className="bg-neutral-950 p-2.5 rounded-sm border border-white/5">
                    <span className="block text-neutral-500">Route Highway Span</span>
                    <span className="text-white font-bold block mt-0.5">{calculatedQuote.miles} Road Miles</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-sm border border-white/5">
                    <span className="block text-neutral-500">Est. Transit Time</span>
                    <span className="text-[#f97316] font-bold block mt-0.5">{calculatedQuote.transitDays} {calculatedQuote.transitDays === 1 ? 'Day' : 'Days'} Drive</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-sm border border-white/5">
                    <span className="block text-neutral-500">Market Class Base</span>
                    <span className="text-white font-bold block mt-0.5">${calculatedQuote.ratePerMile} / Mile</span>
                  </div>
                  <div className="bg-neutral-950 p-2.5 rounded-sm border border-white/5">
                    <span className="block text-neutral-500">ELD Surcharge Inc.</span>
                    <span className="text-white font-bold block mt-0.5">${calculatedQuote.fuelSurcharge} USD</span>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 uppercase">
                  *Rate subject to regional fuel price index fluctuatons at time of pickup scheduling. Standard $1,000,000 carrier insurance bound in quote.
                </div>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick info badges */}
          <div className="mt-8 flex flex-col gap-3 font-mono text-[10px] text-neutral-500 uppercase">
            <div className="flex items-center gap-2"><Map className="w-4 h-4 text-orange-500" /> Precision interstate mapping coordinates synced with DOT regulations</div>
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-500" /> Transparent tariffs — No hidden detention or fuel dock broker fees</div>
          </div>

        </div>

        {/* Right Grid: Form Input Matrix */}
        <div className="lg:col-span- così lg:col-span-6 bg-neutral-900/20 border border-white/5 p-6 sm:p-8 rounded-sm">
          
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#f97316] font-bold block mb-6">
            Dispatch Configuration
          </span>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.div key="quote-inputs">
                <form onSubmit={handleCalculate} className="flex flex-col gap-5">
                  
                  {/* Origin selection details */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Origin Terminal</label>
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-orange-500 rounded-sm font-sans"
                    >
                      {CITIES.map((c) => (
                        <option key={`orig-${c.name}`} value={`${c.name}, ${c.state}`}>{c.name}, {c.state}</option>
                      ))}
                    </select>
                  </div>

                  {/* Destination selection details */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Destination Terminal</label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-orange-500 rounded-sm font-sans"
                    >
                      {CITIES.map((c) => (
                        <option key={`dest-${c.name}`} value={`${c.name}, ${c.state}`}>{c.name}, {c.state}</option>
                      ))}
                    </select>
                  </div>

                  {/* Freight details selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Class / Equipment</label>
                      <select
                        value={freightType}
                        onChange={(e) => setFreightType(e.target.value)}
                        className="h-10 px-3 bg-neutral-950 border border-white/10 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-orange-500 rounded-sm"
                      >
                        <option value="ftl">FTL (53' Dry Van)</option>
                        <option value="reefer">Refrigerated (Thermo)</option>
                        <option value="ltl">LTL (Staged Cargo)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono text-neutral-500 uppercase font-bold">Est. Weight (lbs)</label>
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
                    className="w-full h-12 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-orange-500 transition-colors duration-300 mt-2 flex items-center justify-center gap-2 cursor-pointer rounded-xs text-center"
                  >
                    Generate Estimate Bracket
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>

                {/* Sub Booking Form which gets presented if quote is calculated */}
                {calculatedQuote && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-4"
                  >
                    <span className="block text-[10px] font-mono text-neutral-500 uppercase font-bold">Lock this dispatch lane</span>
                    <form onSubmit={handleBookDispatch} className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={shipperCompany}
                          onChange={(e) => setShipperCompany(e.target.value)}
                          placeholder="Corporate Name"
                          className="h-9 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none placeholder-neutral-600 focus:placeholder-neutral-500 rounded-sm"
                        />
                        <input
                          type="email"
                          required
                          value={shipperEmail}
                          onChange={(e) => setShipperEmail(e.target.value)}
                          placeholder="Shipper Corporate Email"
                          className="h-9 px-3 bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none placeholder-neutral-600 focus:placeholder-neutral-500 rounded-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-orange-500 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-colors cursor-pointer rounded-sm"
                      >
                        Submit Manifest for Booking Review
                      </button>
                    </form>
                  </motion.div>
                )}

              </motion.div>
            ) : (
              <motion.div
                key="quote-complete"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-900/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-500">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                  Manifest Transmitted
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mt-3 leading-relaxed font-light">
                  Our regional route planning officers have received your parameters at Arizona HQ. A verified contract rate will be sent to <span className="font-bold text-white">{shipperEmail}</span> within 15 minutes.
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
                  Calculate Another Lane
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
