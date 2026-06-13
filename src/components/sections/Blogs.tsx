"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { BookOpen, Calendar, User, Eye, ArrowRight } from "lucide-react";
import GSAPScrollReveal from "../widgets/GSAPScrollReveal";
import { useRouter } from "next/navigation";
import { BLOGS_DATA } from "@/data/blogsData";


export default function Blogs() {
  const router = useRouter();

  return (
    <section
      id="blogs"
      className="relative py-28 bg-[#07070a] border-t border-white/5 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.08),transparent_45%)]" />

      

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.04),transparent_45%)]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* HEADER */}
        <GSAPScrollReveal
          effect="slide-up"
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] tracking-[0.35em] text-orange-505 text-orange-500 font-mono uppercase">
              Insight & Analytics
            </p>

            <h2 className="mt-3 text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
              The Skyhaul Dispatch Memo
            </h2>

            <p className="mt-5 text-sm text-neutral-400 leading-relaxed">
              Operational insights covering freight routing intelligence,
              compliance systems, and logistics infrastructure evolution.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 border border-white/10 bg-white/5 px-4 py-2 rounded-full">
            <BookOpen className="w-4 h-4 text-orange-500" />
            Live Archive System
          </div>
        </GSAPScrollReveal>

        {/* GRID */}
        <GSAPScrollReveal effect="slide-up" stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS_DATA.slice(0, 3).map((post, index) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -6 }}
              onClick={() => router.push(`/blogs/${post.id}`)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* category */}
                <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider text-orange-400 bg-black/60 border border-white/10 px-2 py-1 rounded-full backdrop-blur">
                  {post.category}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col gap-4">
                {/* meta */}
                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-500" />
                      {post.date}
                    </span>

                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-orange-500" />
                      {post.author}
                    </span>
                  </div>
                </div>

                {/* title */}
                <h3 className="text-white text-base font-semibold leading-snug group-hover:text-orange-400 transition-colors">
                  {post.title}
                </h3>

                {/* excerpt */}
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-mono text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views}
                  </span>

                  <span className="text-orange-400 font-semibold">
                    {post.readTime}
                  </span>
                </div>

                {/* CTA hover line */}
                <div className="h-[1px] w-0 bg-orange-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.article>
          ))}
        </GSAPScrollReveal>

        {/* CTA */}
        <GSAPScrollReveal
          effect="fade"
          delay={0.2}
          className="mt-16 flex justify-center"
        >
          <button 
            onClick={() => router.push("/blogs")}
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-orange-400 transition-colors cursor-pointer"
          >
            Explore Full Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-500" />
          </button>
        </GSAPScrollReveal>
      </div>
    </section>
  );
}