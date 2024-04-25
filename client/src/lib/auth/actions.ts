"use server";
import { type AuthResponse, type User, type Tokens } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  type LogoutInput,
  loginSchema,
  signupSchema,
  type LoginInput,
  type SingupInput,
} from "../validators/auth";

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

    const data = (await response.json()) as AuthResponse;

    cookies().set("tokens", JSON.stringify(data.tokens), {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("user", JSON.stringify(data.user), {
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

export async function login(
  formState: unknown,
  formData: FormData,
): Promise<ActionResponse<LoginInput>> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      fieldError: {
        email: err.fieldErrors.email?.[0],
        password: err.fieldErrors.password?.[0],
      },
    };
  }

  const { email, password } = parsed.data;

  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return {
        formError: "Something went wrong, please try again later",
      };
    }

    const data = (await response.json()) as AuthResponse;

    cookies().set("tokens", JSON.stringify(data.tokens), {
      httpOnly: process.env.NODE_ENV === "production",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    cookies().set("user", JSON.stringify(data.user), {
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

export async function logout() {
  const tokens = cookies().get("tokens");

  if (!tokens) return { formError: "Please login first" };

  const tokensValue = JSON.parse(tokens.value) as Tokens;
  const refreshToken = tokensValue.refresh.token;

  try {
    await fetch(`${process.env.API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });
  } catch (error) {
    return console.log(error);
  }

  cookies().delete("tokens");
  cookies().delete("user");
  return redirect("/");
}
