import { ArrowRight, Crown, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-gym.jpg";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  onGetStarted: () => void;
}

export const HeroSection = ({ onNavigate, onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in-up">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">El gimnasio premium de tu ciudad</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">TRANSFORMA</span>
            <br />
            <span className="text-foreground">TU CUERPO</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Rutinas personalizadas, clases grupales y seguimiento de tu progreso.
            Todo lo que necesitas para alcanzar tus metas fitness.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" onClick={onGetStarted}>
              Comenzar Ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => onNavigate("classes")}>
              Ver Clases
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Miembros Activos</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Clases Semanales</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text mb-1">15+</div>
              <div className="text-sm text-muted-foreground">Entrenadores Pro</div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group" onClick={() => onNavigate("routines")}>
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:glow-green transition-all">
              <Target className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Rutinas Personalizadas</h3>
            <p className="text-sm text-muted-foreground">Entrenamientos adaptados a tus objetivos específicos</p>
          </div>

          <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group" onClick={() => onNavigate("classes")}>
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:glow-green transition-all">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Clases Grupales</h3>
            <p className="text-sm text-muted-foreground">Yoga, HIIT, Spinning y mucho más</p>
          </div>

          <div className="glass-card p-6 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group" onClick={() => onNavigate("progress")}>
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:glow-green transition-all">
              <Crown className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold mb-2">Tu Progreso</h3>
            <p className="text-sm text-muted-foreground">Registra tus pesos y mide tu evolución</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full gradient-bg animate-pulse" />
        </div>
      </div>
    </section>
  );
};
