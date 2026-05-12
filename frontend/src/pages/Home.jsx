import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/features/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, Trophy, ChevronRight, Play, Clock } from "lucide-react";

export default function Home() {
  const { featured, topMovies, recommendations, movies, genreAverages, watchlist, toggleWatchlist, isInWatchlist, isLoading } = useApp();
  const [activeGenre, setActiveGenre] = useState("Todos");
  const inWatchlist = featured ? isInWatchlist(featured.id) : false;

  const trendingGenres = useMemo(() => ["Todos", ...genreAverages.slice(0, 6).map((item) => item.genre)], [genreAverages]);
  
  const filteredMovies = useMemo(() => {
    if (activeGenre === "Todos") return topMovies.slice(0, 8);
    return movies
      .filter((movie) => movie.genre.includes(activeGenre))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 8);
  }, [activeGenre, movies, topMovies]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-pulse">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-cyan"></div>
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Conectando con el servidor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Featured Cinematic Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden rounded-xl border border-[#eaeaea] bg-[#fff] group shadow-sm">
        <img 
          src={featured?.poster} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 transition duration-1000 group-hover:opacity-30 group-hover:scale-105" 
          alt={featured?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-[#ffffff]/80 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8 md:p-12 max-w-3xl gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[#111] font-medium text-xs"
          >
            <span className="px-2 py-0.5 rounded border border-[#eaeaea] bg-white">Destacado</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-semibold text-[#111] tracking-tight"
          >
            {featured?.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#555] text-base md:text-lg leading-relaxed line-clamp-2 md:line-clamp-3 max-w-2xl"
          >
            {featured?.description || "Vive la obra maestra cinematográfica que ha cautivado al público en todo el mundo. Un viaje a las profundidades de la narrativa y la excelencia visual."}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 mt-4"
          >
            <Link to={`/movie/${featured?.id}`} className="flex items-center gap-2 bg-[#111] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[#333] transition-colors shadow-sm">
              <Play fill="currentColor" size={16} />
              Ver Ahora
            </Link>
            <button 
              onClick={() => toggleWatchlist(featured.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium border transition-colors ${
                inWatchlist 
                  ? "bg-white border-[#ccc] text-[#111]" 
                  : "bg-transparent text-[#666] border-[#eaeaea] hover:bg-[#fafafa]"
              }`}
            >
              {inWatchlist ? "En tu Lista" : "Añadir a la Lista"}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Watchlist Quick Access - Only if items exist */}
      <AnimatePresence>
        {watchlist && watchlist.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-brand-violet font-bold tracking-widest uppercase text-[10px]">
                  <Clock size={12} />
                  Continuar Viendo
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#111] tracking-tight">Mi Lista</h2>
              </div>
              <Link to="/watchlist" className="group flex items-center gap-2 text-[#666] hover:text-[#111] transition-colors font-medium text-sm">
                Ver todo <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
              {watchlist.map((movie, index) => (
                <div key={movie.id} className="snap-start">
                  <MovieCard movie={movie} index={index} compact />
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Trending Section with Filter Chips */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#eaeaea] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-medium text-[#111]">Contenido Popular</h2>
            <p className="text-sm text-[#666]">Películas en tendencia en todas las categorías</p>
          </div>
          
          <div className="flex flex-wrap gap-1 p-1 bg-[#fafafa] rounded-lg border border-[#eaeaea]">
            {trendingGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  activeGenre === genre 
                    ? "bg-white text-[#111] border border-[#eaeaea] shadow-sm" 
                    : "text-[#666] hover:text-[#111] hover:bg-[#f0f0f0]"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative overflow-hidden rounded-xl bg-white border border-[#eaeaea] p-8 flex flex-col justify-center min-h-[250px] group transition-all hover:border-[#ccc] shadow-sm">
          <Trophy className="text-[#111] mb-4" size={32} />
          <h3 className="text-xl font-medium text-[#111] mb-2">Colección Oscars 2024</h3>
          <p className="text-[#555] text-sm mb-6 max-w-md leading-relaxed">Explora las películas premiadas que definieron el año en el cine. Desde visuales impresionantes hasta actuaciones conmovedoras.</p>
          <Link to="/top" className="group flex items-center gap-1 text-sm font-medium text-[#111] w-fit bg-[#fafafa] border border-[#eaeaea] px-4 py-2 rounded-md hover:bg-[#f0f0f0] transition-colors">
            Ver Colección <ChevronRight size={14} />
          </Link>
        </div>
        
        <div className="relative overflow-hidden rounded-xl bg-white border border-[#eaeaea] p-8 flex flex-col justify-between group transition-all hover:border-[#ccc] shadow-sm">
          <div>
            <h3 className="text-lg font-medium text-[#111] mb-1">Top Semanal</h3>
            <p className="text-[#666] text-xs">Lo más visto de esta semana</p>
          </div>
          <div className="flex -space-x-3 mt-6">
            {topMovies.slice(0, 4).map((m, i) => (
              <img key={i} src={m.poster} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-[#fafafa] flex items-center justify-center text-[10px] font-medium text-[#111]">
              +12
            </div>
          </div>
        </div>
      </section>

      {/* For You Section */}
      <section className="space-y-6 pb-12">
        <div className="flex items-center justify-between border-b border-[#eaeaea] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-medium text-[#111]">Recomendado para ti</h2>
          </div>
          <Link to="/recomendaciones" className="text-xs font-medium text-[#666] hover:text-[#111] transition-colors">Ver todo</Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
          {recommendations.slice(0, 10).map((movie, index) => (
            <div key={movie.id} className="snap-start min-w-[160px]">
              <MovieCard movie={movie} index={index} compact />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}