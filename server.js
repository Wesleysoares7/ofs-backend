import express from "express";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
import membroRoutes from "./src/routes/membroRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/uploads", express.static("src/uploads"));
app.use("/membros", membroRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
