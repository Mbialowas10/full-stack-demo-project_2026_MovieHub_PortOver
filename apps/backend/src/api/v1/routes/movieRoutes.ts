import { Router, RequestHandler } from "express";
import * as movieController from "../controllers/movieController";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router: Router = Router();

// Cast Clerk middleware to Express RequestHandler for TS
const authMiddleware: RequestHandler = ClerkExpressRequireAuth() as unknown as RequestHandler;

// Public route
router.get("/movies", movieController.getAllMovies);

// Protected routes
router.post("/movies", authMiddleware, movieController.createMovie);
router.delete("/movies/:id", authMiddleware, movieController.removeMovie);

export default router;