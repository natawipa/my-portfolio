"use client";

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  align?: 'left' | 'center' | 'responsive';
}

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

const RESIZE_DEBOUNCE_MS = 150;
const WORD_ANIMATION_DELAY = 0.1;

export function WordsPullUp({
  text,
  className = '',
  align = 'center',
}: WordsPullUpProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const words = text.split(' ');
  const isInView = useInView(containerRef, { once: false });

  const pullupVariant = {
    initial: { 
      y: 20, 
      opacity: 0 
    },
    animate: (wordIndex: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: wordIndex * WORD_ANIMATION_DELAY,
      },
    }),
  };

  const getBreakpoint = (width: number): keyof typeof BREAKPOINTS | '2xl' => {
    if (width < BREAKPOINTS.sm) return 'sm';
    if (width < BREAKPOINTS.md) return 'md';
    if (width < BREAKPOINTS.lg) return 'lg';
    if (width < BREAKPOINTS.xl) return 'xl';
    return '2xl';
  };

  const getAlignmentClass = (): string => {
    const alignmentMap = {
      left: 'justify-start',
      center: 'justify-center',
      responsive: 'justify-center lg:justify-start',
    };
    return alignmentMap[align];
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const currentBreakpoint = getBreakpoint(windowWidth);
      const newBreakpoint = getBreakpoint(newWidth);
      
      // Only retrigger if there's a significant size change (not just theme change)
      // and we've actually crossed a breakpoint
      if (currentBreakpoint !== newBreakpoint && Math.abs(newWidth - windowWidth) > 100) {
        setAnimationKey(prev => prev + 1);
        setWindowWidth(newWidth);
      }
    };

    // Longer debounce to avoid theme change conflicts
    let timeoutId: NodeJS.Timeout;
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 800); // Much longer delay
    };

    window.addEventListener('resize', debouncedHandleResize);
    
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(timeoutId);
    };
  }, [windowWidth]);

  return (
    <div 
      ref={containerRef}
      className={`flex flex-wrap ${getAlignmentClass()}`}
    >
      {words.map((word, index) => (
        <motion.div
          key={`${animationKey}-${index}`}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          custom={index}
          className={cn(
            'text-xl text-center sm:text-4xl font-bold tracking-normal md:text-6xl md:leading-[4rem]',
            'pr-2', // Space between words
            className
          )}
        >
          {word === '' ? <span>&nbsp;</span> : word}
        </motion.div>
      ))}
    </div>
  );
}