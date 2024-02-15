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

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
//app.use(cors());

// Add CORS headers middleware
app.use((req, res, next) => {
    // Allow requests from specific origins
    res.setHeader('Access-Control-Allow-Origin', 'https://book-kingdom-client.vercel.app');
    // Allow specific methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Allow credentials (cookies, authorization headers, etc.)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Allow specific headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // Continue to the next middleware
    next();
});

app.use(express.static('public'))
app.use("/roles/", roleRoute)
app.use("/users/", authRoute)
app.use("/data/users/", userRoute)
app.use("/data/books/", bookRoute);
app.use("/data/comments/", commentRoute);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const connectMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Sonya:xNmqaUbfC.c!a3d@cluster0.qcxirgw.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Database!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    connectMongoDB()
    console.log(`Server started on port ${PORT}`);
});
