import { type Tokens, type User } from "@/types";
import { cookies } from "next/headers";

export const isLoggedIn = (): { user: User; tokens: Tokens } | undefined => {
  const users = cookies().get("user");
  if (!users) return;

  const tokens = cookies().get("tokens");

  if (!tokens) return;

  const user = JSON.parse(users.value) as User;

  const tokensValue = JSON.parse(tokens.value) as Tokens;

  return { user, tokens: tokensValue };
};
