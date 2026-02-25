import { Request, Response } from "express";
import * as reviewService from "../services/reviewService";

// Add favourite
export const addReview = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId; // get current user from session/auth
    const movieData = req.body.movie;
    const favourite = await reviewService.addFavourite(userId, movieData);
    res.status(201).json(favourite);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Remove favourite
export const removeReview = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const tmdbId = req.body.tmdb_id;
    const favourite = await reviewService.removeFavourite(userId, tmdbId);
    res.json({ message: "Favourite removed", favourite });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get user favourites
export const getUserReview = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const favourites = await reviewService.getUserFavourites(userId);
    res.json(favourites);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
