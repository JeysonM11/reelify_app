import { NavLink } from "react-router-dom";
import { useApp } from "../../contexts/AppContext";

const navItems = [
  { to: "/", label: "Discovery", icon: HomeIcon },
  { to: "/top", label: "Top Charts", icon: ChartIcon },
  { to: "/recomendaciones", label: "For You", icon: SparkIcon },
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

export default function SidebarNav() {
  const { users, activeUserId, setActiveUserId, activeUser } = useApp();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-stone-950/90 px-5 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-amber-300/25 bg-amber-300/10 text-xl font-bold text-amber-200">R</div>
        <div>
          <span className="text-xs uppercase tracking-[0.38em] text-amber-300/80">Cinematic atlas</span>
          <h1 className="font-serif text-3xl text-stone-50">Reelify</h1>
        </div>
      </div>

      <nav className="mt-10 flex flex-col gap-2" aria-label="Principal">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-amber-300/15 text-amber-100 ring-1 ring-amber-300/25" : "text-stone-300 hover:bg-white/5 hover:text-stone-50"}`
            }
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Active viewer</p>
        <div className="mt-4 flex items-center gap-3">
          <img src={activeUser?.avatar} alt="" className="h-12 w-12 rounded-2xl border border-white/10 object-cover" />
          <div>
            <p className="text-stone-50">{activeUser?.name || "Guest"}</p>
            <p className="text-sm text-stone-400">{activeUser ? `Member since ${new Date(activeUser.joinedAt).getFullYear()}` : "No profile selected"}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Cambiar perfil">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeUserId === user.id ? "bg-amber-300 text-stone-950" : "bg-white/5 text-stone-300 hover:bg-white/10 hover:text-stone-50"}`}
              onClick={() => setActiveUserId(user.id)}
              aria-pressed={activeUserId === user.id}
            >
              {user.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
