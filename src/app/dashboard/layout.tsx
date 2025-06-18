import CustomSidebarTrigger from "./_components/custom-sidebar-trigger";
import SideMenu from "./_components/sidemenu";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full">
      <SideMenu />
      <div className="relative w-full">
        {children}
        <div className="absolute bottom-5 left-1 z-50">
          <CustomSidebarTrigger />
        </div>
      </div>
    </div>
  );
}
