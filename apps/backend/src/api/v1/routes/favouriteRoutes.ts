import { Router } from "express";
import * as favouriteController from "../controllers/favouriteController";

const router: Router = Router();

router.get("/favourites/:userId", favouriteController.getUserFavoritesHandler);
router.post("/favourites", favouriteController.addFavoriteHandler);


export default router;