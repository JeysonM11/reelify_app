import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario._id,
      username: usuario.username,
      email: usuario.email,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const registrar = async (req, res) => {
  try {
    const { nombre, apellido, username, email, password, generos_favoritos, avatar, biografia } = req.body;

    if (!nombre || !apellido || !username || !email || !password) {
      return res.status(400).json({ error: "Campos requeridos: nombre, apellido, username, email, password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const existente = await Usuario.findOne({ $or: [{ username }, { email }] });
    if (existente) {
      return res.status(400).json({ error: "El usuario o email ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      apellido,
      username,
      email,
      password: passwordHash,
      generos_favoritos: generos_favoritos || ["Todas"],
      avatar: avatar || "",
      biografia: biografia || ""
    });

    const token = generarToken(usuario);

    res.status(201).json({
      mensaje: "Registro exitoso",
      token,
      usuario: mapUsuarioPublico(usuario)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Campos requeridos: email, password" });
    }

    const usuario = await Usuario.findOne({ email }).select("+password");

    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = generarToken(usuario);

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: mapUsuarioPublico(usuario)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};