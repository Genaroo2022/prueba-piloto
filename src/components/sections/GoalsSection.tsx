import { Flame, Dumbbell, Heart, Wind, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { GlowingCard } from "@/components/effects/GlowingCard";
import { NeonText } from "@/components/effects/NeonText";

interface GoalsSectionProps {
  selectedGoal: string | null;
  onSelectGoal: (goal: string) => void;
}

const goals = [
  {
    id: "weight-loss",
    icon: Flame,
    title: "Perder Peso",
    description: "Quema grasa y alcanza tu peso ideal con rutinas de alta intensidad",
    color: "from-orange-500 to-red-500",
    neonColor: "hsla(25, 95%, 53%, 0.5)",
  },
  {
    id: "muscle-gain",
    icon: Dumbbell,
    title: "Ganar Masa Muscular",
    description: "Aumenta tu volumen muscular con entrenamientos de hipertrofia",
    color: "from-blue-500 to-purple-500",
    neonColor: "hsla(220, 90%, 56%, 0.5)",
  },
  {
    id: "cardio",
    icon: Heart,
    title: "Capacidad Cardiovascular",
    description: "Mejora tu resistencia y salud del corazón",
    color: "from-red-500 to-pink-500",
    neonColor: "hsla(340, 82%, 52%, 0.5)",
  },
  {
    id: "flexibility",
    icon: Wind,
    title: "Ganar Elongación",
    description: "Aumenta tu flexibilidad y previene lesiones",
    color: "from-teal-500 to-green-500",
    neonColor: "hsla(160, 84%, 39%, 0.5)",
  },
  {
    id: "strength",
    icon: Zap,
    title: "Ganar Fuerza",
    description: "Desarrolla potencia máxima con entrenamiento de fuerza",
    color: "from-yellow-500 to-orange-500",
    neonColor: "hsla(38, 92%, 50%, 0.5)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export const GoalsSection = ({ selectedGoal, onSelectGoal }: GoalsSectionProps) => {
  return (
    <section className="py-20 px-4 relative overflow-hidden" id="goals">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            ¿Cuál es tu <NeonText>objetivo</NeonText>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selecciona tu meta y recibe rutinas personalizadas adaptadas a tus necesidades
          </p>
        </motion.div>

        {/* Goals Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;

            return (
              <motion.div
                key={goal.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <GlowingCard
                  className={`glass-card p-6 rounded-2xl text-left cursor-pointer transition-all duration-300 ${
                    isSelected ? "ring-2 ring-primary" : ""
                  }`}
                  glowColor="primary"
                  intensity={isSelected ? "strong" : "medium"}
                  onClick={() => onSelectGoal(goal.id)}
                >
                  {/* Selected indicator */}
                  {isSelected && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-bg flex items-center justify-center z-20"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <span className="text-primary-foreground text-sm">✓</span>
                    </motion.div>
                  )}

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${goal.color} ${
                      isSelected ? "animate-glow-pulse" : ""
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 30px ${goal.neonColor}` : "none",
                    }}
                    whileHover={{
                      rotate: [0, -5, 5, 0],
                      boxShadow: `0 0 25px ${goal.neonColor}`,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-2 neon-text-glow">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </GlowingCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA if goal selected */}
        {selectedGoal && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.p
              className="text-primary font-medium mb-2"
              animate={{
                textShadow: [
                  "0 0 10px hsla(145, 80%, 45%, 0.5)",
                  "0 0 20px hsla(145, 80%, 45%, 0.7)",
                  "0 0 10px hsla(145, 80%, 45%, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ¡Excelente elección!
            </motion.p>
            <p className="text-muted-foreground">
              Tus rutinas serán personalizadas para ayudarte a alcanzar tu objetivo
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
