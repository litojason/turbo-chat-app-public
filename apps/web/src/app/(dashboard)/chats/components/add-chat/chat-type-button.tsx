import { ChatType } from "@repo/db";
import { Button } from "@repo/ui/components/ui/button";

type ChatTypeButtonProps = {
  chatType: ChatType;
  setChatType: (chatType: ChatType) => void;
};

export default function ChatTypeButton({
  chatType,
  setChatType,
}: ChatTypeButtonProps) {
  return (
    <div className="flex gap-4">
      <Button
        variant={chatType === ChatType.PRIVATE ? "default" : "outline"}
        onClick={() => setChatType(ChatType.PRIVATE)}
        className="flex-1"
      >
        Private
      </Button>
      <Button
        variant={chatType === ChatType.GROUP ? "default" : "outline"}
        onClick={() => setChatType(ChatType.GROUP)}
        className="flex-1"
      >
        Group
      </Button>
    </div>
  );
}
