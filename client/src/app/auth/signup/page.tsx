import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignUpForm from "./signup";

const SignUpPage = () => {
  const user = cookies().get("user");
  const tokens = cookies().get("tokens");

  if (user && tokens) {
    return redirect("/chat");
  }

  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
