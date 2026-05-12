import { useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/features/MovieCard";
import { motion } from "framer-motion";
import { Sparkles, Zap, BrainCircuit, Filter } from "lucide-react";

export default function RecomendacionesPage() {
  const { recommendations, genreAverages, activeUser, userStats } = useApp();
  const focusGenres = useMemo(() => genreAverages.slice(0, 5).map((item) => item.genre), [genreAverages]);

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* AI Discovery Header */}
      <section className="relative overflow-hidden rounded-xl border border-[#eaeaea] bg-white p-8 md:p-12 shadow-sm">
        <div className="relative flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#fafafa] border border-[#eaeaea] text-[#111] text-xs font-medium"
          >
            <BrainCircuit size={14} />
            Descubrimiento con IA
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-semibold text-[#111] tracking-tight leading-tight">
            Ajustado a <span className="text-[#666]">Tu Gusto</span>
          </h1>
          
          <p className="text-[#555] text-sm md:text-base leading-relaxed">
            Nuestro motor de recomendaciones analiza tus {userStats.moviesRated} calificaciones y {focusGenres.length} géneros favoritos para encontrar tu próxima obsesión cinematográfica.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {focusGenres.map((genre) => (
              <span key={genre} className="px-3 py-1.5 rounded-md bg-[#fafafa] border border-[#eaeaea] text-xs font-medium text-[#333]">
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-8 pt-6 border-t border-[#eaeaea] w-full justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold text-[#111]">{userStats.moviesRated}</p>
              <p className="text-[10px] text-[#666] font-medium uppercase mt-1">Datos</p>
            </div>
            <div className="w-px h-8 bg-[#eaeaea]" />
            <div className="text-center">
              <p className="text-xl font-semibold text-[#111]">{userStats.averageRatingGiven.toFixed(1)}</p>
              <p className="text-[10px] text-[#666] font-medium uppercase mt-1">Calidad Promedio</p>
            </div>
             <div className="w-px h-8 bg-[#eaeaea]" />
            <div className="text-center">
              <p className="text-xl font-semibold text-[#111]">98%</p>
              <p className="text-[10px] text-[#666] font-medium uppercase mt-1">Precisión</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="space-y-6 pb-12">
        <div className="flex items-center justify-between border-b border-[#eaeaea] pb-4">
          <div className="flex items-center gap-2 text-[#111]">
            <Zap size={18} className="text-[#666]" />
            <h2 className="text-xl font-medium tracking-tight">Top Predicciones</h2>
          </div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#eaeaea] text-xs font-medium text-[#666] hover:text-[#111] hover:border-[#ccc] transition-colors">
            <Filter size={12} />
            Refinar Búsqueda
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {recommendations.length ? (
            recommendations.slice(0, 18).map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center space-y-3 rounded-xl border border-dashed border-[#ccc] bg-[#fafafa]">
              <Sparkles className="mx-auto text-[#aaa]" size={32} />
              <p className="text-[#666] text-sm">Califica más películas para desbloquear predicciones personalizadas.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}