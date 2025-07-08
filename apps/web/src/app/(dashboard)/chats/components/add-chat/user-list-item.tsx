import { User } from "@repo/db";
import { cn } from "@repo/ui/lib/utils";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import UserAvatar from "@repo/ui/components/avatar/user-avatar";

type UserListItemProps = {
  data: User;
  selected: boolean;
  setSelected: (user: User) => void;
};

export default function UserListItem({
  data,
  selected,
  setSelected,
}: UserListItemProps) {
  const { email, name } = data;

  return (
    <div
      onClick={() => setSelected(data)}
      className={cn("flex items-center p-4 gap-4", { "bg-muted": selected })}
    >
      <UserAvatar className="size-12" name={name} />

      <div className="flex flex-1 flex-col">
        <span className="font-semibold truncate">{name}</span>
        <span className="text-sm text-muted-foreground truncate">{email}</span>
      </div>

      <Checkbox checked={selected} />
    </div>
  );
}
