import { useState } from "react";
import { TrendingUp, TrendingDown, Plus, Dumbbell, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo exercises for tracking
const exercises = [
  "Press Banca",
  "Sentadilla",
  "Peso Muerto",
  "Press Militar",
  "Dominadas",
  "Remo con Barra",
  "Curl Bíceps",
  "Extensiones Tríceps",
];

// Demo progress data
const demoProgress = [
  { id: 1, exercise: "Press Banca", date: "2024-01-15", weight: 60, reps: 10, previousWeight: 55 },
  { id: 2, exercise: "Sentadilla", date: "2024-01-15", weight: 80, reps: 8, previousWeight: 75 },
  { id: 3, exercise: "Peso Muerto", date: "2024-01-14", weight: 100, reps: 5, previousWeight: 95 },
  { id: 4, exercise: "Press Banca", date: "2024-01-12", weight: 55, reps: 10, previousWeight: 50 },
  { id: 5, exercise: "Sentadilla", date: "2024-01-12", weight: 75, reps: 8, previousWeight: 70 },
  { id: 6, exercise: "Peso Muerto", date: "2024-01-10", weight: 95, reps: 5, previousWeight: 90 },
];

interface ProgressSectionProps {
  isAuthenticated: boolean;
  onLogin: () => void;
}

export const ProgressSection = ({ isAuthenticated, onLogin }: ProgressSectionProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [newEntry, setNewEntry] = useState({ weight: "", reps: "" });

  // Calculate improvement percentage
  const getImprovement = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Group progress by exercise
  const exerciseStats = exercises.map((exercise) => {
    const records = demoProgress.filter((p) => p.exercise === exercise);
    const latest = records[0];
    const improvement = latest ? getImprovement(latest.weight, latest.previousWeight) : 0;
    return {
      exercise,
      latestWeight: latest?.weight || 0,
      latestReps: latest?.reps || 0,
      improvement,
      recordCount: records.length,
    };
  }).filter((stat) => stat.recordCount > 0);

  if (!isAuthenticated) {
    return (
      <section className="py-20 px-4 min-h-screen flex items-center" id="progress">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="glass-card rounded-2xl p-12">
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">
              Rastrea tu <span className="gradient-text">Progreso</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Inicia sesión para registrar tus pesos, ver tu evolución y celebrar tus logros
            </p>
            <Button variant="hero" size="lg" onClick={onLogin}>
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 min-h-screen" id="progress">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Tu <span className="gradient-text">Progreso</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Registra tus pesos y observa cómo mejoras con cada entrenamiento
          </p>
        </div>

        {/* Add New Entry */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          {showAddForm ? (
            <div className="animate-fade-in">
              <h3 className="font-display text-xl font-bold mb-4">Registrar Nuevo Peso</h3>
              <div className="grid sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Ejercicio</Label>
                  <Select value={selectedExercise} onValueChange={setSelectedExercise}>
                    <SelectTrigger className="bg-muted border-border">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {exercises.map((ex) => (
                        <SelectItem key={ex} value={ex}>
                          {ex}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Peso (kg)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newEntry.weight}
                    onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Repeticiones</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newEntry.reps}
                    onChange={(e) => setNewEntry({ ...newEntry, reps: e.target.value })}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button variant="hero" className="flex-1">
                    Guardar
                  </Button>
                  <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold">Registrar Entrenamiento</h3>
                <p className="text-sm text-muted-foreground">
                  Añade los pesos que levantaste hoy
                </p>
              </div>
              <Button variant="hero" onClick={() => setShowAddForm(true)}>
                <Plus className="w-5 h-5" />
                Añadir
              </Button>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
              <Dumbbell className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display text-3xl font-bold gradient-text mb-1">
              {exerciseStats.length}
            </div>
            <div className="text-sm text-muted-foreground">Ejercicios Rastreados</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display text-3xl font-bold gradient-text mb-1">
              {demoProgress.length}
            </div>
            <div className="text-sm text-muted-foreground">Registros Totales</div>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="font-display text-3xl font-bold gradient-text mb-1">
              {Math.round(exerciseStats.reduce((acc, s) => acc + s.improvement, 0) / exerciseStats.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Mejora Promedio</div>
          </div>
        </div>

        {/* Exercise Progress Cards */}
        <h3 className="font-display text-2xl font-bold mb-6">Progreso por Ejercicio</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exerciseStats.map((stat, index) => {
            const isPositive = stat.improvement >= 0;

            return (
              <div
                key={stat.exercise}
                className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-display text-lg font-bold">{stat.exercise}</h4>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                      isPositive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(stat.improvement).toFixed(1)}%
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Último peso</span>
                    <span className="font-bold">{stat.latestWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Repeticiones</span>
                    <span className="font-bold">{stat.latestReps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Registros</span>
                    <span className="font-bold">{stat.recordCount}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPositive ? "gradient-bg" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(Math.abs(stat.improvement) * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <h3 className="font-display text-2xl font-bold mb-6 mt-12">Actividad Reciente</h3>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Fecha</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Ejercicio</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Peso</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Reps</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Cambio</th>
                </tr>
              </thead>
              <tbody>
                {demoProgress.slice(0, 5).map((entry) => {
                  const improvement = getImprovement(entry.weight, entry.previousWeight);
                  const isPositive = improvement >= 0;

                  return (
                    <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-4 text-sm">{entry.date}</td>
                      <td className="p-4 font-medium">{entry.exercise}</td>
                      <td className="p-4">{entry.weight} kg</td>
                      <td className="p-4">{entry.reps}</td>
                      <td className="p-4">
                        <span
                          className={`flex items-center gap-1 ${
                            isPositive ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(improvement).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
