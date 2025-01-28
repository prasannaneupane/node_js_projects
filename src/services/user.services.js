import { prisma } from "../db/index.js";

export const getAllUserService = async () => {
  return await prisma.user.findMany();
};

export const registerUserService = async (registerUserData) => {
  const res = await prisma.user.create({
    data: {
      email: registerUserData.email,
      fullName: registerUserData.fullName,
      password: registerUserData.password,
      gender: registerUserData.gender,
    },
  });
  return res;
};

export const loginUserService = async (loginData) => {
  const email = loginData.email;
  const password = loginData.password;

  const user = await prisma.user.findUnique({ where:{email:email} });
  
  if (!user) {
    return { message: "Invalid credential" };
  }

  const checkPasword = user.password == password;
  if (!checkPasword) {
    return { message: "Invalid credential" };
  }

  return { message: "Login successful", user };
};