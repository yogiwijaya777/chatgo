import { getConversations } from "@/lib/messages/actions";
import Conversation from "./Conversation";
import { isLoggedIn } from "@/lib/auth/isLoggedIn";

const Conversations = async () => {
  const authUser = isLoggedIn();
  const conversations = await getConversations();

  return (
    <div className="flex flex-col overflow-auto py-2">
      {conversations.length > 0 ? (
        conversations.map(
          (conversation) =>
            authUser?.user.id !== conversation.id && (
              <Conversation key={conversation.id} conversation={conversation} />
            ),
        )
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">No conversations yet</div>
      )}
    </div>
  );
};
export default Conversations;
