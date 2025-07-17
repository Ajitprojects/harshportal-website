// src/components/CustomCursor.tsx

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Initial mobile check and update on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('.cursor-hover-target'));
    };

    if (!isMobile) {
      window.addEventListener('mousemove', updateMouse);
      document.addEventListener('mouseover', handleHover);
    }

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      document.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY, isMobile]);

  const dotVariants = {
    default: { opacity: 1, scale: 1 },
    hover: { opacity: 0, scale: 0 }
  };

  const circleVariants = {
    default: { scale: 1, backgroundColor: 'rgba(0,255,255,0)' },
    hover: { scale: 2.5, backgroundColor: 'rgba(0,255,255,0.2)' }
  };

  // ✅ Render nothing for cursor shapes only — NOT the entire component
  return (
    <>
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none z-[9999]"
            style={{ translateX: springX, translateY: springY }}
            variants={circleVariants}
            animate={isHovering ? 'hover' : 'default'}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999]"
            style={{ translateX: cursorX, translateY: cursorY }}
            variants={dotVariants}
            animate={isHovering ? 'hover' : 'default'}
            transition={{ duration: 0.15 }}
          />
        </>
      )}
    </>
  );
};

export default CustomCursor;
