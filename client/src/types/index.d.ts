interface Conversation {
  id: string;
}

interface Message {
  id: string;
  text: string;
}

export interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}
