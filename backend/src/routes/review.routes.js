import express from "express";
import { crearReview, getReviewsByPelicula } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/", crearReview);
router.get("/pelicula/:peliculaId", getReviewsByPelicula);

export default router;
