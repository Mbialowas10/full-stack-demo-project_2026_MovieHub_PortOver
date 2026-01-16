
import express, {Router} from "express";

const router: Router = express.Router();


router.get(
    "/movies",
    movieController.getMovies
);

export default router;