import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Play, Plus } from "lucide-react";

export default function MovieCard({ movie, index = 0, compact = false }) {
  if (!movie) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative flex flex-col gap-4 ${compact ? "w-44" : "w-full"}`}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-2xl transition-all duration-500 group-hover:border-white/20 group-hover:shadow-brand-violet/10 group-hover:scale-[1.02]"
        aria-label={`View details for ${movie.title}`}
      >
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-50" 
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-violet/90 text-white shadow-xl backdrop-blur-sm transition-transform duration-500 hover:scale-110">
            <Play fill="white" size={24} className="ml-1" />
          </div>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-colors">
              <Plus size={20} />
            </button>
          </div>
        </div>

        {/* Info Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 pt-20 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
          <div className="flex items-center gap-2 mb-1">
            <Star size={12} className="text-brand-violet fill-brand-violet" />
            <span className="text-xs font-bold text-white">{movie.avgRating.toFixed(1)}</span>
            <span className="text-[10px] text-white/40">/ 5</span>
          </div>
          <h3 className="font-semibold text-lg leading-tight text-white line-clamp-1">{movie.title}</h3>
          <p className="mt-1 text-xs text-white/60 uppercase tracking-wider">{movie.year} • {movie.genre[0]}</p>
        </div>
      </Link>

      {!compact && (
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white/90 group-hover:text-white transition-colors">{movie.title}</p>
            <p className="truncate text-[11px] text-white/40 uppercase tracking-tight">{movie.director}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1 border border-white/5">
             <Star size={10} className="text-brand-violet fill-brand-violet" />
             <span className="text-[10px] font-bold text-white/80">{movie.avgRating.toFixed(1)}</span>
          </div>
        </div>
      )}
    </motion.article>
  );
}
