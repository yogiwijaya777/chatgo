const Message = () => {
  return (
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
            <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">3:46 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
