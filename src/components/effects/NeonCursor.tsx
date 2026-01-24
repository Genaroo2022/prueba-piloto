import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

export const NeonCursor = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .interactive');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor glow */}
          <motion.div
            className="pointer-events-none fixed z-[9999] mix-blend-screen"
            animate={{
              x: position.x - (isHovering ? 30 : 20),
              y: position.y - (isHovering ? 30 : 20),
              scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          >
            <div
              className={`rounded-full transition-all duration-200 ${
                isHovering 
                  ? "w-[60px] h-[60px] bg-primary/30" 
                  : "w-[40px] h-[40px] bg-primary/20"
              }`}
              style={{
                boxShadow: isHovering
                  ? "0 0 40px 10px hsla(145, 80%, 45%, 0.4), 0 0 80px 20px hsla(200, 90%, 50%, 0.2)"
                  : "0 0 20px 5px hsla(145, 80%, 45%, 0.3), 0 0 40px 10px hsla(200, 90%, 50%, 0.1)",
              }}
            />
          </motion.div>

          {/* Secondary trailing glow */}
          <motion.div
            className="pointer-events-none fixed z-[9998] mix-blend-screen"
            animate={{
              x: position.x - 10,
              y: position.y - 10,
              opacity: isHovering ? 0.8 : 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
          >
            <div
              className="w-[20px] h-[20px] rounded-full bg-secondary/30"
              style={{
                boxShadow: "0 0 15px 5px hsla(200, 90%, 50%, 0.3)",
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
