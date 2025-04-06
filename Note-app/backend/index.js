import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.error(err)
    })

const app = express();   

// to make input as json
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: ["https://notes-web-ruddy.vercel.app"], credentials: true}));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Import routes
import authRouter from './routes/auth.route.js';
import noteRouter from './routes/note.route.js';

app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)

// Eror handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
