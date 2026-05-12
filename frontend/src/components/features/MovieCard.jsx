import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Play, Plus, Check } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export default function MovieCard({ movie, index = 0, compact = false }) {
  const { toggleWatchlist, isInWatchlist } = useApp();
  if (!movie) return null;

  const inWatchlist = isInWatchlist(movie.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`group relative flex flex-col gap-2 ${compact ? "w-40" : "w-full"}`}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="relative aspect-[2/3] overflow-hidden rounded-md border border-[#eaeaea] bg-[#fcfcfc] transition-all duration-300 group-hover:border-[#ccc] shadow-sm"
        aria-label={`Ver detalles de ${movie.title}`}
      >
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90" 
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/60 backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white shadow-md transition-transform hover:scale-105">
            <Play fill="white" size={16} className="ml-1" />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWatchlist(movie.id);
              }}
              title={inWatchlist ? "Quitar de la lista" : "Añadir a la lista"} 
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
                inWatchlist 
                  ? "bg-[#111] text-white border-[#111]" 
                  : "bg-white/80 text-[#111] border-[#ccc] hover:bg-white hover:border-[#111]"
              }`}
            >
              {inWatchlist ? <Check size={14} /> : <Plus size={14} />}
            </button>
          </div>
        </div>

      </Link>

      <div className="flex items-start justify-between gap-2 px-1 mt-1">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[#111] group-hover:text-[#666] transition-colors leading-tight">{movie.title}</p>
          <p className="truncate text-[11px] text-[#888] mt-0.5">{movie.year} {movie.genre[0] ? `• ${movie.genre[0]}` : ''}</p>
        </div>
        <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded text-[10px] font-medium border border-[#eaeaea]">
           <Star size={10} className="text-[#aaa] fill-[#aaa]" />
           <span className="text-[#333]">{movie.avgRating.toFixed(1)}</span>
        </div>
      </div>
    </motion.article>
  );
}
