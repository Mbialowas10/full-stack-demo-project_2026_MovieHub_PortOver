import { Router } from "express";
import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as favouriteController from "../controllers/favouriteController";

const router = Router();

// Get favourites for a user (public)
router.get("/user/:userId", favouriteController.getUserFavourites);

// Check if a specific movie is favourited by current user
router.get("/status/:tmdbId", ClerkExpressWithAuth() as unknown as any, favouriteController.checkFavouriteStatus);

// Toggle favourite (protected) - handles both add and remove
router.post("/", ClerkExpressRequireAuth() as unknown as any, favouriteController.toggleFavourite);

// Remove favourite (protected)
router.delete(
  "/:id",
  ClerkExpressRequireAuth() as unknown as any, // <-- cast here
  favouriteController.removeFavourite
);

export default router;