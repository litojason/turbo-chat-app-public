import { Loader2Icon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";

type LoadingProps = {
  className?: string;
};

export default function Loading({ className }: LoadingProps) {
  return <Loader2Icon className={cn("text-primary animate-spin", className)} />;
}
