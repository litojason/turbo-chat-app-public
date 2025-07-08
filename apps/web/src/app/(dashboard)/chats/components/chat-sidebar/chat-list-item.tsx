import Link from "next/link";
import { Check } from "lucide-react";

import { ChatListItem as Chat } from "@repo/db/models/chat";
import { cn } from "@repo/ui/lib/utils";
import UserAvatar from "@repo/ui/components/avatar/user-avatar";
import useChatListItem from "../../hooks/use-chat-list-item";
import ChatListContextMenu from "./chat-list-context-menu";

type ChatListItemProps = {
  data: Chat;
};

export default function ChatListItem({ data }: ChatListItemProps) {
  const {
    id,
    chatType,
    isSelected,
    chatTitle,
    isMessageEmpty,
    fromCurrentUser,
    messageString,
    messageTime,
    isUnread,
  } = useChatListItem(data);

  return (
    <ChatListContextMenu
      chatId={id}
      chatType={chatType}
      isMessageEmpty={isMessageEmpty}
    >
      <Link href={`/chats/${id}`} replace>
        <div
          className={cn("flex items-center p-4 gap-4", {
            "bg-muted": isSelected,
          })}
        >
          <UserAvatar
            className="size-12"
            name={chatTitle}
            chatType={chatType}
          />

          <div className="flex flex-1 flex-col min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate">{chatTitle}</span>

              {messageTime && (
                <span className="text-xs text-muted-foreground">
                  {messageTime}
                </span>
              )}
            </div>

            <div
              className={cn(
                "flex items-center gap-1 text-muted-foreground truncate",
                {
                  "font-semibold": isUnread(),
                  "text-muted-foreground/50": isMessageEmpty,
                }
              )}
            >
              {fromCurrentUser && <Check className="size-4" />}

              <span className="flex-1 text-sm truncate">{messageString}</span>

              {isUnread() && (
                <div className="shrink-0 size-4 rounded-full bg-primary" />
              )}
            </div>
          </div>
        </div>
      </Link>
    </ChatListContextMenu>
  );
}
