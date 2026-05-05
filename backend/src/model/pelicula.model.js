import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genero: [{ type: String, required: true }],
    año: { type: Number, required: true },
    createAt: { type: Date, default: Date.now },
});

export const Pelicula = mongoose.model("Pelicula", peliculaSchema);