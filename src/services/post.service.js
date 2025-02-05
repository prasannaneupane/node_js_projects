
//import { userLoginController } from "../controllers/user.controller.js";
import { prisma } from "../db/index.js";

export const getPostService = async () => {
  const posts = await prisma.post.findMany();
  return posts;
};
export const createPostService = async (postData, userId) => {
  const posts = await prisma.post.create({
    data: {
      content: postData.content,
      userId: userId,
    },
  });
  return posts;
};