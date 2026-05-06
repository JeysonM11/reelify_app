/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { appSeed } from "../data/mockData";
import { getBackendHealth, getPeliculas, getReviews, getUsuarios } from "../services/api";
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

const normalizeFallbackMovies = (movies) => movies.map((movie) => ({ ...movie }));
const normalizeFallbackUsers = (users) => users.map((user) => ({ ...user }));
const normalizeFallbackReviews = (reviews) => reviews.map((review) => ({ ...review }));

export function AppProvider({ children }) {
  const [users, setUsers] = useState(appSeed.users || []);
  const [rawMovies, setRawMovies] = useState(appSeed.movies || []);
  const [reviews, setReviews] = useState(appSeed.reviews || []);
  const [activeUserId, setActiveUserId] = useState(appSeed.activeUserId || (users[0] && users[0].id));

  useEffect(() => {
    let isMounted = true;

    const hydrateFromBackend = async () => {
      const health = await getBackendHealth();
      if (!health?.ok) return;

      const [backendMovies, backendUsers, backendReviews] = await Promise.all([getPeliculas(), getUsuarios(), getReviews()]);

      if (!isMounted) return;

      if (backendMovies.length) {
        const nextMovies = normalizeFallbackMovies(backendMovies);
        setRawMovies(nextMovies);
      }

      if (backendUsers.length) {
        const nextUsers = normalizeFallbackUsers(backendUsers);
        // Keep the active viewer aligned to the backend if possible.
        const existingActive = nextUsers.find((user) => user.id === activeUserId) || nextUsers[0] || null;
        if (existingActive) {
          setActiveUserId(existingActive.id);
        }
        setUsers(nextUsers);
      }

      if (backendReviews.length) {
        setReviews(normalizeFallbackReviews(backendReviews));
      }
    };

    hydrateFromBackend();

    return () => {
      isMounted = false;
    };
  }, []);

  const movies = useMemo(() => buildMovieMetrics(rawMovies, reviews), [rawMovies, reviews]);

  const getUserById = (id) => users.find((u) => u.id === id) || null;
  const getMovieById = (id) => movies.find((m) => m.id === id) || null;
  const activeUser = users.find((user) => user.id === activeUserId) || null;

  const addReview = ({ userId, movieId, rating, comment }) => {
    const id = `r-${String(Date.now()).slice(-6)}`;
    const newReview = { id, userId, movieId, rating: Number(rating), comment: comment || "", createdAt: new Date().toISOString() };

    setReviews((prev) => [newReview, ...prev]);
  };

  const topMovies = useMemo(() => getTopMovies(movies, 20), [movies]);
  const genreAverages = useMemo(() => getGenreAverageData(movies, reviews), [movies, reviews]);
  const userStats = useMemo(() => getUserStats(activeUserId, reviews, movies), [activeUserId, reviews, movies]);
  const recommendations = useMemo(() => getRecommendationsForUser(activeUserId, movies, reviews), [activeUserId, movies, reviews]);
  const featured = useMemo(() => getFeaturedMovie(movies), [movies]);
  const mostReviewedThisMonth = useMemo(() => getMostReviewedMovieThisMonth(movies, reviews), [movies, reviews]);

  const similarMovies = (movieId, limit = 6) => getSimilarMovies(movieId, movies, limit);

  const value = {
    users,
    movies,
    reviews,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
};
