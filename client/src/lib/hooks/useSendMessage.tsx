"use client";

import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { isLoggedIn } from "../auth/isLoggedIn";
import { type MessagesApiResponse } from "@/types";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const authUser = isLoggedIn();
  const senderId = authUser?.user.id;
  const receiverId = selectedConversation?.id;

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: message, senderId, receiverId }),
      });

      if (res.status !== 200) {
        throw new Error("Something went wrong");
      }

      const data = (await res.json()) as MessagesApiResponse;

      setMessages([...messages, data.data]);
    } catch (error: unknown) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
