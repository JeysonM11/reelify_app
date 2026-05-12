import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    genero: [{ type: String, required: true, index: true }],
    year: { type: Number, required: true, index: true },
    director: { type: String, index: true },
    rating: { type: Number, min: 0, max: 10 },
    // Embedding: últimas 20 reviews resumidas
    reviews_recientes: [{
        usuario_id: mongoose.Schema.Types.ObjectId,
        puntaje: Number,
        comentario: String,
        fecha: Date
    }]
}, { timestamps: true });

// Índices para mejorar consultas
peliculaSchema.index({ title: "text", description: "text" }); // búsqueda full-text
peliculaSchema.index({ genero: 1, year: -1 }); // consultas por género y año

const Pelicula = mongoose.model("Pelicula", peliculaSchema);
export default Pelicula;