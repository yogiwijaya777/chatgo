"use client";

import useConversation from "@/lib/zustand/useConversation";
import MessageAvatar from "./MessageAvatar";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import NoChatSelected from "./NoChatSelected";
import { type AuthResponse } from "@/types";
import Messages from "./Messages";

export const dynamic = "force-dynamic";

const MessageContainer = ({ authUser }: { authUser: AuthResponse }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-1 flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <MessageAvatar authUser={authUser} />
          <Messages authUser={authUser} />
          <MessageInput authUser={authUser} />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
