const formatters = new Map();

const getDateFormatter = (locale) => {
  if (!formatters.has(locale)) {
    formatters.set(locale, new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }));
  }

  return formatters.get(locale);
};

export const average = (values) => {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

export const roundToTenth = (value) => Math.round(value * 10) / 10;

export const formatDate = (value, locale = "es-ES") => {
  if (!value) return "";
  return getDateFormatter(locale).format(new Date(value));
};

export const buildMovieMetrics = (movies, reviews) => {
  // We no longer compute global averages from local reviews 
  // because we only load the active user's reviews to save bandwidth.
  // The backend provides the correct global avgRating and totalReviews.
  return movies;
};

export const getTopMovies = (movies, limit = 20) => {
  return [...movies]
    .sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews || left.title.localeCompare(right.title))
    .slice(0, limit);
};

export const getGenreAverageData = (movies) => {
  const allGenres = [...new Set(movies.flatMap((movie) => movie.genre))];

  return allGenres
    .map((genre) => {
      const genreMovies = movies.filter((movie) => movie.genre.includes(genre) && movie.avgRating > 0);
      const avgRating = genreMovies.length > 0 
        ? average(genreMovies.map((m) => m.avgRating)) 
        : 0;
      const totalReviews = genreMovies.reduce((sum, m) => sum + (m.totalReviews || 0), 0);

      return {
        genre,
        avgRating: roundToTenth(avgRating),
        totalReviews,
      };
    })
    .sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews);
};

export const getUserReviews = (userId, reviews) => reviews.filter((review) => review.userId === userId);

export const getUserTopGenres = (userId, reviews, movies) => {
  const userReviews = getUserReviews(userId, reviews);
  const genreScores = new Map();

  userReviews.forEach((review) => {
    const movie = movies.find((item) => item.id === review.movieId);
    if (!movie) return;

    movie.genre.forEach((genre) => {
      const score = genreScores.get(genre) || { total: 0, count: 0 };
      score.total += review.rating;
      score.count += 1;
      genreScores.set(genre, score);
    });
  });

  return [...genreScores.entries()]
    .map(([genre, score]) => ({ genre, avgRating: score.total / score.count, count: score.count }))
    .sort((left, right) => right.avgRating - left.avgRating || right.count - left.count);
};

export const getFavoriteGenre = (userId, reviews, movies) => {
  return getUserTopGenres(userId, reviews, movies)[0]?.genre || "";
};

export const getUserStats = (userId, reviews, movies) => {
  const userReviews = getUserReviews(userId, reviews);
  const avgRatingGiven = average(userReviews.map((review) => review.rating));

  return {
    moviesRated: userReviews.length,
    averageRatingGiven: roundToTenth(avgRatingGiven),
    favoriteGenre: getFavoriteGenre(userId, reviews, movies),
  };
};

export const getRecommendationsForUser = (userId, movies, reviews, favoriteGenres = []) => {
  const ratedMovieIds = new Set(getUserReviews(userId, reviews).map((review) => review.movieId));
  const userTopGenres = getUserTopGenres(userId, reviews, movies).slice(0, 2).map((entry) => entry.genre);
  
  // Combine top genres from ratings with favorite genres from registration
  const targetGenres = [...new Set([...userTopGenres, ...favoriteGenres])];

  const recommended = movies
    .filter((movie) => !ratedMovieIds.has(movie.id) && (targetGenres.length === 0 || movie.genre.some((genre) => targetGenres.includes(genre))))
    .sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews || left.title.localeCompare(right.title));

  return recommended;
};

export const getSimilarMovies = (movieId, movies, limit = 6) => {
  const baseMovie = movies.find((movie) => movie.id === movieId);
  if (!baseMovie) return [];

  return movies
    .filter((movie) => movie.id !== movieId && movie.genre.some((genre) => baseMovie.genre.includes(genre)))
    .sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews)
    .slice(0, limit);
};

export const getFeaturedMovie = (movies) => {
  return [...movies].sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews)[0] || null;
};

export const getMostReviewedMovieThisMonth = (movies) => {
  if (!movies.length) return null;
  // Pick the movie with the most reviews
  const sorted = [...movies].sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
  return sorted[0] || null;
};
