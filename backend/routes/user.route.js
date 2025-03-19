import express from "express"
import { signout } from "../controllers/user.contoller.js"

const router = express.Router()

router.post("/signout", signout)

export default router