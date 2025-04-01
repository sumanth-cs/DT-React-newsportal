import express from 'express';
import { createCategory, deleteCategory, getCategories } from '../controllers/category.controller.js';
import { verifyToken } from "../utils/verifyUser.js"
import { getCategoryBySlug } from '../controllers/category.controller.js';

const router = express.Router();

router.post("/", verifyToken, createCategory);
router.get("/", getCategories);
router.delete("/:id", verifyToken, deleteCategory);
router.get('/slug/:slug', getCategoryBySlug);

export default router;

