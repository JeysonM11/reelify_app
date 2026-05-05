import { useState } from "react";
import Rating from "./Rating";
import { crearReview } from "../../services/api";
import { useUser } from "../../contexts/UserContext";

export default function PeliculaCard({ pelicula, onClick }) {
  const { usuarioId } = useUser ? useUser() : { usuarioId: undefined };
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleRate = async (rating) => {
    setLoading(true);
    const response = await crearReview({
      usuario: usuarioId,
      pelicula_id: pelicula._id,
      puntaje: rating,
      comentario: "Buena película",
    });
    setMensaje(response?._id ? "⭐ Calificación guardada!" : "❌ Error al guardar");
    setLoading(false);
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-500/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      <div className="relative p-5 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition line-clamp-2">
            {pelicula.titulo || pelicula.title}
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {(pelicula.generos || pelicula.genero || []).map((g) => (
              <span key={g} className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded text-xs font-semibold">
                {g}
              </span>
            ))}
          </div>
          <div className="text-gray-400 text-sm line-clamp-3 min-h-[48px]">
            {pelicula.descripcion || pelicula.description}
          </div>
        </div>
        <div className="mt-4">
          <Rating onRate={handleRate} />
          {mensaje && <div className="text-xs mt-2 text-purple-400">{mensaje}</div>}
        </div>
      </div>
    </div>
  );
}
