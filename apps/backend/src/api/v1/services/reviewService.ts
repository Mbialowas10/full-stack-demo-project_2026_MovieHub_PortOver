import { prisma } from "../../../db/prisma";

/**
 * Adds a favourite. Auto-inserts movie if missing.
 */
export const addReview = async (
  userId: number,
  movieData: {
    tmdb_id: number;
    title: string;
    overview?: string;
    poster_path?: string;
    release_date?: Date;
  }
) => {
  // 1. Ensure user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error(`User ${userId} does not exist`);

  // 2. Upsert movie
  const movie = await prisma.tMDBMovie.upsert({
    where: { tmdb_id: movieData.tmdb_id },
    update: {}, // do nothing if exists
    create: {
      tmdb_id: movieData.tmdb_id,
      title: movieData.title,
      overview: movieData.overview,
      poster_path: movieData.poster_path,
      release_date: movieData.release_date,
    },
  });

  // 3. Create review
  const favourite = await prisma.review.create({
    data: {
      userId,
      movieId: movie.id,
    },
  });

  return favourite;
};

/**
 * Removes a review
 */
export const removeR = async (userId: number, tmdbId: number) => {
  // 1. Find the movie
  const movie = await prisma.tMDBMovie.findUnique({ where: { tmdb_id: tmdbId } });
  if (!movie) throw new Error(`Movie ${tmdbId} not found`);

  // 2. Delete favourite
  return prisma.review.delete({
    where: {
      userId_movieId: {
        userId,
        movieId: movie.id,
      },
    },
  });
};

/**
 * Get all favourites for a user
 */
export const getUserReview = async (userId: number) => {
  return prisma.review.findMany({
    where: { userId },
    include: { movie: true },
  });
};
