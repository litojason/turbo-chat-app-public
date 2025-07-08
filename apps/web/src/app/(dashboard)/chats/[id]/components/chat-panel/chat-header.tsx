"use client";

import { ChatListItem } from "@repo/db/models/chat";
import UserAvatar from "@repo/ui/components/avatar/user-avatar";
import { useChatContext } from "../../../context/chat-provider";
import { ChatType } from "@repo/db";

export default function ChatHeader() {
  const { chatId, chats, setChatDetailsVisible } = useChatContext();

  const data: ChatListItem | undefined = chats.find(
    (chat) => chat.id === chatId
  );

  if (!data) {
    return;
  }

  const { name, chatType, otherUser } = data;

  const chatTitle =
    chatType === ChatType.PRIVATE ? otherUser?.name || "Private chat" : name;

  return (
    <header
      onClick={() => setChatDetailsVisible(true)}
      className="flex items-center justify-between h-16 px-4 gap-4 border-b bg-sidebar"
    >
      <UserAvatar className="size-10" name={chatTitle} chatType={chatType} />
      <div className="flex-1">
        <span className="font-semibold truncate">{chatTitle}</span>
      </div>
    </header>
  );
}
