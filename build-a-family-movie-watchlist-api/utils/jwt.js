import jwt from "jsonwebtoken";

function getJwtSecret() {
  return process.env.JWT_SECRET;
}

export function signToken(payload) {
    return jwt.sign(payload, getJwtSecret(), { expiresIn: "1d"});
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, getJwtSecret());
    } catch (error){
        return null;
    }
}