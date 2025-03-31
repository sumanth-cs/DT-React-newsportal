import express from 'express';
import { createCategory, deleteCategory, getCategories } from '../controllers/category.controller.js';
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

router.post("/", verifyToken, createCategory);
router.get("/", getCategories);
router.delete("/:id", verifyToken, deleteCategory);

export default router;