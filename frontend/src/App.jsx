import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import SidebarNav from "./components/common/SidebarNav";
import MobileNav from "./components/common/MobileNav";
import Home from "./pages/Home";
import Top from "./pages/Top";
import Recomendaciones from "./pages/Recomendaciones";
import Profile from "./pages/Profile";
import Detalle from "./pages/Detalle";

function AppShell() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0e0e0e] text-stone-100 lg:flex">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(232,160,32,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,#101010_0%,#0e0e0e_45%,#090909_100%)]" />
      <SidebarNav />
      <main className="min-w-0 flex-1">
        <div key={location.pathname} className="animate-[fadeInUp_500ms_ease_both] pb-24 lg:pb-0">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieId" element={<Detalle />} />
            <Route path="/top" element={<Top />} />
            <Route path="/recomendaciones" element={<Recomendaciones />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
