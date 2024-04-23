import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
  return (
    <div className="flex h-screen w-full">
      <div className="flex w-64 flex-col border-r border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-14 items-center border-b border-gray-200 px-4 dark:border-gray-700">
          <TextIcon className="mr-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
          <span className="font-semibold text-gray-900 dark:text-gray-50">Chats</span>
        </div>
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
      </div>
      <div className="flex flex-1 flex-col">
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
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid gap-4">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg bg-blue-500 px-4 py-2 text-white">
                <p>Hey, how's it going?</p>
                <div className="mt-1 text-right text-xs text-blue-200">3:45 PM</div>
              </div>
            </div>
            <div className="flex">
              <div className="max-w-[80%] rounded-lg bg-gray-200 px-4 py-2 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                <p>I'm doing great, thanks for asking!</p>
                <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
                  3:46 PM
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-14 items-center border-t border-gray-200 bg-gray-100 px-4 dark:border-gray-700 dark:bg-gray-800">
          <Input
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-950"
            placeholder="Type your message..."
            type="text"
          />
          <Button className="ml-2">
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

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

function TextIcon(props: { className: string }) {
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}
