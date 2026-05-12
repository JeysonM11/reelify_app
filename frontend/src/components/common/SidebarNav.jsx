import { NavLink } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";
import { Home, TrendingUp, Sparkles, User, LogOut, ChevronRight, Search as SearchIcon, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Descubrir", icon: Home },
  { to: "/top", label: "Tendencias", icon: TrendingUp },
  { to: "/recomendaciones", label: "Para Ti", icon: Sparkles },
  { to: "/watchlist", label: "Mi Lista", icon: Clock },
  { to: "/profile", label: "Perfil", icon: User },
];

export default function SidebarNav() {
  const { activeUser, logout, searchQuery, setSearchQuery } = useApp();

  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r border-[#eaeaea] bg-[#fcfcfc] px-4 py-6 lg:flex">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111] text-sm font-bold text-white">
          R
        </div>
        <h1 className="text-sm font-semibold tracking-tight text-[#111]">Reelify</h1>
      </div>

      {/* Minimalist Search */}
      <div className="mb-6 px-2">
        <div className="relative flex items-center bg-white border border-[#eaeaea] rounded-md px-3 py-1.5 focus-within:border-[#ccc] transition-colors shadow-sm">
          <SearchIcon size={14} className="text-[#666]" />
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-[#111] placeholder:text-[#888] ml-2 w-full"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearchQuery("")}
                className="text-[#888] hover:text-white transition-colors"
              >
                <X size={12} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 flex-1" aria-label="Principal">
        <div className="text-[10px] font-semibold text-[#888] uppercase tracking-wider mb-2 px-2">Menú</div>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors ${isActive
                ? "bg-white border border-[#eaeaea] text-[#111] font-medium shadow-sm"
                : "text-[#666] hover:text-[#111] hover:bg-[#fafafa]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? "text-[#111]" : "text-[#888]"} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="mt-auto space-y-2 border-t border-[#eaeaea] pt-4 px-2">
        <div className="flex items-center gap-3 py-2">
          <img src={activeUser?.avatar || `https://ui-avatars.com/api/?name=${activeUser?.name || 'Usuario'}&background=random`} alt="User" className="h-7 w-7 rounded-full object-cover border border-[#eaeaea]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-[#111] truncate">{activeUser?.name || "Invitado"}</p>
            <p className="text-[10px] text-[#666]">Premium</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="flex w-full items-center gap-3 px-2 py-1.5 text-sm text-[#666] hover:text-[#111] hover:bg-[#fafafa] rounded-md transition-colors"
        >
          <LogOut size={14} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
