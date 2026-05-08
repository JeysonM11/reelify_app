import { useApp } from "../contexts/AppContext";
import RatingBarChart from "../components/features/RatingBarChart";
import { motion } from "framer-motion";
import { TrendingUp, Award, MessageSquare, Star } from "lucide-react";

export default function Top() {
  const { topMovies, genreAverages, mostReviewedThisMonth } = useApp();

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-brand-violet font-bold tracking-widest uppercase text-[10px]">
              <Award size={12} />
              Global Rankings
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Top 20 Cinema</h1>
            <p className="max-w-2xl text-white/40 text-lg leading-relaxed">
              Curated list of the highest-rated cinematic experiences based on community feedback and professional critiques.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-white/5 bg-black/20 backdrop-blur-xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[80px_100px_1fr_120px_120px] gap-6 px-8 py-5 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              <span>Rank</span>
              <span>Visual</span>
              <span>Details</span>
              <span className="text-center">Rating</span>
              <span className="text-right">Activity</span>
            </div>
            
            <div className="divide-y divide-white/5">
              {topMovies.map((movie, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={movie.id} 
                  className="grid grid-cols-1 md:grid-cols-[80px_100px_1fr_120px_120px] items-center gap-6 px-8 py-6 hover:bg-white/[0.03] transition-colors group cursor-pointer"
                >
                  <div className="text-3xl font-black text-white/10 group-hover:text-brand-violet transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  
                  <div className="relative aspect-[2/3] w-20 overflow-hidden rounded-xl border border-white/10">
                    <img src={movie.poster} alt="" className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="min-w-0">
                    <p className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors truncate">{movie.title}</p>
                    <p className="text-xs text-white/40 uppercase tracking-wider">{movie.year} • {movie.genre.slice(0, 2).join(" / ")}</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-black text-white">{movie.avgRating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-white/40 group-hover:text-white/60 transition-colors">
                      <MessageSquare size={14} />
                      <span className="text-sm font-medium">{movie.totalReviews}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-cyan/20 to-transparent backdrop-blur-3xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-cyan/20 blur-[60px] rounded-full group-hover:bg-brand-cyan/40 transition-colors" />
            <div className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-[10px] mb-6">
              <TrendingUp size={14} />
              Hot this Month
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2 leading-none">{mostReviewedThisMonth?.movie?.title || "Quiet Month"}</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {mostReviewedThisMonth 
                ? `Generating massive buzz with ${mostReviewedThisMonth.reviewCount} new reviews in the last 30 days.` 
                : "No standout movies have captured the spotlight this month."}
            </p>
            {mostReviewedThisMonth?.movie && (
               <img src={mostReviewedThisMonth.movie.poster} className="w-full h-48 object-cover rounded-2xl border border-white/10" alt="" />
            )}
          </div>
          
          <div className="p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl">
             <div className="flex items-center gap-2 text-white/40 font-bold tracking-widest uppercase text-[10px] mb-8">
              Genre Analysis
            </div>
            <RatingBarChart data={genreAverages} />
          </div>
        </div>
      </section>
    </div>
  );
}