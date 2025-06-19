export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-full w-full px-20">{children}</div>;
}
