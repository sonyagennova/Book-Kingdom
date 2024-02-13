import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import cors from 'cors';

import roleRoute from "./routes/role.js";
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import bookRoute from './routes/book.js'
import commentRoute from './routes/comment.js'

import cookieParser from "cookie-parser";

const app = express()
dotenv.config();


app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.use(express.static('public'))

app.use("/roles/", roleRoute)
app.use("/users/", authRoute)
app.use("/data/users/", userRoute)
app.use("/data/books/", bookRoute);
app.use("/data/comments/", commentRoute);

app.use(cors({
    origin: ["https://book-kingdom-client.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}))

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



 mongoose.connect("mongodb+srv://Sonya:xNmqaUbfC.c!a3d@cluster0.qcxirgw.mongodb.net/?retryWrites=true&w=majority")
const connectMongoDB = async() => {
    try {
        //await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database!");
    } catch (error) {
        throw error;
    }
}

// connectMongoDB()

// app.listen("book-kingdom-server.vercel.app", () => {
//     connectMongoDB()
//     console.log("Connected to backend");
// })