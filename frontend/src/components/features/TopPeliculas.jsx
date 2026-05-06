import { useEffect, useState } from "react";
import { getTopPeliculas } from "../../services/api";

export default function TopPeliculas() {
  const [topPeliculas, setTopPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTop = async () => {
      setLoading(true);
      setError("");
      const data = await getTopPeliculas();
      if (!Array.isArray(data)) {
        setError("No se pudo cargar el top de peliculas.");
        setTopPeliculas([]);
        setLoading(false);
        return;
      }
      setTopPeliculas(data);
      setLoading(false);
    };

    loadTop();
  }, []);

  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">🏆</span>
        <div>
          <h2 className="text-white text-4xl font-bold">Top 10 Peliculas</h2>
          <p className="text-gray-400 text-sm mt-1">Las mejor calificadas por la comunidad</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Cargando top...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
        </div>
      ) : topPeliculas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Aun no hay suficientes calificaciones.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {topPeliculas.map((item, index) => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl border border-gray-700/50 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-purple-400 text-sm font-semibold">#{index + 1} en el ranking</p>
                  <h3 className="text-white text-xl font-bold mt-1">
                    {item.pelicula?.title || item.pelicula?.titulo || "Sin titulo"}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-2xl font-bold">{item.promedio?.toFixed(1) || "-"}</p>
                  <p className="text-gray-500 text-xs">{item.totalReviews || 0} reviews</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(item.pelicula?.genero || []).map((g) => (
                  <span key={g} className="bg-purple-900/40 text-purple-300 px-2 py-1 rounded text-xs font-semibold">
                    {g}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3 line-clamp-3">
                {item.pelicula?.description || item.pelicula?.descripcion || "Sin descripcion"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
