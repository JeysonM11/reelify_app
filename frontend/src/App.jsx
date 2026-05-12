import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import SidebarNav from "./components/common/SidebarNav";
import MobileNav from "./components/common/MobileNav";
import Home from "./pages/Home";
import Top from "./pages/Top";
import Recomendaciones from "./pages/Recomendaciones";
import Profile from "./pages/Profile";
import Detalle from "./pages/Detalle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watchlist from "./pages/Watchlist";
import SearchResults from "./pages/SearchResults";
import { useApp } from "./contexts/AppContext";

function AppShell() {
  const location = useLocation();
  const { isAuthenticated, searchQuery, setSearchQuery } = useApp();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname, setSearchQuery]);

  return (
    <div className="relative min-h-screen selection:bg-black/10 selection:text-black">

      <div className="flex h-screen overflow-hidden">
        {!isAuthPage && isAuthenticated && <SidebarNav />}
        
        <main className={`flex-1 overflow-y-auto relative custom-scrollbar ${!isAuthenticated && !isAuthPage ? 'flex items-center justify-center' : ''}`}>
          <div key={location.pathname} className="min-h-full px-4 pt-6 pb-24 md:px-8 lg:px-12 lg:pb-12">
            {searchQuery && isAuthenticated ? (
              <SearchResults />
            ) : (
              <Routes location={location}>
                <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
                <Route path="/login" element={isAuthenticated ? <Home /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
                
                {/* Rutas protegidas */}
                <Route path="/movie/:movieId" element={isAuthenticated ? <Detalle /> : <Login />} />
                <Route path="/top" element={isAuthenticated ? <Top /> : <Login />} />
                <Route path="/recomendaciones" element={isAuthenticated ? <Recomendaciones /> : <Login />} />
                <Route path="/watchlist" element={isAuthenticated ? <Watchlist /> : <Login />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
              </Routes>
            )}
          </div>
        </main>
      </div>
      
      {!isAuthPage && isAuthenticated && <MobileNav />}
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

