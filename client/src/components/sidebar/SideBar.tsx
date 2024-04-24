import Conversations from "./Conversations";

const SideBar = () => {
  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-14 items-center border-b border-gray-200 px-4 dark:border-gray-700">
        <TextIcon className="mr-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
        <span className="font-semibold text-gray-900 dark:text-gray-50">Chats</span>
      </div>
      <Conversations />
    </div>
  );
};

export default SideBar;

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
