import Membro from "../models/membroModel.js";
import bcrypt from "bcrypt";

export const criarMembro = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const membro = new Membro({
      ...req.body,
      password: hashedPassword,
      foto: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await membro.save();
    res.status(201).json({ message: "Membro cadastrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const aprovarMembro = async (req, res) => {
  try {
    const membro = await Membro.findByIdAndUpdate(
      req.params.id,
      { status: "aprovado" },
      { new: true } // Retorna o documento atualizado
    );
    if (!membro)
      return res.status(404).json({ message: "Membro não encontrado." });
    res.status(200).json({ message: "Membro aprovado com sucesso!", membro });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarMembros = async (req, res) => {
  try {
    const { status } = req.query; // Filtrar pelo status (ex.: pendente, aprovado)
    const query = status ? { status } : {}; // Se houver status no query, filtra
    const membros = await Membro.find(query); // Busca membros no banco
    res.status(200).json(membros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarMembro = async (req, res) => {
  const { id } = req.params;
  const atualizacoes = req.body;

  try {
    const membroAtualizado = await Membro.findByIdAndUpdate(id, atualizacoes, {
      new: true, // Retorna o documento atualizado
      runValidators: true, // Garante que as validações do modelo sejam aplicadas
    });

    if (!membroAtualizado) {
      return res.status(404).json({ message: "Membro não encontrado." });
    }

    res.status(200).json({
      message: "Membro atualizado com sucesso!",
      membro: membroAtualizado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};