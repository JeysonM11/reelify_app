import { Star, MessageSquare } from "lucide-react";
import { formatDate } from "../../utils/movieStats";
import { useApp } from "../../contexts/AppContext";
import { motion } from "framer-motion";

export default function ReviewCard({ review, user, movie }) {
  const { getUserById, getMovieById } = useApp();

  if (!review) return null;

  const userData = user || getUserById(review.userId) || { name: "Viewer", avatar: "" };
  const movieData = movie || getMovieById(review.movieId) || null;

  return (
    <motion.article 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative flex gap-5 p-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:bg-white/[0.06] transition-all duration-300"
    >
      <div className="relative shrink-0">
        <img src={userData.avatar} alt={userData.name} className="h-12 w-12 rounded-2xl object-cover border border-white/10" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-violet rounded-full flex items-center justify-center text-white border-2 border-black">
          <MessageSquare size={10} fill="currentColor" />
        </div>
      </div>

      <div className="flex-1 space-y-3 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-white font-bold truncate group-hover:text-brand-cyan transition-colors">{userData.name}</h4>
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">
              {movieData?.title ? <span className="text-brand-violet">{movieData.title}</span> : "Review"} • {formatDate(review.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/5">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-black text-white">{review.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-white/70 leading-relaxed italic">"{review.comment}"</p>
      </div>
    </motion.article>
  );
}
