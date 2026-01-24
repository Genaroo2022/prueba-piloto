import { useState } from "react";
import { Menu, X, User, LogOut, Dumbbell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: string) => void;
  isAuthenticated: boolean;
  userRole?: "user" | "admin";
  onLogin: () => void;
  onLogout: () => void;
}

const navItems = [
  { id: "home", label: "Inicio" },
  { id: "classes", label: "Clases" },
  { id: "routines", label: "Rutinas" },
  { id: "progress", label: "Mi Progreso" },
];

export const Navbar = ({
  currentSection,
  onNavigate,
  isAuthenticated,
  userRole,
  onLogin,
  onLogout,
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src={logo}
              alt="FitnessKing Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg"
              whileHover={{
                boxShadow: "0 0 20px hsla(145, 80%, 45%, 0.5)",
              }}
            />
            <span className="font-display text-xl md:text-2xl font-bold gradient-text neon-text-glow">
              FitnessKing
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentSection === item.id
                    ? "gradient-bg text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow:
                    currentSection === item.id
                      ? "0 0 15px hsla(145, 80%, 45%, 0.4)"
                      : "none",
                }}
              >
                {item.label}
                {currentSection !== item.id && (
                  <motion.span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      boxShadow: "0 0 8px hsla(145, 80%, 45%, 0.5)",
                    }}
                  />
                )}
              </motion.button>
            ))}
            {isAuthenticated && userRole === "admin" && (
              <motion.button
                onClick={() => onNavigate("admin")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentSection === "admin"
                    ? "gradient-bg text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Dumbbell className="w-4 h-4" />
                Admin
              </motion.button>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted neon-border"
                  whileHover={{
                    boxShadow: "0 0 15px hsla(145, 80%, 45%, 0.3)",
                  }}
                >
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium capitalize">{userRole}</span>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" onClick={onLogout}>
                    <LogOut className="w-4 h-4" />
                    Salir
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" onClick={onLogin} className="neon-glow">
                  Iniciar Sesión
                </Button>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-border/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 ${
                      currentSection === item.id
                        ? "gradient-bg text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                {isAuthenticated && userRole === "admin" && (
                  <motion.button
                    onClick={() => {
                      onNavigate("admin");
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 flex items-center gap-2 ${
                      currentSection === "admin"
                        ? "gradient-bg text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                  >
                    <Dumbbell className="w-4 h-4" />
                    Admin
                  </motion.button>
                )}
                <motion.div
                  className="pt-4 border-t border-border/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {isAuthenticated ? (
                    <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </Button>
                  ) : (
                    <Button variant="hero" className="w-full neon-glow" onClick={onLogin}>
                      Iniciar Sesión
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
