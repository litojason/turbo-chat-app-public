"use client";

import { useRouter } from "next/navigation";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/ui/button";

type SidebarItemProps = {
  icon: React.ReactNode;
  href?: string;
  isActive?: boolean;
  className?: string;
};

export default function SidebarItem({
  icon,
  href,
  isActive,
  className,
}: SidebarItemProps) {
  const { push } = useRouter();

  const handleButtonClick = () => {
    if (href) {
      push(href);
    }
  };

  return (
    <li>
      <Button
        variant={isActive ? "default" : "outline"}
        size="icon"
        className={cn(className)}
        onClick={handleButtonClick}
      >
        {icon}
      </Button>
    </li>
  );
}
