import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { toggleFavourite, getFavouriteStatus } from "../controllers/favouriteController";

const router = Router();

router.post("/toggle", requireAuth, toggleFavourite);
router.get("/status/:tmdbId", requireAuth, getFavouriteStatus);

export default router;