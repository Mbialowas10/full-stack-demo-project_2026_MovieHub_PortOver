import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import * as favouriteController from "../controllers/favouriteController";

const router = Router();

// Get favourites for a user (public)
router.get("/:userId", favouriteController.getUserFavourites);

// Add favourite (protected)
router.post("/", ClerkExpressRequireAuth() as unknown as any, favouriteController.addFavourite);

router.post("/", ClerkExpressRequireAuth() as unknown as any, favouriteController.toggleFavourite);

// Remove favourite (protected)
router.delete(
  "/:id",
  ClerkExpressRequireAuth() as unknown as any, // <-- cast here
  favouriteController.removeFavourite
);

export default router;