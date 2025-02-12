import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  getPostByUserIdController,
  updatePostController,
} from "../controllers/post.controller.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

//api/posts
const postRouter = Router();

postRouter.route("/").get(authMiddleWare, getAllPostsController);
postRouter.post("/", authMiddleWare, createPostController);
postRouter
  .route("/:postId")
  .get(authMiddleWare, getPostByIdController)
  .delete(authMiddleWare, deletePostController)
  .patch(authMiddleWare, updatePostController);

postRouter.get("/user/:userId", authMiddleWare, getPostByUserIdController);

export default postRouter;