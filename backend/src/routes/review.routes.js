import express from "express";
import { crearReview, getReviews, getReviewsByPelicula } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", crearReview);
router.get("/pelicula/:peliculaId", getReviewsByPelicula);

export default router;
