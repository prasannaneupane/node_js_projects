import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { prisma } from "../db/index.js";

const jwtSecret = process.env.JWT_SECRET

export const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.split(" ")[1];
  if (!authToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
  }
  try {
    const payload = jwt.verify(authToken, jwtSecret);
    const userId = payload.sub
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    req.userId = user.id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};