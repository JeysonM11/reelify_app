import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";
import { motion } from "framer-motion";
import { User, Calendar, Star, Film, Heart, Settings, LogOut } from "lucide-react";

export default function Profile() {
  const { activeUser, reviews, movies, userStats, recommendations, activeUserId } = useApp();

  const myReviews = useMemo(() => reviews.filter((review) => review.userId === activeUserId), [reviews, activeUserId]);
  const watchedIds = useMemo(() => new Set(myReviews.map((review) => review.movieId)), [myReviews]);
  const watchAgain = useMemo(() => recommendations.filter((movie) => !watchedIds.has(movie.id)).slice(0, 4), [recommendations, watchedIds]);
  const favoriteGenre = userStats.favoriteGenre || "N/A";

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Profile Header Card */}
      <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 p-8 md:p-12 backdrop-blur-3xl group">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-violet/20 blur-[100px] rounded-full group-hover:bg-brand-violet/30 transition-colors duration-700" />
        
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -inset-2 bg-gradient-to-tr from-brand-violet to-brand-cyan rounded-[2.5rem] blur-lg opacity-40" 
            />
            <img 
              src={activeUser?.avatar} 
              alt={activeUser?.name} 
              className="relative h-32 w-32 md:h-40 md:w-40 rounded-[2rem] border-2 border-white/20 object-cover shadow-2xl" 
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-brand-violet font-bold tracking-widest uppercase text-[10px]">
                <User size={12} />
                User Account
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">{activeUser?.name || "Guest"}</h1>
              <div className="flex items-center justify-center md:justify-start gap-4 text-white/40 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  Joined {activeUser ? new Date(activeUser.joinedAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) : "—"}
                </span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="flex items-center gap-1.5 text-brand-cyan">
                  <Star size={14} className="fill-brand-cyan/20" />
                  Premium Member
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                <Settings size={16} />
                Edit Profile
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all flex items-center gap-2">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Movies Rated", value: userStats.moviesRated, icon: Film, color: "text-brand-violet" },
            { label: "Avg Rating", value: userStats.averageRatingGiven.toFixed(1), icon: Star, color: "text-amber-400" },
            { label: "Fav Genre", value: favoriteGenre, icon: Heart, color: "text-pink-500" },
            { label: "Reviews", value: myReviews.length, icon: Calendar, color: "text-brand-cyan" }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
              <stat.icon size={20} className={`${stat.color} mb-3`} />
              <p className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews and Recommendations */}
      <div className="grid lg:grid-cols-5 gap-12">
        <section className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tight">Your Reviews</h2>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase">
              {myReviews.length} total
            </span>
          </div>
          
          <div className="grid gap-6">
            {myReviews.length ? (
              myReviews.map((review) => {
                const movie = movies.find((item) => item.id === review.movieId);
                return <ReviewCard key={review.id} review={review} user={activeUser} movie={movie} />;
              })
            ) : (
              <div className="p-12 rounded-[2rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center">
                <Film className="text-white/10 mb-4" size={48} />
                <p className="text-white/40 font-medium">You haven't reviewed any movies yet.</p>
                <Link to="/" className="mt-4 text-brand-violet font-bold text-sm hover:underline">Start exploring</Link>
              </div>
            )}
          </div>
        </section>

        <section className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white tracking-tight">Watch Again</h2>
            <Link to="/recomendaciones" className="text-xs font-bold text-brand-cyan uppercase tracking-wider hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {watchAgain.length ? (
              watchAgain.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} compact />
              ))
            ) : (
              <p className="col-span-2 text-white/20 text-center py-12">No recommendations available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}