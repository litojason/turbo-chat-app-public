import DashboardSidebar from "~/components/sidebar/dashboard-sidebar";
import { getProfile } from "~/actions/user";
import DashboardProvider from "~/context/dashboard-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  return (
    <DashboardProvider initialState={{ profile }}>
      <div className="flex h-screen w-screen overflow-y-hidden">
        <DashboardSidebar />

        {children}
      </div>
    </DashboardProvider>
  );
}
