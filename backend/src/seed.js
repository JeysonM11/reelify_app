import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import { Usuario } from "./model/usuario.model.js";
import { Pelicula } from "./model/pelicula.model.js";
import { Review } from "./model/review.model.js";

dotenv.config();

const generos = ["Acción", "Comedia", "Drama", "Terror", "Ciencia ficción"];

const crearDatos = async () => {
  try {
    await connectDB();

    // limpiar colecciones
    await Usuario.deleteMany();
    await Pelicula.deleteMany();
    await Review.deleteMany();

    console.log("Datos antiguos eliminados");

    // crear usuarios
    const usuarios = [];
    for (let i = 1; i <= 20; i++) {
      usuarios.push({
        username: `Usuario ${i}`,
        email: `user${i}@mail.com`,
        password: "password123", // Cambiar por una contraseña segura en producción
        generos_favoritos: [
          generos[Math.floor(Math.random() * generos.length)]
        ]
      });
    }

    const usuariosDB = await Usuario.insertMany(usuarios);

    // crear peliculas
    const peliculas = [];
    for (let i = 1; i <= 50; i++) {
      peliculas.push({
        title: `Pelicula ${i}`,
        description: `Descripcion de la pelicula ${i}`,
        genero: [
          generos[Math.floor(Math.random() * generos.length)]
        ],
        año: 2000 + Math.floor(Math.random() * 24)
      });
    }

    const peliculasDB = await Pelicula.insertMany(peliculas);

    // crear reviews
    const reviews = [];

    for (let i = 0; i < 200; i++) {
      const usuario = usuariosDB[Math.floor(Math.random() * usuariosDB.length)];
      const pelicula = peliculasDB[Math.floor(Math.random() * peliculasDB.length)];

      reviews.push({
        usuario: usuario._id,
        pelicula_id: pelicula._id,
        puntaje: Math.floor(Math.random() * 5) + 1,
        comentario: "Buen contenido"
      });
    }

    await Review.insertMany(reviews);

    console.log("Datos insertados correctamente 🚀");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

crearDatos();