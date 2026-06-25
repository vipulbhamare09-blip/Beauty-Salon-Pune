import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

export default function StaggerContainer({ 
  children, 
  className = "", 
  id,
  staggerChildren = 0.15,
  delayChildren = 0
}: StaggerContainerProps) {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
