import express from "express"
import { login, logout, signup } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../schema/auth.schema.js";

const router = express.Router()

router.post("/signup",validate(signupSchema), signup)

router.post("/login",validate(loginSchema), login)

router.post("/logout", logout)

export default router