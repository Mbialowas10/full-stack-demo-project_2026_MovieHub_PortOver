// apps/backend/src/api/v1/services/movieService.ts
import { prisma } from "../../../db/prisma";

// Example: get all movies
export const getAllMovies = async () => {
  return prisma.tMDBMovie.findMany({
    orderBy: { popularity: "desc" },
  });
};

// Example: find a movie by TMDB ID
export const findMovieByTmdbId = async (tmdbId: number) => {
  return prisma.tMDBMovie.findUnique({
    where: { tmdb_id: tmdbId },
  });
};

// Example: upsert a movie
export const upsertMovie = async (movieData: {
  tmdb_id: number;
  title: string;
  overview?: string;
  poster_path?: string;
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
  release_date?: Date;
}) => {
  return prisma.tMDBMovie.upsert({
    where: { tmdb_id: movieData.tmdb_id },
    update: {
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      popularity: movieData.popularity,
      vote_average: movieData.vote_average,
      vote_count: movieData.vote_count,
      release_date: movieData.release_date,
    },
    create: movieData,
  });
};