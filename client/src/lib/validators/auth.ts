import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SingupInput = z.infer<typeof signupSchema>;
