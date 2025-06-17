import {
  SidebarTrigger,
  SidebarProvider,
  SidebarInset,
} from "~/components/ui/sidebar";
import SideMenu from "./_components/sidemenu";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full w-full">
      <SideMenu />
      <div className="w-full">{children}</div>
    </div>
  );
}
