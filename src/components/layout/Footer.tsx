import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

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

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/3 rounded-full blur-[100px]" />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div className="md:col-span-1" variants={itemVariants}>
            <motion.div
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.img
                src={logo}
                alt="FitnessKing"
                className="h-10 w-10 rounded-full"
                whileHover={{
                  boxShadow: "0 0 20px hsla(145, 80%, 45%, 0.5)",
                }}
              />
              <span className="font-display text-xl font-bold gradient-text neon-text-glow">
                FitnessKing
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground mb-4">
              Tu gimnasio premium para transformar tu cuerpo y alcanzar tus metas fitness.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg bg-muted transition-colors neon-border"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "hsl(var(--primary))",
                    boxShadow: "0 0 15px hsla(145, 80%, 45%, 0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Inicio", "Clases", "Rutinas", "Mi Progreso"].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="hover:text-primary transition-colors neon-underline inline-block"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Entrenamiento Personal", "Clases Grupales", "Nutrición", "Membresías"].map((service) => (
                <li key={service}>
                  <motion.a
                    href="#"
                    className="hover:text-primary transition-colors neon-underline inline-block"
                    whileHover={{ x: 5 }}
                  >
                    {service}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {[
                { icon: MapPin, text: "Av. Fitness 123, Ciudad" },
                { icon: Phone, text: "+54 11 1234-5678" },
                { icon: Mail, text: "info@fitnessking.com" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    whileHover={{
                      color: "hsl(var(--primary))",
                      textShadow: "0 0 10px hsla(145, 80%, 45%, 0.5)",
                    }}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                  </motion.div>
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border pt-8 text-center text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <p>© 2024 FitnessKing. Todos los derechos reservados.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};
