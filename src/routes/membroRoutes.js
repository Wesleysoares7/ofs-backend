import express from "express";
import multer from "multer";
import {
  criarMembro,
  aprovarMembro,
  listarMembros,
  atualizarMembro,
  loginMembro,
} from "../controllers/membroController.js";
import { verificarAdmin } from "../middlewares/auth.js";

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/login", loginMembro);
router.post("/cadastro", upload.single("foto"), criarMembro);
router.put("/aprovar/:id", verificarAdmin, aprovarMembro);
router.get("/", listarMembros);
router.put("/:id", atualizarMembro);

export default router;
