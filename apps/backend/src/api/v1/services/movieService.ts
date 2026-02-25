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

interface MovieInput {
  tmdb_id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
}

export const insertOrGetMovie = async (movie: MovieInput) => {
  // Check if movie already exists
  let existing = await prisma.tMDBMovie.findUnique({
    where: { tmdb_id: movie.tmdb_id },
  });

  if (existing) return existing;

  // Convert release_date to Date
  const releaseDate = movie.release_date
    ? new Date(`${movie.release_date}T00:00:00Z`)
    : new Date();

  // Create if not exists
  const createdMovie = await prisma.tMDBMovie.create({
    data: {
      tmdb_id: movie.tmdb_id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      popularity: movie.popularity,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      release_date: releaseDate,
    },
  });

  return createdMovie;
};

/**
 * Delete a movie by database ID
 */
export const deleteMovie = async (id: number): Promise<TMDBMovie | null> => {
  return prisma.tMDBMovie.delete({
    where: { id },
  });
};
