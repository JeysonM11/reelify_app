import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function RatingBarChart({ data = [] }) {
  const max = Math.max(5, ...data.map((item) => item.avgRating || 0));

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-brand-violet font-bold tracking-widest uppercase text-[10px]">
          <BarChart3 size={14} />
          Estadísticas
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {data.slice(0, 5).map((item, i) => {
          const width = `${(item.avgRating / max) * 100}%`;

          return (
            <div key={item.genre} className="space-y-2">
              <div className="flex justify-between text-xs font-bold tracking-tight">
                <span className="text-white/80">{item.genre}</span>
                <span className="text-brand-cyan">{item.avgRating.toFixed(1)} <span className="text-white/20">/ 5</span></span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan rounded-full" 
                />
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{item.totalReviews} reseñas</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
