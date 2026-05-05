import express from "express";
import {
  topPeliculas,
  promedioPorGenero,
  recomendaciones
} from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/top", topPeliculas);
router.get("/generos", promedioPorGenero);
router.get("/recomendaciones/:usuarioId", recomendaciones);

export default router;