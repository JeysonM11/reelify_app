import { useEffect, useState } from "react";

export default function Detalle({ pelicula }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/reviews/${pelicula._id}`)
      .then((res) => res.json())
      .then(setReviews);
  }, [pelicula]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">{pelicula.titulo || pelicula.title}</h1>
      <p>{(pelicula.generos || pelicula.genero || []).join(", ")}</p>

      <h2 className="mt-6 text-xl">⭐ Reviews</h2>

      {reviews.map((r) => (
        <div key={r._id} className="bg-gray-800 p-3 mt-2 rounded">
          <p><strong>{r.usuario_id?.nombre || r.usuario?.nombre || "Usuario"}</strong></p>
          <p>⭐ {r.rating || r.puntaje}</p>
          <p>{r.comentario}</p>
        </div>
      ))}
    </div>
  );
}
