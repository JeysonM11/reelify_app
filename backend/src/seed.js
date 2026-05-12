import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";

import Usuario from "./model/usuario.model.js";
import Pelicula from "./model/pelicula.model.js";
import Review from "./model/review.model.js";

dotenv.config();

const generos = ["Acción", "Comedia", "Drama", "Terror", "Ciencia ficción", "Aventura", "Fantasía", "Romance", "Thriller", "Animación"];

const nombresPeliculas = [
  "Inception", "Interstellar", "The Dark Knight", "Pulp Fiction", "Forrest Gump",
  "The Shawshank Redemption", "The Godfather", "Fight Club", "Spirited Away", "Parasite",
  "La La Land", "Joker", "Avengers Endgame", "The Matrix", "Titanic",
  "Avatar", "Jurassic Park", "E.T.", "Back to the Future", "Jaws",
  "Casablanca", "Citizen Kane", "Gone with the Wind", "Vertigo", "Psycho",
  "The Godfather Part II", "The Lord of the Rings", "Star Wars", "Indiana Jones", "Alien",
  "The Shining", "The Exorcist", "It Follows", "Get Out", "Hereditary",
  "Midsommar", "A Quiet Place", "The Ring", "The Sixth Sense", "Signs"
];

const descripciones = [
  "Una película de ciencia ficción épica que explora los límites del sueño y la realidad.",
  "Una aventura cósmica sobre astronautas que buscan salvar la humanidad.",
  "Un thriller oscuro y emocionante sobre un vigilante enmascarado.",
  "Una historia no lineal de crimen, redención y violencia.",
  "La historia inspiradora de un hombre que atraviesa décadas de la historia estadounidense.",
  "Un drama carcelario sobre esperanza y amistad.",
  "Una epopeya criminal que define el género.",
  "Un thriller psicológico sobre identidad y sociedad.",
  "Una masterpiece de animación sobre magia y aventura.",
  "Un drama sociológico sobre clase y desigualdad.",
  "Un romance musical moderno ambientado en Los Ángeles.",
  "Un retrato psicológico de un personaje marcado por la soledad.",
  "La culminación épica de la saga superheroica.",
  "Un clásico de ciencia ficción sobre realidad simulada.",
  "Un romance épico ambientado en un transatlántico."
];

const comentarios = [
  "Excelente película, muy recomendada",
  "No me gustó mucho, pero tiene sus momentos",
  "Masterpiece, una joya del cine",
  "Decepcionante, esperaba más",
  "Increíble, ver una y otra vez",
  "Buena, aunque larga",
  "La mejor que he visto",
  "Regular, nada especial",
  "Impactante y emocionante",
  "Clásico imprescindible",
  "No es lo mío, pero respeto la opinión del público",
  "Sorprendentemente buena",
  "Un poco aburrida en algunos momentos",
  "Fantástica, me encantó",
  "Defintivamente una película que debe ver"
];

const nombres = ["Juan", "María", "Carlos", "Ana", "Miguel", "Laura", "Diego", "Sofia", "Lucas", "Isabella",
                 "Fernando", "Valentina", "Jorge", "Camila", "Roberto", "Paula", "Antonio", "Carmen", "Manuel", "Rosa"];

const apellidos = ["García", "Rodríguez", "Martínez", "Hernández", "López", "González", "Pérez", "Sánchez", "Ramírez", "Torres",
                   "Rivera", "Gómez", "Díaz", "Ortiz", "Jiménez", "Moreno", "Ramos", "Flores", "Medina", "Vargas"];

const generarUsername = (nombres, apellidos, index) => {
  const nombre = nombres[index % nombres.length];
  const apellido = apellidos[Math.floor(index / nombres.length) % apellidos.length];
  return `${nombre.toLowerCase()}_${apellido.toLowerCase()}_${index + 1}`;
};

const generarNombreCompleto = (index) => ({
  nombre: nombres[index % nombres.length],
  apellido: apellidos[Math.floor(index / nombres.length) % apellidos.length]
});

const crearDatos = async () => {
  try {
    await connectDB();

    // limpiar colecciones
    await Usuario.deleteMany();
    await Pelicula.deleteMany();
    await Review.deleteMany();

    console.log("Datos antiguos eliminados");

    // crear 1000+ usuarios
    console.log("Creando 1200 usuarios...");
    const usuarios = [];
    const passwordHash = await bcrypt.hash("password123", 10);

    for (let i = 0; i < 1200; i++) {
      const username = generarUsername(nombres, apellidos, i);
      const { nombre, apellido } = generarNombreCompleto(i);
      usuarios.push({
        nombre,
        apellido,
        username: username,
        email: `${username}@reelify.com`,
        password: passwordHash,
        generos_favoritos: [
          generos[Math.floor(Math.random() * generos.length)],
          generos[Math.floor(Math.random() * generos.length)]
        ],
        biografia: `Soy ${nombre} ${apellido} y me gustan las películas de ${generos[i % generos.length]}`,
        avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${nombre}%20${apellido}`
      });
    }

    const usuariosDB = await Usuario.insertMany(usuarios);
    console.log(`✓ ${usuariosDB.length} usuarios creados`);

    // crear 1000+ películas
    console.log("Creando 1500 películas...");
    const peliculas = [];
    for (let i = 0; i < 1500; i++) {
      const tituloBase = nombresPeliculas[i % nombresPeliculas.length];
      peliculas.push({
        title: i === 0 ? tituloBase : `${tituloBase} ${Math.floor(i / nombresPeliculas.length)}`,
        description: descripciones[i % descripciones.length],
        genero: Array.from(
          { length: Math.floor(Math.random() * 3) + 1 },
          () => generos[Math.floor(Math.random() * generos.length)]
        ),
        year: 1980 + Math.floor(Math.random() * 44),
        director: `Director ${Math.floor(Math.random() * 500)}`,
        rating: (Math.random() * 10).toFixed(1)
      });
    }

    const peliculasDB = await Pelicula.insertMany(peliculas);
    console.log(`✓ ${peliculasDB.length} películas creadas`);

    // crear 5000 reviews únicas por usuario/película
    console.log("Creando 5000 reviews...");
    const reviews = [];
    const batch = 1000; // Insertar en lotes para evitar sobrecarga
    const paresUsados = new Set();

    while (reviews.length < 5000) {
      const usuario = usuariosDB[Math.floor(Math.random() * usuariosDB.length)];
      const pelicula = peliculasDB[Math.floor(Math.random() * peliculasDB.length)];
      const clave = `${usuario._id.toString()}-${pelicula._id.toString()}`;

      if (paresUsados.has(clave)) {
        continue;
      }

      paresUsados.add(clave);

      reviews.push({
        usuario: usuario._id,
        pelicula_id: pelicula._id,
        puntaje: Math.floor(Math.random() * 5) + 1,
        comentario: comentarios[Math.floor(Math.random() * comentarios.length)],
        fecha_review: new Date(2020 + Math.floor(Math.random() * 6), 
                               Math.floor(Math.random() * 12), 
                               Math.floor(Math.random() * 28))
      });
    }

    // Insertar reviews en lotes
    for (let i = 0; i < reviews.length; i += batch) {
      const lote = reviews.slice(i, i + batch);
      await Review.insertMany(lote);
      console.log(`  Insertados ${Math.min(i + batch, reviews.length)} de ${reviews.length} reviews...`);
    }

    console.log(`✓ ${reviews.length} reviews creados`);
    console.log("\n✅ Datos insertados correctamente 🚀");
    console.log(`Total usuarios: ${usuariosDB.length}`);
    console.log(`Total películas: ${peliculasDB.length}`);
    console.log(`Total reviews: ${reviews.length}`);
    
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

crearDatos();