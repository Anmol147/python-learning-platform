import "dotenv/config";
import express from "express";

import connectDB from "./src/config/db.js";
import problemRoutes from "./src/routes/problemRoutes.js";

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Problem routes
app.use("/api/problems", (req, res, next) => {
  console.log("🔥 Problem route reached:", req.method, req.originalUrl);
  next();
}, problemRoutes);

// Health check
app.get("/api/health", (request, response) => {
  response.json({
    success: true,
    message: "API is running",
  });
});

// Connect to MongoDB
await connectDB();

// Start server
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});