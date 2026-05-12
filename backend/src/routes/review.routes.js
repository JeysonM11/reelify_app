import express from "express";
import { 
  crearReview, 
  getReviews, 
  getReviewsByPelicula,
  actualizarReview,
  eliminarReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);                           // Obtener todas las reviews (paginadas)
router.post("/", crearReview);                         // Crear review
router.get("/pelicula/:peliculaId", getReviewsByPelicula); // Reviews de una película
router.put("/:reviewId", actualizarReview);            // Actualizar review
router.delete("/:reviewId", eliminarReview);           // Eliminar review

export default router;
