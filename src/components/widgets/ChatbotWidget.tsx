"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Loader2, Bot, AlertTriangle, ShieldCheck } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Welcome to Skyhaul Transit HQ. I am your automated route assistant. How can I help you coordinate your shipping manifest today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sanitizeInput = (val: string): string => {
    // Escape standard HTML tags manually as a primary filter
    return val
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .trim();
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = sanitizeInput(inputValue);
    if (!cleanInput) return;

    const userMsgId = Date.now().toString();
    const newUserMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: inputValue.trim(), // Display clean version to user
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: cleanInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred while communicating with the AI.");
      }

      // Sanitize AI response client-side before rendering (Defense-in-depth)
      const cleanResponse = DOMPurify.sanitize(data.response || "");

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: cleanResponse,
        },
      ]);
    } catch (err: any) {
      console.error("Chat error: ", err);
      setErrorMsg(err.message || "Failed to establish secure handshake with assistant.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-white text-black hover:bg-[#f97316] hover:text-black transition-all duration-300 rounded-full flex items-center justify-center shadow-lg border border-white/10 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#f97316]"
        aria-label="Toggle AI Support Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-zinc-950/90 border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col backdrop-blur-md font-mono text-xs uppercase"
          >
            {/* Header */}
            <div className="p-4 bg-neutral-900 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-white tracking-widest">SKYHAUL AI DISPATCHER</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" />
                SECURE SSL
              </div>
            </div>

            {/* Message Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/5"
            >
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-sm leading-relaxed border ${
                        isBot
                          ? "bg-neutral-900/50 border-white/5 text-neutral-300"
                          : "bg-white text-black border-white font-bold"
                      }`}
                    >
                      {isBot && (
                        <div className="flex items-center gap-1.5 mb-1.5 text-[9px] text-[#f97316] font-bold">
                          <Bot className="w-3 h-3" />
                          TELEMETRY CO-PILOT
                        </div>
                      )}
                      {/* Sanitized HTML render to support safe formatting (bullet points, bold texts) */}
                      <div
                        className="normal-case whitespace-pre-wrap leading-normal font-sans text-xs"
                        dangerouslySetInnerHTML={{ __html: msg.text }}
                      />
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-sm bg-neutral-900/50 border border-white/5 text-neutral-400 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#f97316]" />
                    Analyzing corridor variables...
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 rounded-sm bg-red-950/20 border border-red-500/20 text-red-200 text-[10px] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-neutral-900/50 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about lanes, pricing or safety..."
                disabled={isLoading}
                maxLength={500}
                className="flex-1 h-9 bg-black border border-white/10 px-3 rounded-sm text-white focus:outline-none focus:border-[#f97316] font-sans disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-9 h-9 bg-white text-black hover:bg-[#f97316] transition-colors rounded-sm flex items-center justify-center cursor-pointer disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
