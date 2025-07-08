import { MessageSquarePlus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import SearchSelectUser from "./search-select-user";
import { useChatContext } from "../../context/chat-provider";

export default function AddChatDialog() {
  const { addChatVisible, setAddChatVisible } = useChatContext();

  return (
    <Dialog open={addChatVisible} onOpenChange={setAddChatVisible}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MessageSquarePlus className="size-6" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
          <DialogDescription className="sr-only">
            Add new chat by searching email
          </DialogDescription>
        </DialogHeader>

        <SearchSelectUser />
      </DialogContent>
    </Dialog>
  );
}
