import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port= process.env.PORT || 5001;
const databaseURL = process.env.DATABASE_URL;

const server = app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port} 🚀`);
});

mongoose
    .connect(databaseURL)
    .then(() => console.log("Database connected successfully cutie <3!"))
    .catch((err) => console.log(err.message));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRoutes);

