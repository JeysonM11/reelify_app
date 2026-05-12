import express from "express";
import {
  getPeliculas,
  buscarPeliculas,
  crearPelicula,
  getPeliculaById,
  actualizarPelicula,
  eliminarPelicula
} from "../controllers/pelicula.controller.js";

const router = express.Router();

router.get("/", getPeliculas);
router.get("/buscar", buscarPeliculas);  // MUST be before /:id
router.post("/", crearPelicula);
router.get("/:id", getPeliculaById);
router.put("/:id", actualizarPelicula);
router.delete("/:id", eliminarPelicula);

export default router;