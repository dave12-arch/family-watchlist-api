import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  addMovieToWatchlist,
  getUserWatchlist,
  updateMovieInWatchlist,
  deleteMovieFromWatchlist
} from "../controllers/watchlistController.js";

const router = Router();

router.get("/:userId", authenticate, getUserWatchlist);

router.post("/:userId/movies", authenticate, authorizeModification, addMovieToWatchlist);

router.put("/:userId/movies", authenticate, authorizeModification, updateMovieInWatchlist);
router.put("/:userId/movies/:movieId", authenticate, authorizeModification, updateMovieInWatchlist);

router.delete("/:userId/movies", authenticate, authorizeModification, deleteMovieFromWatchlist);
router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, deleteMovieFromWatchlist);

export default router;