import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";

// Add review
export const addReview = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; // get current user from session/auth
    const movieData = req.body.movie;
    const review = await reviewService.addReview(userId, movieData);
    res.status(201).json(review);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Remove review
export const removeReview = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const tmdbId = req.body.tmdb_id;
    const result = await reviewService.removeReview(userId, tmdbId);
    res.json({ message: "Review removed", result });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get user reviews
export const getUserReview = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const reviews = await reviewService.getUserReview(userId);
    res.json(reviews);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
