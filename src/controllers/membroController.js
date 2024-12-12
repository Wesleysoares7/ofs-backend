import Membro from "../models/membroModel.js";
import bcrypt from "bcrypt";

export const criarMembro = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const membro = new Membro({
      ...req.body,
      password: hashedPassword,
      foto: req.file ? `/uploads/${req.file.filename}.png` : null,
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

export const loginMembro = async (req, res) => {
  const { email, password } = req.body;

  try {
    const membro = await Membro.findOne({ email });
    if (!membro) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compare(password, membro.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    res.status(200).json({
      id: membro._id,
      name: membro.name,
      email: membro.email,
      sexo: membro.sexo,
      phone: membro.phone,
      logradouro: membro.logradouro,
      numero: membro.numero,
      bairro: membro.bairro,
      cidade: membro.cidade,
      estado: membro.estado,
      cep: membro.cep,
      tipo: membro.tipo,
      status: membro.status,
      foto: membro.foto,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletarMembro = async (req, res) => {
  try {
    const { id } = req.params;
    const membroDeletado = await Membro.findByIdAndDelete(id);

    if (!membroDeletado) {
      return res.status(404).json({ message: "Membro não encontrado." });
    }

    res.status(200).json({ message: "Membro deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obterContagens = async (req, res) => {
  try {
    const totalIniciantes = await Membro.countDocuments({ tipo: "iniciante" });
    const totalFormandos = await Membro.countDocuments({ tipo: "formando" });
    const totalProfessos = await Membro.countDocuments({ tipo: "professo" });
    const totalPendentes = await Membro.countDocuments({ status: "pendente" });

    res.status(200).json({
      totalIniciantes,
      totalFormandos,
      totalProfessos,
      totalPendentes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarPorFiltro = async (req, res) => {
  const { tipo, status } = req.query;
  try {
    const filtro = {};
    if (tipo) filtro.tipo = tipo;
    if (status) filtro.status = status;

    const membros = await Membro.find(filtro, "name foto");
    res.status(200).json(membros || []); // Garante que será retornado um array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obterDetalhesMembro = async (req, res) => {
  try {
    const membro = await Membro.findById(req.params.id);
    if (!membro) {
      return res.status(404).json({ message: "Membro não encontrado." });
    }
    res.status(200).json(membro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
