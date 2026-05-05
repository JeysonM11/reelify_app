import Pelicula from "../model/pelicula.model.js";

export const getPeliculas = async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
};

export const crearPelicula = async (req, res) => {
  const pelicula = new Pelicula(req.body);
  await pelicula.save();
  res.json(pelicula);
};

export const getPeliculaById = async (req, res) => {
  const pelicula = await Pelicula.findById(req.params.id);
  res.json(pelicula);
};

export const actualizarPelicula = async (req, res) => {
  const pelicula = await Pelicula.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(pelicula);
};

export const eliminarPelicula = async (req, res) => {
  await Pelicula.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Película eliminada" });
};