import { prisma } from "../db/index.js";


export const getPostService = async (query) => {
  
  let searchTerm = "";

  if (query.search) {
    searchTerm = query.search;
  }
  const allPosts = await prisma.post.findMany({
    where: {
      OR: [
        { content: { contains: searchTerm, mode: "insensitive" } },
        { User: { fullName: { contains: searchTerm, mode: "insensitive" } } },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: {
      User: { omit: { password: true } },
    },
  });
  return allPosts;
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



export const getPostByIdService = async (postId) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    throw new Error("Not Found", { cause: "NotFoundCustomError" });
  }
  return post;
};

export const getPostByUserIdService = async (userId) => {
  const posts = await prisma.post.findMany({ where: { userId } });
  if (!posts) {
    throw new Error("Not Found", { cause: "NotFoundCustomError" });
  }
  return posts;
};

export const deletePostByIdService = async (postId, loggedInUserId) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new Error("Not Found", { cause: "NotFoundCustomError" });
  }

  if (post.userId == loggedInUserId) {
    await prisma.post.delete({ where: { id: postId } });
  } else {
    throw new Error("You cannot perform this action", {
      cause: "UnauthorizedError",
    });
  }

  return { message: "Post deleted successfully" };
};


export const updatePostService = async (postId, loggedInUserId, updateData) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    throw new Error("Not Found", { cause: "NotFoundCustomError" });
  }

  // if (updateData.likeCase == "like") {
  //   post.likesCount = post.likesCount + 1;
  // } else if (updateData.likeCase == "unlike") {
  //   if (post.likesCount > 0) {
  //     post.likesCount = post.likesCount - 1;
  //   }
  // }



  // if (updateData.content) {
  //   post.content = updateData.content;
  // }

  if (post.userId !== loggedInUserId) {
    throw new Error("You cannot perform this action", {
      cause: "UnauthorizedError",
    });
  } else {
    const data = await prisma.post.update({
      where: { id: postId },
      data: {
        content: updateData.content,
        likesCount: updateData.likeFlag ? post.likesCount + 1 : post.likesCount,
      },
    });
    return data;
  }
};