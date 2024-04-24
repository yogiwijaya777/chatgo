import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";

const MessageAvatar = () => {
  return (
    <div className="flex h-14 items-center border-b border-gray-200 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-800">
      <Avatar className="mr-2 h-8 w-8">
        <AvatarImage alt="Jane Doe" src="/placeholder-avatar.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-gray-900 dark:text-gray-50">Jane Doe</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
      </div>
    </div>
  );
};

export default MessageAvatar;
