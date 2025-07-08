"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/ui/alert-dialog";
import { buttonVariants } from "@repo/ui/components/ui/button";
import { useChatContext } from "../context/chat-provider";

export default function DeleteChatDialog() {
  const { deleteChatState, setDeleteChatState, handleDeleteChat } =
    useChatContext();

  return (
    <AlertDialog
      open={deleteChatState.visible}
      onOpenChange={(open) => setDeleteChatState({ visible: open })}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Chat?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete chat? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => handleDeleteChat(deleteChatState.chatId!)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
