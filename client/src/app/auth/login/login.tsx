"use client";

import { SubmitButton } from "@/components/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth/actions";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, formAction] = useFormState(login, null);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      <Card className="w-[400px] items-end">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">Log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              {state?.fieldError ? (
                <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                  {Object.values(state.fieldError).map((err) => (
                    <li className="ml-4" key={err}>
                      {err}
                    </li>
                  ))}
                </ul>
              ) : state?.formError ? (
                <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
                  {state?.formError}
                </p>
              ) : null}
            </div>
            <div className="mb-[20px] text-center">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-sky-600">
                Login
              </Link>
            </div>
            <SubmitButton className="w-full"> Sign Up</SubmitButton>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="/"
          >
            Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
