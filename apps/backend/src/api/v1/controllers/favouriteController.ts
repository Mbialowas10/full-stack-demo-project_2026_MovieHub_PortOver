import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";

// Toggle favourite for a movie
export const toggleFavourite = async (req: Request, res: Response) => {
  try {
    const { tmdb_id, title, overview, poster_path, popularity, vote_average, vote_count, release_date } = req.body;

    if (!tmdb_id || !title) {
      return res.status(400).json({ error: "tmdb_id and title are required" });
    }

    // ✅ Get Clerk user ID from request (Clerk middleware must set req.auth)
    // @ts-ignore
    const userId: string = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // 1️⃣ Ensure the movie exists in the database
    let movie = await prisma.tMDBMovie.findUnique({ where: { tmdb_id } });
    if (!movie) {
      movie = await prisma.tMDBMovie.create({
        data: {
          tmdb_id,
          title,
          overview,
          poster_path,
          popularity,
          vote_average,
          vote_count,
          release_date: release_date ? new Date(release_date) : undefined,
        },
      });
    }

    // 2️⃣ Check if this user already favourited the movie
    const favourite = await prisma.favourite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId: movie.id,
        },
      },
    });

    // 3️⃣ Toggle favourite
    let isFavourite = false;
    if (favourite) {
      await prisma.favourite.delete({
        where: {
          userId_movieId: {
            userId,
            movieId: movie.id,
          },
        },
      });
    } else {
      await prisma.favourite.create({
        data: {
          userId,
          movieId: movie.id,
        },
      });
      isFavourite = true;
    }

    res.json({
      message: isFavourite ? "Added to favourites" : "Removed from favourites",
      isFavourite,
      favouriteId: favourite ? null : movie.id,
    });
  } catch (err) {
    console.error("Error toggling favourite:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get favourite status for a specific movie
export const getFavouriteStatus = async (req: Request, res: Response) => {
  try {
    const tmdbId = Number(req.params.tmdbId);
    if (!tmdbId) return res.status(400).json({ error: "tmdbId is required" });

    // @ts-ignore
    const userId: string = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "User not authenticated" });

    const movie = await prisma.tMDBMovie.findUnique({ where: { tmdb_id: tmdbId } });
    if (!movie) return res.json({ isFavourite: false, isStoredLocally: false });

    const favourite = await prisma.favourite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId: movie.id,
        },
      },
    });

    res.json({
      isFavourite: !!favourite,
      isStoredLocally: !!movie,
      favouriteId: favourite ? favourite.id : null,
    });
  } catch (err) {
    console.error("Error getting favourite status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};