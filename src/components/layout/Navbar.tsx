import { useState } from "react";
import { Menu, X, User, LogOut, Dumbbell } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 group"
          >
            <img
              src={logo}
              alt="FitnessKing Logo"
              className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
            <span className="font-display text-xl md:text-2xl font-bold gradient-text">
              FitnessKing
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  currentSection === item.id
                    ? "gradient-bg text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated && userRole === "admin" && (
              <button
                onClick={() => onNavigate("admin")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  currentSection === "admin"
                    ? "gradient-bg text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Admin
              </button>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium capitalize">{userRole}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button variant="hero" onClick={onLogin}>
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
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
                >
                  {item.label}
                </button>
              ))}
              {isAuthenticated && userRole === "admin" && (
                <button
                  onClick={() => {
                    onNavigate("admin");
                    setIsMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg font-medium text-left transition-all duration-300 flex items-center gap-2 ${
                    currentSection === "admin"
                      ? "gradient-bg text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Dumbbell className="w-4 h-4" />
                  Admin
                </button>
              )}
              <div className="pt-4 border-t border-border/30">
                {isAuthenticated ? (
                  <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </Button>
                ) : (
                  <Button variant="hero" className="w-full" onClick={onLogin}>
                    Iniciar Sesión
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
