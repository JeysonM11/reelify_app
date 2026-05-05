import Review from "../model/review.model.js";

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