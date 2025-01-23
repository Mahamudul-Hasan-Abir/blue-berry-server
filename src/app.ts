import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes
app.use("/api", router);

export default app;
