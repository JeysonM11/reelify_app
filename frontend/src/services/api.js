import { generateAvatarDataUri, generatePosterDataUri } from "../utils/visualAssets";

export const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const fetchJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `HTTP ${res.status}`);
  }
  return res.json();
};

export const normalizeMovie = (movie, index = 0) => ({
  id: movie._id || movie.id || `movie-${index}`,
  title: movie.title || movie.titulo || "Untitled movie",
  genre: movie.genre || movie.genero || [],
  year: movie.year || new Date(movie.createdAt || Date.now()).getFullYear(),
  director: movie.director || movie.directorName || "Unknown director",
  poster:
    movie.poster ||
    generatePosterDataUri({
      title: movie.title || movie.titulo || "Untitled movie",
      subtitle: (movie.genero || movie.genre || []).slice(0, 2).join(" · ") || movie.description || movie.descripcion || "CINEMATIC EDITION",
      accentSeed: movie._id || movie.id || String(index),
    }),
  synopsis: movie.synopsis || movie.description || movie.descripcion || "No synopsis available.",
  avgRating: Number(movie.avgRating || movie.promedio || 0),
  totalReviews: Number(movie.totalReviews || movie.reviewsCount || 0),
});

export const normalizeUser = (user, index = 0) => ({
  id: user._id || user.id || `user-${index}`,
  name: user.name || user.username || "Viewer",
  avatar:
    user.avatar ||
    generateAvatarDataUri({
      name: user.name || user.username || "Viewer",
      accentSeed: user._id || user.id || String(index),
    }),
  joinedAt: user.joinedAt || user.createdAt || new Date().toISOString(),
  favoriteGenres: user.favoriteGenres || user.generos_favoritos || [],
});

export const normalizeReview = (review, index = 0) => ({
  id: review._id || review.id || `review-${index}`,
  userId: review.userId || review.usuario?._id || review.usuario || null,
  movieId: review.movieId || review.pelicula_id?._id || review.pelicula_id || null,
  rating: Number(review.rating || review.puntaje || 0),
  comment: review.comment || review.comentario || "",
  createdAt: review.createdAt || review.updatedAt || new Date().toISOString(),
  user: review.usuario ? normalizeUser(review.usuario, index) : null,
  movie: review.pelicula_id ? normalizeMovie(review.pelicula_id, index) : null,
});

export const getPeliculas = async () => {
  try {
    const data = await fetchJson(`${API}/peliculas`);
    return Array.isArray(data) ? data.map((movie, index) => normalizeMovie(movie, index)) : [];
  } catch (error) {
    console.error("Error fetching películas:", error);
    return [];
  }
};

export const getPeliculaById = async (id) => {
  try {
    const data = await fetchJson(`${API}/peliculas/${id}`);
    return data ? normalizeMovie(data) : null;
  } catch (error) {
    console.error("Error fetching película:", error);
    return null;
  }
};

export const getTopPeliculas = async () => {
  try {
    const data = await fetchJson(`${API}/stats/top`);
    return Array.isArray(data)
      ? data.map((item, index) => ({
          id: item._id || item.id || `top-${index}`,
          promedio: Number(item.promedio || 0),
          totalReviews: Number(item.totalReviews || 0),
          pelicula: item.pelicula ? normalizeMovie(item.pelicula, index) : null,
        }))
      : [];
  } catch (error) {
    console.error("Error fetching top películas:", error);
    return [];
  }
};

export const getPromedioPorGenero = async () => {
  try {
    const data = await fetchJson(`${API}/stats/generos`);
    return Array.isArray(data)
      ? data.map((item) => ({
          genre: item._id || item.genre || item.genero || "Unknown",
          avgRating: Number(item.promedio || item.avgRating || 0),
          totalReviews: Number(item.totalReviews || item.count || 0),
        }))
      : [];
  } catch (error) {
    console.error("Error fetching promedio por género:", error);
    return [];
  }
};

export const getRecomendaciones = async (usuarioId) => {
  try {
    const data = await fetchJson(`${API}/stats/recomendaciones/${usuarioId}`);
    return Array.isArray(data)
      ? data.map((item, index) => ({
          id: item._id || item.id || `rec-${index}`,
          promedio: Number(item.promedio || 0),
          pelicula: item.pelicula ? normalizeMovie(item.pelicula, index) : null,
        }))
      : [];
  } catch (error) {
    console.error("Error fetching recomendaciones:", error);
    return [];
  }
};

export const getUsuarios = async () => {
  try {
    const data = await fetchJson(`${API}/usuarios`);
    return Array.isArray(data) ? data.map((user, index) => normalizeUser(user, index)) : [];
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return [];
  }
};

export const crearUsuario = async (usuario) => {
  try {
    return await fetchJson(`${API}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
  } catch (error) {
    console.error("Error creating usuario:", error);
    return null;
  }
};

export const crearReview = async (review) => {
  try {
    return await fetchJson(`${API}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return null;
  }
};

export const getReviewsByPelicula = async (peliculaId) => {
  try {
    const data = await fetchJson(`${API}/reviews/pelicula/${peliculaId}`);
    return Array.isArray(data) ? data.map((review, index) => normalizeReview(review, index)) : [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const getReviews = async () => {
  try {
    const data = await fetchJson(`${API}/reviews`);
    return Array.isArray(data) ? data.map((review, index) => normalizeReview(review, index)) : [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const getBackendHealth = async () => {
  try {
    return await fetchJson(`${API}/health`);
  } catch (error) {
    console.error("Error fetching backend health:", error);
    return null;
  }
};
