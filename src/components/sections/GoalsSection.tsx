import { Flame, Dumbbell, Heart, Wind, Zap } from "lucide-react";

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
  },
  {
    id: "muscle-gain",
    icon: Dumbbell,
    title: "Ganar Masa Muscular",
    description: "Aumenta tu volumen muscular con entrenamientos de hipertrofia",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "cardio",
    icon: Heart,
    title: "Capacidad Cardiovascular",
    description: "Mejora tu resistencia y salud del corazón",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "flexibility",
    icon: Wind,
    title: "Ganar Elongación",
    description: "Aumenta tu flexibilidad y previene lesiones",
    color: "from-teal-500 to-green-500",
  },
  {
    id: "strength",
    icon: Zap,
    title: "Ganar Fuerza",
    description: "Desarrolla potencia máxima con entrenamiento de fuerza",
    color: "from-yellow-500 to-orange-500",
  },
];

export const GoalsSection = ({ selectedGoal, onSelectGoal }: GoalsSectionProps) => {
  return (
    <section className="py-20 px-4" id="goals">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            ¿Cuál es tu <span className="gradient-text">objetivo</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selecciona tu meta y recibe rutinas personalizadas adaptadas a tus necesidades
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;

            return (
              <button
                key={goal.id}
                onClick={() => onSelectGoal(goal.id)}
                className={`group relative p-6 rounded-2xl text-left transition-all duration-300 animate-fade-in-up ${
                  isSelected
                    ? "glass-card ring-2 ring-primary scale-105"
                    : "glass-card hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                    <span className="text-primary-foreground text-sm">✓</span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${goal.color} ${
                    isSelected ? "glow-green" : ""
                  } transition-all duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {goal.title}
                </h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
              </button>
            );
          })}
        </div>

        {/* CTA if goal selected */}
        {selectedGoal && (
          <div className="mt-12 text-center animate-fade-in">
            <p className="text-primary font-medium mb-2">¡Excelente elección!</p>
            <p className="text-muted-foreground">
              Tus rutinas serán personalizadas para ayudarte a alcanzar tu objetivo
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
