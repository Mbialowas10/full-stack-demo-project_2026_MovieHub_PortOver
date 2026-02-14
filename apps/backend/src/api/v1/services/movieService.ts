import { Prisma, TMDBMovie } from "@prisma/client";
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
export const insertMovie = async (movieData: Prisma.TMDBMovieCreateInput): Promise<TMDBMovie> => {
  return prisma.tMDBMovie.create({ data: movieData });
};

/**
 * Delete a movie by database ID
 */
export const deleteMovie = async (id: number): Promise<TMDBMovie | null> => {
  return prisma.tMDBMovie.delete({
    where: { id },
  });
};
