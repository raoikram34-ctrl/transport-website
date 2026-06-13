import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { FADE_IN_UP, LETTER_REVEAL, splitWords } from "../../utils/motion";

interface MotionRevealProps {
  children: string;
  type?: "words" | "lines" | "block";
  className?: string;
  delay?: number;
  id?: string;
}

export default function MotionReveal({
  children,
  type = "block",
  className = "",
  delay = 0,
  id,
}: MotionRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Optional viewport sensor using pure standard React ref
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  if (type === "words" || type === "lines") {
    const formattedWords = splitWords(children);
    let absoluteCharIndex = 0;

    return (
      <div
        id={id}
        ref={containerRef}
        className={`flex flex-wrap items-center leading-tight ${className}`}
      >
        {formattedWords.map((w, wIdx) => (
          <span key={w.key} className="inline-flex mr-[0.25em] whitespace-nowrap overflow-hidden py-1">
            {w.chars.map((char) => {
              const charKey = `${w.key}-c-${absoluteCharIndex}`;
              const idx = absoluteCharIndex;
              absoluteCharIndex++;
              return (
                <motion.span
                  key={charKey}
                  className="inline-block transform-cpu origin-bottom"
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={idx + delay * 10}
                  variants={LETTER_REVEAL}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </div>
    );
  }

  // Base Block reveal
  return (
    <div id={id} ref={containerRef} className="overflow-hidden">
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={delay}
        variants={FADE_IN_UP}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
