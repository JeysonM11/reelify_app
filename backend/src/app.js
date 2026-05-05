import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import peliculaRoutes from "./routes/pelicula.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import statsRoutes from "./routes/stats.routes.js";

dotenv.config();

const app = express();

app.use("/api/peliculas", peliculaRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/stats", statsRoutes);

// middlewares
app.use(cors());
app.use(express.json());

// ruta de prueba
app.get("/", (req, res) => {
  res.send("API reelify funcionando correctamente");
});

// puerto
const PORT = 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();