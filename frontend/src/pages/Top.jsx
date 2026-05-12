import { useApp } from "../contexts/AppContext";
import RatingBarChart from "../components/features/RatingBarChart";
import { motion } from "framer-motion";
import { TrendingUp, Award, MessageSquare, Star } from "lucide-react";

export default function Top() {
  const { topMovies, genreAverages, mostReviewedThisMonth } = useApp();

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-2 pb-4 border-b border-[#eaeaea]">
            <h1 className="text-3xl font-semibold text-[#111] tracking-tight">Top 20 Películas</h1>
            <p className="text-[#555] text-base">
              Lista curada de las mejores experiencias cinematográficas basada en nuestra comunidad.
            </p>
          </div>

          <div className="rounded-xl border border-[#eaeaea] bg-white overflow-hidden shadow-sm">
            <div className="hidden md:grid grid-cols-[60px_80px_1fr_100px_100px] gap-4 px-6 py-3 border-b border-[#eaeaea] text-[11px] font-medium text-[#666] bg-[#fafafa]">
              <span>Ranking</span>
              <span>Póster</span>
              <span>Detalles</span>
              <span className="text-center">Calificación</span>
              <span className="text-right">Reseñas</span>
            </div>
            
            <div className="divide-y divide-[#eaeaea]">
              {topMovies.map((movie, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={movie.id} 
                  className="grid grid-cols-1 md:grid-cols-[60px_80px_1fr_100px_100px] items-center gap-4 px-6 py-4 hover:bg-[#fafafa] transition-colors cursor-pointer group"
                >
                  <div className="text-xl font-semibold text-[#888] group-hover:text-[#111] transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  
                  <div className="relative aspect-[2/3] w-14 overflow-hidden rounded-md border border-[#ccc]">
                    <img src={movie.poster} alt="" className="h-full w-full object-cover" />
                  </div>
                  
                  <div className="min-w-0">
                    <p className="text-base font-medium text-[#111] group-hover:text-[#333] truncate">{movie.title}</p>
                    <p className="text-xs text-[#666] mt-1">{movie.year} • {movie.genre.slice(0, 2).join(" / ")}</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#fafafa] border border-[#eaeaea]">
                      <Star size={12} className="text-[#aaa] fill-[#aaa]" />
                      <span className="text-xs font-medium text-[#333]">{movie.avgRating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-[#666]">
                      <MessageSquare size={12} />
                      <span className="text-xs font-medium">{movie.totalReviews}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-[#eaeaea] bg-white shadow-sm">
            <div className="flex items-center gap-2 text-[#666] font-medium text-xs mb-4">
              <TrendingUp size={14} />
              En Tendencia este Mes
            </div>
            <h2 className="text-xl font-medium text-[#111] mb-2">{mostReviewedThisMonth?.title || "Mes Tranquilo"}</h2>
            <p className="text-[#555] text-sm mb-4">
              {mostReviewedThisMonth 
                ? `Generó mucho interés con ${mostReviewedThisMonth.totalReviews} nuevas reseñas en los últimos 30 días.` 
                : "Ninguna película en particular ha captado la atención este mes."}
            </p>
            {mostReviewedThisMonth && (
               <img src={mostReviewedThisMonth.poster} className="w-full h-40 object-cover rounded-md border border-[#eaeaea]" alt="" />
            )}
          </div>
          
          <div className="p-6 rounded-xl border border-[#eaeaea] bg-white shadow-sm">
             <div className="text-[#666] font-medium text-xs mb-6">
              Análisis por Género
            </div>
            <RatingBarChart data={genreAverages} />
          </div>
        </div>
      </section>
    </div>
  );
}