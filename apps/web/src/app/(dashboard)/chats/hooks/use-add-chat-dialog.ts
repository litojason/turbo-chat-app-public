import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

import { ChatType, User } from "@repo/db";
import { socket } from "~/lib/socket";
import { useDashboardContext } from "~/context/dashboard-provider";
import { useChatContext } from "../context/chat-provider";

export default function useAddChatDialog() {
  const { replace } = useRouter();
  const { profile } = useDashboardContext();
  const { setAddChatVisible, updateChats } = useChatContext();

  const [chatType, setChatType] = useState<ChatType>(ChatType.PRIVATE);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [debounceSearchTerm, { isPending }] = useDebounce(searchTerm, 2000);

  const isPrivateChatError =
    chatType === ChatType.PRIVATE && selectedUsers.length > 1;
  const isGroupNameError = chatType === ChatType.GROUP && groupName === "";
  const disabled =
    selectedUsers.length === 0 || isPrivateChatError || isGroupNameError;

  const searchUsers = useCallback(
    async (term: string) => {
      const res = await socket.emitWithAck("user:search", {
        userId: profile?.id,
        term,
      });

      if (res.status === "OK") {
        setUsers(res.users);
      }
    },
    [profile]
  );

  const updateSelectedUser = (user: User) => {
    setSelectedUsers((prevState) => {
      const userExist = prevState.some((u) => u.id === user.id);

      return userExist
        ? prevState.filter((u) => u.id != user.id)
        : [...prevState, user];
    });
  };

  const addPrivateChat = async () => {
    const res = await socket.emitWithAck("chat:create-private-chat", {
      userId: profile?.id,
      name: selectedUsers[0]?.name || "New Chat",
      otherUserId: selectedUsers[0]?.id,
    });

    if (res.status === "OK") {
      updateChats(res.chat);
      setAddChatVisible(false);
      replace(`/chats/${res.chat.id}`);
      return;
    }

    if (res.chat) {
      setAddChatVisible(false);
      replace(`/chats/${res.chat.id}`);
      return;
    }
  };

  const addGroupChat = async () => {
    const mapUserIds = selectedUsers.map((user) => user.id);

    const res = await socket.emitWithAck("chat:create-group-chat", {
      userId: profile?.id,
      name: groupName,
      userIds: mapUserIds,
    });

    if (res.status === "OK") {
      updateChats(res.chat);
      setAddChatVisible(false);
      replace(`/chats/${res.chat.id}`);
      return;
    }
  };

  const handleAddChat = () => {
    if (chatType === ChatType.GROUP) {
      addGroupChat();
    } else {
      addPrivateChat();
    }
  };

  useEffect(() => {
    if (debounceSearchTerm) {
      searchUsers(debounceSearchTerm);
    } else {
      setUsers([]);
    }
  }, [debounceSearchTerm, searchUsers]);

  return {
    chatType,
    setChatType,
    setGroupName,
    searchTerm,
    setSearchTerm,
    loading: isPending(),
    users,
    selectedUsers,
    updateSelectedUser,
    handleAddChat,
    isPrivateChatError,
    disabled,
  };
}
