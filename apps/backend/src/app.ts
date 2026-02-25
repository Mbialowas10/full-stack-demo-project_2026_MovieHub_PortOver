import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./api/v1/routes/health.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import movieRoutes from "./api/v1/routes/movieRoutes";
import favouriteRoutes from "./api/v1/routes/favouriteRoutes";


dotenv.config(); // Load .env first

const app = express();

// Middleware
app.use(
    cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // if sending cookies
  })
);
app.use(express.json());

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



// Export app
export default app;