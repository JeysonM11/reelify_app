/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { appSeed } from "../data/mockData";
import { getBackendHealth, getPeliculas, getReviews, getUsuarios, login as apiLogin, register as apiRegister, normalizeUser, normalizeMovie, normalizeReview, createReview, searchPeliculas } from "../services/api";
import {
  buildMovieMetrics,
  getTopMovies,
  getGenreAverageData,
  getUserStats,
  getRecommendationsForUser,
  getSimilarMovies,
  getFeaturedMovie,
  getMostReviewedMovieThisMonth,
} from "../utils/movieStats";

const AppContext = createContext(null);

const normalizeFallbackMovies = (movies) => movies.map((movie, index) => normalizeMovie(movie, index));
const normalizeFallbackUsers = (users) => users.map((user, index) => normalizeUser(user, index));
const normalizeFallbackReviews = (reviews) => reviews.map((review, index) => normalizeReview(review, index));

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [rawMovies, setRawMovies] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Auth state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("reelify_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("reelify_token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const [activeUserId, setActiveUserId] = useState(user?.id || null);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("");

  // Watchlist state
  const [watchlistIds, setWatchlistIds] = useState(() => {
    const saved = localStorage.getItem("reelify_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Force re-normalization of user to update avatar design for existing sessions
  useEffect(() => {
    if (user) {
      const refreshedUser = normalizeUser(user);
      setUser(refreshedUser);
      localStorage.setItem("reelify_user", JSON.stringify(refreshedUser));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const hydrateFromBackend = async () => {
      try {
        const health = await getBackendHealth();
        if (!health?.ok) {
          setIsLoading(false);
          return;
        }

        // Load all movies by paginating (50 per page)
        let allMovies = [];
        let page = 1;
        let hasMore = true;
        while (hasMore) {
          const batch = await getPeliculas(page, 50);
          if (!isMounted) return;
          if (batch.length > 0) {
            allMovies = [...allMovies, ...batch];
            page++;
          }
          if (batch.length < 50) hasMore = false;
        }

        if (allMovies.length > 0) {
          setRawMovies(allMovies);
        }

        // Load users
        const backendUsers = await getUsuarios();
        if (!isMounted) return;
        if (backendUsers.length > 0) {
          setUsers(backendUsers);
          const existingActive = backendUsers.find((u) => u.id === activeUserId) || backendUsers[0];
          if (existingActive && !activeUserId) {
            setActiveUserId(existingActive.id);
          }
        }

        // Reviews are fetched per-movie in Detalle.jsx, no need to bulk load here
        console.log(`Reelify: ${allMovies.length} películas cargadas desde el backend`);
      } catch (error) {
        console.error("Error hydrating from backend:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    hydrateFromBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch reviews for the active user
  useEffect(() => {
    let isMounted = true;
    if (activeUserId) {
      getReviews(activeUserId).then((userReviews) => {
        if (isMounted) {
          setReviews(userReviews);
        }
      });
    } else {
      setReviews([]);
    }
    return () => { isMounted = false; };
  }, [activeUserId]);

  const movies = useMemo(() => buildMovieMetrics(rawMovies, reviews), [rawMovies, reviews]);

  const getUserById = (id) => users.find((u) => u.id === id) || null;
  const getMovieById = (id) => movies.find((m) => m.id === id) || null;
  const activeUser = isAuthenticated ? user : (users.find((u) => u.id === activeUserId) || null);

  const login = async (email, password) => {
    try {
      const data = await apiLogin(email, password);
      const normalizedUser = normalizeUser(data.usuario);
      setUser(normalizedUser);
      setToken(data.token);
      setIsAuthenticated(true);
      setActiveUserId(normalizedUser.id);
      localStorage.setItem("reelify_user", JSON.stringify(normalizedUser));
      localStorage.setItem("reelify_token", data.token);
      return data;
    } catch (error) {
      throw new Error(error.message || "Error al iniciar sesión");
    }
  };

  const register = async (userData) => {
    try {
      const data = await apiRegister(userData);
      const normalizedUser = normalizeUser(data.usuario);
      setUser(normalizedUser);
      setToken(data.token);
      setIsAuthenticated(true);
      setActiveUserId(normalizedUser.id);
      localStorage.setItem("reelify_user", JSON.stringify(normalizedUser));
      localStorage.setItem("reelify_token", data.token);
      return data;
    } catch (error) {
      throw new Error(error.message || "Error al registrarse");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("reelify_user");
    localStorage.removeItem("reelify_token");
  };

  const toggleWatchlist = (movieId) => {
    setWatchlistIds(prev => {
      const next = prev.includes(movieId) 
        ? prev.filter(id => id !== movieId) 
        : [...prev, movieId];
      localStorage.setItem("reelify_watchlist", JSON.stringify(next));
      return next;
    });
  };

  const addReview = async ({ userId, movieId, rating, comment }) => {
    try {
      const response = await createReview({ userId, movieId, rating, comment });
      const newReview = response.review;
      const normalized = {
        id: newReview._id || newReview.id,
        userId: newReview.usuario?._id || newReview.usuario,
        movieId: newReview.pelicula_id?._id || newReview.pelicula_id,
        rating: Number(newReview.puntaje),
        comment: newReview.comentario,
        createdAt: newReview.fecha_review
      };
      setReviews((prev) => [normalized, ...prev]);
      return normalized;
    } catch (error) {
      console.error("Failed to add review:", error);
      throw error;
    }
  };

  const topMovies = useMemo(() => getTopMovies(movies, 20), [movies]);
  const genreAverages = useMemo(() => getGenreAverageData(movies), [movies]);
  const userStats = useMemo(() => getUserStats(activeUserId, reviews, movies), [activeUserId, reviews, movies]);
  const recommendations = useMemo(() => getRecommendationsForUser(activeUserId, movies, reviews, activeUser?.favoriteGenres), [activeUserId, movies, reviews, activeUser?.favoriteGenres]);
  const featured = useMemo(() => getFeaturedMovie(movies), [movies]);
  const mostReviewedThisMonth = useMemo(() => getMostReviewedMovieThisMonth(movies), [movies]);

  const [apiSearchResults, setApiSearchResults] = useState([]);
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        const results = await searchPeliculas(searchQuery);
        setApiSearchResults(results);
      } else {
        setApiSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // Combinar resultados de la API con los locales para máxima cobertura
    const query = searchQuery.toLowerCase();
    const localMatches = movies.filter(m => 
      m.title.toLowerCase().includes(query) || 
      m.genre.some(g => g.toLowerCase().includes(query))
    );
    
    const apiIds = new Set(apiSearchResults.map(m => m.id));
    return [...apiSearchResults, ...localMatches.filter(m => !apiIds.has(m.id))];
  }, [movies, searchQuery, apiSearchResults]);

  const watchlist = useMemo(() => 
    movies.filter(m => watchlistIds.includes(m.id)), 
    [movies, watchlistIds]
  );

  const isInWatchlist = (movieId) => watchlistIds.includes(movieId);

  const similarMovies = (movieId, limit = 6) => getSimilarMovies(movieId, movies, limit);

  const value = {
    users,
    movies,
    reviews,
    isLoading,
    activeUserId,
    setActiveUserId,
    activeUser,
    addReview,
    getUserById,
    getMovieById,
    topMovies,
    genreAverages,
    userStats,
    recommendations,
    featured,
    mostReviewedThisMonth,
    similarMovies,
    user,
    token,
    isAuthenticated,
    login,
    register,
    logout,
    searchQuery,
    setSearchQuery,
    searchResults,
    watchlist,
    toggleWatchlist,
    isInWatchlist
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
};
