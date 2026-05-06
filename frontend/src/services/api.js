const API = "http://localhost:3000/api";

const fetchJson = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `HTTP ${res.status}`);
  }
  return res.json();
};

export const getPeliculas = async () => {
  try {
    return await fetchJson(`${API}/peliculas`);
  } catch (error) {
    console.error("Error fetching películas:", error);
    return [];
  }
};

export const getPeliculaById = async (id) => {
  try {
    return await fetchJson(`${API}/peliculas/${id}`);
  } catch (error) {
    console.error("Error fetching película:", error);
    return null;
  }
};

export const getTopPeliculas = async () => {
  try {
    return await fetchJson(`${API}/stats/top`);
  } catch (error) {
    console.error("Error fetching top películas:", error);
    return [];
  }
};

export const getPromedioPorGenero = async () => {
  try {
    return await fetchJson(`${API}/stats/generos`);
  } catch (error) {
    console.error("Error fetching promedio por género:", error);
    return [];
  }
};

export const getRecomendaciones = async (usuarioId) => {
  try {
    return await fetchJson(`${API}/stats/recomendaciones/${usuarioId}`);
  } catch (error) {
    console.error("Error fetching recomendaciones:", error);
    return [];
  }
};

export const getUsuarios = async () => {
  try {
    return await fetchJson(`${API}/usuarios`);
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
    return await fetchJson(`${API}/reviews/pelicula/${peliculaId}`);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
