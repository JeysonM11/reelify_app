import { useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import MovieCard from "../components/features/MovieCard";
import GenreFilterChip from "../components/features/GenreFilterChip";

export default function RecomendacionesPage() {
  const { recommendations, genreAverages, activeUser, userStats } = useApp();
  const focusGenres = useMemo(() => genreAverages.slice(0, 5).map((item) => item.genre), [genreAverages]);

  return (
    <div className="space-y-10 px-4 py-6 text-stone-100 md:px-6 lg:px-10 lg:py-8">
      <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">For you</p>
        <h1 className="mt-3 font-serif text-5xl text-stone-50">Recommendations tuned to your taste</h1>
        <p className="mt-4 max-w-3xl text-stone-400">We use your highest-rated genres and exclude anything already rated. The list updates locally as soon as you leave new reviews.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {focusGenres.map((genre) => (
            <GenreFilterChip key={genre} active>
              {genre}
            </GenreFilterChip>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-stone-300">
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">Active viewer: {activeUser?.name || "Guest"}</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">Rated movies: {userStats.moviesRated}</span>
          <span className="rounded-full border border-white/10 bg-black/20 px-4 py-2">Avg rating: {userStats.averageRatingGiven.toFixed(1)}</span>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Recommended for you</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-50">Top matches right now</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recommendations.length ? recommendations.slice(0, 12).map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} />) : <p className="text-stone-400">Rate a few movies to generate personalized recommendations.</p>}
        </div>
      </section>
    </div>
  );
}