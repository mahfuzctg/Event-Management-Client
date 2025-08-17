// src/app/dashboard/layout.tsx
"use client";

import DashboardSidebar from "@/components/layouts/DashboardSidebar";
import AuthGuard from "@/utils/authGuard"; 
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
      
        <div className="w-1/4">
          <DashboardSidebar />
        </div>

       
        <div className="w-3/4 flex flex-col">
          <main className="p-6 flex-1">{children}</main>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </AuthGuard>
  );
}
