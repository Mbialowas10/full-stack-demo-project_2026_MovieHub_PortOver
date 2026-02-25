import { Request, Response } from "express";
import { prisma } from "../../../db/prisma";// make sure you export prisma instance
import { AuthObject } from "@clerk/clerk-sdk-node";

// Extend Request to include Clerk auth
interface ClerkRequest extends Request {
  auth?: AuthObject;
}

// Add a favourite (protected)
export const addFavourite = async (req: ClerkRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { movieId } = req.body;
    if (!movieId) return res.status(400).json({ error: "Missing movieId" });

    // Check if favourite already exists
    const existing = await prisma.favourite.findUnique({
      where: {
        userId_movieId: { userId, movieId },
      },
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

// Remove a favourite (protected)
export const removeFavourite = async (req: ClerkRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const favId = Number(req.params.id);
    if (isNaN(favId)) return res.status(400).json({ error: "Invalid favourite ID" });

    // Ensure favourite belongs to this user
    const existing = await prisma.favourite.findUnique({
      where: { id: favId },
    });
    if (!existing || existing.userId !== userId) {
      return res.status(403).json({ error: "Cannot delete this favourite" });
    }

    const deleted = await prisma.favourite.delete({
      where: { id: favId },
    });

    res.json({ message: "Favourite removed", deleted });
  } catch (err) {
    console.error("Error removing favourite:", err);
    res.status(500).json({ error: "Failed to remove favourite" });
  }
};

// Get all favourites for a user


export const getUserFavourites = async (req: Request, res: Response) => {
  try {
    // req.params.userId could be string | string[]
    const userIdRaw = req.params.userId;
    const userId = Array.isArray(userIdRaw) ? userIdRaw[0] : userIdRaw;

    const favourites = await prisma.favourite.findMany({
      where: { userId }, // now TypeScript knows this is a string
      include: {
        movie: true,
      },
    });

    res.json({ favourites });
  } catch (err) {
    console.error("Error fetching favourites:", err);
    res.status(500).json({ error: "Failed to fetch favourites" });
  }
};


export const toggleFavourite = async (req: ClerkRequest, res: Response) => {
  try {
    const userId = req.auth?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthenticated" });

    const { tmdb_id, title, overview, poster_path, popularity, vote_average, vote_count, release_date } = req.body;

    if (!tmdb_id) return res.status(400).json({ error: "tmdb_id is required" });

    console.log(`Toggling favourite for user ${userId} and movie ${tmdb_id}`);

    // 1️⃣ Upsert movie
    const movie = await prisma.tMDBMovie.upsert({
      where: { tmdb_id },
      update: {},
      create: { tmdb_id, title, overview, poster_path, popularity, vote_average, vote_count, release_date: release_date ? new Date(release_date) : undefined },
    });

    // 2️⃣ Check if favourite exists
    const existingFav = await prisma.favourite.findUnique({
      where: { userId_movieId: { userId, movieId: movie.id } },
    });

    if (existingFav) {
      console.log(`Removing favourite ${existingFav.id} for user ${userId}`);
      // ✅ Remove favourite
      await prisma.favourite.delete({ where: { id: existingFav.id } });
      return res.json({ message: "Removed from favourites", isFavourite: false });
    } else {
      console.log(`Adding favourite for user ${userId} and movie ${movie.id}`);
      // ✅ Add favourite
      const newFav = await prisma.favourite.create({
        data: { userId, movieId: movie.id },
      });
      return res.json({ message: "Added to favourites", isFavourite: true, favouriteId: newFav.id });
    }
  } catch (err) {
    console.error("Error toggling favourite:", err);
    res.status(500).json({ error: "Server error" });
  }
};