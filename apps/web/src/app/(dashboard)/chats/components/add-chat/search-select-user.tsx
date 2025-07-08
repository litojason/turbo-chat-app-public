import { ChatType } from "@repo/db";
import { Input } from "@repo/ui/components/ui/input";
import { DialogClose, DialogFooter } from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import Loading from "@repo/ui/components/loader/loading";
import UserList from "./user-list";
import SelectedUsers from "./selected-users";
import ChatTypeButton from "./chat-type-button";
import useAddChatDialog from "../../hooks/use-add-chat-dialog";

export default function SearchSelectUser() {
  const {
    chatType,
    setChatType,
    setGroupName,
    searchTerm,
    setSearchTerm,
    loading,
    users,
    selectedUsers,
    updateSelectedUser,
    handleAddChat,
    isPrivateChatError,
    disabled,
  } = useAddChatDialog();

  const renderSelections = () => {
    if (!searchTerm) return <EmptyState message="List of emails" />;

    if (loading)
      return (
        <div className="flex size-full items-center justify-center p-4">
          <Loading className="size-10" />
        </div>
      );

    if (searchTerm && users.length === 0)
      return <EmptyState message="No email found" />;

    return (
      <UserList
        users={users}
        selectedUsers={selectedUsers}
        setSelected={updateSelectedUser}
      />
    );
  };

  return (
    <>
      <ChatTypeButton chatType={chatType} setChatType={setChatType} />

      {chatType === ChatType.GROUP && (
        <div>
          <Input
            placeholder="Type group name..."
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
      )}

      <Input
        placeholder="Search email..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="min-h-[244px] border rounded-md overflow-hidden">
        {renderSelections()}
      </div>

      <div>
        <SelectedUsers
          selectedUsers={selectedUsers}
          setSelected={updateSelectedUser}
        />
        {isPrivateChatError && (
          <span className="text-destructive text-sm">
            Private chat can only have one other user.
          </span>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>

        <Button disabled={disabled} onClick={handleAddChat}>
          Add
        </Button>
      </DialogFooter>
    </>
  );
}

type EmptyStateProps = {
  message: string;
};
function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex size-full items-center justify-center p-4">
      <span className="text-muted-foreground">{message}</span>
    </div>
  );
}
