import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";

export default function Profile() {
  const { activeUser, reviews, movies, userStats, recommendations, activeUserId } = useApp();

  const myReviews = useMemo(() => reviews.filter((review) => review.userId === activeUserId), [reviews, activeUserId]);
  const watchedIds = useMemo(() => new Set(myReviews.map((review) => review.movieId)), [myReviews]);
  const watchAgain = useMemo(() => recommendations.filter((movie) => !watchedIds.has(movie.id)).slice(0, 8), [recommendations, watchedIds]);
  const favoriteGenre = userStats.favoriteGenre || "—";

  return (
    <div className="space-y-10 px-4 py-6 text-stone-100 md:px-6 lg:px-10 lg:py-8">
      <section className="rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img src={activeUser?.avatar} alt={activeUser?.name || "User"} className="h-20 w-20 rounded-[1.5rem] border border-white/10 object-cover" />
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">My profile</p>
              <h1 className="mt-2 font-serif text-5xl text-stone-50">{activeUser?.name || "Guest viewer"}</h1>
              <p className="mt-2 text-stone-400">Member since {activeUser ? new Date(activeUser.joinedAt).getFullYear() : "—"}</p>
            </div>
          </div>
          <Link to="/" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200">
            Discover more
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-sm text-stone-400">Movies rated</p>
            <p className="mt-3 font-serif text-4xl text-stone-50">{userStats.moviesRated}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-sm text-stone-400">Average rating given</p>
            <p className="mt-3 font-serif text-4xl text-stone-50">{userStats.averageRatingGiven.toFixed(1)}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
            <p className="text-sm text-stone-400">Favorite genre</p>
            <p className="mt-3 font-serif text-4xl text-stone-50">{favoriteGenre}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">My reviews</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-50">Recent commentary</h2>
          <div className="mt-6 space-y-4">
            {myReviews.length ? (
              myReviews.map((review) => {
                const movie = movies.find((item) => item.id === review.movieId);
                const user = activeUser;
                return <ReviewCard key={review.id} review={review} user={user} movie={movie} />;
              })
            ) : (
              <p className="text-stone-400">You have not reviewed any movies yet.</p>
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Watch again?</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-50">Revisit these picks</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {watchAgain.length ? (
              watchAgain.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} compact />)
            ) : (
              <p className="text-stone-400">No more unreviewed recommendations right now.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}