import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true, index: true },
    pelicula_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true, index: true },
    puntaje: { type: Number, min: 1, max: 5, required: true, index: true },
    comentario: { type: String, maxlength: 500 },
    fecha_review: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

// Índices compuestos para optimizar consultas frecuentes
reviewSchema.index({ pelicula_id: 1, puntaje: -1 }); 
reviewSchema.index({ usuario: 1, fecha_review: -1 });
reviewSchema.index({ usuario: 1, pelicula_id: 1 }, { unique: true }); // Un review por película y usuario

const Review = mongoose.model("Review", reviewSchema);
export default Review;