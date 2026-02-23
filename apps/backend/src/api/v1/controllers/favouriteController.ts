import { Request, Response } from "express";
import * as favouriteService from "../services/favouriteService";
import { checkUserExists } from "../middleware/checkUser";

export const addFavoriteHandler = async (req: Request, res: Response) => {
  try {
    const clerkUser = req.auth?.user; // depends on your Clerk setup
    if (!clerkUser) return res.status(401).json({ message: "Unauthorized" });

    await checkUserExists(clerkUser);

    const { movieId } = req.body;

    const result = await favouriteService.addFavorite(
      clerkUser.id,
      movieId
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};