import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon },
  { to: "/top", label: "Charts", icon: ChartIcon },
  { to: "/recomendaciones", label: "For you", icon: SparkIcon },
  { to: "/profile", label: "Profile", icon: UserIcon },
];

function HomeIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 11.5 12 4l9 7.5" /><path d="M6 10.5V20h12v-9.5" /></svg>;
}

function ChartIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 19V9" /><path d="M12 19V5" /><path d="M19 19v-8" /></svg>;
}

function SparkIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" /></svg>;
}

function UserIcon(props) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21a8 8 0 0 0-16 0" /><circle cx="12" cy="8" r="4" /></svg>;
}

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-stone-950/90 px-3 py-2 backdrop-blur-xl lg:hidden" aria-label="Navegación principal móvil">
      <div className="mx-auto grid max-w-lg grid-cols-4 gap-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${isActive ? "bg-amber-300/15 text-amber-100" : "text-stone-400"}`
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
