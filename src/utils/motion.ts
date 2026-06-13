/**
 * Premium Animation Presets & Motion Utilities for Vanguard Logistics
 */

export const SPRING_TRANSITIONS = {
  soft: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  stiff: {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 0.5,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 150,
    damping: 8,
    mass: 0.8,
  },
  smooth: {
    type: "tween" as const,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    duration: 0.85,
  },
  cinematic: {
    type: "tween" as const,
    ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    duration: 1.2,
  },
};

export const FADE_IN_UP = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      ...SPRING_TRANSITIONS.smooth,
      delay: custom * 0.08,
    },
  }),
};

export const FADE_IN = {
  hidden: {
    opacity: 0,
  },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      delay: custom * 0.08,
    },
  }),
};

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const LETTER_REVEAL = {
  hidden: {
    y: "115%",
  },
  visible: (index = 0) => ({
    y: "0%",
    transition: {
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      duration: 0.8,
      delay: index * 0.015,
    },
  }),
};

/**
 * Splits text into a spans structure allowing character-level reveals with motion/react
 */
export function splitWords(phrase: string) {
  return phrase.split(" ").map((word, wordIdx) => {
    return {
      word,
      key: `w-${wordIdx}`,
      chars: word.split(""),
    };
  });
}
