import express from "express";
import multer from "multer";
import {
  criarMembro,
  aprovarMembro,
  listarMembros,
  atualizarMembro,
  loginMembro,
  deletarMembro,
} from "../controllers/membroController.js";
import { verificarAdmin } from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/login", loginMembro);
router.post("/cadastro", upload.single("foto"), criarMembro);
router.put("/aprovar/:id", verificarAdmin, aprovarMembro);
router.get("/", listarMembros);
router.put("/:id", atualizarMembro);
router.delete("/:id", verificarAdmin, deletarMembro);

// Rota de Login do Administrador
router.post("/admin/login", verificarAdmin, (req, res) => {
  res.status(200).json({ message: "Login realizado com sucesso!" });
});

export default router;
