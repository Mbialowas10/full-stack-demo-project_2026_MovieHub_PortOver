import { prisma } from "../../../db/prisma";

/**
 * Adds a favourite. Auto-inserts movie if missing.
 */
export const addReview = async (
  userId: string,
  movieData: {
    tmdb_id: number;
    title: string;
    overview?: string;
    poster_path?: string;
    release_date?: Date;
    rating?: number;
    comment?: string;
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
  const review = await prisma.review.create({
    data: {
      userId,
      movieId: movie.id,
      rating: movieData.rating || 0,
      comment: movieData.comment || "",
    },
  });

  return review;
};

/**
 * Removes a review
 */
export const removeReview = async (userId: string, tmdbId: number) => {
  // 1. Find the movie
  const movie = await prisma.tMDBMovie.findUnique({ where: { tmdb_id: tmdbId } });
  if (!movie) throw new Error(`Movie ${tmdbId} not found`);

  // 2. Delete review
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
export const getUserReview = async (userId: string) => {
  return prisma.review.findMany({
    where: { userId },
    include: { movie: true },
  });
};
