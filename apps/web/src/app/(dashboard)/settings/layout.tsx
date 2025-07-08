import SettingsSidebar from "./components/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex size-full">
      <SettingsSidebar />

      {children}
    </main>
  );
}
