import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-purple-500/20">
      <div className="px-8 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="text-3xl">🎬</div>
          <div>
            <h1 className="text-2xl font-bold text-white">Reelify</h1>
            <p className="text-xs text-purple-400">Cine inteligente</p>
          </div>
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-purple-400 transition font-medium">
            Inicio
          </Link>
          <Link to="/top" className="text-gray-300 hover:text-purple-400 transition font-medium">
            Top 🏆
          </Link>
          <Link to="/recomendaciones" className="text-gray-300 hover:text-purple-400 transition font-medium">
            Para ti ✨
          </Link>
          <Link to="/profile" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition">
            Perfil
          </Link>
        </nav>
      </div>
    </header>
  );
}
