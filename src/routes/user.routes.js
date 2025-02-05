import { Router } from "express";
import { firstcontroller, getAllUserController, getUserProfile, registerUserController, userLoginController } from "../controllers/user.controlles.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";

const userRouter = Router()
//api/users
userRouter.get('/', firstcontroller)
userRouter.post('/login', userLoginController)
userRouter.get('/details', getAllUserController)
userRouter.post("/register",registerUserController)
userRouter.get("/:userId",authMiddleWare,getUserProfile)
// userRouter.get('/details', getAllUser)

export default userRouter;