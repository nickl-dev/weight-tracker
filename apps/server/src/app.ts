import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import healthRoutes from "./routes/health.routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);

export default app;
