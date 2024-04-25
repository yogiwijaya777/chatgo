import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SingupInput = z.infer<typeof signupSchema>;
