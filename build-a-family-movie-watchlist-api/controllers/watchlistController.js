import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie
} from "../utils/db.js";

export function getUserWatchlist(req, res) {
  const { userId } = req.params;

  const watchlist = getWatchlist(userId);

  if (watchlist === null) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json(watchlist);
}

export function addMovieToWatchlist(req, res) {
  const { userId } = req.params;
  const { title, genre, watched } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  const movie = addMovie(userId, { title, genre, watched });

  if (!movie) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(201).json({
    message: "Movie added to watchlist successfully.",
    movie
  });
}

export function updateMovieInWatchlist(req, res) {
  const { userId, movieId: routeMovieId } = req.params;
  const movieId = Number(routeMovieId ?? req.body.movieId);
  const { movieId: ignoredMovieId, ...updates } = req.body;

  if (!Number.isInteger(movieId)) {
    return res.status(400).json({ error: "Movie id is required" });
  }

  const movie = updateMovie(userId, movieId, updates);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  return res.status(200).json({
    message: "Movie updated successfully.",
    movie
  });
}

export function deleteMovieFromWatchlist(req, res) {
  const { userId, movieId: routeMovieId } = req.params;
  const movieId = Number(routeMovieId ?? req.body.movieId);

  if (!Number.isInteger(movieId)) {
    return res.status(400).json({ error: "Movie id is required" });
  }

  const deleted = deleteMovie(userId, movieId);

  if (!deleted) {
    return res.status(404).json({ error: "Movie not found" });
  }

  return res.status(200).json({
    message: "Movie removed from watchlist successfully."
  });
}