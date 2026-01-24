import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonTextProps {
  children: ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "gradient";
  animate?: boolean;
}

export const NeonText = ({
  children,
  className = "",
  color = "gradient",
  animate = true,
}: NeonTextProps) => {
  const colorStyles = {
    primary: {
      textShadow: `
        0 0 5px hsla(145, 80%, 45%, 0.5),
        0 0 10px hsla(145, 80%, 45%, 0.4),
        0 0 20px hsla(145, 80%, 45%, 0.3),
        0 0 40px hsla(145, 80%, 45%, 0.2)
      `,
    },
    secondary: {
      textShadow: `
        0 0 5px hsla(200, 90%, 50%, 0.5),
        0 0 10px hsla(200, 90%, 50%, 0.4),
        0 0 20px hsla(200, 90%, 50%, 0.3),
        0 0 40px hsla(200, 90%, 50%, 0.2)
      `,
    },
    gradient: {
      textShadow: `
        0 0 5px hsla(145, 80%, 45%, 0.4),
        0 0 10px hsla(170, 85%, 47%, 0.3),
        0 0 20px hsla(200, 90%, 50%, 0.2),
        0 0 40px hsla(200, 90%, 50%, 0.1)
      `,
    },
  };

  if (!animate) {
    return (
      <span
        className={`gradient-text ${className}`}
        style={colorStyles[color]}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={`gradient-text ${className}`}
      style={colorStyles[color]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        textShadow: `
          0 0 10px hsla(145, 80%, 45%, 0.7),
          0 0 20px hsla(145, 80%, 45%, 0.5),
          0 0 30px hsla(200, 90%, 50%, 0.4),
          0 0 50px hsla(200, 90%, 50%, 0.3)
        `,
      }}
    >
      {children}
    </motion.span>
  );
};
