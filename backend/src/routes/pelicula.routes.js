import express from "express";
import {
  getPeliculas,
  crearPelicula,
  getPeliculaById,
  actualizarPelicula,
  eliminarPelicula
} from "../controllers/pelicula.controller.js";

const router = express.Router();

router.get("/", getPeliculas);
router.post("/", crearPelicula);
router.get("/:id", getPeliculaById);
router.put("/:id", actualizarPelicula);
router.delete("/:id", eliminarPelicula);

export default router;