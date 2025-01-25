

import  statusCodes  from "http-status-codes";
import { userFirstService,loginUserService, allUserService } from "../services/user.services.js";

export const userFirstController = async (req,res) =>{
    const data = await userFirstService();
    res.status(statusCodes.OK).json({message: data})
}

export const userLoginController = async (req,res) =>{
    const data = await loginUserService(req.body);
    res.status(statusCodes.OK).json(data)
}

export const allUserControlller = async (req,res) =>{
    const usersData = await allUserService();
    res.status(statusCodes.OK).json(usersData)
}