import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genero: [{ type: String, required: true }],
    year: { type: Number, required: true },
}, { timestamps: true });

const Pelicula = mongoose.model("Pelicula", peliculaSchema);
export default Pelicula;