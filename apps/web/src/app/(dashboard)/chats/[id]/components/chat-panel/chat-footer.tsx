"use client";

import { ChatInput } from "@repo/ui/components/ui/chat/chat-input";
import useChatFooter from "../../../hooks/use-chat-footer";

export default function ChatFooter() {
  const { inputRef, message, handleKeyPress, handleInputChange } =
    useChatFooter();

  return (
    <ChatInput
      ref={inputRef}
      value={message}
      onKeyDown={handleKeyPress}
      onChange={handleInputChange}
      placeholder="Type a message..."
    />
  );
}
