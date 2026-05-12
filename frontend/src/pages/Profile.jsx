import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import ReviewCard from "../components/features/ReviewCard";
import MovieCard from "../components/features/MovieCard";
import { motion } from "framer-motion";
import { User, Calendar, Star, Film, Heart, Settings, LogOut } from "lucide-react";

export default function Profile() {
  const { activeUser, reviews, movies, userStats, recommendations, logout } = useApp();
  const userId = activeUser?.id;

  const myReviews = useMemo(() => reviews.filter((review) => review.userId === userId), [reviews, userId]);
  const watchedIds = useMemo(() => new Set(myReviews.map((review) => review.movieId)), [myReviews]);
  const watchAgain = useMemo(() => recommendations.filter((movie) => !watchedIds.has(movie.id)).slice(0, 4), [recommendations, watchedIds]);
  const favoriteGenre = userStats.favoriteGenre || activeUser?.favoriteGenres?.[0] || "N/A";

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Profile Header Card */}
      <section className="rounded-xl border border-[#eaeaea] bg-white p-8 md:p-10 shadow-sm">
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img 
              src={activeUser?.avatar || `https://ui-avatars.com/api/?name=${activeUser?.name || 'Usuario'}&background=random`} 
              alt={activeUser?.name} 
              className="h-24 w-24 md:h-32 md:w-32 rounded-full border border-[#eaeaea] object-cover" 
            />
          </div>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-4xl font-semibold text-[#111] tracking-tight">{activeUser?.name || "Invitado"}</h1>
              <div className="flex items-center justify-center md:justify-start gap-3 text-[#666] text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  Miembro desde {activeUser ? new Date(activeUser.joinedAt).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : "—"}
                </span>
                <span className="w-1 h-1 bg-[#ccc] rounded-full" />
                <span className="flex items-center gap-1.5 text-[#333]">
                  <Star size={14} className="text-[#888]" />
                  Miembro Premium
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              <button className="px-4 py-2 rounded-md bg-[#111] border border-[#111] text-white text-sm font-medium hover:bg-[#333] transition-colors flex items-center gap-2">
                <Settings size={14} />
                Editar Perfil
              </button>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-md bg-transparent border border-[#eaeaea] text-[#666] text-sm font-medium hover:text-[#111] hover:border-[#ccc] transition-colors flex items-center gap-2"
              >
                <LogOut size={14} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { label: "Vistas", value: userStats.moviesRated, icon: Film },
            { label: "Promedio", value: userStats.averageRatingGiven.toFixed(1), icon: Star },
            { label: "Fav Género", value: favoriteGenre, icon: Heart },
            { label: "Reseñas", value: myReviews.length, icon: Calendar }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded-lg bg-[#fafafa] border border-[#eaeaea]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-[#666]">{stat.label}</p>
                <stat.icon size={14} className="text-[#888]" />
              </div>
              <p className="text-2xl font-semibold text-[#111] tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews and Recommendations */}
      <div className="grid lg:grid-cols-5 gap-8">
        <section className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between border-b border-[#eaeaea] pb-4">
            <h2 className="text-xl font-medium text-[#111] tracking-tight">Tus Reseñas</h2>
            <span className="text-[#666] text-sm">
              {myReviews.length} en total
            </span>
          </div>
          
          <div className="grid gap-4">
            {myReviews.length ? (
              myReviews.map((review) => {
                const movie = movies.find((item) => item.id === review.movieId);
                return <ReviewCard key={review.id} review={review} user={activeUser} movie={movie} />;
              })
            ) : (
              <div className="p-10 rounded-xl border border-dashed border-[#ccc] bg-[#fafafa] flex flex-col items-center justify-center text-center">
                <Film className="text-[#aaa] mb-3" size={32} />
                <p className="text-[#666] text-sm mb-2">Aún no has reseñado ninguna película.</p>
                <Link to="/" className="text-[#111] font-medium text-sm hover:text-[#333] transition-colors">Empieza a explorar</Link>
              </div>
            )}
          </div>
        </section>

        <section className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between border-b border-[#eaeaea] pb-4">
            <h2 className="text-xl font-medium text-[#111] tracking-tight">Ver de nuevo</h2>
            <Link to="/recomendaciones" className="text-xs font-medium text-[#666] hover:text-[#111] transition-colors">Ver todo</Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {watchAgain.length ? (
              watchAgain.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} compact />
              ))
            ) : (
              <p className="col-span-2 text-[#666] text-center text-sm py-8 border border-dashed border-[#ccc] rounded-xl bg-[#fafafa]">No hay recomendaciones disponibles.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}