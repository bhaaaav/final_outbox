import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger";

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
