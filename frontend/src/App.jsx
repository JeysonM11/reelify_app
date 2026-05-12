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
    <div className="relative min-h-screen selection:bg-brand-violet/30 selection:text-white">
      {/* Premium Aurora Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-violet/20 blur-[120px] animate-aurora opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-cyan/20 blur-[120px] animate-aurora opacity-50" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-brand-violet/10 blur-[100px] animate-aurora opacity-30" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="flex h-screen overflow-hidden">
        <SidebarNav />
        
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          <div key={location.pathname} className="min-h-full px-4 pt-6 pb-24 md:px-8 lg:px-12 lg:pb-12">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:movieId" element={<Detalle />} />
              <Route path="/top" element={<Top />} />
              <Route path="/recomendaciones" element={<Recomendaciones />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </div>
      
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

