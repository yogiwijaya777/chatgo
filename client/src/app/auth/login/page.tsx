import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./login";

const LoginPage = () => {
  const user = cookies().get("user");
  const tokens = cookies().get("tokens");

  if (user && tokens) {
    return redirect("/chat");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
