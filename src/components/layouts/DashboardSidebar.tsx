"use client";

import React from "react";
import Link from "next/link";
import { Home, CalendarDays, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: <Home size={18} />, href: "/dashboard" },
  { label: "Events", icon: <CalendarDays size={18} />, href: "/dashboard/events" },
  { label: "Profile", icon: <User size={18} />, href: "/dashboard/profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  return (
    <aside className="w-64 bg-card shadow-sm rounded-r-xl fixed top-20 bottom-4 left-0 p-6 flex flex-col justify-between">
      
      {/* Top: Profile and Navigation */}
      <div>
        {/* Profile */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-rose-500 text-white text-3xl font-bold mb-4">
            A
          </div>
          <h3 className="text-lg font-semibold text-foreground">Admin</h3>
          <p className="text-sm text-muted-foreground">Administrator</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-6">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors
                  ${isActive ? "bg-rose-500 text-white" : "text-foreground hover:bg-rose-500 hover:text-white"}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
