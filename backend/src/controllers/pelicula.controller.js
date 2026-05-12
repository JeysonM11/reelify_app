import Pelicula from "../model/pelicula.model.js";

export const getPeliculas = async (req, res) => {
  try {
    const { page = 1, limit = 50, genero, year } = req.query;
    const skip = (page - 1) * limit;

    // Construir filtro dinámico
    const filtro = {};
    if (genero) {
      filtro.genero = { $in: [genero] };
    }
    if (year) {
      filtro.year = parseInt(year);
    }

    const peliculas = await Pelicula.find(filtro)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1, _id: 1 });

    const total = await Pelicula.countDocuments(filtro);

    res.json({
      total,
      pagina: parseInt(page),
      por_pagina: parseInt(limit),
      total_paginas: Math.ceil(total / limit),
      peliculas
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const buscarPeliculas = async (req, res) => {
  try {
    const { q = "" } = req.query;
    if (!q.trim()) {
      return res.json({ peliculas: [], total: 0 });
    }

    const peliculas = await Pelicula.find({
      title: { $regex: q, $options: "i" }
    })
      .limit(30)
      .sort({ rating: -1, _id: 1 });

    res.json({ peliculas, total: peliculas.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearPelicula = async (req, res) => {
  try {
    const { title, description, genero, year, director, rating } = req.body;

    // Validar campos requeridos
    if (!title || !description || !genero || !year) {
      return res.status(400).json({ 
        error: "Campos requeridos: title, description, genero (array), year" 
      });
    }

    // Validar que genero sea un array
    if (!Array.isArray(genero)) {
      return res.status(400).json({ 
        error: "El campo 'genero' debe ser un array" 
      });
    }

    // Validar año razonable
    if (year < 1800 || year > new Date().getFullYear()) {
      return res.status(400).json({ 
        error: `El año debe estar entre 1800 y ${new Date().getFullYear()}` 
      });
    }

    const pelicula = new Pelicula({
      title,
      description,
      genero,
      year,
      director: director || "Desconocido",
      rating: rating || 0
    });

    await pelicula.save();

    res.status(201).json({
      mensaje: "Película creada exitosamente",
      pelicula
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPeliculaById = async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, genero, year, director, rating } = req.body;

    // Validaciones opcionales si se proporcionan
    if (year && (year < 1800 || year > new Date().getFullYear())) {
      return res.status(400).json({ 
        error: `El año debe estar entre 1800 y ${new Date().getFullYear()}` 
      });
    }

    if (genero && !Array.isArray(genero)) {
      return res.status(400).json({ 
        error: "El campo 'genero' debe ser un array" 
      });
    }

    const pelicula = await Pelicula.findByIdAndUpdate(
      id,
      { title, description, genero, year, director, rating },
      { new: true, runValidators: true }
    );

    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.json({
      mensaje: "Película actualizada exitosamente",
      pelicula
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const pelicula = await Pelicula.findByIdAndDelete(id);

    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.json({ mensaje: "Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};