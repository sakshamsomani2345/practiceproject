import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import commentRoutes from './routes/comment.route.js'

import path from 'path';
import cors from 'cors'

const app=express();
app.use(express.json())
dotenv.config();
app.use(cors())

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log('MongoDb is  connected');
  })
  .catch((err) => {
    console.log(err);
  });
  app.use("/api/user",userRoutes);
  app.use("/api/auth",authRoutes);
  app.use("/api/post",postRoutes);
  app.use("/api/comment",commentRoutes);


  
app.listen(4000,(req,res)=>{
    console.log("Server Connected");
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });