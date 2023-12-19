import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

export function GenerateToken(data, time = "168h") {
  return jwt.sign(data, secretKey, { expiresIn: time });
}
