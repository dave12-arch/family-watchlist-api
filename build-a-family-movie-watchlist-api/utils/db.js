import fs from "fs";
import path from "path";
import users from "../data/users.json" with { type: "json" };

const USERS_PATH = path.join(import.meta.dirname, "../data/users.json");
const WATCHLISTS_PATH = path.join(import.meta.dirname, "../data/watchlists.json");

export function readUsers() {
  return JSON.parse(fs.readFileSync(USERS_PATH, "utf-8"));
}

export function writeUsers(nextUsers) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(nextUsers, null, 2));
}

export function readWatchlists() {
  return JSON.parse(fs.readFileSync(WATCHLISTS_PATH, "utf-8"));
}

export function writeWatchlists(watchlists) {
  fs.writeFileSync(WATCHLISTS_PATH, JSON.stringify(watchlists, null, 2));
}

export function findByUsername(username) {
  return users.find((u) => u.username === username) || null;
}

export function findById(id) {
  const normalizedId = Number(id);
  return users.find((u) => Number(u.id) === normalizedId) || null;
}

export function findByEmail(email) {
  return users.find((u) => u.email === email) || null;
}

export function getWatchlist(userId) {
  const normalizedUserId = Number(userId);

  if (!findById(normalizedUserId)) {
    return null;
  }

  const watchlists = readWatchlists();
  return watchlists[normalizedUserId] || [];
}

export function addMovie(userId, movieData) {
  const normalizedUserId = Number(userId);

  if (!findById(normalizedUserId)) {
    return null;
  }

  const watchlists = readWatchlists();
  const list = watchlists[normalizedUserId] || [];
  const newId = list.length > 0 ? Math.max(...list.map((m) => Number(m.id))) + 1 : 1;

  const movie = {
    id: Number(newId),
    title: movieData.title,
    genre: movieData.genre || "",
    watched: Boolean(movieData.watched),
  };

  list.push(movie);
  watchlists[normalizedUserId] = list;
  writeWatchlists(watchlists);

  return movie;
}

export function updateMovie(userId, movieId, updates) {
  const normalizedUserId = Number(userId);

  if (!findById(normalizedUserId)) {
    return null;
  }

  const watchlists = readWatchlists();
  const list = watchlists[normalizedUserId] || [];
  const index = list.findIndex((m) => Number(m.id) === Number(movieId));

  if (index === -1) {
    return null;
  }

  list[index] = { ...list[index], ...updates, id: Number(movieId) };
  watchlists[normalizedUserId] = list;
  writeWatchlists(watchlists);

  return list[index];
}

export function deleteMovie(userId, movieId) {
  const normalizedUserId = Number(userId);

  if (!findById(normalizedUserId)) {
    return null;
  }

  const watchlists = readWatchlists();
  const list = watchlists[normalizedUserId] || [];
  const index = list.findIndex((m) => Number(m.id) === Number(movieId));

  if (index === -1) {
    return null;
  }

  list.splice(index, 1);
  watchlists[normalizedUserId] = list;
  writeWatchlists(watchlists);

  return true;
}
