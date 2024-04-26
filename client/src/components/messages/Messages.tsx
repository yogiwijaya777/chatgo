"use client";

import useGetMessages from "@/lib/hooks/useGetMessages";
import useListenMessages from "@/lib/hooks/useListenMessages";
import { type AuthResponse } from "@/types";

export const dynamic = "force-dynamic";

const Messages = ({ authUser }: { authUser: AuthResponse }) => {
  const { messages, loading } = useGetMessages(authUser);
  useListenMessages();

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid gap-4">
        <div className="flex flex-col flex-wrap justify-end">
          {loading ? (
            <div className="h-5 w-5 animate-spin border-b-2 border-white" />
          ) : (
            messages.length > 0 &&
            messages.map((message) =>
              message.senderId === authUser.user.id ? (
                <div className="max-w-[80%] rounded-lg bg-blue-500 px-4 py-2 text-white">
                  <p>{message.content}</p>
                  <div className="mt-1 text-right text-xs text-blue-200">3:45 PM</div>
                </div>
              ) : (
                <div className="max-w-[80%] rounded-lg bg-gray-200 px-4 py-2 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                  <p>{message.content}</p>
                  <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                    3:46 PM
                  </div>
                </div>
              ),
            )
          )}
        </div>
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default Messages;
