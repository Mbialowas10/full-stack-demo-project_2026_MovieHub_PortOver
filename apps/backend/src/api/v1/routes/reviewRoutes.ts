import { Router } from "express";
import * as reviewController from "../controllers/reviewController";

const router = Router();

router.post("/", reviewController.addReview);
router.delete("/", reviewController.removeReview);
router.get("/:userId", reviewController.getUserReview);

export default router;
