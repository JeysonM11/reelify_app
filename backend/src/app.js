import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

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