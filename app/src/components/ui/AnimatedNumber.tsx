import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedNumber({
  value,
  duration = 1000,
  delay = 0,
  prefix = "",
  suffix = "",
  className = "",
  style
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
    }
  }, [isInView, hasTriggered]);

  const animatedValue = useAnimatedCounter(hasTriggered ? value : 0, duration, delay);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      <motion.span>{animatedValue}</motion.span>
      {suffix}
    </span>
  );
}
