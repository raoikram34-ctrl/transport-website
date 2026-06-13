"use client";

import { useRef } from "react";

export default function MagneticButton({
  children,
  className = "",
  ...props
}: any) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)
    scale(1.05)
  `;
  
};

  const handleLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform =
    "translate(0px,0px) scale(1)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}