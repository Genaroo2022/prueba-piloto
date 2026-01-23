import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="FitnessKing" className="h-10 w-10 rounded-full" />
              <span className="font-display text-xl font-bold gradient-text">FitnessKing</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Tu gimnasio premium para transformar tu cuerpo y alcanzar tus metas fitness.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Clases</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Rutinas</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mi Progreso</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Entrenamiento Personal</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Clases Grupales</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Nutrición</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Membresías</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Av. Fitness 123, Ciudad
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +54 11 1234-5678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                info@fitnessking.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 FitnessKing. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
