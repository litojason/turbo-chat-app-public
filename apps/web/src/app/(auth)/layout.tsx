export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="p-6 space-y-6 border rounded-lg shadow">{children}</div>
    </main>
  );
}
