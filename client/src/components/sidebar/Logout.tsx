"use client";

import { logout } from "@/lib/auth/actions";
import { SubmitButton } from "../SubmitButton";

const Logout = () => {
  return <SubmitButton onClick={() => logout()}>Logout</SubmitButton>;
};

export default Logout;
