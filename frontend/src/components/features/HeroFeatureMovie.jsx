import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function HeroFeatureMovie({ movie, onExplore, onWatchlist }) {
  if (!movie) return null;

  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-stone-950 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
      <img src={movie.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,160,32,0.24),transparent_34%),linear-gradient(120deg,rgba(0,0,0,0.92),rgba(0,0,0,0.45))]" />
      <div className="relative grid min-h-[36rem] gap-10 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-col justify-end gap-6">
          <p className="text-xs uppercase tracking-[0.38em] text-amber-300/90">Featured movie of the week</p>
          <div>
            <h2 className="max-w-xl font-serif text-5xl leading-[0.95] text-stone-50 md:text-7xl">{movie.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-stone-300 md:text-lg">{movie.synopsis}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-stone-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{movie.year}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{movie.director}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{movie.genre.join(" · ")}</span>
          </div>
          <div className="flex items-center gap-3">
            <StarRating value={movie.avgRating} label={`${movie.title} tiene ${movie.avgRating} estrellas`} readOnly />
            <span className="text-sm text-stone-400">{movie.totalReviews} reviews</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
              onClick={() => onExplore?.(movie)}
            >
              Explore film
            </Link>
            <button
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200"
              onClick={() => onWatchlist?.(movie)}
            >
              Save for later
            </button>
          </div>
        </div>
        <div className="hidden items-end justify-end md:flex">
          <div className="max-w-sm rounded-[2rem] border border-white/10 bg-black/35 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.32em] text-stone-400">Visual note</p>
            <p className="mt-4 text-2xl font-medium text-stone-100">{movie.genre[0]} · {movie.genre[1] || movie.genre[0]}</p>
            <p className="mt-3 text-sm leading-6 text-stone-300">An editorial showcase built to feel like a film poster and a magazine cover at once.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
