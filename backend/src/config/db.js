import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI no está definida en el archivo .env");
        }

        const connectionOptions = {};

        if (process.env.MONGO_DB_NAME) {
            connectionOptions.dbName = process.env.MONGO_DB_NAME;
        }

        await mongoose.connect(process.env.MONGO_URI, connectionOptions);
        console.log("Conexión a MongoDB exitosa");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Salir del proceso con error
    } 
};