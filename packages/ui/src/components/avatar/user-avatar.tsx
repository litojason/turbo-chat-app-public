import { Users } from "lucide-react";

import { ChatType } from "@repo/db";
import { cn } from "@repo/ui/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

type UserAvatarProps = {
  name: string;
  chatType?: ChatType;
  className?: string;
  fallbackClassName?: string;
};

export default function UserAvatar({
  name,
  chatType,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarFallback
        className={cn("bg-primary text-primary-foreground", fallbackClassName)}
      >
        {chatType === ChatType.GROUP ? <Users /> : name[0] || "A"}
      </AvatarFallback>
    </Avatar>
  );
}

export const getInitialsName = (name: string) => {
  return name.charAt(0).toUpperCase();
};
