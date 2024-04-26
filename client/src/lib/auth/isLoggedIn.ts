import { type Tokens, type User } from "@/types";
import { cookies } from "next/headers";

export const isLoggedIn = () => {
  const users = cookies().get("users");
  if (!users) return false;

  const tokens = cookies().get("tokens");

  if (!tokens) return false;

  const user = JSON.parse(users.value) as User;

  const tokensValue = JSON.parse(tokens.value) as Tokens;

  return { user, tokens: tokensValue };
};
