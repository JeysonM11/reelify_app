import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/features/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, Film, X } from "lucide-react";

export default function SearchResults() {
  const { searchQuery, setSearchQuery, searchResults } = useApp();

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#eaeaea] pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#666] font-medium text-xs">
            <SearchIcon size={14} />
            Resultados de Búsqueda
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight">
            "{searchQuery}"
          </h1>
          <p className="text-[#555] text-sm">
            Encontrado {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'} para tu búsqueda.
          </p>
        </div>
        
        <button 
          onClick={() => setSearchQuery("")}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-[#eaeaea] text-[#666] text-sm font-medium hover:text-[#111] hover:bg-[#fafafa] hover:border-[#ccc] transition-colors shadow-sm"
        >
          <X size={14} />
          Limpiar Búsqueda
        </button>
      </header>

      <section className="min-h-[50vh]">
        <AnimatePresence mode="popLayout">
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {searchResults.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4 border border-dashed border-[#ccc] rounded-xl bg-[#fafafa]"
            >
              <div className="h-16 w-16 rounded-full bg-white border border-[#eaeaea] flex items-center justify-center text-[#aaa]">
                <Film size={24} />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-[#111]">No se encontraron coincidencias</h2>
                <p className="text-[#666] text-sm max-w-xs mx-auto">Prueba con palabras clave diferentes o revisa la ortografía.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
