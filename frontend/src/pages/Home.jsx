import { useEffect, useState } from "react";
import { getPeliculas } from "../services/api";
import PeliculaCard from "../components/features/PeliculaCard";
import Detalle from "./Detalle";
import TopPeliculas from "../components/features/TopPeliculas";
import Recomendaciones from "../components/features/Recomendaciones";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchPeliculas = async () => {
      setLoading(true);
      const data = await getPeliculas();
      setPeliculas(data);
      setLoading(false);
    };
    fetchPeliculas();
  }, []);

  if (selected) {
    return <Detalle pelicula={selected} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4 leading-tight">
            Descubre el<br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Cine Perfecto
            </span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Recomendaciones inteligentes basadas en tus gustos y preferencias
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Top Películas */}
        <TopPeliculas />

        {/* Recomendaciones */}
        <Recomendaciones />

        {/* All Movies */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">🎥</span>
            <div>
              <h2 className="text-white text-4xl font-bold">Catálogo Completo</h2>
              <p className="text-gray-400 text-sm mt-1">Todas las películas disponibles</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Cargando películas...</p>
            </div>
          ) : peliculas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No hay películas disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {peliculas.map((pelicula) => (
                <PeliculaCard key={pelicula._id} pelicula={pelicula} onClick={() => setSelected(pelicula)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
