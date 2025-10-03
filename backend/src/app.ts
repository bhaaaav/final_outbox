import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "EmailHub Backend API", 
    status: "running",
    timestamp: new Date().toISOString() 
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Database test endpoint
app.get("/api/test-db", async (req, res) => {
  try {
    const { db } = await import("./db");
    const [rows] = await db.execute("SELECT 1 as test");
    res.json({ 
      status: "success", 
      message: "Database connected successfully",
      test: rows,
      env: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        hasPassword: !!process.env.DB_PASSWORD
      }
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: "error", 
      message: "Database connection failed",
      error: error.message,
      env: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        hasPassword: !!process.env.DB_PASSWORD
      }
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/email", emailRoutes);

// Simple API documentation endpoint (without Swagger UI for now)
app.get("/api/docs", (req, res) => {
  res.json({
    message: "EmailHub API Documentation",
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register new user",
        "POST /api/auth/login": "Login user"
      },
      email: {
        "GET /api/email": "Get user emails",
        "POST /api/email/send": "Send email",
        "POST /api/email/score": "Check spam score",
        "POST /api/email/refine": "Refine email with AI"
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
console.log(`Starting server on port ${PORT}`);
console.log(`Environment variables:`, {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST ? 'SET' : 'NOT SET',
  DB_PORT: process.env.DB_PORT ? 'SET' : 'NOT SET',
  DB_USER: process.env.DB_USER ? 'SET' : 'NOT SET',
  DB_NAME: process.env.DB_NAME ? 'SET' : 'NOT SET',
  JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT SET'
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Health check available at: http://localhost:${PORT}/api/health`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
