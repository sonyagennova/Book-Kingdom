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
app.use(cors({
    origin: "https://book-kingdom-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.static('public'));
app.use("/roles/", roleRoute);
app.use("/users/", authRoute);
app.use("/data/users/", userRoute);
app.use("/data/books/", bookRoute);
app.use("/data/comments/", commentRoute);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const connectMongoDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://Sonya:xNmqaUbfC.c!a3d@cluster0.qcxirgw.mongodb.net/?retryWrites=true&w=majority")
        console.log("Connected to Database!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process on DB connection error
    }
}

app.listen(5500, () => {
    connectMongoDB()
    console.log("Connected to backend");
});
