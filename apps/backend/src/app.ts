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

const morgan = require("morgan");

dotenv.config();

const app = express();

// 1. CORS — must be first
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowed = [
      "http://localhost:5173",
      "https://full-stack-demo-project-2026-movie-cyan.vercel.app"
    ];
    const previewPattern = /^https:\/\/full-stack-demo-project-20.*\.vercel\.app$/;
    if (!origin || allowed.includes(origin) || previewPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));


// 3. Public routes — before Clerk
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the Movie Hub API" });
});
app.use("/api/health", healthRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4. Clerk + body parsing — after public routes
app.use(clerkMiddleware());
app.use(express.json());
app.use(morgan("dev"));

// 5. Protected routes — after Clerk
app.use("/api/v1", movieRoutes);
app.use("/api/v1/favourites", favouriteRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// 6. Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

export default app;