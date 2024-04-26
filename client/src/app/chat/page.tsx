import MessageContainer from "@/components/messages/MessageContainer";
import SideBar from "@/components/sidebar/SideBar";
import { isLoggedIn } from "@/lib/auth/isLoggedIn";
import { redirect } from "next/navigation";

export default function Chat() {
  const authUser = isLoggedIn();

  if (!authUser) {
    return redirect("auth/login");
  }
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <MessageContainer authUser={authUser} />
    </div>
  );
}
