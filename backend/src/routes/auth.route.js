import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js";
import { signupSchema } from "../schema/auth.schema.js";

const router = express.Router()

router.post("/signup",validate(signupSchema), signup)

router.post("/login", login)

router.post("/logout", logout)

export default router