"use client";

import useConversation from "@/zustand/useConversation";
import Message from "./Message";
import MessageAvatar from "./MessageAvatar";
import MessageInput from "./MessageInput";
import { useEffect } from "react";
import NoChatSelected from "./NoChatSelected";

const MessageContainer = () => {
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
          <MessageAvatar />
          <Message />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
