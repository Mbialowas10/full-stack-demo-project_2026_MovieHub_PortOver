import { Router } from "express";
import * as movieController from "../controllers/movieController";

const router: Router = Router();

router.get("/movies", movieController.getAllMovies);
router.post("/movies", movieController.createMovie);
router.delete("/movies/:id", movieController.removeMovie);

export default router;
