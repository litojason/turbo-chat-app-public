import { Member } from "@repo/db/models/chat";
import UserAvatar from "@repo/ui/components/avatar/user-avatar";
import { useDashboardContext } from "~/context/dashboard-provider";

type MemberListItemProps = {
  data: Member;
};

export default function MemberListItem({ data }: MemberListItemProps) {
  const { profile } = useDashboardContext();

  const { id, name, email } = data;

  const userName = profile?.id === id ? "You" : name;

  return (
    <div className="flex items-center p-2 gap-4">
      <UserAvatar className="size-12" name={name} />

      <div className="flex flex-1 flex-col">
        <span className="font-semibold truncate">{userName}</span>
        <span className="text-sm text-muted-foreground truncate">{email}</span>
      </div>
    </div>
  );
}
