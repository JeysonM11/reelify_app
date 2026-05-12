import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/features/MovieCard";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, Trophy, ChevronRight, Play } from "lucide-react";

export default function Home() {
  const { featured, topMovies, recommendations, movies, genreAverages } = useApp();
  const [activeGenre, setActiveGenre] = useState("All");

  const trendingGenres = useMemo(() => ["Todos", ...genreAverages.slice(0, 6).map((item) => item.genre)], [genreAverages]);
  
  const filteredMovies = useMemo(() => {
    if (activeGenre === "Todos") return topMovies.slice(0, 8);
    return movies
      .filter((movie) => movie.genre.includes(activeGenre))
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 8);
  }, [activeGenre, movies, topMovies]);

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Featured Cinematic Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-[2.5rem] border border-white/10 group">
        <img 
          src={featured?.poster} 
          className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105" 
          alt={featured?.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16 max-w-2xl gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-brand-cyan font-bold tracking-[0.2em] uppercase text-xs"
          >
            <Sparkles size={14} />
            Presentación Destacada
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            {featured?.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg leading-relaxed line-clamp-2 md:line-clamp-3"
          >
            {featured?.description || "Vive la obra maestra cinematográfica que ha cautivado al público en todo el mundo. Un viaje a las profundidades de la narrativa y la excelencia visual."}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link to={`/movie/${featured?.id}`} className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-brand-cyan hover:text-white transition-all duration-300">
              <Play fill="currentColor" size={18} />
              Ver Ahora
            </Link>
            <button className="px-8 py-4 rounded-2xl font-bold bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all">
              Mi Lista
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trending Section with Filter Chips */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-violet font-bold tracking-widest uppercase text-[10px]">
              <TrendingUp size={12} />
              Tendencias Actuales
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Contenido Popular</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
            {trendingGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeGenre === genre 
                    ? "bg-brand-violet text-white shadow-lg shadow-brand-violet/20" 
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMovies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-violet/20 to-transparent border border-white/10 p-10 flex flex-col justify-center min-h-[300px]">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-violet/20 blur-[100px] rounded-full" />
          <Trophy className="text-brand-violet mb-6" size={48} />
          <h3 className="text-3xl font-bold text-white mb-4">Colección Oscars 2024</h3>
          <p className="text-white/60 mb-8 max-w-md">Explora las películas premiadas que definieron el año en el cine. Desde visuales impresionantes hasta actuaciones conmovedoras.</p>
          <Link to="/top" className="group flex items-center gap-2 text-white font-bold w-fit">
            Ver Colección <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/5 p-10 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Top Semanal</h3>
            <p className="text-white/40 text-sm">Lo más visto esta semana</p>
          </div>
          <div className="flex -space-x-4 mt-8">
            {topMovies.slice(0, 4).map((m, i) => (
              <img key={i} src={m.poster} className="w-16 h-16 rounded-full border-4 border-black object-cover" alt="" />
            ))}
            <div className="w-16 h-16 rounded-full border-4 border-black bg-brand-cyan flex items-center justify-center text-xs font-bold text-black">
              +12
            </div>
          </div>
        </div>
      </section>

      {/* For You Section */}
      <section className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-brand-cyan font-bold tracking-widest uppercase text-[10px]">
              <Sparkles size={12} />
              IA Potenciada
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Recomendado para ti</h2>
          </div>
          <Link to="/recomendaciones" className="text-sm font-bold text-white/40 hover:text-brand-cyan transition-colors">Ver todo</Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
          {recommendations.slice(0, 10).map((movie, index) => (
            <div key={movie.id} className="snap-start">
              <MovieCard movie={movie} index={index} compact />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}