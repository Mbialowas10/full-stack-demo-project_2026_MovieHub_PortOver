import express from "express";
import cors from "cors";
import healthRoutes from "./api/v1/routes/health.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";

// Initialize Express app
const app = express();

app.use(cors());
app.use(express.json());

// Define root route
app.get("/", (_req, res) => {
    res.json({ message: "Welcome to the Movie Hub API" });   
});

// health end point
app.use("/api/health", healthRoutes);

// Swagger UI doc endpoint
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// mount movie routes
//app.use("/api/v1", movieRoutes);


export default app;
