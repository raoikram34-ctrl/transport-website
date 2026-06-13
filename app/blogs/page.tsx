"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, User, Eye, ArrowRight, Search, ArrowLeft } from "lucide-react";
import { BLOGS_DATA } from "@/data/blogsData";

const CATEGORIES = [
  { value: "ALL", label: "All Insights" },
  { value: "LOGISTICS_TECH", label: "Logistics Tech" },
  { value: "COMPLIANCE", label: "Compliance & Safety" },
  { value: "OPERATIONS", label: "Operations" },
  { value: "INDUSTRY_TRENDS", label: "Industry Trends" }
];

export default function BlogsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return BLOGS_DATA.filter((post) => {
      const matchesCategory = selectedCategory === "ALL" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Background ambient light */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-12 w-[400px] h-[400px] bg-neutral-900/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative vertical grid lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/[0.02] pointer-events-none hidden sm:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/[0.02] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Navigation Breadcrumbs / Title */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#f97316] mb-4">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="text-white">Blogs & Insights</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-orange-505 text-orange-500 font-bold block mb-3">
            Knowledge Center
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-bold text-white tracking-tight leading-none uppercase">
            The Dispatch Memo.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            Stay up to date with the latest industry regulations, weather-routing technologies, intermodal operations, and 3PL freight capacity insights straight from our team.
          </p>
        </div>

        {/* Toolbar: Search and Filter */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-white/5 pb-8 mb-12">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider rounded-xs cursor-pointer transition-all border ${
                    isActive
                      ? "bg-white text-black border-white font-bold"
                      : "bg-[#0a0a0c]/80 text-neutral-400 border-white/5 hover:text-white hover:border-orange-500/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 bg-neutral-900/40 border border-white/5 rounded-xs pl-10 pr-4 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

        </div>

        {/* Blogs Catalog Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  onClick={() => router.push(`/blogs/${post.id}`)}
                  className="group relative rounded-sm overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  {/* Decorative corner lines */}
                  <span className="absolute top-0 left-0 w-8 h-px bg-transparent group-hover:bg-orange-500 transition-all duration-300" />
                  <span className="absolute top-0 left-0 w-px h-8 bg-transparent group-hover:bg-orange-500 transition-all duration-300" />

                  {/* IMAGE */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 text-[9px] font-mono uppercase tracking-wider text-orange-400 bg-black/60 border border-white/10 px-2 py-1 rounded-sm backdrop-blur">
                        {post.category.replace("_", " ")}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex flex-col gap-4">
                      {/* Meta */}
                      <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-orange-500" />
                          {post.author}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-white text-base font-semibold leading-snug group-hover:text-orange-400 transition-colors uppercase tracking-wide">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 mt-auto">
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[9px] font-mono text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-neutral-650" />
                        {post.views}
                      </span>
                      <span className="text-orange-400 font-bold uppercase tracking-widest flex items-center gap-1">
                        {post.readTime} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 border border-dashed border-white/10 rounded-sm bg-neutral-900/10 font-mono"
            >
              <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">No Articles Matched Your Search</p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-[10px] text-orange-500 hover:underline cursor-pointer uppercase font-bold"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
