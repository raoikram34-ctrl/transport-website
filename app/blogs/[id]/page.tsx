"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Calendar, User, Eye, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react";
import { BLOGS_DATA, BlogPostType } from "@/data/blogsData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;
  const router = useRouter();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [recentPosts, setRecentPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    // Find matching post
    const found = BLOGS_DATA.find((p) => p.id === blogId);
    if (found) {
      setPost(found);
      // Filter recent posts (excluding current one)
      const others = BLOGS_DATA.filter((p) => p.id !== blogId).slice(0, 3);
      setRecentPosts(others);
    } else {
      // Fallback
      setPost(BLOGS_DATA[0]);
      setRecentPosts(BLOGS_DATA.slice(1, 4));
    }
    // Scroll to top
    window.scrollTo({ top: 0 });
  }, [blogId]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center animate-pulse font-mono text-xs text-neutral-500 uppercase tracking-widest">
          Acquiring Operational Dossier...
        </div>
      </div>
    );
  }

  // Split content by sections or double newlines to render as paragraphs cleanly
  const paragraphs = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <div className="relative py-32 bg-[#050505] min-h-screen text-white">
      {/* Blueprint lines */}
      <div className="absolute inset-y-0 left-12 w-px bg-white/[0.02] pointer-events-none hidden sm:block" />
      <div className="absolute inset-y-0 right-12 w-px bg-white/[0.02] pointer-events-none hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <button
            onClick={() => router.push("/blogs")}
            className="group inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-orange-500 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform text-[#f97316]" />
            Back to All Insights
          </button>

          <div className="flex items-center gap-2 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:underline" onClick={() => router.push("/blogs")}>Blogs</span>
            <span>/</span>
            <span className="text-orange-500 max-w-[200px] truncate">{post.title}</span>
          </div>
        </div>

        {/* Hero Section of the Blog Post */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-orange-500 uppercase tracking-widest mb-4">
            <span className="bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-sm">
              {post.category.replace("_", " ")}
            </span>
            <span className="text-neutral-500">//</span>
            <span className="text-neutral-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {post.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-display font-medium text-white tracking-tight leading-tight uppercase mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 border-y border-white/5 py-4 font-mono text-[10px] text-neutral-400 uppercase">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#f97316]" />
              <span>Written by <strong className="text-white">{post.author}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-neutral-500" />
              <span>{post.views}</span>
            </div>
          </div>
        </div>

        {/* Big Article Image Banner */}
        <div className="max-w-5xl mx-auto relative aspect-[21/9] rounded-sm overflow-hidden border border-white/10 mb-16">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-5xl mx-auto items-start">
          
          {/* Post Content */}
          <div className="lg:col-span-8 space-y-6 text-neutral-300 leading-relaxed font-light text-sm sm:text-base">
            {paragraphs.map((para, idx) => {
              // Simple parser for headings in markdown content
              if (para.startsWith("# ")) {
                return null; // Skip main title as we have it above
              }
              if (para.startsWith("## ")) {
                return (
                  <h2 key={idx} className="text-lg sm:text-xl font-bold font-display text-white pt-6 pb-2 border-b border-white/5 uppercase tracking-wide">
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              if (para.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-md sm:text-lg font-bold font-display text-orange-400 pt-4 pb-1 uppercase tracking-wide">
                    {para.replace("### ", "")}
                  </h3>
                );
              }
              if (para.startsWith("- ")) {
                // Bullet points
                const items = para.split("\n").map(item => item.replace("- ", "").trim());
                return (
                  <ul key={idx} className="list-disc list-inside pl-4 space-y-2 border-l border-orange-500/20 py-1 font-sans">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-neutral-450 text-neutral-400">{item}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="font-sans leading-relaxed text-neutral-400">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-8">
            
            {/* Share Post box */}
            <div className="bg-neutral-900/30 border border-white/5 p-6 rounded-sm">
              <h3 className="font-mono text-xs uppercase text-neutral-400 font-bold tracking-widest mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-orange-500" /> Share This Dossier
              </h3>
              <p className="text-[11px] text-neutral-500 leading-relaxed mb-4">
                Distribute this technical operational memo across your professional logistics circles.
              </p>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="w-full py-2.5 border border-white/10 hover:border-orange-500 hover:text-orange-500 font-mono text-[9px] uppercase tracking-wider transition-colors rounded-xs cursor-pointer text-center"
              >
                Copy Memo URL Link
              </button>
            </div>

            {/* Vetted Authority Badget */}
            <div className="bg-[#0a0a0c] border border-white/5 p-6 rounded-sm space-y-4">
              <h3 className="font-mono text-xs uppercase text-neutral-400 font-bold tracking-widest mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-500" /> Recent Dispatch Memos
              </h3>
              <div className="divide-y divide-white/5">
                {recentPosts.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 group">
                    <span className="text-[8px] font-mono text-orange-500 uppercase tracking-widest block mb-1">
                      {item.category.replace("_", " ")}
                    </span>
                    <button
                      onClick={() => router.push(`/blogs/${item.id}`)}
                      className="text-left font-display text-xs font-semibold text-white group-hover:text-orange-400 transition-colors uppercase leading-snug tracking-wide cursor-pointer"
                    >
                      {item.title}
                    </button>
                    <span className="text-[9px] font-mono text-neutral-500 block mt-2">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
