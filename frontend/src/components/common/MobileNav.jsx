import { NavLink } from "react-router-dom";
import { Home, TrendingUp, Sparkles, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Descubrir", icon: Home },
  { to: "/top", label: "Tendencias", icon: TrendingUp },
  { to: "/recomendaciones", label: "Para Ti", icon: Sparkles },
  { to: "/profile", label: "Perfil", icon: User },
];

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-black/60 px-4 py-3 backdrop-blur-3xl lg:hidden" aria-label="Mobile Navigation">
      <div className="mx-auto grid grid-cols-4 gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-[10px] font-bold tracking-tight transition-all duration-300 ${
                isActive ? "text-white" : "text-white/40"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="activeMobileNav"
                    className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className={`relative transition-colors duration-300 ${isActive ? "text-brand-violet" : ""}`} />
                <span className="relative">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
