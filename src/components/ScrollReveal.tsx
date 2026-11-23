import type { ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const SCROLL_EASE = [0.22, 1, 0.36, 1] as const;

export const SCROLL_VIEWPORT = {
  once: true,
  amount: 'some' as const,
};

export function getScrollCardMotionProps(index = 0, stepDelay = 0.055) {
  return {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: SCROLL_VIEWPORT,
    transition: {
      duration: 0.4,
      delay: Math.min(index, 5) * stepDelay,
      ease: SCROLL_EASE,
    },
  };
}

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  yOffset = 18,
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={SCROLL_VIEWPORT}
      transition={{
        duration: 0.42,
        delay,
        ease: SCROLL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 left-0 h-[2px] origin-left bg-blue-700/80"
    />
  );
}
