import { Router } from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { getAllPostController,createPostController } from "../controllers/post.controller.js";

const postRouter =Router();

postRouter.route("/").get(authMiddleWare,getAllPostController);
postRouter.post("/",authMiddleWare,createPostController)

export default postRouter;