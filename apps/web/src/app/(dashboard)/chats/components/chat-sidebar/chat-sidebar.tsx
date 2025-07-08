"use client";

import ChatList from "./chat-list";
import AddChatDialog from "../add-chat/add-chat-dialog";
import { ChatListSkeleton } from "../skeletons/chat-sidebar";
import { useChatContext } from "../../context/chat-provider";

export default function ChatSidebar() {
  const { chats, chatsLoading } = useChatContext();

  return (
    <div className="flex flex-col shrink-0 w-screen sm:w-2/5 sm:max-w-xs bg-sidebar border-x">
      <header className="flex items-center justify-between h-16 px-4 gap-4 border-b">
        <h1>Chats</h1>

        <AddChatDialog />
      </header>

      {chatsLoading ? (
        <ChatListSkeleton />
      ) : chats.length === 0 ? (
        <div className="flex size-full items-center justify-center p-4">
          <span className="text-muted-foreground">No chat yet.</span>
        </div>
      ) : (
        <ChatList chats={chats} />
      )}
    </div>
  );
}
