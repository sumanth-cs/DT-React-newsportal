import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from "./routes/auth.route.js"

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected")
  })
  .catch((err) => {
    console.log(err)
  });

const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

app.use("/api/auth", authRoutes);