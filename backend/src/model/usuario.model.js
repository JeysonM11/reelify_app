import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true, index: true },
    apellido: { type: String, required: true, trim: true, index: true },
    username: { type: String, required: true, unique: true, index: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
    avatar: { type: String, default: "" },
    generos_favoritos: { type: [String], default: ["Todas"] },
    biografia: { type: String, default: "" },
    peliculas_vistas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pelicula" }]
}, { timestamps: true });

// Índice compuesto para búsquedas frecuentes
usuarioSchema.index({ username: 1, email: 1 });
usuarioSchema.index({ nombre: 1, apellido: 1 });

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;