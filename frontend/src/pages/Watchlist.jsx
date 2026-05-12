import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/features/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Film, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const { watchlist } = useApp();

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <header className="flex flex-col gap-2 pb-4 border-b border-[#eaeaea]">
        <div className="flex items-center gap-2 text-[#666] font-medium text-xs">
          <Clock size={14} />
          Colección Personal
        </div>
        <h1 className="text-3xl font-semibold text-[#111] tracking-tight">Mi Lista</h1>
        <p className="text-[#555] text-sm">
          Tus películas guardadas para ver más tarde. Gestiona tu biblioteca personal de cine.
        </p>
      </header>

      <section className="min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          {watchlist.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {watchlist.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-[#ccc] rounded-xl bg-[#fafafa]"
            >
              <div className="h-16 w-16 rounded-full bg-[#f0f0f0] border border-[#e5e5e5] flex items-center justify-center text-[#666]">
                <Film size={24} />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-[#111]">Tu lista está vacía</h2>
                <p className="text-[#666] text-sm max-w-xs mx-auto">Explora nuestro catálogo y añade películas para verlas más tarde.</p>
              </div>
              <Link to="/" className="flex items-center gap-2 px-6 py-2.5 mt-4 rounded-md bg-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors">
                Explorar Ahora
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
