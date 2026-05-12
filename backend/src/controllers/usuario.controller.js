import bcrypt from "bcryptjs";
import Usuario from "../model/usuario.model.js";

const mapUsuarioPublico = (usuario) => ({
  id: usuario._id,
  nombre: usuario.nombre,
  apellido: usuario.apellido,
  username: usuario.username,
  email: usuario.email,
  rol: usuario.rol,
  avatar: usuario.avatar,
  generos_favoritos: usuario.generos_favoritos,
  biografia: usuario.biografia,
  peliculas_vistas: usuario.peliculas_vistas,
  createdAt: usuario.createdAt,
  updatedAt: usuario.updatedAt
});

export const getUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const usuarios = await Usuario.find()
      .skip(skip)
      .limit(parseInt(limit))
      .select("-password"); // No enviar contraseña

    const total = await Usuario.countDocuments();

    res.json({
      total,
      pagina: page,
      por_pagina: limit,
      total_paginas: Math.ceil(total / limit),
      usuarios
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id)
      .populate("peliculas_vistas", "title genero year");

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, username, email, password, generos_favoritos, avatar, biografia } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !username || !email || !password) {
      return res.status(400).json({ 
        error: "Campos requeridos: nombre, apellido, username, email, password" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    // Validar email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Verificar si usuario/email ya existen
    const usuarioExistente = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (usuarioExistente) {
      return res.status(400).json({ 
        error: "El usuario o email ya está registrado" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      nombre,
      apellido,
      username,
      email,
      password: hashedPassword,
      generos_favoritos: generos_favoritos || ["Todas"],
      avatar: avatar || "",
      biografia: biografia || ""
    });

    await usuario.save();

    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      usuario: mapUsuarioPublico(usuario)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, generos_favoritos, biografia, avatar } = req.body;

    const usuario = await Usuario.findByIdAndUpdate(
      id,
      { nombre, apellido, generos_favoritos, biografia, avatar },
      { new: true, runValidators: true }
    ).select("-password");

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      mensaje: "Usuario actualizado exitosamente",
      usuario: mapUsuarioPublico(usuario)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
