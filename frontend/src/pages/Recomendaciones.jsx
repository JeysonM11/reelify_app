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
      <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 p-8 md:p-16 backdrop-blur-3xl group">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-brand-cyan/20 blur-[120px] rounded-full group-hover:bg-brand-cyan/30 transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 bg-brand-violet/20 blur-[120px] rounded-full group-hover:bg-brand-violet/30 transition-colors duration-1000" />
        
        <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3 px-6 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-widest"
          >
            <BrainCircuit size={16} />
            Descubrimiento con IA
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Ajustado a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-cyan">Tu Gusto</span>
          </h1>
          
          <p className="text-white/40 text-lg md:text-xl leading-relaxed">
            Nuestro motor de recomendaciones analiza tus {userStats.moviesRated} calificaciones y {focusGenres.length} géneros favoritos para encontrar tu próxima obsesión cinematográfica.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {focusGenres.map((genre) => (
              <span key={genre} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white/60">
                {genre}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-8 pt-6 border-t border-white/5 w-full justify-center">
            <div className="text-center">
              <p className="text-2xl font-black text-white">{userStats.moviesRated}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Datos</p>
            </div>
            <div className="w-px h-10 bg-white/5" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">{userStats.averageRatingGiven.toFixed(1)}</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Calidad Promedio</p>
            </div>
             <div className="w-px h-10 bg-white/5" />
            <div className="text-center">
              <p className="text-2xl font-black text-white">98%</p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Precisión</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan">
              <Zap size={20} />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Top Predicciones</h2>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-bold text-white/40 hover:text-white transition-colors">
            <Filter size={14} />
            Refinar Búsqueda
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          {recommendations.length ? (
            recommendations.slice(0, 18).map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <Sparkles className="mx-auto text-white/10" size={64} />
              <p className="text-white/40 text-lg">Califica más películas para desbloquear predicciones personalizadas.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}