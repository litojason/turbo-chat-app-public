"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams, useRouter } from "next/navigation";

import { socket } from "~/lib/socket";
import { Chat } from "@repo/db";
import { ChatListItem } from "@repo/db/models/chat";
import { ChatMessage, MessagePayload } from "@repo/db/models/message";
import { useDashboardContext } from "~/context/dashboard-provider";
import { deleteChat } from "~/actions/chat";

type DeleteChatState = {
  visible: boolean;
  chatId?: Chat["id"];
};
type ChatContextType = {
  chatId?: string;

  chatsLoading: boolean;
  chats: ChatListItem[];
  updateChats: (chat: ChatListItem) => void;

  deleteChatState: DeleteChatState;
  setDeleteChatState: (state: DeleteChatState) => void;
  handleDeleteChat: (chatId: Chat["id"]) => void;

  addChatVisible: boolean;
  setAddChatVisible: (visible: boolean) => void;

  messagesLoading: boolean;
  messages: ChatMessage[];
  sendMessage: (message: string) => void;

  chatDetailsVisible: boolean;
  setChatDetailsVisible: (visible: boolean) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);
export const useChatContext = () => useContext(ChatContext) as ChatContextType;

const ChatProvider = ({ children }: PropsWithChildren) => {
  const { id } = useParams<{ id?: string }>();

  const { replace } = useRouter();

  const { profile } = useDashboardContext();

  const [chatsLoading, setChatsLoading] = useState(true);
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [addChatVisible, setAddChatVisible] = useState(false);

  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messages, setMessages] = useState<ChatContextType["messages"]>([]);

  const [chatDetailsVisible, setChatDetailsVisible] = useState(false);
  const [deleteChatState, setDeleteChatState] = useState<
    ChatContextType["deleteChatState"]
  >({ visible: false, chatId: undefined });

  const getChats = useCallback(async () => {
    setChatsLoading(true);

    const res = await socket.emitWithAck("chat:list", {
      userId: profile?.id || "",
    });

    if (res.status === "OK") {
      setChats(res.chats);
    }

    setChatsLoading(false);
  }, [profile]);

  const joinUserRoom = useCallback(async () => {
    const res = await socket.emitWithAck("user:join", { userId: profile?.id });

    if (res.status === "OK") {
      console.log("join user room successful", res);
    }
  }, [profile]);

  const updateChats = useCallback((chat: ChatListItem) => {
    setChats((prevState) => {
      const existedChatIndex = prevState.findIndex((c) => c.id === chat.id);

      if (existedChatIndex === -1) {
        return [chat, ...prevState];
      }

      const updatedChats = [...prevState];
      const [existedChat] = updatedChats.splice(existedChatIndex, 1);
      if (existedChat) {
        return [existedChat, ...updatedChats];
      }

      return prevState;
    });
  }, []);

  const handleDeleteChat = async (chatId: Chat["id"]) => {
    await deleteChat(chatId);

    setChats((prevState) => {
      const existedChatIndex = prevState.findIndex((c) => c.id === chatId);

      if (existedChatIndex !== -1) {
        const updatedChats = [...prevState];
        const updatedChat = updatedChats[existedChatIndex]!;
        updatedChats[existedChatIndex] = { ...updatedChat, messages: [] };

        return updatedChats;
      }

      return prevState;
    });

    setDeleteChatState({ visible: false });
    if (chatDetailsVisible) setChatDetailsVisible(false);

    if (id === chatId) {
      replace("/chats");
    }
  };

  const updateChatMessage = useCallback((message: ChatMessage) => {
    setChats((prevState) => {
      const existedChatIndex = prevState.findIndex(
        (c) => c.id === message.chatId
      );

      if (existedChatIndex !== -1) {
        const updatedChats = [...prevState];
        const [existedChat] = updatedChats.splice(existedChatIndex, 1);
        if (existedChat) {
          existedChat.messages = [message];
          return [existedChat, ...updatedChats];
        }
      }

      return prevState;
    });
  }, []);

  const getMessages = useCallback(async () => {
    setMessagesLoading(true);

    if (id) {
      const res = await socket.emitWithAck("message:list", {
        userId: profile?.id,
        chatId: id,
      });

      if (res.status === "OK") {
        setMessages(res.messages);
      }
    }

    setMessagesLoading(false);
  }, [profile, id]);

  const updateMessages = useCallback(
    (message: ChatMessage) => {
      if (message.chatId === id) {
        setMessages((prevState) => [...prevState, message]);
      }

      updateChatMessage(message);
    },
    [id, updateChatMessage]
  );

  const sendMessage = async (message: string) => {
    if (profile?.id && id) {
      const payload: MessagePayload = {
        text: message,
        chatId: id,
        fromUserId: profile.id,
      };

      const res = await socket.emitWithAck("message:send", payload);

      if (res.status === "OK") {
        updateMessages(res.message);
      }
    }
  };

  const ackChatMessage = (lastMessage: ChatMessage) => {
    setChats((prevState) => {
      const updatedChats = prevState.map((chat) => {
        if (chat.id === lastMessage.chatId) {
          return { ...chat, clientOffset: lastMessage.id };
        }

        return chat;
      });

      return updatedChats;
    });
  };

  const ackMessage = useCallback(
    async (lastMessage: ChatMessage) => {
      const selectedChat = chats.find((chat) => chat.id === id);
      const clientOffset = selectedChat?.clientOffset;

      if (!clientOffset || lastMessage.id > clientOffset) {
        const res = await socket.emitWithAck("message:ack", {
          userId: profile?.id,
          chatId: id,
          messageId: lastMessage.id,
        });

        if (res.status === "OK") {
          ackChatMessage(lastMessage);
        }
      }
    },
    [profile, id, chats]
  );

  useEffect(() => {
    joinUserRoom();
    getChats();
  }, [joinUserRoom, getChats]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
    if (!id) return;

    const lastMessage =
      messages.length !== 0 ? messages[messages.length - 1] : null;

    if (
      !lastMessage ||
      lastMessage.fromUserId === profile?.id ||
      lastMessage.chatId !== id
    )
      return;

    ackMessage(lastMessage);
  }, [messages, id, profile, ackMessage]);

  useEffect(() => {
    socket.on("chat:private-chat-created", updateChats);
    socket.on("chat:group-chat-created", updateChats);
    socket.on("message:sent", updateMessages);

    return () => {
      socket.off("chat:private-chat-created");
      socket.off("chat:group-chat-created");
      socket.off("message:sent");
    };
  }, [updateChats, updateMessages]);

  return (
    <ChatContext.Provider
      value={{
        chatId: id,

        chatsLoading,
        chats,
        updateChats,

        deleteChatState,
        setDeleteChatState,
        handleDeleteChat,

        addChatVisible,
        setAddChatVisible,

        messagesLoading,
        messages,
        sendMessage,

        chatDetailsVisible,
        setChatDetailsVisible,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
