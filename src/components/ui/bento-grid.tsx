import React from "react"
import Image from "next/image"

export function BentoGrid({ className = "", children,
}: 
{
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid auto-rows-[260px] gap-5 md:grid-cols-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  image,
  className = "",
}: {
  title: string;
  description: string;
  image: string;
  className?: string;
}) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#0a0a0c]
        ${className}
      `}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="
          object-cover
          transition-all duration-700
          group-hover:scale-110
        "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 z-10">
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
}