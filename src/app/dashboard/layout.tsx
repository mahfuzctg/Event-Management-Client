

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* <DashboardSidebar /> */}
        <div className="flex-1 flex flex-col">
          {/* <DashboardNavbar /> */}
          <main className="p-6 flex-1">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
