"use client";

import React from "react";
import Link from "next/link";
import { Home, CalendarDays, User, LogOut, X } from "lucide-react";
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

interface DashboardSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export default function DashboardSidebar({ mobileOpen, setMobileOpen }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth_token");
    toast.success("Logged out successfully");
    router.push("/auth/login");
    setMobileOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-card shadow-md p-6 flex flex-col justify-between z-50
          w-64 transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto
        `}
      >
        {/* Close button for mobile */}
        <div className="flex justify-end md:hidden mb-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md hover:bg-gray-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Top: Profile and Navigation */}
        <div>
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-rose-500 text-white text-3xl font-bold mb-4">
              A
            </div>
            <h3 className="text-lg font-semibold text-foreground">Admin</h3>
            <p className="text-sm text-muted-foreground">Administrator</p>
          </div>

          <nav className="flex flex-col gap-2 mt-6">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors
                    ${isActive ? "bg-rose-500 text-white" : "text-foreground hover:bg-rose-500 hover:text-white"}`}
                  onClick={() => setMobileOpen(false)}
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
    </>
  );
}
