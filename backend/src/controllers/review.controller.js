import Review from "../model/review.model.js";

export const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .populate("usuario", "username email generos_favoritos")
      .populate("pelicula_id", "title description genero year director")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ fecha_review: -1 });

    const total = await Review.countDocuments();

    res.json({
      total,
      pagina: page,
      por_pagina: limit,
      total_paginas: Math.ceil(total / limit),
      reviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearReview = async (req, res) => {
  try {
    const { usuario, pelicula_id, puntaje, comentario } = req.body;

    // Validar campos requeridos
    if (!usuario || !pelicula_id || !puntaje) {
      return res.status(400).json({ 
        error: "Campos requeridos: usuario, pelicula_id, puntaje" 
      });
    }

    // Validar rango de puntaje
    if (puntaje < 1 || puntaje > 5) {
      return res.status(400).json({ 
        error: "El puntaje debe estar entre 1 y 5" 
      });
    }

    // Verificar si el usuario ya tiene review de esta película
    const reviewExistente = await Review.findOne({ usuario, pelicula_id });
    if (reviewExistente) {
      return res.status(400).json({ 
        error: "Este usuario ya tiene una review para esta película" 
      });
    }

    const review = new Review({
      usuario,
      pelicula_id,
      puntaje,
      comentario,
      fecha_review: new Date()
    });

    await review.save();
    await review.populate("usuario", "username email");
    await review.populate("pelicula_id", "title");

    res.status(201).json({
      mensaje: "Review creada exitosamente",
      review
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getReviewsByPelicula = async (req, res) => {
  try {
    const { peliculaId } = req.params;
    const { limit = 20 } = req.query;

    const reviews = await Review.find({ pelicula_id: peliculaId })
      .populate("usuario", "username email")
      .limit(parseInt(limit))
      .sort({ fecha_review: -1 });

    if (reviews.length === 0) {
      return res.status(404).json({ 
        error: "No hay reviews para esta película" 
      });
    }

    res.json({
      peliculaId,
      total: reviews.length,
      reviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { puntaje, comentario } = req.body;

    if (puntaje && (puntaje < 1 || puntaje > 5)) {
      return res.status(400).json({ 
        error: "El puntaje debe estar entre 1 y 5" 
      });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { puntaje, comentario },
      { new: true }
    ).populate("usuario", "username").populate("pelicula_id", "title");

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    res.json({
      mensaje: "Review actualizada exitosamente",
      review
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review no encontrada" });
    }

    res.json({ mensaje: "Review eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};