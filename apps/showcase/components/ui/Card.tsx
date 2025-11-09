'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { ButtonSize } from './button.types';
import { useIsRTL } from '@/hooks/useLocale';

interface CardProps {
  title: string;
  initialIsOpen?: boolean;
  children: React.ReactNode;
  summary?: React.ReactNode; // Content to show when collapsed
  editLabel?: string;
  className?: string;
  onToggle?: (isOpen: boolean) => void; // Optional callback when toggled
}

export function Card({
  title,
  initialIsOpen = true,
  children,
  summary,
  editLabel = 'Edit',
  className,
  onToggle,
}: CardProps) {
  const isRTL = useIsRTL();
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  // Update local state when initialIsOpen changes
  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle?.(newIsOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`rounded-lg border border-border bg-white p-6 shadow-sm ${className || ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        {summary && !isOpen && (
          <Button
            variant="secondary"
            size={ButtonSize.Small}
            onClick={handleToggle}
          >
            {editLabel}
          </Button>
        )}
        {isOpen && summary && (
          <Button
            variant="secondary"
            size={ButtonSize.Small}
            onClick={handleToggle}
          >
            Collapse
          </Button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        ) : (
          summary && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2 text-secondary"
            >
              {summary}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
}

