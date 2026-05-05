import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    pelicula_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true },
    puntaje: { type: Number, min: 1, max: 5 },
    comentario: { type: String },
}, { timestamps: true });

// índices para mejorar consultas por película y por usuario
reviewSchema.index({ pelicula_id: 1 });
reviewSchema.index({ usuario_id: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;