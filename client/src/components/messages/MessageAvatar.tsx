import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type AuthResponse } from "@/types";

const MessageAvatar = ({ authUser }: { authUser: AuthResponse }) => {
  return (
    <div className="flex h-14 items-center border-b border-gray-200 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-800">
      <Avatar className="mr-2 h-8 w-8">
        <AvatarImage alt="Jhon Doe" src="/placeholder-avatar.jpg" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-gray-900 dark:text-gray-50">{authUser.user.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Online</div>
      </div>
    </div>
  );
};

export default MessageAvatar;
