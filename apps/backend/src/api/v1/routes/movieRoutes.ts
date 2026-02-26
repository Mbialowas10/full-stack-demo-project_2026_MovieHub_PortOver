import { Router} from "express";
import * as movieController from "../controllers/movieController";
import { requireAuth } from "@clerk/express";

const router: Router = Router();



// Public route
router.get("/movies", movieController.getAllMovies);

// Protected routes
router.post("/movies", requireAuth, movieController.createMovie);
router.delete("/movies/:id", requireAuth, movieController.removeMovie);

export default router;