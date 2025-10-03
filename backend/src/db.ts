import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

// Create database connection with error handling
let db: mysql.Pool;

try {
  db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "email_app",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  
  // Test the connection
  db.getConnection()
    .then(connection => {
      console.log("✅ Database connected successfully");
      connection.release();
    })
    .catch(err => {
      console.error("❌ Database connection failed:", err.message);
      console.log("⚠️  App will run without database (some features disabled)");
    });
} catch (error) {
  console.error("❌ Failed to create database pool:", error);
  // Create a mock db object to prevent crashes
  db = {} as mysql.Pool;
}

export { db };
