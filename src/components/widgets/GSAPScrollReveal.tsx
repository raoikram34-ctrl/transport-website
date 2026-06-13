"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type GSAPRevealEffect =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "skew-up"
  | "zoom-in";

interface GSAPScrollRevealProps {
  children: React.ReactNode;
  effect?: GSAPRevealEffect;
  duration?: number;
  delay?: number;
  stagger?: number; // Applies to direct child elements if set
  startTrigger?: string; // Custom scrollTrigger start position, e.g., "top 85%"
  className?: string;
  triggerOnce?: boolean;
  id?: string;
}

export default function GSAPScrollReveal({
  children,
  effect = "slide-up",
  duration = 0.8,
  delay = 0,
  stagger = 0,
  startTrigger = "top 85%",
  className = "",
  triggerOnce = true,
  id,
}: GSAPScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialProps: gsap.TweenVars = {};
    let animateProps: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
    };

    // Define initial and target properties per effect
    switch (effect) {
      case "fade":
        initialProps = { opacity: 0 };
        animateProps = { ...animateProps };
        break;
      case "slide-up":
        initialProps = { opacity: 0, y: 50 };
        animateProps = { ...animateProps, y: 0 };
        break;
      case "slide-down":
        initialProps = { opacity: 0, y: -50 };
        animateProps = { ...animateProps, y: 0 };
        break;
      case "slide-left":
        initialProps = { opacity: 0, x: 50 };
        animateProps = { ...animateProps, x: 0 };
        break;
      case "slide-right":
        initialProps = { opacity: 0, x: -50 };
        animateProps = { ...animateProps, x: 0 };
        break;
      case "scale-up":
        initialProps = { opacity: 0, scale: 0.9 };
        animateProps = { ...animateProps, scale: 1 };
        break;
      case "zoom-in":
        initialProps = { opacity: 0, scale: 0.8 };
        animateProps = { ...animateProps, scale: 1, ease: "back.out(1.5)" };
        break;
      case "skew-up":
        initialProps = { opacity: 0, y: 80, skewY: 5 };
        animateProps = { ...animateProps, y: 0, skewY: 0, ease: "power4.out" };
        break;
      default:
        initialProps = { opacity: 0, y: 50 };
        animateProps = { ...animateProps, y: 0 };
    }

    let scrollTriggerConfig = {
      trigger: container,
      start: startTrigger,
      toggleActions: triggerOnce
        ? "play none none none"
        : "play reverse play reverse",
    };

    // Stagger direct children if stagger value is set
    if (stagger > 0 && container.children.length > 0) {
      const targets = container.children;
      
      // Set initial states
      gsap.set(targets, initialProps);
      
      // Build animation
      gsap.to(targets, {
        ...animateProps,
        stagger,
        scrollTrigger: scrollTriggerConfig,
      });
    } else {
      // Animate the single container element
      gsap.set(container, initialProps);
      gsap.to(container, {
        ...animateProps,
        scrollTrigger: scrollTriggerConfig,
      });
    }

    return () => {
      // Clean up triggers related to this container
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [effect, duration, delay, stagger, startTrigger, triggerOnce]);

  return (
    <div ref={containerRef} id={id} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
}
