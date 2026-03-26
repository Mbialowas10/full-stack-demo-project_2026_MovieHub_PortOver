// src/api/v1/controllers/favouriteController.ts
import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";
import { getAuth } from "@clerk/express";

/**
 * Add a favourite (protected)
 */
export const addFavourite = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    console.log("Authenticated user ID:", userId);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ error: "Missing movieId" });

    const existing = await prisma.favourite.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });

    if (existing) return res.status(400).json({ error: "Already favourited" });

    const favourite = await prisma.favourite.create({
      data: { userId, movieId },
    });

    res.status(201).json({ message: "Favourite added", favourite });
  } catch (err) {
    console.error("Error adding favourite:", err);
    res.status(500).json({ error: "Failed to add favourite" });
  }
};

/**
 * Remove a favourite (protected)
 */
export const removeFavourite = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const favId = Number(req.params.id);
    if (isNaN(favId)) return res.status(400).json({ error: "Invalid favourite ID" });

    const existing = await prisma.favourite.findUnique({ where: { id: favId } });
    if (!existing || existing.userId !== userId) {
      return res.status(403).json({ error: "Cannot delete this favourite" });
    }

    const deleted = await prisma.favourite.delete({ where: { id: favId } });
    res.json({ message: "Favourite removed", deleted });
  } catch (err) {
    console.error("Error removing favourite:", err);
    res.status(500).json({ error: "Failed to remove favourite" });
  }
};

/**
 * Get all favourites for a user
 */
export const getUserFavourites = async (req: Request, res: Response) => {
  try {
    
    const userIdRaw = req.params.userId;
    const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;

    if (!userId) return res.status(401).json({ error: "Unauthenticated" });
    
    const favourites = await prisma.favourite.findMany({
      where: { userId },
      include: { movie: true },
    });

    res.json({ favourites });
  } catch (err) {
    console.error("Error fetching favourites:", err);
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
};

/**
 * Check if a specific movie is favourited and stored locally
 */
export const checkFavouriteStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const tmdbId = Number(req.params.tmdbId);

    if (!tmdbId) return res.status(400).json({ error: "Invalid TMDB ID" });
    if (!userId) return res.json({ isFavourite: false, isStoredLocally: false });

    const movie = await prisma.tMDBMovie.findUnique({ where: { tmdb_id: tmdbId } });
    if (!movie) return res.json({ isFavourite: false, isStoredLocally: false });

    const favourite = await prisma.favourite.findUnique({
      where: { userId_movieId: { userId, movieId: movie.id } },
    });

    res.json({
      isFavourite: !!favourite,
      isStoredLocally: true,
      favouriteId: favourite?.id ?? null,
    });
  } catch (err) {
    console.error("Error checking favourite status:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Toggle favourite (add/remove)
 */
export const toggleFavourite = async (req: Request, res: Response) => {
  console.log("Toggle favourite called with body:", req.body);
  try {
    const { userId } = getAuth(req);
    console.log("1. userId:", userId);
    console.log("2. body:", JSON.stringify(req.body));
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const {
      tmdb_id,
      title,
      overview,
      poster_path,
      popularity,
      vote_average,
      vote_count,
      release_date,
    } = req.body;

    if (!tmdb_id) return res.status(400).json({ error: "tmdb_id is required" });

    console.log("3. upserting user...");
    // Ensure user exists in DB
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });

    console.log("4. upserting movie...");
    // Upsert movie in local DB
    const movie = await prisma.tMDBMovie.upsert({
      where: { tmdb_id: Number(tmdb_id) },
      update: {},
      create: {
        tmdb_id: Number(tmdb_id),
        title,
        overview,
        poster_path,
        popularity: popularity ? Number(popularity) : null,
        vote_average: vote_average ? Number(vote_average) : null,
        vote_count: vote_count ? Number(vote_count) : null,
        release_date: release_date ? new Date(release_date) : null,
      },
    });

    console.log("5. checking existing favourite...");
    // Check if favourite exists
    const existingFav = await prisma.favourite.findUnique({
      where: { userId_movieId: { userId, movieId: movie.id } },
    });

    console.log("6. existingFav:", existingFav);
    if (existingFav) {
      await prisma.favourite.delete({ where: { id: existingFav.id } });
      return res.json({ message: "Removed from favourites", isFavourite: false });
    }

    const newFav = await prisma.favourite.create({
      data: { userId, movieId: movie.id },
    });

    console.log("7. done:", newFav);
    return res.json({ message: "Added to favourites", isFavourite: true, favouriteId: newFav.id });
  } catch (err) {
    console.error("TOGGLE ERROR:", err.message);
    console.error("TOGGLE STACK:", err.stack);
    console.error("Error toggling favourite:", err);
    res.status(500).json({ error: err.message || "Server error" });
  }
};