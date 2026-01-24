import { useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "primary" | "secondary" | "mixed";
  intensity?: "subtle" | "medium" | "strong";
  onClick?: () => void;
}

export const GlowingCard = ({
  children,
  className = "",
  glowColor = "primary",
  intensity = "medium",
  onClick,
}: GlowingCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColors = {
    primary: "hsla(145, 80%, 45%, VAR)",
    secondary: "hsla(200, 90%, 50%, VAR)",
    mixed: "hsla(170, 85%, 47%, VAR)",
  };

  const intensityValues = {
    subtle: { opacity: 0.15, blur: 60, size: 150 },
    medium: { opacity: 0.25, blur: 80, size: 200 },
    strong: { opacity: 0.35, blur: 100, size: 250 },
  };

  const { opacity, blur, size } = intensityValues[intensity];
  const color = glowColors[glowColor].replace("VAR", opacity.toString());

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {/* Glow effect that follows mouse */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        animate={{
          x: mousePosition.x - size / 2,
          y: mousePosition.y - size / 2,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${blur}px)`,
        }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 0 1px ${glowColors[glowColor].replace("VAR", "0.3")}, 
                      0 0 20px 0 ${glowColors[glowColor].replace("VAR", "0.15")}`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
