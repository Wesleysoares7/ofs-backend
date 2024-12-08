import express from "express";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
import membroRoutes from "./src/routes/membroRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Permita apenas o frontend acessar
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true, // Se for necessário enviar cookies ou autenticação
  })
);

// Middleware para JSON
app.use(express.json());

// Rotas e outros middlewares
app.use("/uploads", express.static("src/uploads"));
app.use("/membros", membroRoutes);

// Conexão com o banco de dados
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
