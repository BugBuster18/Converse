import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../schema/auth.schema.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/signup",validate(signupSchema), signup)

router.post("/login",validate(loginSchema), login)

router.post("/logout", logout)

router.put("/updateProile",protectRoute,updateProfile)

router.get("/check",protectRoute,checkAuth)

export default router