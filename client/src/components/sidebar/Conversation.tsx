import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { type User } from "@/types";
import { AvatarGenerator } from "random-avatar-generator";

const Conversation = ({ conversation }: { conversation: User }) => {
  const generator = new AvatarGenerator();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-2">
        <div className="flex items-center px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage alt="John Doe" src={`${generator.generateRandomAvatar()}`} />
            <AvatarFallback>JD</AvatarFallback>
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
