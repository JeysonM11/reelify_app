import { useApp } from "../contexts/AppContext";
import RatingBarChart from "../components/features/RatingBarChart";

export default function Top() {
  const { topMovies, genreAverages, mostReviewedThisMonth } = useApp();

  return (
    <div className="space-y-10 px-4 py-6 text-stone-100 md:px-6 lg:px-10 lg:py-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Top charts</p>
          <h1 className="mt-3 font-serif text-5xl text-stone-50">Top 20 movies</h1>
          <p className="mt-3 max-w-2xl text-stone-400">Ranked by average rating, with total review count and genre structure computed entirely on the client.</p>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10">
            <div className="grid grid-cols-[72px_100px_1.2fr_1fr_120px_120px] gap-3 bg-black/30 px-4 py-3 text-xs uppercase tracking-[0.25em] text-stone-400">
              <span>Rank</span>
              <span>Poster</span>
              <span>Title</span>
              <span>Genre</span>
              <span className="text-right">Rating</span>
              <span className="text-right">Reviews</span>
            </div>
            <div className="divide-y divide-white/10">
              {topMovies.map((movie, index) => (
                <div key={movie.id} className="grid grid-cols-[72px_100px_1.2fr_1fr_120px_120px] items-center gap-3 px-4 py-4">
                  <div className="font-serif text-2xl text-amber-200">{String(index + 1).padStart(2, "0")}</div>
                  <img src={movie.poster} alt="" className="h-16 w-10 rounded-lg object-cover" />
                  <div>
                    <p className="font-medium text-stone-50">{movie.title}</p>
                    <p className="text-sm text-stone-400">{movie.year} · {movie.director}</p>
                  </div>
                  <div className="text-sm text-stone-300">{movie.genre.join(" / ")}</div>
                  <div className="text-right font-serif text-2xl text-stone-50">{movie.avgRating.toFixed(1)}</div>
                  <div className="text-right text-sm text-stone-400">{movie.totalReviews}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Most reviewed this month</p>
            <h2 className="mt-3 font-serif text-3xl text-stone-50">{mostReviewedThisMonth?.movie?.title || "No data yet"}</h2>
            <p className="mt-3 text-stone-400">{mostReviewedThisMonth ? `${mostReviewedThisMonth.reviewCount} reviews in the last 30 days` : "Not enough recent activity to highlight a movie."}</p>
          </div>
          <RatingBarChart data={genreAverages} />
        </div>
      </section>
    </div>
  );
}