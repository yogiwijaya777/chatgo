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

export interface UserCreatedResponse {
  userCreated: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updateAt: string;
    isEmailVerified: boolean;
  };
  tokens: {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
}
