import { Fragment } from "react";

import { ChatListItem as IChatListItem } from "@repo/db/models/chat";
import { Separator } from "@repo/ui/components/ui/separator";
import ChatListItem from "./chat-list-item";

type ChatListProps = {
  chats: IChatListItem[];
};

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat, index) => (
        <Fragment key={chat.id}>
          <ChatListItem data={chat} />

          {chats.length - 1 !== index && <Separator />}
        </Fragment>
      ))}
    </div>
  );
}
