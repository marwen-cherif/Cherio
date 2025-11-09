'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { ButtonSize } from './button.types';
import { useIsRTL } from '@/hooks/useLocale';

interface CardProps {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
  summary?: React.ReactNode;
  editLabel?: string;
  className?: string;
  onToggle?: () => void;
}

export function Card({
  title,
  isOpen = false,
  children,
  summary,
  editLabel = 'Edit',
  className,
  onToggle = () => undefined,
}: CardProps) {
  const isRTL = useIsRTL();

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
          <Button variant="secondary" size={ButtonSize.Small} onClick={() => onToggle()}>
            {editLabel}
          </Button>
        )}
        {/*{isOpen && summary && (*/}
        {/*  <Button variant="secondary" size={ButtonSize.Small} onClick={() => onToggle()}>*/}
        {/*    Collapse*/}
        {/*  </Button>*/}
        {/*)}*/}
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
