import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import categoryRoutes from "./routes/category.route.js";
import nirvanKandRoutes from "./routes/nirvanKand.route.js";
import multimediaRoutes from "./routes/multimedia.route.js";

dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()


// for allowing json object in req body
app.use(express.json())
app.use(cookieParser())
app.use(cors());

app.listen(5000, () => {
  console.log("Server is running on port 5000!")
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/posts", postRoutes)
app.use('/api/categories', categoryRoutes);
app.use("/api/nirvankand", nirvanKandRoutes);
app.use("/api/multimedia", multimediaRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500

  const message = err.message || "Internal Server Error"

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
