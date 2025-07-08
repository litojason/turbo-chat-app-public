import { PropsWithChildren } from "react";
import { LogOut, Trash2 } from "lucide-react";

import { Chat, ChatType } from "@repo/db";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@repo/ui/components/ui/context-menu";
import LeaveGroupDialog from "../leave-group-dialog";
import { useChatContext } from "../../context/chat-provider";

interface ChatListContextMenuProps extends PropsWithChildren {
  chatId: Chat["id"];
  chatType: ChatType;
  isMessageEmpty: boolean;
}

export default function ChatListContextMenu({
  chatId,
  chatType,
  isMessageEmpty,
  children,
}: ChatListContextMenuProps) {
  const { setDeleteChatState } = useChatContext();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          disabled={isMessageEmpty}
          variant="destructive"
          onSelect={() => setDeleteChatState({ visible: true, chatId })}
        >
          <Trash2 /> Delete chat
        </ContextMenuItem>

        {chatType === ChatType.GROUP && (
          <LeaveGroupDialog>
            <ContextMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
            >
              <LogOut /> Leave group
            </ContextMenuItem>
          </LeaveGroupDialog>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
