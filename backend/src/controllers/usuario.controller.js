import Usuario from "../model/usuario.model.js";

export const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

export const crearUsuario = async (req, res) => {
  const usuario = new Usuario(req.body);
  await usuario.save();
  res.json(usuario);
};
