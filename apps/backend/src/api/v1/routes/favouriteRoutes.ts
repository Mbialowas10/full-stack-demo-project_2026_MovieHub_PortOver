import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as favouriteController from "../controllers/favouriteController";

const router = Router();

// Get favourites for a user (public)
router.get("/user/:userId", favouriteController.getUserFavourites);

// Check if a specific movie is favourited by current user
router.get("/status/:tmdbId", favouriteController.checkFavouriteStatus);

// Toggle favourite (protected) - handles both add and remove
//router.post("/", requireAuth, favouriteController.toggleFavourite);
router.post("/", (req, _res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  next();
}, requireAuth(), favouriteController.toggleFavourite);
// Remove favourite (protected)
router.delete(
  "/:id",
  requireAuth,
  favouriteController.removeFavourite
);

export default router;