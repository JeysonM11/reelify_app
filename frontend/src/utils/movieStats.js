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
  return movies.map((movie) => {
    const movieReviews = reviews.filter((review) => review.movieId === movie.id);
    const avgRating = average(movieReviews.map((review) => review.rating));

    return {
      ...movie,
      avgRating: roundToTenth(avgRating),
      totalReviews: movieReviews.length,
    };
  });
};

export const getTopMovies = (movies, limit = 20) => {
  return [...movies]
    .sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews || left.title.localeCompare(right.title))
    .slice(0, limit);
};

export const getGenreAverageData = (movies, reviews) => {
  const allGenres = [...new Set(movies.flatMap((movie) => movie.genre))];

  return allGenres
    .map((genre) => {
      const genreRatings = reviews.filter((review) => movies.find((movie) => movie.id === review.movieId && movie.genre.includes(genre))).map((review) => review.rating);

      return {
        genre,
        avgRating: roundToTenth(average(genreRatings)),
        totalReviews: genreRatings.length,
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

export const getRecommendationsForUser = (userId, movies, reviews) => {
  const ratedMovieIds = new Set(getUserReviews(userId, reviews).map((review) => review.movieId));
  const topGenres = getUserTopGenres(userId, reviews, movies).slice(0, 2).map((entry) => entry.genre);

  return movies
    .filter((movie) => !ratedMovieIds.has(movie.id) && movie.genre.some((genre) => topGenres.includes(genre)))
    .sort((left, right) => right.avgRating - left.avgRating || right.totalReviews - left.totalReviews || left.title.localeCompare(right.title));
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

export const getMostReviewedMovieThisMonth = (movies, reviews) => {
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const counts = new Map();

  reviews.forEach((review) => {
    if (new Date(review.createdAt) < since) return;
    counts.set(review.movieId, (counts.get(review.movieId) || 0) + 1);
  });

  let bestId = null;
  let bestCount = 0;

  counts.forEach((count, movieId) => {
    if (count > bestCount) {
      bestId = movieId;
      bestCount = count;
    }
  });

  if (!bestId) return null;

  return { movie: movies.find((movie) => movie.id === bestId) || null, reviewCount: bestCount };
};
