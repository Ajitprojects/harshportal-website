// src/components/CustomCursor.tsx (Updated with "Wow" Effect)

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);

  // Use MotionValues for direct, optimized updates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Use spring animation for the outer circle for a smooth, trailing effect
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.cursor-hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const dotVariants = {
    default: {
      opacity: 1,
      scale: 1,
    },
    hover: {
      opacity: 0,
      scale: 0,
    }
  };

  const circleVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(0, 255, 255, 0)',
    },
    hover: {
      scale: 2.5,
      backgroundColor: 'rgba(0, 255, 255, 0.2)',
    }
  };

  return (
    <>
      {/* Outer Circle - This one has the smooth delay */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-[9999]"
        style={{
          translateX: springX,
          translateY: springY,
        }}
        variants={circleVariants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      
      {/* Inner Dot - This one sticks to the mouse */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999]"
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        variants={dotVariants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;