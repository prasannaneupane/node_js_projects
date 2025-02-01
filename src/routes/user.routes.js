import { Router } from "express";
import { getAllUserController, getUserProfile, registerUserController, userLoginController } from "../controllers/user.controlles.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

//api/users
const userRouter = Router();
userRouter.get("/", getAllUserController);
userRouter.post("/register",registerUserController)
userRouter.post("/login", userLoginController);
userRouter.get("/:userId", authMiddleWare, getUserProfile);

export default userRouter;