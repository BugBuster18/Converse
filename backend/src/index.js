import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
}) 