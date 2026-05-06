import { useEffect, useState } from "react";
import { getPeliculaById, getRecomendaciones } from "../../services/api";
import { useUser } from "../../contexts/UserContext";
import PeliculaCard from "./PeliculaCard";

export default function Recomendaciones() {
  const { usuarioId } = useUser();
  const [recomendadas, setRecomendadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecomendaciones = async () => {
      setLoading(true);
      setError("");

      if (!usuarioId) {
        setRecomendadas([]);
        setError("Selecciona un usuario para ver recomendaciones.");
        setLoading(false);
        return;
      }

      const data = await getRecomendaciones(usuarioId);
      if (!Array.isArray(data)) {
        setError("No se pudieron cargar las recomendaciones.");
        setRecomendadas([]);
        setLoading(false);
        return;
      }
      if (data.length === 0) {
        setRecomendadas([]);
        setLoading(false);
        return;
      }

      const peliculas = await Promise.all(data.map((item) => getPeliculaById(item._id)));
      const merged = data
        .map((item, index) => ({
          ...item,
          pelicula: peliculas[index],
        }))
        .filter((item) => item.pelicula);

      setRecomendadas(merged);
      setLoading(false);
    };

    loadRecomendaciones();
  }, [usuarioId]);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">✨</span>
        <div>
          <h2 className="text-white text-4xl font-bold">Recomendadas para ti</h2>
          <p className="text-gray-400 text-sm mt-1">Basadas en tus generos favoritos</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Buscando recomendaciones...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
        </div>
      ) : recomendadas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Todavia no hay recomendaciones disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recomendadas.map((item) => (
            <div key={item._id} className="relative">
              <div className="absolute top-3 right-3 z-10 bg-black/70 text-yellow-300 text-xs px-2 py-1 rounded-full">
                {item.promedio?.toFixed(1) || "-"} ★
              </div>
              <PeliculaCard pelicula={item.pelicula} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
