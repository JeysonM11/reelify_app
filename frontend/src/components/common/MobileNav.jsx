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
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#222] bg-[#0a0a0a]/90 px-4 py-2 backdrop-blur-xl lg:hidden" aria-label="Mobile Navigation">
      <div className="mx-auto grid grid-cols-4 gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium tracking-wide transition-colors duration-200 ${
                isActive ? "text-white" : "text-[#888] hover:text-[#ededed]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="activeMobileNav"
                    className="absolute inset-0 bg-[#222] rounded-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={20} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
