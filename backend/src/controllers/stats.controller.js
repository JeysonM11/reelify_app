import Review from "../model/review.model.js";
import Usuario from "../model/usuario.model.js";

export const topPeliculas = async (req, res) => {
  try {
    const data = await Review.aggregate([
      {
        $group: {
          _id: "$pelicula_id",
          promedio: { $avg: "$puntaje" },
          totalReviews: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "peliculas",
          localField: "_id",
          foreignField: "_id",
          as: "pelicula",
        },
      },
      {
        $unwind: "$pelicula",
      },
      {
        $sort: { promedio: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const promedioPorGenero = async (req, res) => {
  try {
    const data = await Review.aggregate([
      {
        $lookup: {
          from: "peliculas",
          localField: "pelicula_id",
          foreignField: "_id",
          as: "pelicula",
        },
      },
      {
        $unwind: "$pelicula",
      },
      {
        $unwind: "$pelicula.genero",
      },
      {
        $group: {
          _id: "$pelicula.genero",
          promedio: { $avg: "$puntaje" },
        },
      },
      {
        $sort: { promedio: -1 },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const recomendaciones = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const usuario = await Usuario.findById(usuarioId);

    const data = await Review.aggregate([
      {
        $lookup: {
          from: "peliculas",
          localField: "pelicula_id",
          foreignField: "_id",
          as: "pelicula",
        },
      },
      {
        $unwind: "$pelicula",
      },
      {
        $match: {
          "pelicula.genero": { $in: usuario.generos_favoritos },
        },
      },
      {
        $group: {
          _id: "$pelicula_id",
          promedio: { $avg: "$puntaje" },
        },
      },
      {
        $sort: { promedio: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
