"use server";
import { cookies } from "next/headers";
import { type SingupInput, signupSchema } from "../validators/auth";
import { redirect } from "next/navigation";
import { type UserCreatedResponse } from "@/types";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export async function signup(
  formState: unknown,
  formData: FormData,
): Promise<ActionResponse<SingupInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = signupSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        name: err.fieldErrors.name?.[0],
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { name, email, password } = parsed.data;

  try {
    const response = await fetch(`${process.env.API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 201) {
      return {
        formError: "Something went wrong, please try again later",
      };
    }

    const data = (await response.json()) as UserCreatedResponse;

    cookies().set("tokens", JSON.stringify(data.tokens), {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("user", JSON.stringify(data.userCreated), {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error: unknown) {
    return {
      formError: "Something went wrong, please try again later",
    };
  }
  return redirect("/chat");
}