"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isInputHovered, setIsInputHovered] = useState(false);
  const [isMouseOut, setIsMouseOut] = useState(true);

  // Check screen size responsively
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    setIsLargeScreen(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsLargeScreen(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Track mouse coordinates and states only on large screens
  useEffect(() => {
    if (!isLargeScreen) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
      // Once the mouse moves inside, ensure it is not marked as out
      if (isMouseOut) {
        setIsMouseOut(false);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Hide custom cursor over editable elements or standard inputs so it doesn't block text
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("select");

      setIsInputHovered(!!isInput);

      // Change custom cursor size on interactive elements
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-hover") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsMouseOut(true);
    };

    const handleMouseEnter = () => {
      setIsMouseOut(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isLargeScreen, isMouseOut]);

  // Render nothing if it's a small screen
  if (!isLargeScreen) return null;

  // Custom cursor is visible when mouse is in viewport and not hovering over input fields
  const showCursor = !isMouseOut && !isInputHovered;

  return (
    <motion.div
      animate={{
        x: position.x - (hovering ? 30 : 12),
        y: position.y - (hovering ? 30 : 12),
        width: hovering ? 60 : 24,
        height: hovering ? 60 : 24,
        opacity: showCursor ? 1 : 0,
        scale: showCursor ? 1 : 0.1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="
        fixed
        top-0
        left-0
        rounded-full
        border
        border-orange-500
        pointer-events-none
        z-[9999]
        mix-blend-difference
      "
    />
  );
}