import express from "express";
import cors from "cors";
import synonymRoutes from "./routes/synonym";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/synonyms", synonymRoutes);
