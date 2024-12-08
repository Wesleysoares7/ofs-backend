import express from "express";
import multer from "multer";
import {
  criarMembro,
  aprovarMembro,
  listarMembros,
} from "../controllers/membroController.js";
import { verificarAdmin } from "../middlewares/auth.js";
import { atualizarMembro } from "../controllers/membroController.js";

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/cadastro", upload.single("foto"), criarMembro);
router.put("/aprovar/:id", verificarAdmin, aprovarMembro);
router.get("/", listarMembros);
router.put("/:id", atualizarMembro);

export default router;
