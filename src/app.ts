import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    credentials: true, // Allow cookies and authentication headers
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Handle Preflight Requests
app.options("*", cors());

// Test Route
app.get("/", (req, res) => {
  res.send("Hello ! Welcome to Blue Berry Server");
});

// API Routes
app.use("/api", router);

export default app;
