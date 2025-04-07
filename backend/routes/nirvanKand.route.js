import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import { getContent, updateContent } from "../controllers/nirvanKand.controller.js";

const router = express.Router()

router.get("/", verifyToken, getContent);
router.put("/:id", verifyToken, updateContent);

export default router;