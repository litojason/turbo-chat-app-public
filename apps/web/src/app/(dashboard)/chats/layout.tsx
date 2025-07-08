import ChatSidebar from "./components/chat-sidebar/chat-sidebar";
import DeleteChatDialog from "./components/delete-chat-dialog";
import ChatProvider from "./context/chat-provider";

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <main className="flex flex-1">
        <ChatSidebar />

        {children}

        <DeleteChatDialog />
      </main>
    </ChatProvider>
  );
}
