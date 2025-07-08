import { Skeleton } from "@repo/ui/components/ui/skeleton";

export function ChatListItemSkeleton() {
  return (
    <div className="flex items-center p-4 gap-4">
      <Skeleton className="size-12 rounded-full" />

      <div className="flex flex-1 flex-col">
        <div className="flex flex-col items-center justify-between">
          <Skeleton className="h-4 my-1 w-full" />
          <div className="flex items-center h-5 w-full">
            <Skeleton className="h-3.5 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      <ChatListItemSkeleton />
      <ChatListItemSkeleton />
      <ChatListItemSkeleton />
    </div>
  );
}
