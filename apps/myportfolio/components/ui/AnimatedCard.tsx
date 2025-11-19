'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 1.11, 0.81, 0.99],
      }}
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      className={cn(
        'rounded-2xl bg-card border border-border shadow-lg transition-all duration-300',
        hover && 'hover:shadow-2xl',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

