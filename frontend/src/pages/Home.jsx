import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import HeroFeatureMovie from "../components/features/HeroFeatureMovie";
import MovieCard from "../components/features/MovieCard";
import GenreFilterChip from "../components/features/GenreFilterChip";

export default function Home() {
  const { featured, topMovies, recommendations, movies, genreAverages } = useApp();
  const [activeGenre, setActiveGenre] = useState("All");

  const trendingGenres = useMemo(() => ["All", ...genreAverages.slice(0, 8).map((item) => item.genre)], [genreAverages]);
  const trendingMovies = useMemo(() => {
    if (activeGenre === "All") return topMovies.slice(0, 10);
    return movies.filter((movie) => movie.genre.includes(activeGenre)).sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews).slice(0, 10);
  }, [activeGenre, movies, topMovies]);

  const rowTitle = activeGenre === "All" ? "Top rated" : `Trending in ${activeGenre}`;

  return (
    <div className="space-y-14 px-4 py-6 text-stone-100 md:px-6 lg:px-10 lg:py-8">
      <HeroFeatureMovie movie={featured} />

      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Top rated</p>
            <h2 className="mt-3 font-serif text-4xl text-stone-50">Highest rated films</h2>
          </div>
          <Link to="/top" className="text-sm text-amber-200 transition hover:text-amber-100">Open charts</Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-color:rgba(232,160,32,0.55)_rgba(255,255,255,0.06)]">
          {topMovies.slice(0, 8).map((movie, index) => (
            <div key={movie.id} className="w-48 shrink-0 md:w-52">
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Trending by genre</p>
            <h2 className="mt-3 font-serif text-4xl text-stone-50">{rowTitle}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingGenres.map((genre) => (
              <GenreFilterChip key={genre} active={activeGenre === genre} onClick={() => setActiveGenre(genre)}>
                {genre}
              </GenreFilterChip>
            ))}
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {trendingMovies.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Recommended for you</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-50">Built from your highest-rated genres</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {recommendations.slice(0, 8).map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}