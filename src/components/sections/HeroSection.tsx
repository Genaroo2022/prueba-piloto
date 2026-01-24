import { ArrowRight, Crown, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ParticleField } from "@/components/effects/ParticleField";
import { NeonText } from "@/components/effects/NeonText";
import { GlowingCard } from "@/components/effects/GlowingCard";
import heroImage from "@/assets/hero-gym.jpg";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  onGetStarted: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

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

      {/* Floating particles */}
      <ParticleField count={40} />

      {/* Ambient neon lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card neon-border mb-8"
          >
            <Crown className="w-4 h-4 text-primary animate-neon-flicker" />
            <span className="text-sm font-medium">El gimnasio premium de tu ciudad</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <NeonText className="block">TRANSFORMA</NeonText>
            <motion.span
              className="text-foreground block"
              whileHover={{ 
                textShadow: "0 0 20px hsla(0, 0%, 100%, 0.3)",
              }}
            >
              TU CUERPO
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Rutinas personalizadas, clases grupales y seguimiento de tu progreso.
            Todo lo que necesitas para alcanzar tus metas fitness.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onGetStarted}
                className="neon-glow pulse-ring"
              >
                Comenzar Ahora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="heroOutline" 
                size="xl" 
                onClick={() => onNavigate("classes")}
                className="neon-border"
              >
                Ver Clases
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "500+", label: "Miembros Activos" },
              { value: "50+", label: "Clases Semanales" },
              { value: "15+", label: "Entrenadores Pro" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold mb-1">
                  <NeonText animate={false}>{stat.value}</NeonText>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Preview */}
        <motion.div
          variants={containerVariants}
          className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: Target,
              title: "Rutinas Personalizadas",
              description: "Entrenamientos adaptados a tus objetivos específicos",
              section: "routines",
              glowColor: "primary" as const,
            },
            {
              icon: Zap,
              title: "Clases Grupales",
              description: "Yoga, HIIT, Spinning y mucho más",
              section: "classes",
              glowColor: "secondary" as const,
            },
            {
              icon: Crown,
              title: "Tu Progreso",
              description: "Registra tus pesos y mide tu evolución",
              section: "progress",
              glowColor: "mixed" as const,
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              custom={index}
            >
              <GlowingCard
                className="glass-card p-6 rounded-2xl cursor-pointer"
                glowColor={feature.glowColor}
                intensity="medium"
                onClick={() => onNavigate(feature.section)}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4"
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <h3 className="font-display text-xl font-bold mb-2 neon-text-glow">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 neon-glow">
          <motion.div
            className="w-1.5 h-3 rounded-full gradient-bg"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};
