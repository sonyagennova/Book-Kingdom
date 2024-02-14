import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { createProxyMiddleware } from "http-proxy-middleware";

// import cors from './middlewares/cors.js';
import cors from 'cors';
import roleRoute from "./routes/role.js";
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import bookRoute from './routes/book.js'
import commentRoute from './routes/comment.js'

import cookieParser from "cookie-parser";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
dotenv.config();


app.use(express.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors());

app.use(express.static('public'))

app.use("/roles/", () => { createProxyMiddleware({ target: 'book-kingdom-client.vercel.app', changeOrigin: true }); roleRoute})
app.use("/users/", () => { createProxyMiddleware({ target: 'book-kingdom-client.vercel.app', changeOrigin: true }); authRoute})
app.use("/data/users/", () => { createProxyMiddleware({ target: 'book-kingdom-client.vercel.app', changeOrigin: true }); userRoute})
app.use("/data/books/", () => { createProxyMiddleware({ target: 'book-kingdom-client.vercel.app', changeOrigin: true }); bookRoute});
app.use("/data/comments/", () => { createProxyMiddleware({ target: 'book-kingdom-client.vercel.app', changeOrigin: true }); commentRoute});

app.use(cors())

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong"
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    })
})



const connectMongoDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://Sonya:xNmqaUbfC.c!a3d@cluster0.qcxirgw.mongodb.net/?retryWrites=true&w=majority")
        //await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database!");
    } catch (error) {
        throw error;
    }
}

// connectMongoDB()


app.listen(5500, () => {
    connectMongoDB()
    console.log("Connected to backend");
})