import { useState } from "react";
import { TrendingUp, TrendingDown, Plus, Dumbbell, Calendar, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlowingCard } from "@/components/effects/GlowingCard";
import { NeonText } from "@/components/effects/NeonText";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

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
      <section className="py-20 px-4 min-h-screen flex items-center relative overflow-hidden" id="progress">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        
        <div className="container mx-auto max-w-2xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlowingCard
              className="glass-card rounded-2xl p-12"
              glowColor="primary"
              intensity="strong"
            >
              <motion.div
                className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6"
                animate={{
                  boxShadow: [
                    "0 0 20px hsla(145, 80%, 45%, 0.3)",
                    "0 0 40px hsla(145, 80%, 45%, 0.5)",
                    "0 0 20px hsla(145, 80%, 45%, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Rastrea tu <NeonText>Progreso</NeonText>
              </h2>
              <p className="text-muted-foreground mb-8">
                Inicia sesión para registrar tus pesos, ver tu evolución y celebrar tus logros
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="hero" size="lg" onClick={onLogin} className="neon-glow pulse-ring">
                  Iniciar Sesión
                </Button>
              </motion.div>
            </GlowingCard>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 min-h-screen relative overflow-hidden" id="progress">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[100px]" />

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
            Tu <NeonText>Progreso</NeonText>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Registra tus pesos y observa cómo mejoras con cada entrenamiento
          </p>
        </motion.div>

        {/* Add New Entry */}
        <motion.div
          className="glass-card rounded-2xl p-6 mb-8 neon-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {showAddForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
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
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button variant="hero" className="w-full neon-glow">
                        Guardar
                      </Button>
                    </motion.div>
                    <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="button"
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div>
                  <h3 className="font-display text-xl font-bold">Registrar Entrenamiento</h3>
                  <p className="text-sm text-muted-foreground">
                    Añade los pesos que levantaste hoy
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="hero" onClick={() => setShowAddForm(true)} className="neon-glow">
                    <Plus className="w-5 h-5" />
                    Añadir
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid sm:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Dumbbell, value: exerciseStats.length, label: "Ejercicios Rastreados" },
            { icon: Calendar, value: demoProgress.length, label: "Registros Totales" },
            { icon: TrendingUp, value: `${Math.round(exerciseStats.reduce((acc, s) => acc + s.improvement, 0) / exerciseStats.length)}%`, label: "Mejora Promedio" },
          ].map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlowingCard
                className="glass-card rounded-2xl p-6 text-center"
                glowColor="primary"
                intensity="subtle"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-3"
                  whileHover={{
                    rotate: [0, -10, 10, 0],
                    boxShadow: "0 0 25px hsla(145, 80%, 45%, 0.5)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div className="font-display text-3xl font-bold mb-1">
                  <NeonText animate={false}>{stat.value}</NeonText>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Exercise Progress Cards */}
        <h3 className="font-display text-2xl font-bold mb-6">Progreso por Ejercicio</h3>
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {exerciseStats.map((stat) => {
            const isPositive = stat.improvement >= 0;

            return (
              <motion.div key={stat.exercise} variants={itemVariants}>
                <GlowingCard
                  className="glass-card rounded-2xl p-6"
                  glowColor={isPositive ? "primary" : "secondary"}
                  intensity="subtle"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display text-lg font-bold neon-text-glow">{stat.exercise}</h4>
                    <motion.div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                        isPositive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                      animate={{
                        boxShadow: [
                          `0 0 5px ${isPositive ? "hsla(120, 100%, 50%, 0.2)" : "hsla(0, 100%, 50%, 0.2)"}`,
                          `0 0 15px ${isPositive ? "hsla(120, 100%, 50%, 0.4)" : "hsla(0, 100%, 50%, 0.4)"}`,
                          `0 0 5px ${isPositive ? "hsla(120, 100%, 50%, 0.2)" : "hsla(0, 100%, 50%, 0.2)"}`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(stat.improvement).toFixed(1)}%
                    </motion.div>
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

                  {/* Progress bar with neon glow */}
                  <div className="mt-4">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          isPositive ? "gradient-bg" : "bg-red-500"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(Math.abs(stat.improvement) * 10, 100)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                          boxShadow: isPositive
                            ? "0 0 10px hsla(145, 80%, 45%, 0.5)"
                            : "0 0 10px hsla(0, 84%, 60%, 0.5)",
                        }}
                      />
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Recent Activity */}
        <h3 className="font-display text-2xl font-bold mb-6 mt-12">Actividad Reciente</h3>
        <motion.div
          className="glass-card rounded-2xl overflow-hidden neon-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
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
                {demoProgress.slice(0, 5).map((entry, index) => {
                  const improvement = getImprovement(entry.weight, entry.previousWeight);
                  const isPositive = improvement >= 0;

                  return (
                    <motion.tr
                      key={entry.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
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
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
