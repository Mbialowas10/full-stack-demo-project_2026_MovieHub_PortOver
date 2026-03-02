import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as reviewController from "../controllers/reviewController";


const router = Router();



/**
 * Get all reviews
 */
router.get(
  "/",
  reviewController.getAllReviews
);

/**
 * Create or update a review (must be logged in)
 */
// --- Create or update a review (must be logged in) ---
router.post("/", (req, _res, next) => {
  console.log("Authorization header:", req.headers.authorization);
  next();
}, requireAuth(), reviewController.addReview);



/**
 * Delete a review for a movie (must be logged in)
 * Uses tmdbId param + userId from Clerk
 */
router.delete(
  "/:tmdbId",
  requireAuth,
  reviewController.removeReview
);

/**
 * Get all reviews for a movie
 */
router.get(
  "/movie/:tmdbId",
  reviewController.getMovieReviews
);

/**
 * Get all reviews by a specific user
 */
router.get(
  "/user/:userId",
  reviewController.getUserReviews
);

export default router;