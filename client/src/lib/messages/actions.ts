"use server";

import { type User, type UsersApiResponse } from "@/types";
import { isLoggedIn } from "../auth/isLoggedIn";

export async function getConversations(): Promise<User[]> {
  const isLoggedInData = isLoggedIn();

  if (!isLoggedInData) return [];

  const response = await fetch(`${process.env.API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${isLoggedInData.tokens.access.token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Something went wrong");
  }

  const data = (await response.json()) as UsersApiResponse;

  return data.data;
}
