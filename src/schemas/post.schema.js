import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().max(50, "too long"),
});


export const updatePostSchema = z.object({
  content: z.string().max(50, "too long").nullable().nullish(),
  likeFlag: z.boolean().default(false),
});