import { useState } from "react";
import { Play, Clock, Flame, ChevronRight, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RoutinesSectionProps {
  userGoal?: string | null;
  isAdmin?: boolean;
}

// Demo routines data
const demoRoutines = [
  {
    id: 1,
    name: "Quema Grasa Total",
    description: "Rutina de alta intensidad para maximizar la quema de calorías",
    duration: 45,
    difficulty: "Intermedio",
    calories: 400,
    goal: "weight-loss",
    exercises: [
      { name: "Burpees", sets: 4, reps: 15, videoUrl: "#" },
      { name: "Mountain Climbers", sets: 4, reps: 30, videoUrl: "#" },
      { name: "Jumping Jacks", sets: 4, reps: 40, videoUrl: "#" },
      { name: "High Knees", sets: 4, reps: 30, videoUrl: "#" },
    ],
  },
  {
    id: 2,
    name: "Hipertrofia Upper Body",
    description: "Construcción de masa muscular en tren superior",
    duration: 60,
    difficulty: "Avanzado",
    calories: 350,
    goal: "muscle-gain",
    exercises: [
      { name: "Press Banca", sets: 4, reps: 10, videoUrl: "#" },
      { name: "Dominadas", sets: 4, reps: 8, videoUrl: "#" },
      { name: "Press Militar", sets: 4, reps: 10, videoUrl: "#" },
      { name: "Curl Bíceps", sets: 3, reps: 12, videoUrl: "#" },
    ],
  },
  {
    id: 3,
    name: "Cardio Endurance",
    description: "Mejora tu resistencia cardiovascular progresivamente",
    duration: 40,
    difficulty: "Principiante",
    calories: 300,
    goal: "cardio",
    exercises: [
      { name: "Caminata Rápida", sets: 1, reps: 10, videoUrl: "#" },
      { name: "Trote Suave", sets: 1, reps: 15, videoUrl: "#" },
      { name: "Intervalos", sets: 6, reps: 2, videoUrl: "#" },
      { name: "Enfriamiento", sets: 1, reps: 5, videoUrl: "#" },
    ],
  },
  {
    id: 4,
    name: "Flexibilidad Total",
    description: "Mejora tu rango de movimiento y previene lesiones",
    duration: 30,
    difficulty: "Principiante",
    calories: 100,
    goal: "flexibility",
    exercises: [
      { name: "Estiramiento Cuádriceps", sets: 2, reps: 30, videoUrl: "#" },
      { name: "Estiramiento Isquiotibiales", sets: 2, reps: 30, videoUrl: "#" },
      { name: "Apertura de Cadera", sets: 2, reps: 30, videoUrl: "#" },
      { name: "Estiramiento Espalda", sets: 2, reps: 30, videoUrl: "#" },
    ],
  },
  {
    id: 5,
    name: "Fuerza Máxima",
    description: "Desarrolla tu potencia con ejercicios compuestos pesados",
    duration: 75,
    difficulty: "Avanzado",
    calories: 450,
    goal: "strength",
    exercises: [
      { name: "Sentadilla", sets: 5, reps: 5, videoUrl: "#" },
      { name: "Peso Muerto", sets: 5, reps: 5, videoUrl: "#" },
      { name: "Press Banca", sets: 5, reps: 5, videoUrl: "#" },
      { name: "Remo con Barra", sets: 5, reps: 5, videoUrl: "#" },
    ],
  },
];

export const RoutinesSection = ({ userGoal, isAdmin = false }: RoutinesSectionProps) => {
  const [selectedRoutine, setSelectedRoutine] = useState<typeof demoRoutines[0] | null>(null);

  // Filter routines based on user goal if set
  const filteredRoutines = userGoal
    ? demoRoutines.filter((r) => r.goal === userGoal)
    : demoRoutines;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante":
        return "text-green-400";
      case "Intermedio":
        return "text-yellow-400";
      case "Avanzado":
        return "text-red-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20 px-4 min-h-screen" id="routines">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Rutinas <span className="gradient-text">Personalizadas</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {userGoal
              ? "Rutinas recomendadas según tu objetivo"
              : "Explora todas nuestras rutinas de entrenamiento"}
          </p>
        </div>

        {selectedRoutine ? (
          // Routine Detail View
          <div className="animate-fade-in">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => setSelectedRoutine(null)}
            >
              ← Volver a rutinas
            </Button>

            <div className="glass-card rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                  <h3 className="font-display text-3xl font-bold mb-2">
                    {selectedRoutine.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedRoutine.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary" />
                      {selectedRoutine.duration} min
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-orange-400" />
                      {selectedRoutine.calories} kcal
                    </div>
                    <div className={`flex items-center gap-2 text-sm ${getDifficultyColor(selectedRoutine.difficulty)}`}>
                      <Dumbbell className="w-4 h-4" />
                      {selectedRoutine.difficulty}
                    </div>
                  </div>
                </div>
                <Button variant="hero" size="lg">
                  <Play className="w-5 h-5" />
                  Iniciar Rutina
                </Button>
              </div>

              {/* Exercises List */}
              <h4 className="font-display text-xl font-bold mb-4">Ejercicios</h4>
              <div className="space-y-3">
                {selectedRoutine.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <h5 className="font-medium">{exercise.name}</h5>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} series x {exercise.reps} {exercise.reps > 10 ? "seg" : "reps"}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="w-4 h-4" />
                      Ver Video
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Routines List View
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutines.map((routine, index) => (
              <div
                key={routine.id}
                className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedRoutine(routine)}
              >
                {/* Routine header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className={`text-sm font-medium ${getDifficultyColor(routine.difficulty)}`}>
                    {routine.difficulty}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {routine.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {routine.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {routine.duration} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    {routine.calories} kcal
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {routine.exercises.length} ejercicios
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin && (
          <div className="mt-12 text-center">
            <Button variant="hero" size="lg">
              + Crear Nueva Rutina
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
