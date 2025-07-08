"use client";

import { LogOut, Trash2 } from "lucide-react";

import { ChatType } from "@repo/db";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/ui/sheet";
import UserAvatar from "@repo/ui/components/avatar/user-avatar";
import { Button } from "@repo/ui/components/ui/button";
import MemberListItem from "./member-list-item";
import LeaveGroupDialog from "../../../components/leave-group-dialog";
import { useChatContext } from "../../../context/chat-provider";
import useChatDetails from "../../../hooks/use-chat-details";
import { useDashboardContext } from "~/context/dashboard-provider";
import { moveObjectToTop } from "~/lib/array";

export default function ChatDetailsSheet() {
  const { profile } = useDashboardContext();
  const { chatDetailsVisible, setChatDetailsVisible, setDeleteChatState } =
    useChatContext();

  const { details, title, chatName, chatLabel, chatAbout } = useChatDetails();

  if (!details) return;

  const { chatType, users } = details;

  const sortedUsers = moveObjectToTop(users, profile?.id || "");

  return (
    <Sheet open={chatDetailsVisible} onOpenChange={setChatDetailsVisible}>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="sr-only">Chat Details</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex flex-col items-center">
              <UserAvatar
                name={chatName}
                chatType={chatType}
                className="size-32 mb-4"
                fallbackClassName="scale-200"
              />
              <span className="text-2xl">{chatName}</span>
              <span className="text-muted-foreground">{chatLabel}</span>
            </div>

            <div className="p-4">
              <div className="text-muted-foreground">About</div>
              <span>{chatAbout || "-"}</span>
            </div>

            {users.length > 1 && (
              <div className="px-2 space-y-4">
                <span className="px-2 text-muted-foreground">Members</span>

                <div className="space-y-2">
                  {sortedUsers.map((user) => (
                    <MemberListItem key={user.id} data={user} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-4 gap-2">
            <Button
              variant="ghost"
              className="text-destructive hover:text-destructive/90"
              onClick={() =>
                setDeleteChatState({ visible: true, chatId: details.id })
              }
            >
              <Trash2 /> Delete Chat
            </Button>

            {chatType === ChatType.GROUP && (
              <LeaveGroupDialog>
                <Button
                  variant="ghost"
                  className="text-destructive hover:text-destructive/90"
                >
                  <LogOut /> Leave group
                </Button>
              </LeaveGroupDialog>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
