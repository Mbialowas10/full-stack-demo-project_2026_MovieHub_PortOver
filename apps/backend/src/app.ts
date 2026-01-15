import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";

// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());

// Define route
app.use("/api/health", healthRoutes);

// Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
