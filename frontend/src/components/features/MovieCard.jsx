import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function MovieCard({ movie, index = 0, compact = false, onQuickReview }) {
  if (!movie) return null;

  return (
    <article
      className={`group relative flex flex-col gap-3 transition duration-500 ease-out animate-[fadeInUp_600ms_ease_both] ${compact ? "w-40" : "w-full"}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/40"
        aria-label={`Ver detalles de ${movie.title}`}
      >
        <img src={movie.poster} alt={movie.title} className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-[1.04] group-hover:brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 transition duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-6 p-5 text-stone-100 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-amber-300/90">{movie.genre.slice(0, 2).join(" · ")}</p>
          <h3 className="font-serif text-2xl leading-tight">{movie.title}</h3>
          <p className="mt-1 text-sm text-stone-300">{movie.year} · {movie.director}</p>
          <div className="mt-3 flex items-center gap-2">
            <StarRating value={movie.avgRating} size="sm" label={`${movie.title} tiene ${movie.avgRating} de 5`} readOnly />
          </div>
          <span className="mt-4 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
            View details
          </span>
        </div>
      </Link>

      <div className="flex items-center justify-between gap-3 px-1">
        <div className="min-w-0">
          <p className="truncate font-medium text-stone-100">{movie.title}</p>
          <p className="truncate text-sm text-stone-400">{movie.genre.slice(0, 2).join(" / ")}</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-100 transition hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200"
          onClick={() => onQuickReview?.(movie)}
        >
          Rate
        </button>
      </div>
    </article>
  );
}
