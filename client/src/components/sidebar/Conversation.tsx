import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Conversation = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-2">
        <Link
          className="flex items-center px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          href="#"
        >
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage alt="John Doe" src="/placeholder-avatar.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-50">John Doe</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Hey, how's it going?</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Conversation;
