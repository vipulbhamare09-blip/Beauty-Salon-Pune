import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Premium colors already present in the app: cream, pink, gold, white, light grey
const COLORS = ['#F4F4F4', '#FCE3E3', '#D4A574', '#ffffff'];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (isReducedMotion) return;

    // Small pieces only. 20–40 particles.
    const particleCount = 25; 
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // random start horizontal %
        y: Math.random() * 20 - 10, // start slightly above/around center
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 6 + 4, // 4px to 10px
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      });
    }

    setParticles(newParticles);
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            x: `${p.x - 50}vw`,
            y: `${p.y}vh`,
            rotate: p.rotation,
            scale: 0
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: `${p.y + 40 + Math.random() * 20}vh`, // slow gravity
            x: `${p.x - 50 + (Math.random() * 10 - 5)}vw`, // soft horizontal movement
            rotate: p.rotation + 180 + Math.random() * 180,
            scale: [0, 1, 1, 0.8]
          }}
          transition={{
            duration: 2.5 + Math.random() * 1, // 2.5 - 3.5s
            delay: p.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px', // mix of circles and small rectangles
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        />
      ))}
    </div>
  );
}
