import express from "express";
import {
  getUsuarios,
  getUsuarioById,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/", getUsuarios);                  // Obtener usuarios (paginados)
router.get("/:id", getUsuarioById);            // Obtener usuario por ID
router.post("/", crearUsuario);                // Crear usuario
router.put("/:id", actualizarUsuario);         // Actualizar usuario
router.delete("/:id", eliminarUsuario);        // Eliminar usuario

export default router;