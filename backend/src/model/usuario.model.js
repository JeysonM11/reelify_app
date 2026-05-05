import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    generos_favoritos: [{ type: String, required: true }],
    createAt: { type: Date, default: Date.now },
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);