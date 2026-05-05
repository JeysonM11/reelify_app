import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
    pelicula_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true },
    puntaje: { type: Number, min: 1, max: 5 },
    comentario: { type: String },
    createAt: { type: Date, default: Date.now },
});

export const Review = mongoose.model("Review", reviewSchema);