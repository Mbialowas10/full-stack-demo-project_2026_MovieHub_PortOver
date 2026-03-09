//imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import healthRoutes from "./api/v1/routes/health.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import movieRoutes from "./api/v1/routes/movieRoutes";
import favouriteRoutes from "./api/v1/routes/favouriteRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";


const morgan = require("morgan"); // for logging HTTP requests



dotenv.config(); // Load .env first

const app = express();

// Middleware
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://full-stack-demo-project-2026-movie-cyan.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(204);
  }
  next();
});

app.use(clerkMiddleware());
app.use(express.json());
app.use(morgan("dev")); // Log HTTP requests in development

// Root route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the Movie Hub API" });
});

// Health route
app.use("/api/health", healthRoutes);

// Swagger docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount movie routes
app.use("/api/v1", movieRoutes);

app.use("/api/v1/favourites", favouriteRoutes);

app.use("/api/v1/reviews", reviewRoutes);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Export app
export default app;