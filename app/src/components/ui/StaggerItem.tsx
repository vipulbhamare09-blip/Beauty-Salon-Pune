import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface StaggerItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export default function StaggerItem({ children, className = "", ...props }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.97 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
