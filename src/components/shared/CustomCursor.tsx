"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;

      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-hover")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - (hovering ? 30 : 12),
        y: position.y - (hovering ? 30 : 12),
        width: hovering ? 60 : 24,
        height: hovering ? 60 : 24,
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