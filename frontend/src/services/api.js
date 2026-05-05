const API = "http://localhost:3000/api";

export const getPeliculas = async () => {
  try {
    const res = await fetch(`${API}/peliculas`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching películas:", error);
    return [];
  }
};

export const getPeliculaById = async (id) => {
  try {
    const res = await fetch(`${API}/peliculas/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching película:", error);
    return null;
  }
};

export const getTopPeliculas = async () => {
  try {
    const res = await fetch(`${API}/stats/top`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching top películas:", error);
    return [];
  }
};

export const getPromedioPorGenero = async () => {
  try {
    const res = await fetch(`${API}/stats/generos`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching promedio por género:", error);
    return [];
  }
};

export const getRecomendaciones = async (usuarioId) => {
  try {
    const res = await fetch(`${API}/stats/recomendaciones/${usuarioId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching recomendaciones:", error);
    return [];
  }
};

export const getUsuarios = async () => {
  try {
    const res = await fetch(`${API}/usuarios`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching usuarios:", error);
    return [];
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const res = await fetch(`${API}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating usuario:", error);
    return null;
  }
};

export const crearReview = async (review) => {
  try {
    const res = await fetch(`${API}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creating review:", error);
    return null;
  }
};

export const getReviewsByPelicula = async (peliculaId) => {
  try {
    const res = await fetch(`${API}/reviews/pelicula/${peliculaId}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
