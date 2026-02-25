import express from "express"
import authRoutes from "./routes/auth.route.js"
import dotenv from 'dotenv'
const app = express()

app.use(express.json())
app.use("/api/auth",authRoutes)



dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
}) 