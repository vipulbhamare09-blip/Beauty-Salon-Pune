import { useEffect } from 'react';
import { useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';

export function useAnimatedCounter(targetValue: number, durationMs: number = 1000, delayMs: number = 0) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      count.set(targetValue);
      return;
    }
    
    const timeout = setTimeout(() => {
      const animation = animate(count, targetValue, {
        duration: durationMs / 1000,
        ease: "easeOut"
      });
      return () => animation.stop();
    }, delayMs);
    
    return () => clearTimeout(timeout);
  }, [targetValue, durationMs, delayMs, count, shouldReduceMotion]);

  return rounded;
}
