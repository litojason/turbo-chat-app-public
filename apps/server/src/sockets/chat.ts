import { Server, Socket } from "socket.io";

import { chatRoom, userRoom } from "../lib/room";
import {
  ChatListItem,
  NewGroupChatPayload,
  NewPrivateChatPayload,
} from "@repo/db/models/chat";
import {
  addGroupChat,
  addPrivateChat,
  getChatList,
  getChatListWithRawQuery,
  getPrivateChat,
} from "../services/chat";

export function chatList({ socket }: { socket: Socket }) {
  return async (
    { userId }: { userId: string },
    callback: (res: { status: string; chats: ChatListItem[] }) => void
  ) => {
    if (typeof callback !== "function") return;

    // const chats = await getChatList(userId);
    const chats = await getChatListWithRawQuery(userId);

    chats.forEach((chat) => {
      socket.join(chatRoom(chat.id));
    });

    callback({ status: "OK", chats });
  };
}

export function createPrivateChat({
  io,
  socket,
}: {
  io: Server;
  socket: Socket;
}) {
  return async (
    { name, userId, otherUserId }: { userId: string } & NewPrivateChatPayload,
    callback: (res: { status: string; chat: ChatListItem }) => void
  ) => {
    if (typeof callback !== "function") return;

    const existedChat = await getPrivateChat({ userId, otherUserId });

    if (existedChat) {
      return callback({
        status: "ERROR",
        chat: { ...existedChat, messages: [] },
      });
    }

    const newChat = await addPrivateChat({ name, userId, otherUserId });

    const [userA, userB] = newChat.users.map((u) => u.user);
    const currentUser = userA?.id === userId ? userA : userB;
    const otherUser = userA?.id !== userId ? userA : userB;

    const currentUserChatListItem = { ...newChat, users: undefined, otherUser };
    const otherUserChatListItem = {
      ...newChat,
      users: undefined,
      otherUser: currentUser,
    };

    socket
      .to(userRoom(otherUserId))
      .emit("chat:private-chat-created", otherUserChatListItem);

    // handle if user has multiple tabs
    io.in(userRoom(userId)).socketsJoin(chatRoom(newChat.id));
    io.in(userRoom(otherUserId)).socketsJoin(chatRoom(newChat.id));

    callback({ status: "OK", chat: currentUserChatListItem });
  };
}

export function createGroupChat({
  io,
  socket,
}: {
  io: Server;
  socket: Socket;
}) {
  return async (
    { name, userId, userIds }: { userId: string } & NewGroupChatPayload,
    callback: (res: { status: string; chat: ChatListItem }) => void
  ) => {
    if (typeof callback !== "function") return;

    const newChat = await addGroupChat({ name, userId, userIds });

    io.in(userRoom(userId)).socketsJoin(chatRoom(newChat.id));

    userIds.forEach((id) => {
      socket.to(userRoom(id)).emit("chat:group-chat-created", newChat);
      io.in(userRoom(id)).socketsJoin(chatRoom(newChat.id));
    });

    callback({ status: "OK", chat: newChat });
  };
}
