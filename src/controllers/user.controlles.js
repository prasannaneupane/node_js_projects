import { StatusCodes } from "http-status-codes";
import { getAllUserService, loginUserService, registerUserService, userProfileService } from "../services/user.services.js";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";

export const getAllUserController = async (req, res) => {
  try {
    const data = await getAllUserService();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};

export const registerUserController = async (req, res, next) => {
  try {
    createUserSchema.parse(req.body)
    const data = await registerUserService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    next(error);
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    loginUserSchema.parse(req.body)
    const data = await loginUserService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile =async (req, res, next) => {
  try {
    const data = await userProfileService(req.params.userId);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};