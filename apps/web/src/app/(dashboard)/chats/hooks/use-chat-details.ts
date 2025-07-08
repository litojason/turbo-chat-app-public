import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Chat, ChatType } from "@repo/db";
import { ChatDetails } from "@repo/db/models/chat";
import { useChatContext } from "../context/chat-provider";
import { getChatById } from "~/actions/chat";

export default function useChatDetails() {
  const { id } = useParams<{ id: Chat["id"] }>();

  const { chatDetailsVisible: open } = useChatContext();

  const [details, setDetails] = useState<ChatDetails>();

  const fetchDetails = async (chatId: Chat["id"]) => {
    const chat = await getChatById(chatId);

    setDetails(chat);
  };

  useEffect(() => {
    if (open && id) {
      fetchDetails(id);
    }
  }, [open, id]);

  const isPrivateChat = details?.chatType === ChatType.PRIVATE;

  const title = isPrivateChat ? "Private Chat" : "Group Chat";

  const chatName = isPrivateChat
    ? details.users[0]?.name || "Private chat"
    : details?.name || "Private chat";

  const chatLabel = isPrivateChat
    ? details.users[0]?.email || "Email"
    : `Group: ${details?.users.length} members`;

  const chatAbout = isPrivateChat ? details.users[0]?.about : null;

  return { details, title, chatName, chatLabel, chatAbout };
}
