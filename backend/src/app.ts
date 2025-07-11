import express from "express";
import synonymRoutes from "./routes/synonym";

export const app = express();

app.use(express.json());

app.use("/synonyms", synonymRoutes);
