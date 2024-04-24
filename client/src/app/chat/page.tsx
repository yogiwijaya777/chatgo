import MessageContainer from "@/components/messages/MessageContainer";
import SideBar from "@/components/sidebar/SideBar";

export default function Chat() {
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <MessageContainer />
    </div>
  );
}
