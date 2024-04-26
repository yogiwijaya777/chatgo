"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useSendMessage from "@/lib/hooks/useSendMessage";
import { type AuthResponse } from "@/types";

const MessageInput = ({ authUser }: { authUser: AuthResponse }) => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage(authUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form
      className="flex h-14 items-center border-t border-gray-200 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-800"
      onSubmit={handleSubmit}
    >
      <Input
        className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
        placeholder="Type your message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" className="ml-2">
        {loading ? (
          <div className="loading loading-spinner"></div>
        ) : (
          <SendIcon className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
};

export default MessageInput;

function SendIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
