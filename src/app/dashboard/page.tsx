import CustomSidebarTrigger from "./_components/custom-sidebar-trigger";

export default function Dashboard() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div>Dashboard</div>
      <div className="absolute bottom-5 left-5 z-50">
        <CustomSidebarTrigger />
      </div>
    </div>
  );
}
