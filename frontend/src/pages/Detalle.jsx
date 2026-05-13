import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";
import { motion } from "framer-motion";
import {
  Star,
  Play,
  Plus,
  Clock,
  ArrowLeft,
  Send,
  MessageSquare,
  Check,
} from "lucide-react";
import TrailerModal from "../components/features/TrailerModal";
import { getReviewsByMovie, getPeliculaById } from "../services/api";

export default function Detalle() {
  const { movieId } = useParams();

  const {
    getMovieById,
    reviews: globalReviews,
    users,
    addReview,
    similarMovies,
    activeUser,
    toggleWatchlist,
    isInWatchlist,
  } = useApp();

  const localMovie = getMovieById(movieId);

  const [fetchedMovie, setFetchedMovie] = useState(null);
  const movie = localMovie || fetchedMovie;

  const [localReviews, setLocalReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isLoadingMovie, setIsLoadingMovie] = useState(!localMovie);

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch película
  useEffect(() => {
    if (!localMovie && movieId) {
      setIsLoadingMovie(true);

      getPeliculaById(movieId)
        .then((data) => {
          if (data) {
            setFetchedMovie(data);
          }
        })
        .finally(() => {
          setIsLoadingMovie(false);
        });
    }
  }, [movieId, localMovie]);

  // Fetch reviews
  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoadingReviews(true);

      try {
        const data = await getReviewsByMovie(movieId);
        setLocalReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    if (movieId) {
      fetchMovieReviews();
    }
  }, [movieId]);

  // Combinar reviews locales y globales
  const movieReviews = useMemo(() => {
    const serverIds = new Set(localReviews.map((r) => r.id));

    const addedLocally = globalReviews.filter(
      (r) =>
        String(r.movieId) === String(movieId) &&
        !serverIds.has(r.id)
    );

    return [...localReviews, ...addedLocally];
  }, [globalReviews, localReviews, movieId]);

  const average = movieReviews.length
    ? movieReviews.reduce((sum, review) => sum + review.rating, 0) /
      movieReviews.length
    : movie?.avgRating || 0;

  const inWatchlist = movie
    ? isInWatchlist(movie.id)
    : false;

  // Loading
  if (isLoadingMovie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-white"></div>

        <p className="text-sm uppercase tracking-[0.3em] text-white/40">
          Cargando película...
        </p>
      </div>
    );
  }

  // Not found
  if (!movie) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
        <p className="text-xl text-white/50">
          Película no encontrada
        </p>

        <Link
          to="/"
          className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setSubmitting(true);

      await addReview({
        userId: activeUser?.id,
        movieId: movie.id,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Error publicando reseña:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const similar = similarMovies(movie.id, 6);

  return (
    <div className="space-y-16 animate-in fade-in duration-500">

      {/* HERO */}
      <section className="relative min-h-[70vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">

        {/* BACKDROP */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />

        {/* BACK BUTTON */}
        <Link
          to="/"
          className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Volver
        </Link>

        {/* CONTENT */}
        <div className="relative z-10 grid min-h-[70vh] items-center gap-10 p-8 lg:grid-cols-[320px_1fr] lg:p-14">

          {/* POSTER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto hidden w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 shadow-2xl lg:block"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >

            {/* GENRES */}
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-white/70 backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* TITLE */}
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl">
              {movie.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">

              <div className="flex items-center gap-2 text-white">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="font-semibold">
                  {average.toFixed(1)}
                </span>

                <span className="text-white/40">
                  ({movieReviews.length} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{movie.year}</span>
              </div>

              <div className="flex items-center gap-2">
                <Play size={16} />
                <span>{movie.duration || 120} min</span>
              </div>
            </div>

            {/* SYNOPSIS */}
            <p className="max-w-3xl text-lg leading-relaxed text-white/70">
              {movie.synopsis ||
                "Una experiencia cinematográfica visualmente impactante."}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => setIsTrailerOpen(true)}
                className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
              >
                <Play
                  size={18}
                  fill="currentColor"
                />
                Ver Trailer
              </button>

              <button
                onClick={() => toggleWatchlist(movie.id)}
                className={`flex items-center gap-2 rounded-2xl border px-6 py-3 font-semibold transition ${
                  inWatchlist
                    ? "border-green-500 bg-green-500/10 text-green-400"
                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                {inWatchlist ? (
                  <>
                    <Check size={18} />
                    En Mi Lista
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Añadir a Mi Lista
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="grid gap-12 lg:grid-cols-5">

        {/* REVIEW FORM */}
        <section className="space-y-6 lg:col-span-2">

          <h2 className="border-b border-white/10 pb-3 text-2xl font-semibold text-white">
            Añadir Reseña
          </h2>

          <div className="rounded-3xl border border-white/10 bg-[#111] p-6">

            <form
              onSubmit={handleReviewSubmit}
              className="space-y-6"
            >

              {/* RATING */}
              <div className="space-y-3">
                <label className="text-sm text-white/70">
                  Calificación
                </label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        size={30}
                        className={`transition ${
                          (hoverRating || rating) >= star
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white/20"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* COMMENT */}
              <div className="space-y-3">
                <label className="text-sm text-white/70">
                  Tu comentario
                </label>

                <textarea
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comparte tu opinión..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 p-4 text-white outline-none transition focus:border-white/30"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
              >
                <Send size={16} />

                {submitting
                  ? "Publicando..."
                  : "Publicar Reseña"}
              </button>
            </form>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="space-y-6 lg:col-span-3">

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-2xl font-semibold text-white">
              Comunidad
            </h2>

            <span className="text-sm text-white/50">
              {movieReviews.length} reseñas
            </span>
          </div>

          <div className="grid gap-4">

            {isLoadingReviews ? (
              <div className="py-16 text-center text-white/40">
                Cargando reseñas...
              </div>
            ) : movieReviews.length > 0 ? (
              movieReviews.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ReviewCard
                    review={r}
                    user={users.find((u) => u.id === r.userId)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-[#111] py-14 text-center">
                <MessageSquare
                  className="mx-auto mb-4 text-white/20"
                  size={36}
                />

                <p className="text-white/50">
                  Aún no hay reseñas.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* SIMILAR */}
      <section className="space-y-6 pb-10">

        <div className="border-b border-white/10 pb-3">
          <h2 className="text-2xl font-semibold text-white">
            Películas Similares
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {similar.map((item, index) => (
            <MovieCard
              key={item.id}
              movie={item}
              index={index}
              compact
            />
          ))}
        </div>
      </section>

      {/* MODAL */}
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        movieTitle={movie.title}
      />
    </div>
  );
}