import { z} from "zod"

export const createPostSchema = z.object({
    content: z.string().max(50, "too long"),
  });