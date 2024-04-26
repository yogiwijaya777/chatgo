"use client";
import useConversation from "@/lib/zustand/useConversation";
import { Avatar, AvatarImage } from "../ui/avatar";
import { type User } from "@/types";
import { AvatarGenerator } from "random-avatar-generator";

const Conversation = ({ conversation }: { conversation: User }) => {
  const generator = new AvatarGenerator();
  const { setSelectedConversation } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="cursor-pointer py-2" onClick={() => setSelectedConversation(conversation)}>
        <div className="flex items-center px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage alt={conversation.name} src={`${generator.generateRandomAvatar()}`} />
          </Avatar>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-50">{conversation.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
