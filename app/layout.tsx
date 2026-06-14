import type { Metadata } from "next";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import ChatbotWidget from "@/components/widgets/ChatbotWidget";

export const metadata: Metadata = {
  title: "Skyhaul Transit | Premium Enterprise Logistics",
  description: "Propelling deep commercial fleets and enterprise supply chains through high-velocity logistics and intelligent Chicago-based national routing orchestration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CustomCursor />
        <ChatbotWidget />
        <SmoothScrollProvider>
          <main className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans relative grid-overlay selection:bg-[#f97316] selection:text-black overflow-hidden flex flex-col justify-between">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] opacity-40 pointer-events-none" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-zinc-900/50 rounded-full blur-[120px] opacity-50 pointer-events-none" />

            {/* Global Layout Navigation Header */}
            <Navbar />

            {/* Routed Content stage */}
            <div className="flex-grow w-full">
              {children}
            </div>

            {/* Sophisticated Corporate footer */}
            <Footer />
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

