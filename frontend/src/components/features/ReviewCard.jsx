import { Star, MessageSquare } from "lucide-react";
import { formatDate } from "../../utils/movieStats";
import { useApp } from "../../contexts/AppContext";
import { motion } from "framer-motion";

export default function ReviewCard({ review, user, movie }) {
  const { getUserById, getMovieById } = useApp();

  if (!review) return null;

  const userData = user || getUserById(review.userId) || { name: "Viewer", avatar: "" };
  const userData = user || getUserById(review.userId) || { name: "Usuario", avatar: "" };
  const movieData = movie || getMovieById(review.movieId) || null;

  return (
    <motion.article 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className={`p-4 rounded-xl border border-[#eaeaea] bg-[#fcfcfc] transition-all hover:bg-white hover:border-[#ccc] ${className}`}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <img 
              src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name || 'Usuario'}&background=random`} 
              alt={userData.name} 
              className="w-10 h-10 rounded-full object-cover border border-[#eaeaea]"
            />
            <div>
              <p className="text-sm font-medium text-[#111]">{userData.name || "Usuario Anónimo"}</p>
              {movieData && (
                <Link to={`/movie/${movieData.id}`} className="text-xs text-[#666] hover:text-[#111] transition-colors">
                  sobre <span className="font-medium text-[#333]">{movieData.title}</span>
                </Link>
              )}
              {!movieData && (
                <p className="text-[10px] text-[#888]">{new Date(review.createdAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-[#eaeaea]">
            <Star size={12} className="text-[#aaa] fill-[#aaa]" />
            <span className="text-xs font-semibold text-[#111]">{review.rating}</span>
          </div>
        </div>
        <p className="text-sm text-[#555] leading-relaxed line-clamp-3">
          {review.comment}
        </p>
      </div>
    </motion.article>
  );
}
