import Review from "../model/review.model.js";
import Usuario from "../model/usuario.model.js";
import Pelicula from "../model/pelicula.model.js";

// TOP 10 PELÍCULAS POR PROMEDIO DE CALIFICACIÓN
export const topPeliculas = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const data = await Review.aggregate([
      // $match: Filtrar reviews válidas (opcional: por año, fecha)
      {
        $match: {
          puntaje: { $gte: 1, $lte: 5 }
        }
      },
      // $group: Agrupar por película y calcular estadísticas
      {
        $group: {
          _id: "$pelicula_id",
          promedio: { $avg: "$puntaje" },
          totalReviews: { $sum: 1 },
          maxPuntaje: { $max: "$puntaje" },
          minPuntaje: { $min: "$puntaje" }
        }
      },
      // $lookup: Traer datos de la película
      {
        $lookup: {
          from: "peliculas",
          localField: "_id",
          foreignField: "_id",
          as: "pelicula"
        }
      },
      {
        $unwind: "$pelicula"
      },
      // $sort: Ordenar por promedio descendente
      {
        $sort: { promedio: -1 }
      },
      // $limit: Top N películas
      {
        $limit: parseInt(limit)
      },
      // $project: Proyectar solo campos necesarios
      {
        $project: {
          _id: 0,
          peliculaId: "$_id",
          titulo: "$pelicula.title",
          director: "$pelicula.director",
          generos: "$pelicula.genero",
          año: "$pelicula.year",
          promedio: { $round: ["$promedio", 2] },
          totalReviews: 1,
          maxPuntaje: 1,
          minPuntaje: 1
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PROMEDIO DE CALIFICACIÓN POR GÉNERO
export const promedioPorGenero = async (req, res) => {
  try {
    const data = await Review.aggregate([
      // $match: Filtrar reviews válidas
      {
        $match: {
          puntaje: { $gte: 1, $lte: 5 }
        }
      },
      // $lookup: Traer datos de la película
      {
        $lookup: {
          from: "peliculas",
          localField: "pelicula_id",
          foreignField: "_id",
          as: "pelicula"
        }
      },
      {
        $unwind: "$pelicula"
      },
      // Desunwind para films con múltiples géneros
      {
        $unwind: "$pelicula.genero"
      },
      // $group: Agrupar por género
      {
        $group: {
          _id: "$pelicula.genero",
          promedio: { $avg: "$puntaje" },
          totalReviews: { $sum: 1 },
          totalPeliculas: { $addToSet: "$pelicula_id" }
        }
      },
      // Contar películas únicas
      {
        $addFields: {
          totalPeliculasUnicas: { $size: "$totalPeliculas" }
        }
      },
      // $sort: Ordenar por promedio descendente
      {
        $sort: { promedio: -1 }
      },
      // $project: Proyectar solo campos necesarios
      {
        $project: {
          _id: 0,
          genero: "$_id",
          promedio: { $round: ["$promedio", 2] },
          totalReviews: 1,
          totalPeliculas: "$totalPeliculasUnicas"
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// RECOMENDACIONES POR GÉNERO FAVORITO DEL USUARIO
export const recomendaciones = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { limit = 10 } = req.query;

    // Validar que el usuario existe
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const data = await Review.aggregate([
      // $match: Filtrar reviews válidas
      {
        $match: {
          puntaje: { $gte: 3 } // Solo películas bien calificadas
        }
      },
      // $lookup: Traer datos de la película
      {
        $lookup: {
          from: "peliculas",
          localField: "pelicula_id",
          foreignField: "_id",
          as: "pelicula"
        }
      },
      {
        $unwind: "$pelicula"
      },
      // $match: Filtrar por géneros favoritos del usuario
      {
        $match: {
          "pelicula.genero": { $in: usuario.generos_favoritos }
        }
      },
      // $group: Agrupar por película
      {
        $group: {
          _id: "$pelicula_id",
          promedio: { $avg: "$puntaje" },
          totalReviews: { $sum: 1 },
          titulo: { $first: "$pelicula.title" },
          generos: { $first: "$pelicula.genero" },
          director: { $first: "$pelicula.director" },
          año: { $first: "$pelicula.year" }
        }
      },
      // $sort: Ordenar por promedio descendente
      {
        $sort: { promedio: -1 }
      },
      // $limit: Top N recomendaciones
      {
        $limit: parseInt(limit)
      },
      // $project: Proyectar datos limpios
      {
        $project: {
          _id: 0,
          peliculaId: "$_id",
          titulo: 1,
          director: 1,
          generos: 1,
          año: 1,
          promedio: { $round: ["$promedio", 2] },
          totalReviews: 1
        }
      }
    ]);

    res.json({
      usuario: usuario.username,
      generosPreferidos: usuario.generos_favoritos,
      recomendaciones: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ANÁLISIS DE PELÍCULAS POR AÑO Y RATING
export const analisisPorAño = async (req, res) => {
  try {
    const data = await Review.aggregate([
      {
        $match: {
          puntaje: { $gte: 1, $lte: 5 }
        }
      },
      {
        $lookup: {
          from: "peliculas",
          localField: "pelicula_id",
          foreignField: "_id",
          as: "pelicula"
        }
      },
      {
        $unwind: "$pelicula"
      },
      {
        $group: {
          _id: "$pelicula.year",
          promedio: { $avg: "$puntaje" },
          totalReviews: { $sum: 1 },
          totalPeliculas: { $addToSet: "$pelicula_id" }
        }
      },
      {
        $addFields: {
          totalPeliculasUnicas: { $size: "$totalPeliculas" }
        }
      },
      {
        $sort: { _id: -1 }
      },
      {
        $project: {
          _id: 0,
          año: "$_id",
          promedio: { $round: ["$promedio", 2] },
          totalReviews: 1,
          totalPeliculas: "$totalPeliculasUnicas"
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DISTRIBUCIÓN DE RATINGS (1-5 estrellas)
export const distribucionRatings = async (req, res) => {
  try {
    const data = await Review.aggregate([
      {
        $group: {
          _id: "$puntaje",
          cantidad: { $sum: 1 },
          porcentaje: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Calcular total para porcentajes
    const total = data.reduce((sum, item) => sum + item.cantidad, 0);
    
    const resultado = data.map(item => ({
      rating: item._id,
      cantidad: item.cantidad,
      porcentaje: ((item.cantidad / total) * 100).toFixed(2)
    }));

    res.json({
      totalReviews: total,
      distribucion: resultado
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
