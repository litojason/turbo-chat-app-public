import { useParams } from "next/navigation";

import { ChatType } from "@repo/db";
import { ChatListItem } from "@repo/db/models/chat";
import { getChatListTimeFormat } from "~/lib/date";
import { useDashboardContext } from "~/context/dashboard-provider";

export default function useChatListItem(data: ChatListItem) {
  const { profile } = useDashboardContext();

  const { id, name, chatType, otherUser, messages, clientOffset } = data;

  const { id: selectedId } = useParams<{ id: string }>();

  const chatTitle =
    chatType === ChatType.PRIVATE ? otherUser?.name || "Private chat" : name;

  const isMessageEmpty = messages.length === 0;

  const fromCurrentUser =
    messages.length > 0 ? messages[0]?.fromUser.id === profile?.id : false;

  const messageString = isMessageEmpty
    ? "Start chatting"
    : chatType === ChatType.GROUP
      ? `${fromCurrentUser ? "You" : messages[0]?.fromUser?.name}: ${messages[0]?.text}`
      : messages[0]?.text;

  const messageTime =
    messages.length > 0 && messages[0]
      ? getChatListTimeFormat(messages[0].createdAt)
      : null;

  const isUnread = () => {
    const lastMessage = messages[0];

    // if lastMessage empty or lastMessage from user return false
    if (!lastMessage || lastMessage.fromUser.id === profile?.id) return false;

    // if never read the chat
    if (!clientOffset) return true;

    return lastMessage.id > clientOffset;
  };

  return {
    id,
    chatType,
    isSelected: id === selectedId,
    chatTitle,
    isMessageEmpty,
    fromCurrentUser,
    messageString,
    messageTime,
    isUnread,
  };
}
