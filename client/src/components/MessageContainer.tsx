import Message from "./Message";
import MessageAvatar from "./MessageAvatar";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <div className="flex flex-1 flex-col">
      <MessageAvatar />
      <Message />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
