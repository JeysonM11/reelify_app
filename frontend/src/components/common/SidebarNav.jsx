import { NavLink } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import { Home, TrendingUp, Sparkles, User, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Descubrir", icon: Home },
  { to: "/top", label: "Tendencias", icon: TrendingUp },
  { to: "/recomendaciones", label: "Para Ti", icon: Sparkles },
  { to: "/profile", label: "Perfil", icon: User },
];

export default function SidebarNav() {
  const { users, activeUserId, setActiveUserId, activeUser } = useApp();

  return (
    <aside className="sticky top-0 hidden h-screen w-80 shrink-0 flex-col border-r border-white/5 bg-black/40 px-6 py-8 backdrop-blur-3xl lg:flex">
      <div className="flex items-center gap-4 mb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-violet to-brand-cyan rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-black border border-white/10 text-2xl font-black text-white">R</div>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white leading-none">Reelify</h1>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1" aria-label="Principal">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${isActive
                ? "bg-white/5 text-white"
                : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-brand-violet rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className={`transition-colors duration-300 ${isActive ? "text-brand-violet" : "group-hover:text-white/60"}`} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight size={14} className="text-white/20" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img src={activeUser?.avatar} alt="" className="h-10 w-10 rounded-xl object-cover border border-white/10" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{activeUser?.name || "Invitado"}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Miembro Premium</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {users.map((user) => (
              <button
                key={user.id}
                type="button"
                className={`h-8 w-8 rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeUserId === user.id
                    ? "border-brand-violet scale-110 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    : "border-transparent opacity-40 hover:opacity-100 hover:scale-105"
                  }`}
                onClick={() => setActiveUserId(user.id)}
                title={`Cambiar a ${user.name}`}
              >
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <button className="flex w-full items-center gap-4 px-4 py-3 text-sm font-medium text-white/40 hover:text-white hover:bg-red-500/10 rounded-xl transition-all duration-300 group">
          <LogOut size={20} className="group-hover:text-red-400" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
