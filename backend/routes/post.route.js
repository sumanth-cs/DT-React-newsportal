import express from "express"
import { verifyToken } from "../utils/verifyUser.js"
import {
    create,
    getPosts,
    deletepost,
    updatepost, getPost
} from "../controllers/post.controller.js"

const router = express.Router()

// router.post("/create", verifyToken, create)
// router.get("/getposts", getPosts)
// router.delete("/deletepost/:postId/:userId", verifyToken, deletepost)
// router.put("/updatepost/:postId/:userId", verifyToken, updatepost)

router.post("/create", verifyToken, create)
router.get("/", getPosts)
router.get("/getpost/:postId", verifyToken, getPost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost)
router.put("/updatepost/:postId/:userId", verifyToken, updatepost)

export default router