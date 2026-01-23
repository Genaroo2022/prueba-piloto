import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { GoalsSection } from "@/components/sections/GoalsSection";
import { ClassesSection } from "@/components/sections/ClassesSection";
import { RoutinesSection } from "@/components/sections/RoutinesSection";
import { ProgressSection } from "@/components/sections/ProgressSection";
import { Footer } from "@/components/layout/Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // Demo: Simulated role - in production this would come from database
  const userRole = "user" as "user" | "admin";

  useEffect(() => {
    // Set up auth listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Then check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentSection("home");
  };

  const renderSection = () => {
    switch (currentSection) {
      case "classes":
        return <ClassesSection isAdmin={userRole === "admin"} />;
      case "routines":
        return <RoutinesSection userGoal={selectedGoal} isAdmin={userRole === "admin"} />;
      case "progress":
        return (
          <ProgressSection
            isAuthenticated={!!user}
            onLogin={() => setIsAuthModalOpen(true)}
          />
        );
      case "admin":
        return userRole === "admin" ? (
          <div className="py-20 px-4 min-h-screen">
            <div className="container mx-auto max-w-6xl text-center">
              <h2 className="font-display text-4xl font-bold gradient-text">Panel de Administración</h2>
              <p className="text-muted-foreground mt-4">Próximamente: gestión de clases y rutinas</p>
            </div>
          </div>
        ) : null;
      default:
        return (
          <>
            <HeroSection
              onNavigate={handleNavigate}
              onGetStarted={() => setIsAuthModalOpen(true)}
            />
            <GoalsSection
              selectedGoal={selectedGoal}
              onSelectGoal={setSelectedGoal}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        isAuthenticated={!!user}
        userRole={userRole}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="pt-16 md:pt-20">
        {renderSection()}
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
};

export default Index;
