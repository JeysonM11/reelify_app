import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";
import { motion } from "framer-motion";
import { Star, Play, Plus, Clock, Globe, ArrowLeft, Send, Check } from "lucide-react";
import TrailerModal from "../components/features/TrailerModal";
import { getReviewsByMovie, getPeliculaById } from "../services/api";

export default function Detalle() {
  const { movieId } = useParams();
  const { getMovieById, reviews: globalReviews, users, addReview, similarMovies, activeUser, toggleWatchlist, isInWatchlist } = useApp();
  const localMovie = getMovieById(movieId);
  const [fetchedMovie, setFetchedMovie] = useState(null);
  const movie = localMovie || fetchedMovie;
  const [localReviews, setLocalReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isLoadingMovie, setIsLoadingMovie] = useState(!localMovie);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Fetch movie from API if not in local state
  useEffect(() => {
    if (!localMovie && movieId) {
      setIsLoadingMovie(true);
      getPeliculaById(movieId)
        .then((data) => {
          if (data) setFetchedMovie(data);
        })
        .finally(() => setIsLoadingMovie(false));
    }
  }, [movieId, localMovie]);

  // Fetch reviews for this specific movie
  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoadingReviews(true);
      try {
        const data = await getReviewsByMovie(movieId);
        setLocalReviews(data);
      } catch (error) {
        console.error("Error fetching reviews for movie:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    if (movieId) {
      fetchMovieReviews();
    }
  }, [movieId]);

  const movieReviews = useMemo(() => {
    // Combine server reviews with locally-added reviews
    const serverIds = new Set(localReviews.map(r => r.id));
    const addedLocally = globalReviews.filter(r => String(r.movieId) === String(movieId) && !serverIds.has(r.id));
    return [...localReviews, ...addedLocally];
  }, [globalReviews, localReviews, movieId]);
  const average = movieReviews.length ? movieReviews.reduce((sum, review) => sum + review.rating, 0) / movieReviews.length : movie?.avgRating || 0;
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  if (isLoadingMovie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-cyan"></div>
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Cargando película...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <p className="text-white/40 text-xl font-medium">Película no encontrada.</p>
        <Link to="/" className="px-8 py-3 rounded-2xl bg-brand-violet text-white font-bold transition-all hover:scale-105">
          Volver a Inicio
        </Link>
      </div>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    addReview({ userId: activeUser?.id, movieId: movie.id, rating, comment });
    setComment("");
    setRating(5);
  };

  const similar = similarMovies(movie.id, 6);

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Cinematic Banner */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden rounded-xl border border-[#222] bg-[#111]">
        <img src={movie.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        
        <Link to="/" className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#222] border border-[#333] text-[#ededed] text-sm font-medium hover:bg-[#333] transition-colors">
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="relative h-full grid lg:grid-cols-[300px_1fr] items-end p-8 md:p-12 gap-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden lg:block aspect-[2/3] w-full rounded-lg border border-[#333] overflow-hidden shadow-lg bg-[#222]"
          >
            <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
          </motion.div>

          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {movie.genre.map((genre) => (
                <span key={genre} className="px-2 py-0.5 rounded text-xs font-medium bg-[#222] border border-[#333] text-[#ededed]">
                  {genre}
                </span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-[#888] text-sm">
              <div className="flex items-center gap-1.5 text-[#ededed]">
                <Star size={14} className="text-[#a1a1aa] fill-[#a1a1aa]" />
                <span className="font-medium">{average.toFixed(1)}</span>
                <span className="text-[#888]">({movieReviews.length} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{movie.year}</span>
              </div>
          <div className="flex flex-col justify-center gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#666]">
                <span className="px-2.5 py-1 rounded border border-[#eaeaea] bg-[#fafafa]">{movie.year}</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#eaeaea] bg-[#fafafa]">
                  <Clock size={12} /> {movie.duration || '120'} min
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#eaeaea] bg-white shadow-sm text-[#111]">
                  <Star size={12} className="text-[#aaa] fill-[#aaa]" /> {(movie.avgRating || 0).toFixed(1)} / 5
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-semibold text-[#111] tracking-tight">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-2">
                {movie.genre.map(g => (
                  <span key={g} className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5f5f5] text-[#555]">{g}</span>
                ))}
              </div>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[#555] leading-relaxed max-w-2xl text-sm md:text-base">
              {movie.synopsis || "Una experiencia cinematográfica que redefine los límites de la narrativa visual."}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap items-center gap-3 pt-4">
              <button onClick={() => setIsTrailerOpen(true)} className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111] text-white rounded-md font-medium hover:bg-[#333] transition-colors shadow-sm">
                <Play fill="currentColor" size={16} /> Ver Película
              </button>
              
              <button 
                onClick={() => toggleWatchlist(movie.id)}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium border transition-colors ${
                  inWatchlist 
                    ? "bg-white text-[#111] border-[#ccc]" 
                    : "bg-transparent text-[#666] border-[#eaeaea] hover:bg-[#fafafa]"
                }`}
              >
                {inWatchlist ? "Quitar de Mi Lista" : "Añadir a Mi Lista"}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-5 gap-12">
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-medium text-[#111] tracking-tight border-b border-[#eaeaea] pb-2">Añadir Reseña</h2>
            
          <div className="rounded-xl border border-[#eaeaea] bg-[#fcfcfc] p-6 shadow-sm">
            <form onSubmit={handleReviewSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#333]">Calificación</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          (hoverRating || rating) >= star ? "text-[#aaa] fill-[#aaa]" : "text-[#ddd]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#333]">Tu comentario</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="4"
                  className="w-full resize-none rounded-lg border border-[#eaeaea] bg-white p-3 text-sm text-[#111] placeholder:text-[#888] outline-none focus:border-[#ccc] transition-colors"
                  placeholder="Comparte tu opinión sobre la película..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-md bg-[#111] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333] disabled:opacity-50 shadow-sm"
              >
                <Send size={16} />
                {submitting ? "Publicando..." : "Publicar Reseña"}
              </button>
            </form>
          </div>
        </section>

        <section className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between border-b border-[#eaeaea] pb-2">
            <h2 className="text-xl font-medium text-[#111] tracking-tight">Comunidad</h2>
            <span className="text-sm text-[#666]">{movieReviews.length} reseñas</span>
          </div>
          
          <div className="grid gap-4">
            {isLoadingReviews ? (
              <div className="py-12 text-center text-[#888]">Cargando...</div>
            ) : movieReviews.length > 0 ? (
              movieReviews.map((r, i) => (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={r.id}>
                  <ReviewCard review={r} user={users.find(u => u.id === r.userId)} />
                </motion.div>
              ))
            ) : (
              <div className="py-12 text-center border border-dashed border-[#ccc] rounded-xl bg-[#fafafa]">
                <MessageSquare className="mx-auto text-[#aaa] mb-3" size={32} />
                <p className="text-[#666] text-sm">Aún no hay reseñas. ¡Sé el primero en compartir tu opinión!</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="space-y-6 pb-12">
        <div className="border-b border-[#eaeaea] pb-2">
          <h2 className="text-xl font-medium text-[#111] tracking-tight">Películas Similares</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similar.map((item, index) => (
            <MovieCard key={item.id} movie={item} index={index} compact />
          ))}
        </div>
      </section>

      <TrailerModal 
        isOpen={isTrailerOpen} 
        onClose={() => setIsTrailerOpen(false)} 
        movieTitle={movie.title} 
      />
    </div>
  );
}