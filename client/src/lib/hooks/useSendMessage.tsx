"use client";

import { type AuthResponse, type SendMessagesApiResponse } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = (authUser: AuthResponse) => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const senderId = authUser?.user.id;
  const receiverId = selectedConversation?.id;
  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser?.tokens.access.token}`,
        },
        body: JSON.stringify({ content: message, senderId, receiverId }),
      });

      if (res.status !== 201) {
        throw new Error("Something went wrong");
      }

      const data = (await res.json()) as SendMessagesApiResponse;

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
