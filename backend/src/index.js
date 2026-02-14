import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from 'dotenv'
const app = express()

app.use("/api/auth",authRoutes)
app.use(express.json())

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
}) 