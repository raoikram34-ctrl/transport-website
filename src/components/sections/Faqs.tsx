"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Radio, Fuel, ShieldCheck, Clock, Layers } from "lucide-react";
import GSAPScrollReveal from "../widgets/GSAPScrollReveal";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ComponentType<any>;
}

const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What heavy carrier security bonds does Skyhaul maintain?",
    answer:
      "We maintain fully underwritten cargo liability coverage totaling $1,000,500 per transit unit ensuring full replacement protection across all freight categories including refrigerated and aerospace cargo.",
    category: "Safety & Compliance",
    icon: ShieldCheck,
  },
  {
    id: "faq-2",
    question: "How do you coordinate team driver relays to prevent delays?",
    answer:
      "We operate dual-driver relay systems on high-priority lanes enabling near-continuous movement across interstate corridors while maintaining full HOS compliance and safety standards.",
    category: "Operations",
    icon: Clock,
  },
  {
    id: "faq-3",
    question: "How does real-time satellite tracking work?",
    answer:
      "Each asset is equipped with ELD-based telemetry systems reporting live location, temperature, and cargo integrity metrics every few seconds through redundant data channels.",
    category: "Technology",
    icon: Radio,
  },
  {
    id: "faq-4",
    question: "Do you offer smart green routing or emissions tracking?",
    answer:
      "Yes. Our predictive routing engine reduces fuel burn and deadhead mileage while generating automated carbon reporting for enterprise sustainability audits.",
    category: "Technology",
    icon: Fuel,
  },
  {
    id: "faq-5",
    question: "What is your cross-dock turnaround protocol?",
    answer:
      "Our automated terminal systems enable rapid unloading and consolidation operations with average turnaround times under 45 minutes across major hubs.",
    category: "Operations",
    icon: Layers,
  },
];

export default function Faqs() {
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Operations", "Technology", "Safety & Compliance"];

  const filtered =
    activeCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  return (
    <section className="relative py-28 bg-[#060607] border-t border-white/5 overflow-hidden">
      {/* background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.08),transparent_40%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.04),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* HEADER */}
        <GSAPScrollReveal
          effect="slide-up"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.35em] text-orange-505 text-orange-500 font-mono uppercase">
              Knowledge Base
            </p>

            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-white leading-tight">
              Frequently Asked Questions
            </h2>

            <p className="mt-5 text-sm text-neutral-400 leading-relaxed">
              Clear answers about logistics operations, compliance, tracking
              systems, and enterprise freight infrastructure.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 border border-white/10 bg-white/5 px-4 py-2 rounded-full">
            <HelpCircle className="w-4 h-4 text-orange-500" />
            Live Support Knowledge Base
          </div>
        </GSAPScrollReveal>

        {/* CATEGORY FILTER */}
        <GSAPScrollReveal effect="fade" delay={0.1} className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] font-mono uppercase tracking-wider border rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-orange-500/10 border-orange-500 text-white"
                  : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </GSAPScrollReveal>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT PANEL */}
          <GSAPScrollReveal effect="slide-right" className="lg:col-span-4">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                Support Channel
              </p>

              <h3 className="mt-3 text-lg font-semibold text-white">
                24/7 Dispatch Assistance
              </h3>

              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                For enterprise logistics queries, our dispatch coordination
                team is available around the clock.
              </p>

              <div className="mt-6 space-y-3 text-[10px] font-mono">
                <div className="flex justify-between p-3 rounded-lg bg-black/30 border border-white/10">
                  <span className="text-neutral-400">Phone</span>
                  <span className="text-white">(800) 555-PLAN</span>
                </div>

                <div className="flex justify-between p-3 rounded-lg bg-black/30 border border-white/10">
                  <span className="text-neutral-400">Email</span>
                  <span className="text-orange-400">
                    dispatch@skyhaul.com
                  </span>
                </div>
              </div>
            </div>
          </GSAPScrollReveal>

          {/* RIGHT FAQ */}
          <GSAPScrollReveal effect="slide-left" stagger={0.1} className="lg:col-span-8 space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((faq) => {
                const isOpen = openId === faq.id;
                const Icon = faq.icon;

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    className={`rounded-2xl border overflow-hidden transition-all ${
                      isOpen
                        ? "border-orange-500/30 bg-white/[0.03]"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    {/* QUESTION */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-2 rounded-lg border ${
                            isOpen
                              ? "border-orange-500/20 text-orange-500 bg-orange-500/5"
                              : "border-white/10 text-neutral-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div>
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                            {faq.category}
                          </p>
                          <p className="text-sm font-medium text-white mt-1">
                            {faq.question}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen
                            ? "rotate-180 text-orange-500"
                            : "text-neutral-500"
                        }`}
                      />
                    </button>

                    {/* ANSWER */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="px-5 pb-5"
                        >
                          <div className="pt-3 pl-12 text-sm text-neutral-400 leading-relaxed border-t border-white/10">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            </GSAPScrollReveal>
          </div>
        </div>
      </section>
  );
}