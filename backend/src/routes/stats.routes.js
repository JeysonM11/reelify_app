import express from "express";
import {
  topPeliculas,
  promedioPorGenero,
  recomendaciones,
  analisisPorAño,
  distribucionRatings
} from "../controllers/stats.controller.js";

const router = express.Router();

// Consultas avanzadas con aggregate
router.get("/top", topPeliculas);                              // Top 10 películas por rating
router.get("/generos", promedioPorGenero);                    // Promedio rating por género
router.get("/recomendaciones/:usuarioId", recomendaciones);  // Recomendaciones personalizadas
router.get("/analisis-año", analisisPorAño);                 // Análisis por año de lanzamiento
router.get("/distribucion-ratings", distribucionRatings);   // Distribución 1-5 estrellas

export default router;