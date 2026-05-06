import Review from "../model/review.model.js";

export const getReviews = async (req, res) => {
  const reviews = await Review.find()
    .populate("usuario", "username email generos_favoritos")
    .populate("pelicula_id", "title description genero year");

  res.json(reviews);
};

export const crearReview = async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.json(review);
};

export const getReviewsByPelicula = async (req, res) => {
  const reviews = await Review.find({
    pelicula_id: req.params.peliculaId
  }).populate("usuario", "username email");

  res.json(reviews);
};