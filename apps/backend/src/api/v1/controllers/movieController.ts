import { Request, Response, NextFunction } from "express";
import {
  fetchAllMovies,
  fetchMovieByTmdbId,
  insertOrGetMovie,
  deleteMovie,
} from "../services/movieService";

// GET /movies?tmdbId=XXX
export const getAllMovies = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const tmdbIdQuery = req.query.tmdbId as string | undefined;

    if (tmdbIdQuery) {
      const tmdbId = Number(tmdbIdQuery);
      const movie = await fetchMovieByTmdbId(tmdbId);
      if (movie) {
        return res.json({ movies: [movie] }); // wrap in array for frontend
      } else {
        return res.json({ movies: [] });
      }
    }

    // Otherwise, return all movies
    const movies = await fetchAllMovies();
    res.json({ movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// POST /movies
export const createMovie = async (req: Request, res: Response) => {
  try {
    const createdMovie = await insertOrGetMovie(req.body);
    res.status(201).json({ message: "Movie created or retrieved", createdMovie });
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Failed to create movie" });
  }
};

// DELETE /movies/:id
export const removeMovie = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const deletedMovie = await deleteMovie(id);
    res.json({ message: "Movie deleted successfully", deletedMovie });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Failed to delete movie" });
  }
};
export { insertOrGetMovie };