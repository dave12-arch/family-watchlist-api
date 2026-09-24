import express from 'express';
import  authenticate from '../middleware/authenticate.js';
import authorizeRole from '../middleware/authorize.js';
import { readUsers } from '../utils/db.js';

const router = express.Router();

router.get("/users", authenticate, authorizeRole("admin"), 
    async (req, res) => {
    const users = await readUsers();

    const safeUsers = users.map(({ passwordHash, ...user }) => user);

    return res.status(200)
              .json({
                users: safeUsers
              });
});

export default router;