import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";
import { motion } from "framer-motion";
import { Star, Play, Plus, Clock, Globe, ArrowLeft, Send } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <p className="text-white/40 text-xl font-medium">Movie not found.</p>
        <Link to="/" className="px-8 py-3 rounded-2xl bg-brand-violet text-white font-bold transition-all hover:scale-105">
          Return to Discovery
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
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Cinematic Banner */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-[3rem] border border-white/10">
        <img src={movie.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 blur-[4px] scale-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        
        <Link to="/" className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-white font-bold backdrop-blur-md hover:bg-white/10 transition-all">
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="relative h-full grid lg:grid-cols-[400px_1fr] items-end p-8 md:p-16 gap-12">
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="hidden lg:block aspect-[2/3] w-full rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
          >
            <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
          </motion.div>

          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-wrap gap-3">
              {movie.genre.map((genre) => (
                <span key={genre} className="px-4 py-1.5 rounded-full bg-brand-violet/20 border border-brand-violet/20 text-brand-violet text-[10px] font-black uppercase tracking-widest">
                  {genre}
                </span>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/60 font-medium">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">{average.toFixed(1)}</span>
                <span className="text-xs">({movieReviews.length} Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{movie.year}</span>
              </div>
               <div className="flex items-center gap-2">
                <Globe size={18} />
                <span>{movie.director}</span>
              </div>
            </div>

            <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
              {movie.synopsis}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black hover:bg-brand-cyan hover:text-white transition-all">
                <Play fill="currentColor" size={20} />
                WATCH TRAILER
              </button>
              <button className="flex items-center gap-3 px-6 py-5 rounded-2xl bg-white/10 text-white border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all">
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="grid lg:grid-cols-5 gap-16">
        <section className="lg:col-span-2 space-y-8">
           <div className="space-y-2">
             <div className="text-brand-violet font-bold tracking-widest uppercase text-[10px]">Interaction</div>
             <h2 className="text-3xl font-bold text-white tracking-tight">Share Your Review</h2>
           </div>

           <form onSubmit={handleSubmit} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl space-y-8">
             <div className="flex items-center gap-4">
               <img src={selectedUser?.avatar} className="w-12 h-12 rounded-xl object-cover border border-white/10" alt="" />
               <div>
                 <p className="text-white font-bold">{selectedUser?.name || "Guest"}</p>
                 <p className="text-[10px] text-white/30 uppercase tracking-widest">Active Profile</p>
               </div>
             </div>

             <div className="space-y-4">
               <p className="text-sm font-bold text-white/60">How would you rate it?</p>
               <div className="flex gap-2">
                 {[1, 2, 3, 4, 5].map((s) => (
                   <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all ${
                      rating >= s 
                        ? "bg-amber-400/10 border-amber-400 text-amber-400" 
                        : "bg-white/5 border-white/5 text-white/20"
                    }`}
                   >
                     <Star size={20} fill={rating >= s ? "currentColor" : "none"} />
                   </button>
                 ))}
               </div>
             </div>

             <div className="space-y-4">
               <textarea
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 placeholder="What did you think of this film?"
                 className="w-full min-h-[160px] p-6 rounded-2xl bg-black/40 border border-white/5 text-white placeholder:text-white/20 focus:border-brand-violet transition-colors resize-none"
               />
             </div>

             <button type="submit" className="w-full py-5 rounded-2xl bg-brand-violet text-white font-black hover:bg-brand-violet/80 transition-all flex items-center justify-center gap-2">
               <Send size={18} />
               POST REVIEW
             </button>
           </form>
        </section>

        <section className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tight">Audience Reactions</h2>
            <span className="text-white/40 text-sm font-bold uppercase tracking-widest">{movieReviews.length} total</span>
          </div>

          <div className="grid gap-6">
            {movieReviews.length ? (
               movieReviews.map((review) => (
                 <ReviewCard 
                   key={review.id} 
                   review={review} 
                   user={users.find((u) => u.id === review.userId)} 
                   movie={movie} 
                 />
               ))
            ) : (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
                <p className="text-white/20 font-bold uppercase tracking-widest">No reviews yet</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Similar Movies */}
      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight">Similar Experiences</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {similar.map((item, index) => (
            <MovieCard key={item.id} movie={item} index={index} compact />
          ))}
        </div>
      </section>
    </div>
  );
}