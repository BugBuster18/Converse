import express from "express"

const router = express.Router()

router.get("/signup", (req, res) => {
    res.json("signup")
})

router.get("/login", (req, res) => {
    res.json("login")
})

router.get("/logout", (req, res) => {
    res.json("logout")
})

export default router