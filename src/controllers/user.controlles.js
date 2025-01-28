import { StatusCodes } from "http-status-codes";
import { getAllUserService, loginUserService, registerUserService } from "../services/user.services.js";

export const getAllUserController = async (req, res) => {
  try {
    const data = await getAllUserService();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const registerUserController = async (req, res, next) => {
  try {
    const data = await registerUserService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const data = await loginUserService(req.body);
    res.status(StatusCodes.ACCEPTED).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};