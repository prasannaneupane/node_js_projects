import { StatusCodes } from "http-status-codes";
import { createPostService, getPostService } from "../services/post.service.js";
import { createPostSchema } from "../schemas/post.schema.js";


export const getAllPostController = async (req, res, next) => {
  try {
    const posts = await getPostService();
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    next(error);
  }
};
export const createPostController = async (req, res, next) => {
  try {
    createPostSchema.parse(req.body);
    const posts = await createPostService(req.body, req.userId);
    res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    next(error);
  }
};