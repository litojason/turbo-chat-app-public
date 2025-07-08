"use client";

import { cn } from "@repo/ui/lib/utils";
import { getInitialsName } from "@repo/ui/components/avatar/user-avatar";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@repo/ui/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@repo/ui/components/ui/chat/chat-message-list";
import { useDashboardContext } from "~/context/dashboard-provider";
import { useChatContext } from "../../../context/chat-provider";

export default function MessageList() {
  const { profile } = useDashboardContext();
  const { messages } = useChatContext();

  return (
    <ChatMessageList>
      {messages.map((message) => {
        const { id, fromUser, text } = message;

        const isUser = fromUser.id === profile?.id;
        const variant = isUser ? "sent" : "received";

        return (
          <ChatBubble key={id} variant={variant}>
            {!isUser && (
              <ChatBubbleAvatar fallback={getInitialsName(fromUser.name)} />
            )}
            <ChatBubbleMessage
              variant={variant}
              className={cn({ "pt-2": !isUser })}
            >
              {!isUser && (
                <div className="text-sm text-muted-foreground mb-1">
                  {fromUser.name}
                </div>
              )}

              {text}
            </ChatBubbleMessage>
          </ChatBubble>
        );
      })}
    </ChatMessageList>
  );
}
