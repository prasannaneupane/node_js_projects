import { StatusCodes } from "http-status-codes";
import {
  createPostService,
  deletePostByIdService,
  getPostByIdService,
  getPostByUserIdService,
  getPostService,
  updatePostService,
} from "../services/post.service.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

export const getAllPostsController = async (req, res, next) => {
  try {
    const posts = await getPostService(req.query);
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

export const getPostByIdController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const data = await getPostByIdService(postId);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};

export const getPostByUserIdController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const data = await getPostByUserIdService(userId);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};

export const deletePostController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const loggedInUserId = req.userId;
    const response = await deletePostByIdService(postId, loggedInUserId);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export const updatePostController = async (req, res, next) => {
  try {
    updatePostSchema.parse(req.body);
    const postId = req.params.postId;
    const loggedInUserId = req.userId;
    const updateData = req.body;
    const response = await updatePostService(
      postId,
      loggedInUserId,
      updateData
    );
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};