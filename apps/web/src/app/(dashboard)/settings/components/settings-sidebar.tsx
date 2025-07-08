"use client";

import UserAvatar from "@repo/ui/components/avatar/user-avatar";
import { useDashboardContext } from "~/context/dashboard-provider";
import EditProfileForm from "./edit-profile-form";

export default function SettingsSidebar() {
  const { profile } = useDashboardContext();

  if (!profile) return;

  const { name, about } = profile;

  return (
    <div className="flex flex-col shrink-0 w-screen sm:w-2/5 sm:max-w-xs bg-sidebar border-x">
      <header className="flex items-center justify-between h-16 px-4 gap-4 border-b">
        <h1>Settings</h1>
      </header>

      <div className="flex items-center p-4 gap-4">
        <UserAvatar name={name} className="size-12" />

        <div className="flex flex-1 flex-col">
          <span className="font-semibold truncate">{name}</span>
          <span className="text-sm text-muted-foreground truncate">
            {about}
          </span>
        </div>
      </div>

      <div className="p-4">
        <EditProfileForm />
      </div>
    </div>
  );
}
