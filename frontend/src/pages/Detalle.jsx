import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import StarRating from "../components/features/StarRating";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";

export default function Detalle() {
  const { movieId } = useParams();
  const { getMovieById, reviews, users, addReview, similarMovies, activeUserId } = useApp();
  const movie = getMovieById(movieId);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const movieReviews = useMemo(() => reviews.filter((review) => review.movieId === movieId), [reviews, movieId]);
  const average = movieReviews.length ? movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length : movie?.avgRating || 0;
  const selectedUser = users.find((user) => user.id === activeUserId) || null;

  if (!movie) {
    return (
      <div className="px-6 py-10 text-stone-100">
        <p className="text-stone-400">Movie not found.</p>
        <Link to="/" className="mt-4 inline-flex rounded-full bg-amber-400 px-5 py-3 font-semibold text-stone-950">
          Back home
        </Link>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;

    addReview({ userId: activeUserId, movieId: movie.id, rating, comment });
    setComment("");
    setRating(5);
  };

  const similar = similarMovies(movie.id, 6);

  return (
    <div className="space-y-10 px-4 py-6 text-stone-100 md:px-6 lg:px-10 lg:py-8">
      <section className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
        <img src={movie.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25 blur-[2px]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,14,14,0.96)_0%,rgba(14,14,14,0.8)_45%,rgba(14,14,14,0.28)_100%)]" />
        <div className="relative grid gap-8 px-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <div className="mx-auto w-full max-w-sm lg:mx-0">
            <img src={movie.poster} alt={movie.title} className="aspect-[2/3] w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl shadow-black/40" />
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Movie detail</p>
            <h1 className="mt-4 font-serif text-5xl text-stone-50 md:text-7xl">{movie.title}</h1>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-stone-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{movie.year}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{movie.director}</span>
              {movie.genre.map((genre) => (
                <span key={genre} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{genre}</span>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 text-stone-300 md:text-lg">{movie.synopsis}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <StarRating value={average} label={`${movie.title} has ${average.toFixed(1)} stars`} readOnly />
              <span className="text-sm text-stone-400">{movieReviews.length} reviews</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Leave a review</p>
          <h2 className="mt-3 font-serif text-3xl text-stone-50">Rate it from your current profile</h2>
          <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
            <img src={selectedUser?.avatar} alt="" className="h-14 w-14 rounded-2xl border border-white/10 object-cover" />
            <div>
              <p className="text-stone-50">{selectedUser?.name || "Guest"}</p>
              <p className="text-sm text-stone-400">Posting as the active viewer</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-sm text-stone-400">Your rating</p>
            <StarRating value={rating} onChange={setRating} interactive label="Select rating" />
          </div>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write a brief reaction, what worked, what surprised you..."
            className="mt-6 min-h-36 w-full rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4 text-stone-100 placeholder:text-stone-500 focus:border-amber-300/40 focus:outline-none"
          />
          <button type="submit" className="mt-6 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300">
            Submit review
          </button>
        </form>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Reviews</p>
              <h2 className="mt-3 font-serif text-3xl text-stone-50">Audience reactions</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {movieReviews.length ? (
              movieReviews.map((review) => (
                <ReviewCard key={review.id} review={review} user={users.find((user) => user.id === review.userId)} movie={movie} />
              ))
            ) : (
              <p className="text-stone-400">Be the first to review this movie.</p>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/70">Similar movies</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-50">Shared genre, same mood</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {similar.map((item, index) => (
            <MovieCard key={item.id} movie={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}