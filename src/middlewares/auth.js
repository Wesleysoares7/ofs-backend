export const verificarAdmin = (req, res, next) => {
  const admin = { email: "admin@ofs.com", senha: "123456" }; // Credenciais fixas
  const { email, senha } = req.headers;

  if (email === admin.email && senha === admin.senha) {
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Acesso negado! Usuário não é administrador." });
  }
};
