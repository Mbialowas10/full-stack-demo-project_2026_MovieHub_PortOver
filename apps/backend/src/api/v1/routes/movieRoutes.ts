
import {Router} from "express";
import * as movieController from "../controllers/movieController";

const router: Router = Router();

// define routes that express will listen to for requests
// define methods that will be called when route is requested
router.get("/movies", movieController.getAllMovies);
//router.get("/movies/:id", movieController.getMovieById);

// creating a movie 
// TODO - add in validation to check against movie schema
//router.post("/movies", movieController.createMovie);

// updating a movie
// TODO - add in validation to check against movie schema
//router.put("/movies/:id", movieController.updateMovie);

// deleting a movie
//router.delete("/movies/:id", movieController.deleteMovie);

export default router;