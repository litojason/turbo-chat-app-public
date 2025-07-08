import { Fragment } from "react";

import { User } from "@repo/db";
import { Separator } from "@repo/ui/components/ui/separator";
import UserListItem from "./user-list-item";

type UserListProps = {
  users: User[];
  selectedUsers: User[];
  setSelected: (user: User) => void;
};

export default function UserList({
  users,
  selectedUsers,
  setSelected,
}: UserListProps) {
  return (
    <div>
      {users.map((user, index) => (
        <Fragment key={user.id}>
          <UserListItem
            data={user}
            selected={selectedUsers.some((u) => u.id === user.id)}
            setSelected={setSelected}
          />

          {users.length - 1 !== index && <Separator />}
        </Fragment>
      ))}
    </div>
  );
}
