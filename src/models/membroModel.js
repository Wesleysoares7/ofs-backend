import mongoose from "mongoose";

const MembroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sexo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  logradouro: { type: String, required: true },
  numero: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  cep: { type: String, required: true },
  tipo: {
    type: String,
    enum: ["iniciante", "formando", "professo"],
    required: true,
  },
  status: { type: String, enum: ["pendente", "aprovado"], default: "pendente" },
  foto: { type: String },
});

export default mongoose.model("Membro", MembroSchema);
