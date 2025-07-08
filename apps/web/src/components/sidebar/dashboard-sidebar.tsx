"use client";

import { usePathname } from "next/navigation";
import { MessageSquare, Settings } from "lucide-react";

import SidebarItem from "./sidebar-item";
import LogoutDialog from "../logout/logout-dialog";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col justify-between h-full p-4 bg-sidebar">
      <ul className="flex flex-col gap-4">
        <SidebarItem
          href="/chats"
          icon={<MessageSquare />}
          isActive={pathname.startsWith("/chats")}
        />
      </ul>

      <ul className="flex flex-col gap-4">
        <SidebarItem
          href="/settings"
          icon={<Settings />}
          isActive={pathname.startsWith("/settings")}
        />
        <LogoutDialog />
      </ul>
    </nav>
  );
}
