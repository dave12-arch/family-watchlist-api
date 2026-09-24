import express from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.js";
import { findByUsername } from "../utils/db.js";
import { validateLogin } from "../middleware/login.js";

const router = express.Router();

router.post("/login", validateLogin, async (req, res) => {
  const { username, password } = req.body;

  const user = findByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({
    id: user.id,
    username: user.username,
    role: user.role
  });

  return res.status(200).json({ token });
});

export default router;
