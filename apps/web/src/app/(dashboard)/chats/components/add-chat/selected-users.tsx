import { X } from "lucide-react";

import { User } from "@repo/db";
import { Badge } from "@repo/ui/components/ui/badge";

type SelectedUsersProps = {
  selectedUsers: User[];
  setSelected: (user: User) => void;
};

export default function SelectedUsers({
  selectedUsers,
  setSelected,
}: SelectedUsersProps) {
  return (
    <div className="flex flex-wrap gap-2 px-3 py-2 border rounded-md">
      {selectedUsers.length === 0 ? (
        <span className="text-sm text-muted-foreground my-[1px]">
          Selected user(s)
        </span>
      ) : (
        selectedUsers.map((user) => (
          <Badge key={user.id} onClick={() => setSelected(user)}>
            {user.email}
            <X />
          </Badge>
        ))
      )}
    </div>
  );
}
