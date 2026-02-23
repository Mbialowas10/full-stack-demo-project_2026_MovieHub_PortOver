import { TMDBMovie } from "@prisma/client";
import { prisma } from "../../../db/prisma";

/**
 * Fetch all movies from the database
 */
export const fetchAllMovies = async (): Promise<TMDBMovie[]> => {
  return prisma.tMDBMovie.findMany();
};

/**
 * Fetch a single movie by database ID
 */
export const fetchMovieById = async (id: number): Promise<TMDBMovie | null> => {
  return prisma.tMDBMovie.findUnique({
    where: { id },
  });
};

/**
 * Fetch a movie by its TMDB ID
 */
export const fetchMovieByTmdbId = async (tmdb_id: number): Promise<TMDBMovie | null> => {
  return prisma.tMDBMovie.findUnique({
    where: { tmdb_id },
  });
};

/**
 * Insert a new movie
 */
export const insertMovie = async (movieData: any) => {
  return prisma.tMDBMovie.create({
    data: {
      tmdb_id: movieData.tmdb_id,
      title: movieData.original_title ?? "no title", // map correctly
      overview: movieData.overview ?? null,
      release_date: movieData.release_date
        ? new Date(movieData.release_date)
        : null,
      poster_path: movieData.poster_path ?? null,
      popularity: movieData.popularity ?? null,
      vote_average: movieData.vote_average ?? null,
      vote_count: movieData.vote_count ?? null,
    }
  });
};
/**
 * Delete a movie by database ID
 */
export const deleteMovie = async (id: number): Promise<TMDBMovie | null> => {
  return prisma.tMDBMovie.delete({
    where: { id },
  });
};
