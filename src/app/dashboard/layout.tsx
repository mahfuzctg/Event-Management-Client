"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/layouts/DashboardSidebar";
import AuthGuard from "@/utils/authGuard"; 
import { Toaster } from "react-hot-toast";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between bg-card p-4 shadow-sm">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <h2 className="font-bold text-lg">Dashboard</h2>
          </div>

          <main className="p-6 flex-1">{children}</main>
        </div>

        <Toaster position="top-right" />
      </div>
    </AuthGuard>
  );
}
