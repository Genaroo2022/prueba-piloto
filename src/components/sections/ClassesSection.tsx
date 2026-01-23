import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { es } from "date-fns/locale";

interface ClassesSectionProps {
  isAdmin?: boolean;
}

// Demo classes data
const demoClasses = [
  { id: 1, name: "HIIT Extremo", instructor: "Carlos", time: "07:00", duration: 45, capacity: 20, enrolled: 15, day: 1, room: "Sala A" },
  { id: 2, name: "Yoga Flow", instructor: "María", time: "09:00", duration: 60, capacity: 15, enrolled: 12, day: 1, room: "Sala B" },
  { id: 3, name: "Spinning", instructor: "Pedro", time: "18:00", duration: 45, capacity: 25, enrolled: 22, day: 1, room: "Spinning" },
  { id: 4, name: "CrossFit", instructor: "Ana", time: "08:00", duration: 60, capacity: 12, enrolled: 10, day: 2, room: "Zona CrossFit" },
  { id: 5, name: "Pilates", instructor: "Laura", time: "10:00", duration: 50, capacity: 18, enrolled: 14, day: 2, room: "Sala B" },
  { id: 6, name: "Body Pump", instructor: "Diego", time: "19:00", duration: 55, capacity: 20, enrolled: 18, day: 2, room: "Sala A" },
  { id: 7, name: "Zumba", instructor: "Carmen", time: "17:00", duration: 60, capacity: 30, enrolled: 25, day: 3, room: "Sala Principal" },
  { id: 8, name: "Boxeo", instructor: "Martín", time: "20:00", duration: 60, capacity: 16, enrolled: 14, day: 3, room: "Ring" },
  { id: 9, name: "Stretching", instructor: "María", time: "08:00", duration: 30, capacity: 20, enrolled: 8, day: 4, room: "Sala B" },
  { id: 10, name: "HIIT Cardio", instructor: "Carlos", time: "18:30", duration: 45, capacity: 20, enrolled: 19, day: 4, room: "Sala A" },
  { id: 11, name: "Yoga Power", instructor: "María", time: "09:00", duration: 75, capacity: 15, enrolled: 11, day: 5, room: "Sala B" },
  { id: 12, name: "Spinning Elite", instructor: "Pedro", time: "07:00", duration: 50, capacity: 25, enrolled: 23, day: 5, room: "Spinning" },
  { id: 13, name: "Functional Training", instructor: "Ana", time: "10:00", duration: 55, capacity: 15, enrolled: 12, day: 6, room: "Zona CrossFit" },
  { id: 14, name: "Body Combat", instructor: "Diego", time: "11:00", duration: 55, capacity: 22, enrolled: 18, day: 6, room: "Sala A" },
];

export const ClassesSection = ({ isAdmin = false }: ClassesSectionProps) => {
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(today, { weekStartsOn: 1 }));
  const [selectedDay, setSelectedDay] = useState(today);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const prevWeek = () => setCurrentWeekStart(addDays(currentWeekStart, -7));
  const nextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));

  const selectedDayIndex = weekDays.findIndex((day) => isSameDay(day, selectedDay)) + 1;
  const classesForDay = demoClasses.filter((c) => c.day === (selectedDayIndex > 0 ? selectedDayIndex : 1));

  return (
    <section className="py-20 px-4 min-h-screen" id="classes">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Calendario de <span className="gradient-text">Clases</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explora nuestras clases grupales y reserva tu lugar
          </p>
        </div>

        {/* Week Navigation */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={prevWeek}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h3 className="font-display text-xl font-bold">
              {format(currentWeekStart, "MMMM yyyy", { locale: es })}
            </h3>
            <Button variant="ghost" size="icon" onClick={nextWeek}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => {
              const isSelected = isSameDay(day, selectedDay);
              const isToday = isSameDay(day, today);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(day)}
                  className={`p-3 rounded-xl text-center transition-all duration-300 ${
                    isSelected
                      ? "gradient-bg text-primary-foreground"
                      : isToday
                      ? "bg-muted ring-2 ring-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="text-xs uppercase font-medium opacity-70">
                    {format(day, "EEE", { locale: es })}
                  </div>
                  <div className="text-lg font-bold">{format(day, "d")}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold mb-6">
            Clases del {format(selectedDay, "EEEE d 'de' MMMM", { locale: es })}
          </h3>

          {classesForDay.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <p className="text-muted-foreground text-lg">No hay clases programadas para este día</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {classesForDay.map((cls, index) => {
                const isFull = cls.enrolled >= cls.capacity;
                const fillPercentage = (cls.enrolled / cls.capacity) * 100;

                return (
                  <div
                    key={cls.id}
                    className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-display text-xl font-bold mb-1">{cls.name}</h4>
                        <p className="text-sm text-muted-foreground">con {cls.instructor}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-2xl font-bold gradient-text">{cls.time}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {cls.duration} min
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {cls.room}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {cls.enrolled}/{cls.capacity}
                      </div>
                    </div>

                    {/* Capacity bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            fillPercentage >= 90 ? "bg-destructive" : "gradient-bg"
                          }`}
                          style={{ width: `${fillPercentage}%` }}
                        />
                      </div>
                    </div>

                    {isAdmin ? (
                      <Button variant="outline" className="w-full">
                        Editar Clase
                      </Button>
                    ) : (
                      <Button
                        variant={isFull ? "outline" : "hero"}
                        className="w-full"
                        disabled={isFull}
                      >
                        {isFull ? "Clase Llena" : "Reservar"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
