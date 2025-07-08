"use client";

import Loading from "@repo/ui/components/loader/loading";
import MessageList from "./components/chat-panel/message-list";
import ChatHeader from "./components/chat-panel/chat-header";
import ChatFooter from "./components/chat-panel/chat-footer";
import ChatDetailsSheet from "./components/chat-details/chat-details-sheet";
import { useChatContext } from "../context/chat-provider";

export default function ChatPage() {
  const { chatId, chats, chatsLoading, messagesLoading } = useChatContext();

  if (chatsLoading || messagesLoading) {
    return (
      <div className="flex size-full items-center justify-center p-4">
        <Loading className="size-10" />
      </div>
    );
  }

  const chatExisted = chats.some((c) => c.id === chatId);

  if (!chatExisted) {
    return (
      <section className="size-full flex flex-col items-center justify-center p-6">
        <h2>Chat not found</h2>
        <p>
          Please choose from chat list on the left side or add new chat using
          email
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-screen md:w-auto md:flex-1">
      <ChatHeader />

      <div className="flex-1 w-full overflow-y-auto">
        <MessageList />
      </div>

      <div className="w-full px-5 pb-5">
        <ChatFooter />
      </div>

      <ChatDetailsSheet />
    </section>
  );
}
