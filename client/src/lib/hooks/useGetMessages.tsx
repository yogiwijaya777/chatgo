"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { type GetMessagesApiResponse, type AuthResponse } from "@/types";

const useGetMessages = (authUser: AuthResponse) => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const senderId = authUser.user.id;
  const receiverId = selectedConversation?.id;

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/messages/${senderId}/${receiverId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authUser?.tokens.access.token}`,
            },
          },
        );

        if (res.status !== 200) {
          throw new Error("Error fetching messages");
        }

        const data = (await res.json()) as GetMessagesApiResponse;
        setMessages(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?.id) getMessages();
  }, [selectedConversation?.id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
